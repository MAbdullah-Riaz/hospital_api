import express, { Request, Response } from 'express';
import { connectDb } from './config/HospitalDB';
import patientRoutes from './routes/Patients';
import appointmentsRoutes from './routes/Appointments';
import { errorHandler, notFound } from './middleware/ErrorMiddleware';

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
