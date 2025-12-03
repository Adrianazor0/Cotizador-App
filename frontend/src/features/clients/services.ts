import api from "../../lib/axios";
import type { Client } from "./types";

export type CreateClientDTO = Omit<Client, "_id" | "createdAt" | "updatedAt" | "active">; 

export const getClients = async (): Promise<Client[]> => {
    const data = await api.get("/clients");
    return data as unknown as Client[];
};

export const getClientsById = async (id: string): Promise<Client> => {
    const data = await api.get<Client>(`/clients/${id}`);
    return data as unknown as Client;
};

export const createClient = async (data: CreateClientDTO): Promise<Client> => {
    const response = await api.post("/clients", data);
    return response as unknown as Client;
};


