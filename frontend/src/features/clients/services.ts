import api from "../../lib/axios";
import type { Client } from "./types";

export const getClients = async (): Promise<Client[]> => {
    const data = await api.get("/clients");
    return data as unknown as Client[];
};

