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
exports.getAllPatient = exports.deletePatient = exports.updatePatient = exports.addNewPatient = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addNewPatient = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const patientInfo = new Patient_1.default({
        ownerName: request.body.ownerName,
        petName: request.body.petName,
        ownerAddress: request.body.ownerAddress,
        ownerPhoneNo: request.body.ownerPhoneNo,
        petType: request.body.petType,
    });
    const savedPatientInfo = yield patientInfo.save();
    response.send(JSON.parse(JSON.stringify(savedPatientInfo)));
}));
exports.addNewPatient = addNewPatient;
const updatePatient = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield Patient_1.default.updateOne({ _id: request.params.id }, {
        ownerName: request.body.ownerName,
        petName: request.body.petName,
        ownerAddress: request.body.ownerAddress,
        ownerPhoneNo: request.body.ownerPhoneNo,
        petType: request.body.petType,
    });
    response.send(JSON.parse(JSON.stringify(patients)));
}));
exports.updatePatient = updatePatient;
const deletePatient = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield Patient_1.default.findByIdAndRemove(request.params.id);
    response.send(JSON.parse(JSON.stringify(patients)));
}));
exports.deletePatient = deletePatient;
const getAllPatient = (0, express_async_handler_1.default)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield Patient_1.default.find();
    response.send(JSON.parse(JSON.stringify(patients)));
}));
exports.getAllPatient = getAllPatient;
//# sourceMappingURL=Patients.js.map