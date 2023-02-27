"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Appointments_1 = require("../controllers/Appointments");
const router = express_1.default.Router();
router.route('/addNew').post(Appointments_1.addNewAppointment);
router.route('/getAll/:id').get(Appointments_1.getAllAppointments);
router.route('/update/:id').patch(Appointments_1.updateAppointment);
router.route('/delete/:id').delete(Appointments_1.deleteAppointment);
router.route('/getUnpaid').get(Appointments_1.getUnpaidAppointments);
exports.default = router;
//# sourceMappingURL=Appointments.js.map