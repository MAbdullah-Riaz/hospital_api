import express, { Request, Response } from 'express';
import hospitalModel from './models/hospital';
import { connectDb } from './config/hospitalDB';
import patientRoutes from './routes/patients';
import appointmentsRoutes from './routes/appointments';
import { errorHandler, notFound } from './middleware/errorMiddleware';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Express is listening at http://localhost:${port}`);
  } catch (error) {
    console.error('Error Connecting Database', error);
  }
});
