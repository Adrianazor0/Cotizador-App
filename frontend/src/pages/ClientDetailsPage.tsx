import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClientsById } from "../features/clients/services";  
import { getVehiclesByClient } from "../features/vehicles/services";
import { ArrowLeft, Car, Plus } from "lucide-react";

export const ClientDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const clientQuery = useQuery({
        queryKey: ["client", id],
        queryFn: () => getClientsById(id!),
        enabled: !!id,
    });

    const vehiclesQuery = useQuery({
        queryKey: ["vehicles", id],
        queryFn: () => getVehiclesByClient(id!),
        enabled: !!id,
    });

    if (clientQuery.isLoading) return <div className="p-8 text-center">Cargando información...</div>;
    if (!clientQuery.data) return <div className="p-8 text-center text-red-500">Cliente no encontrado</div>;

    const client = clientQuery.data;
    const vehicles = vehiclesQuery.data || [];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Volver al listado
                </button>

                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
                    <h1 className="text-2xl font-bold text-gray-900">{client.firstName} {client.lastName} </h1>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="block text-gray-500">Email:</span>
                            <span className="font-medium">{client.email}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Teléfono:</span>
                            <span className="font-medium">{client.phone}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Estado:</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${client.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {client.active ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                    </div>
                </div>  

                <div className="flex justify-between items-center mt-8">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Car /> Vehículos Registrados
                    </h2>
                    <button
                        className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <Plus size={16} /> Agregar Vehículo
                    </button>
                </div>

                { vehicles.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
                        Este cliente no tiene vehículos registrados aun.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vehicles.map((car) => (
                            <div key={car._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{car.brand} {car.vehicleModel}</h3>
                                        <p className="text-gray-500 text-sm">{car.year} • {car.color} </p>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono font-bold">
                                        {car.plate}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
                     

