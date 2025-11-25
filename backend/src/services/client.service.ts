import Client, { IClient } from '../models/Client';
import { CreateClientInput, UpdateClientInput } from '../schemas/client.schema';

export const createClient = async (input: CreateClientInput): Promise<IClient> => {
    return await Client.create(input);
}

export const getClients = async (): Promise<IClient[]> => {
    return await Client.find({ active: true });
}   

export const getClientById = async (id: string): Promise<IClient | null> => {
    return await Client.findById(id);
}

export const updateClient = async (id: string, input: UpdateClientInput): Promise<IClient | null> => {
    return await Client.findByIdAndUpdate(id, input, { new: true });
}   

export const softDeleteClient = async (id: string): Promise<IClient | null> => {
    return await Client.findByIdAndUpdate(id, { active: false }, { new: true });
}   


