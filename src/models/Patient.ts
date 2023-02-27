import mongoose from 'mongoose';
import { PetType } from '../constants/Enum';

export interface Patient {
  ownerName: string;
  petName: string;
  ownerAddress: string;
  ownerPhoneNo: Number;
  petType: PetType;
}

const hospitalSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  petName: { type: String, required: true },
  ownerAddress: { type: String, required: true },
  ownerPhoneNo: { type: Number, required: true },
  petType: { type: String, enum: Object.values(PetType), required: true },
});

export default mongoose.model('patientCollection', hospitalSchema);
