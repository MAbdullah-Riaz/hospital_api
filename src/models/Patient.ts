import mongoose from 'mongoose';
import { Currency, PetType } from '../constants/Enum';

export interface Patient {
  ownerName: string;
  petName: Date;
  ownerAddress: Date;
  ownerPhoneNo: Number;
  petType: PetType;
}

const hospitalSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  petName: { type: String, required: true },
  ownerAddress: { type: String, required: true },
  ownerPhoneNo: { type: Number, required: true },
  petType: { enum: Object.values(PetType) },
});

export default mongoose.model('patientCollection', hospitalSchema);
