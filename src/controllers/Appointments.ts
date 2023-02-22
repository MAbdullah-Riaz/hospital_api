import express, { response } from 'express';
import { IRequest, IResponse, IRequestParams } from '../dto/Common.dto';
import AppointmentModel, { Appointment } from '../models/Appointments';
import asyncHandler from 'express-async-handler';

import mongoose from 'mongoose';
import { exchangeRates } from '../utils/helpers';
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

const remainingBalance = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<any>
  ) => {
    const remainBalance = await AppointmentModel.aggregate([
      { $match: { patientId: new mongoose.Types.ObjectId(request.params.id) } },
      { $group: { _id: '$isPaid', totalAmount: { $sum: '$amount' } } },
    ]);
    console.log(remainBalance);
    // // console.log(JSON.stringify(amountPaid));
    // response.sendStatus(JSON.parse(JSON.stringify(remainBalance)));
  }
);

const appointmentOfADay = asyncHandler(
  async (request: IRequest<IRequestParams>, response) => {
    const date = new Date(request.params.id);
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const oneDayAppointment = await AppointmentModel.find({
      startTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    console.log(oneDayAppointment);
  }
);

const appointmentStatus = asyncHandler(
  async (request: IRequest<IRequestParams>, response) => {
    const date = new Date(request.params.id);
    const daysInWeek = date.getDay();
    const daysInMonth = date.getDate();
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - daysInWeek
    );
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    const startOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - daysInMonth
    );
    const endOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    const oneWeekAppointments = await AppointmentModel.find({
      startTime: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });
    // exchangeRates();
    const oneMonthAppointments = await AppointmentModel.find({
      startTime: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });
    //conversion of json array into output format
    const responseObj = { amountPaid: 0, amountUnpaid: 0, balance: 0 };
    for (const element of oneWeekAppointments) {
      const USDAmount = await exchangeRates(
        element.currency,
        'USD',
        element.amount
      );
      if (element.isPaid) {
        responseObj.amountPaid += USDAmount;
      } else {
        responseObj.amountUnpaid += USDAmount;
      }
      responseObj.balance += USDAmount;
    }

    console.log(responseObj);
  }
);

export {
  addNewAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getUnpaidAppointments,
  remainingBalance,
  appointmentOfADay,
  appointmentStatus,
};
