import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://spur-task-ten.vercel.app', '*'],
}));
app.use(express.json());

app.use('/chat', chatRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
