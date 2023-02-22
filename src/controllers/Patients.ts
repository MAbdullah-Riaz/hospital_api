import HospitalModel, { Patient } from '../models/Patient';
import AppointmentModel from '../models/Appointments';
import asyncHandler from 'express-async-handler';
import { IRequest, IResponse, IRequestParams } from '../dto/Common.dto';

import { exchangeRates } from '../utils/helpers';

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

const popularPet = asyncHandler(
  async (request: IRequest<IRequestParams>, response) => {
    const mostPopularPet = await HospitalModel.aggregate([
      { $group: { _id: '$petType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const pricePet = moneyForEachPet();
    console.log(pricePet);
  }
);
const moneyForEachPet = async () => {
  const appointmentModel = await AppointmentModel.find().select({
    _id: 1,
    patientId: 1,
    amount: 1,
  });
  const hospitalModel = await HospitalModel.find().select({
    _id: 1,
    petType: 1,
  });
  const priceObj = { cat: 0, dog: 0, bird: 0 };
  hospitalModel.forEach((pElement) => {
    appointmentModel.forEach((aElement) => {
      if (pElement._id.equals(aElement.patientId)) {
        priceObj[pElement.petType] += aElement.amount;
      }
    });
  });
  return priceObj;
};

export {
  addNewPatient,
  updatePatient,
  deletePatient,
  getAllPatient,
  popularPet,
};
