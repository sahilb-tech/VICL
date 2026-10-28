import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ project: 'VICL', message: 'VICL backend API is running.' });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));

app.listen(port, () => {
  console.log(`VICL backend running on http://localhost:${port}`);
});
