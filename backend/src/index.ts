import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

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