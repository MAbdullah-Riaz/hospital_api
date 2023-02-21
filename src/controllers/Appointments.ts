import express, { response } from 'express';
import { IRequest, IResponse, IRequestParams } from '../dto/Common.dto';
import AppointmentModel, { Appointment } from '../models/Appointments';
import asyncHandler from 'express-async-handler';

import { Currency } from '../constants/Enum';
import { symbol } from 'joi';
const app = express();
const router = express.Router();

const addNewAppointment = asyncHandler(
  async (
    req: IRequest<never, Omit<Appointment, '_id'>>,
    res: IResponse<Appointment>
  ) => {
    const { body } = req;
    const appointmentDoc = new AppointmentModel(body);
    const resultObj = await appointmentDoc.save();
    const appointment: Appointment = {
      _id: resultObj._id.toString(),
      patientId: resultObj.patientId.toString(),
      description: resultObj.description,
      startTime: resultObj.startTime,
      endTime: resultObj.endTime,
      currency: resultObj.currency,
      isPaid: resultObj.isPaid,
      amount: resultObj.amount,
    };
    res.send(appointment);
  }
);

const getAllAppointments = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Appointment[]>
  ) => {
    const appointments = await AppointmentModel.find({
      patientId: request.params.id,
    });
    response.send(JSON.parse(JSON.stringify(appointments)));
  }
);

const updateAppointment = asyncHandler(
  async (
    request: IRequest<IRequestParams, Appointment>,
    response: IResponse<Omit<Appointment, '_id'>>
  ) => {
    const patients = await AppointmentModel.updateOne(
      { _id: request.params.id },
      {
        startTime: request.body.startTime,
        endTime: request.body.endTime,
        description: request.body.description,
        currency: request.body.currency,
        isPaid: request.body.isPaid,
        amount: request.body.amount,
      }
    );
    response.send(JSON.parse(JSON.stringify(patients)));
  }
);
const getUnpaidAppointments = asyncHandler(
  async (
    request: IRequest<never, never>,
    response: IResponse<Appointment[]>
  ) => {
    response.send(await AppointmentModel.find({ isPaid: false }));
  }
);

const deleteAppointment = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Appointment[]>
  ) => {
    const appointment = await AppointmentModel.findByIdAndRemove(
      request.params.id
    );
    response.send(JSON.parse(JSON.stringify(appointment)));
  }
);

export {
  addNewAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getUnpaidAppointments,
};
