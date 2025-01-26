import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './lib/db.js';
import authRoute from './route/auth.route.js';
import gadgetRoute from './route/gadget.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import setupSwagger from './config/swagger.config.js';

dotenv.config();

const app = express();

setupSwagger(app);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use('/auth', authRoute);
app.use('/gadgets', gadgetRoute);

app.listen(PORT, () => {
  initializeDatabase();
  console.log(`Server running on port ${PORT}`);
  console.log('Swagger docs available at http://localhost:5000/api-docs');
});