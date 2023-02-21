import { response } from 'express';
import HospitalModel, { Patient } from '../models/PatientZX';
import asyncHandler from 'express-async-handler';
import { IRequest, IResponse, IRequestParams } from '../dto/CommonZX.dto';

const addNewPatient = asyncHandler(
  async (request: IRequest<never, Patient>, response: IResponse<Patient>) => {
    const patientInfo = new HospitalModel({
      ownerName: request.body.ownerName,
      petName: request.body.petName,
      ownerAddress: request.body.ownerAddress,
      ownerPhoneNo: request.body.ownerPhoneNo,
      petType: request.body.petType,
    });

    const savedPatientInfo = await patientInfo.save();
    response.send(JSON.parse(JSON.stringify(savedPatientInfo)));
  }
);

const updatePatient = asyncHandler(
  async (
    request: IRequest<IRequestParams, Patient>,
    response: IResponse<Patient>
  ) => {
    const patients = await HospitalModel.updateOne(
      { _id: request.params.id },
      {
        ownerName: request.body.ownerName,
        petName: request.body.petName,
        ownerAddress: request.body.ownerAddress,
        ownerPhoneNo: request.body.ownerPhoneNo,
        petType: request.body.petType,
      }
    );
    response.send(JSON.parse(JSON.stringify(patients)));
  }
);

const deletePatient = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Patient>
  ) => {
    const patients = await HospitalModel.findByIdAndRemove(request.params.id);
    response.send(JSON.parse(JSON.stringify(patients)));
  }
);

const getAllPatient = asyncHandler(
  async (request: IRequest<never, never>, response: IResponse<Patient>) => {
    const patients = await HospitalModel.find();
    response.send(JSON.parse(JSON.stringify(patients)));
  }
);

export { addNewPatient, updatePatient, deletePatient, getAllPatient };
