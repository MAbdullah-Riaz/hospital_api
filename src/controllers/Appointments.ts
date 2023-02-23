import { IRequest, IResponse, IRequestParams } from '../dto/Common.dto';
import AppointmentModel, { IAppointment } from '../models/Appointments';
import asyncHandler from 'express-async-handler';

import mongoose from 'mongoose';
import { exchangeRates } from '../utils/helpers';
import { IRemainingBalance, IStatement } from '../dto/Appointments.dto';
const addNewAppointment = asyncHandler(
  async (
    request: IRequest<never, Omit<IAppointment, '_id'>>,
    response: IResponse<Omit<IAppointment, '_id'>>
  ) => {
    const { body } = request;
    const appointmentDoc = new AppointmentModel(body);
    const addedAppointment = await appointmentDoc.save();
    const appointment: IAppointment = {
      _id: addedAppointment._id.toString(),
      patientId: addedAppointment.patientId.toString(),
      description: addedAppointment.description,
      startTime: addedAppointment.startTime,
      endTime: addedAppointment.endTime,
      currency: addedAppointment.currency,
      isPaid: addedAppointment.isPaid,
      amount: addedAppointment.amount,
    };
    response.send(addedAppointment);
  }
);

const getAllAppointments = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Omit<IAppointment, '_id'>[]>
  ) => {
    const appointments = await AppointmentModel.find({
      patientId: request.params.id,
    });
    response.send(appointments);
  }
);

const updateAppointment = asyncHandler(
  async (
    request: IRequest<IRequestParams, IAppointment>,
    response: IResponse<Omit<IAppointment, '_id'>>
  ) => {
    await AppointmentModel.updateOne(
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
    response.send(request.body);
  }
);
const getUnpaidAppointments = asyncHandler(
  async (
    request: IRequest<never, never>,
    response: IResponse<IAppointment[]>
  ) => {
    response.send(await AppointmentModel.find({ isPaid: false }));
  }
);

const deleteAppointment = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<Omit<IAppointment, '_id'>>
  ) => {
    const appointment = await AppointmentModel.findByIdAndRemove(
      request.params.id
    );
    response.send(appointment);
  }
);

const remainingBalance = asyncHandler(
  async (
    request: IRequest<IRequestParams, never>,
    response: IResponse<IRemainingBalance>
  ) => {
    const remainBalance = await AppointmentModel.aggregate([
      { $match: { patientId: new mongoose.Types.ObjectId(request.params.id) } },
      { $group: { _id: '$isPaid', totalAmount: { $sum: '$amount' } } },
    ]);
    response.send({ remainingBalance: Number(remainBalance[1].totalAmount) });
  }
);

const appointmentOfADay = asyncHandler(
  async (
    request: IRequest<IRequestParams>,
    response: IResponse<Omit<IAppointment, '_id'>[]>
  ) => {
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

    const oneDayAppointments = await AppointmentModel.find({
      startTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    response.send(oneDayAppointments);
  }
);

const appointmentStatus = asyncHandler(
  async (
    request: IRequest<IRequestParams>,
    response: IResponse<IStatement>
  ) => {
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
    const oneMonthAppointments = await AppointmentModel.find({
      startTime: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const weeklyStatus = { amountPaid: 0, amountUnpaid: 0, balance: 0 };
    for (const element of oneWeekAppointments) {
      const USDAmount = await exchangeRates(
        element.currency,
        'USD',
        element.amount
      );
      if (element.isPaid) {
        weeklyStatus.amountPaid += USDAmount;
      } else {
        weeklyStatus.amountUnpaid += USDAmount;
      }
      weeklyStatus.balance += USDAmount;
    }

    const monthlyStatus = { amountPaid: 0, amountUnpaid: 0, balance: 0 };
    for (const element of oneMonthAppointments) {
      const USDAmount = await exchangeRates(
        element.currency,
        'USD',
        element.amount
      );
      if (element.isPaid) {
        monthlyStatus.amountPaid += USDAmount;
      } else {
        monthlyStatus.amountUnpaid += USDAmount;
      }
      monthlyStatus.balance += USDAmount;
    }
    response.send({
      weeklyStatus: weeklyStatus,
      monthlyStatus: monthlyStatus,
    });
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
