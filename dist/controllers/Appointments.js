"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnpaidAppointments = exports.deleteAppointment = exports.updateAppointment = exports.getAllAppointments = exports.addNewAppointment = void 0;
const express_1 = __importDefault(require("express"));
const Appointments_1 = __importDefault(require("../models/Appointments"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const addNewAppointment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const appointmentDoc = new Appointments_1.default(body);
    const resultObj = yield appointmentDoc.save();
    const appointment = {
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
}));
exports.addNewAppointment = addNewAppointment;
const getAllAppointments = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield Appointments_1.default.find({
        patientId: request.params.id,
    });
    response.send(JSON.parse(JSON.stringify(appointments)));
}));
exports.getAllAppointments = getAllAppointments;
const updateAppointment = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield Appointments_1.default.updateOne({ _id: request.params.id }, {
        startTime: request.body.startTime,
        endTime: request.body.endTime,
        description: request.body.description,
        currency: request.body.currency,
        isPaid: request.body.isPaid,
        amount: request.body.amount,
    });
    response.send(JSON.parse(JSON.stringify(patients)));
}));
exports.updateAppointment = updateAppointment;
const getUnpaidAppointments = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield Appointments_1.default.find({ isPaid: false }));
}));
exports.getUnpaidAppointments = getUnpaidAppointments;
const deleteAppointment = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield Appointments_1.default.findByIdAndRemove(request.params.id);
    response.send(JSON.parse(JSON.stringify(appointment)));
}));
exports.deleteAppointment = deleteAppointment;
//# sourceMappingURL=Appointments.js.map