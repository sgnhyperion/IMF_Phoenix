import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './lib/db.js';
import authRoute from './route/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});