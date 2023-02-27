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
const HospitalDB_1 = require("./config/HospitalDB");
const Patients_1 = __importDefault(require("./routes/Patients"));
const Appointments_1 = __importDefault(require("./routes/Appointments"));
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/patients', Patients_1.default);
app.use('/appointments', Appointments_1.default);
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, HospitalDB_1.connectDb)();
        console.log(`Express is listening at http://localhost:${port}`);
    }
    catch (error) {
        console.error('Error Connecting Database', error);
    }
}));
//# sourceMappingURL=App.js.map