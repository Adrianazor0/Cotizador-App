import { Request, Response} from "express";
import * as clientService from '../services/client.service';
import { CreateClientInput, UpdateClientInput } from "../schemas/client.schema";

export const createClientHandler = async (
    req: Request<{}, {}, CreateClientInput>, 
    res: Response
) => {
    try {
        const client = await clientService.createClient(req.body);
        res.status(201).json(client);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'The email is already registered.' });
        } 
        return res.status(500).json({ message: error.message });  
    }
};

export const getClientsHandler = async (
    req: Request, res: Response) => {
    try {
        const clients = await clientService.getClients();
        return res.status(200).json(clients);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }   
};

export const getClientHandler = async (
    req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const client = await clientService.getClientById(id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        return res.status(200).json(client);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};