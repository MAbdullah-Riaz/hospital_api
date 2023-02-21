import mongoose from 'mongoose';
import { Currency } from '../constants/EnumZX';

export interface Appointment {
  _id: string;
  startTime: Date;
  endTime: Date;
  patientId?: string;
  description: string;
  isPaid: boolean;
  currency: Currency;
  amount: number;
}
const appointmentSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  currency: {
    type: String,
    default: Currency.USD,
    enum: Object.values(Currency),

    required: function () {
      return this.isPaid;
    },
  },
  amount: {
    type: Number,
    required: function () {
      return this.isPaid;
    },
  },
});

export default mongoose.model('appointmentCollection', appointmentSchema);
