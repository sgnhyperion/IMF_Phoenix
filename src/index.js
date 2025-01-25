import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});