import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';
import clientRoutes from './routes/client.routes';
import vehicleRoutes from './routes/vehicle.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: "OK",
        Timestamp: new Date().toISOString(),
        service: 'Cotizador Api'
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running on http://localhost:${port}`);
});