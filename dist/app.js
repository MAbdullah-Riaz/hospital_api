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
const express_1 = __importDefault(require("express"));
const hospital_1 = __importDefault(require("./models/hospital"));
const appointments_1 = __importDefault(require("./models/appointments"));
const hospitalDB_1 = require("./config/hospitalDB");
const app = (0, express_1.default)();
const port = 3000;
app.get('/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield hospital_1.default.find();
    res.send(patients);
}));
app.post('/add-appointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addedAppointment = new appointments_1.default({
        startTime: '2022-02-26T17:08:13.930Z',
        endTime: '2022-03-26T17:08:13.930Z',
        description: 'this is Description',
        isPaid: true,
        currency: 'EUR',
        amount: 234,
    });
    res.send(yield addedAppointment.save());
}));
const addNewPatient = () => __awaiter(void 0, void 0, void 0, function* () {
    const patientInfo = new hospital_1.default({
        ownerName: 'Josh Mosh',
        petName: 'Tony',
        ownerAddress: 'New Jersy, United States ',
        ownerPhoneNo: 655231651,
        petType: 'dog',
    });
    try {
        const savedPatientInfo = yield patientInfo.save();
        console.log(savedPatientInfo);
    }
    catch (error) {
        console.log(error.message);
    }
});
// addNewPatient();
const updatePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield hospital_1.default.update({ _id: id }, {
        $set: {
            ownerName: 'Mosh',
        },
    });
    console.log(patients);
});
// updatePatient('63ef601e204d76ccd099f5ec');
const deletePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield hospital_1.default.findByIdAndRemove(id);
    console.log('Deleted : ', patients);
});
// deletePatient('63ef601e204d76ccd099f5ec');
const addAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield hospital_1.default.update({ _id: id }, {
        $set: {
            appointmentStartTime: '20:15:10',
        },
    });
    console.log(patients);
});
// addAppointments('63ef601e204d76ccd099f5ec');
// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, hospitalDB_1.connectDb)();
        console.log(`Express is listening at http://localhost:${port}`);
    }
    catch (error) {
        console.error('Error Connecting Database', error);
    }
}));
//# sourceMappingURL=app.js.map