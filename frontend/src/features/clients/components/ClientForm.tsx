import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../services';
import type { CreateClientDTO } from '../services';

const clientSchema = z.object({
    firstName: z.string().min(2, "El nombre es muy corto"),
    lastName: z.string().min(2, "El apellido es muy corto"),
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().min(10, "El teléfono es muy corto"),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
    onClose: () => void;
}

export const ClientForm = ({ onClose }: ClientFormProps) => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
    });

    const mutation = useMutation({
        mutationFn: createClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            onClose();
        },
        onError: (error: any) => {
            alert("Error al crear: " + (error.response?.data?.message || error.message));
        }
    });

    const onSubmit = (data: ClientFormData) => {
        mutation.mutate(data as CreateClientDTO);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre</label>
                    <input
                        {...register('firstName')}
                        className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300'
                        placeholder='Ej. juan'
                    />
                    {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName.message}</p>}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Apellido</label>
                    <input
                        {...register('lastName')}
                        className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300'
                        placeholder='Ej. perez'
                    />
                    {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName.message}</p>}
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input
                    {...register('email')}
                    className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300'
                    placeholder='Ej. juan@ejemplo.com'
                />
                {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Teléfono</label>
                <input
                    {...register('phone')}
                    className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300'
                    placeholder='Ej. 809...'
                />
                {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
            </div>

            <div className='flex justify-end pt-2'>
                <button
                    type='submit'
                    disabled={mutation.isPending}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors  disabled:opacity-50'
                >
                    {mutation.isPending ? 'Guardando...' : 'Guardar Cliente'}
                </button>
            </div>
        </form>
    );
}

