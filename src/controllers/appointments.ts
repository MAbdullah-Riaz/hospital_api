import express, { response } from 'express';
import { IRequest, IResponse } from '../constants/types';
import AppointmentModel, { Appointment } from '../models/appointments';
import asyncHandler from 'express-async-handler';

import { Currency } from '../constants/enum';
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

interface RequestParams {
  id: string;
}
const getAllAppointments = asyncHandler(
  async (
    request: IRequest<RequestParams, never>,
    response: IResponse<Appointment[]>
  ) => {
    const appointments = await AppointmentModel.find({
      patientId: request.params.id,
    });
    response.send(JSON.parse(JSON.stringify(appointments)));
  }
);

interface UpdateAppointmentBody {
  currency: Currency;
  isPaid: Boolean;
}
const updateAppointment = asyncHandler(
  async (
    request: IRequest<RequestParams, UpdateAppointmentBody>,
    response: IResponse<Appointment[]>
  ) => {
    const patients = await AppointmentModel.updateOne(
      { _id: request.params.id },
      {
        currency: request.body.currency,
        isPaid: request.body.isPaid,
      }
    );
    response.send(JSON.parse(JSON.stringify(patients)));
  }
);
const getUnpaidAppointments = asyncHandler(
  async (request: IRequest<any>, response: IResponse<Appointment[]>) => {
    response.send(await AppointmentModel.find({ isPaid: false }));
  }
);

const deleteAppointment = asyncHandler(
  async (
    request: IRequest<RequestParams>,
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
