import { useQuery } from '@tanstack/react-query';
import { getClients } from '../services';
import { Loader2, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientList = () => {
  const navigate = useNavigate();

  const { data: clients, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

    if (isLoading) { 
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Cargando clientes...</span>
      </div>
    );
  }

    if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error: {(error as Error).message}
      </div>
    );
  }
  if (!clients || clients.length === 0) {
    return (
        <div className="text-center py-10 text-gray-500">
            <UserX className="mx-auto h-10 w-10 mb-2 opacity-50" />
            <p>No hay clientes registrados aún.</p>
        </div>
    );
  }

    return (
        <div className="bg-white shasow rounded-lg overflow-hidden border border-gray-200">
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contacto</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Estado</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {clients.map((client) => (
                        <tr 
                          key={client._id} 
                          onClick={() => navigate(`/clients/${client._id}`)}
                          className='hover:bg-gray-50 transition-colors cursor-pointer'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm font-medium text-gray-900'>
                                    {client.firstName} {client.lastName}
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>{client.email}</div>
                                <div className='text-sm text-gray-400'>{client.phone}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} >
                                    {client.active ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>    
            </table>
        </div>
    );
};