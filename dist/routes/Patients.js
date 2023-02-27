"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Patients_1 = require("../controllers/Patients");
const router = express_1.default.Router();
router.route('/getAll').get(Patients_1.getAllPatient);
router.route('/addNew').post(Patients_1.addNewPatient);
router.route('/update/:id').patch(Patients_1.updatePatient);
router.route('/delete/:id').delete(Patients_1.deletePatient);
exports.default = router;
//# sourceMappingURL=Patients.js.map