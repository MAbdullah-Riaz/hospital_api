import HospitalModel, { Patient } from '../models/Patient';
import AppointmentModel from '../models/Appointments';
import asyncHandler from 'express-async-handler';
import { IRequest, IResponse, IRequestParams } from '../dto/Common.dto';

import { exchangeRates } from '../utils/helpers';
import { IPopularPet } from '../dto/patients.dto';

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
    response.send(savedPatientInfo);
  }
);

const updatePatient = asyncHandler(
  async (
    request: IRequest<IRequestParams, Patient>,
    response: IResponse<any>
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
    response.send(patients);
  }
);

const deletePatient = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Patient>
  ) => {
    const patients = await HospitalModel.findByIdAndRemove(request.params.id);
    response.send(patients);
  }
);

const getAllPatient = asyncHandler(
  async (_, response: IResponse<Patient[]>) => {
    const patients = await HospitalModel.find();
    response.send(patients);
  }
);

const popularPet = asyncHandler(async (_, response: IResponse<IPopularPet>) => {
  const mostPopularPet = await HospitalModel.aggregate([
    { $group: { _id: '$petType', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        petName: '$_id',
        popularity: '$count',
      },
    },
  ]);
  const petWiseMoney = await moneyForEachPet();
  response.send({ mostPopularPet, petWiseMoney });
});
const moneyForEachPet = async () => {
  const petTypeSum = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: 'patientcollections',
        localField: 'patientId',
        foreignField: '_id',
        as: 'petInfo',
      },
    },
    {
      $unwind: { path: '$petInfo' },
    },
    {
      $group: {
        _id: '$petInfo.petType',
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  const priceObj = { cat: 0, dog: 0, bird: 0 };
  petTypeSum.forEach((petType) => {
    priceObj[petType._id] = petType.totalAmount;
  });
  console.log(petTypeSum);
  return priceObj;
};

export {
  addNewPatient,
  updatePatient,
  deletePatient,
  getAllPatient,
  popularPet,
};
