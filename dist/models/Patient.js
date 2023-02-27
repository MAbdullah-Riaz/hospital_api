"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Enum_1 = require("../constants/Enum");
const hospitalSchema = new mongoose_1.default.Schema({
    ownerName: { type: String, required: true },
    petName: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    ownerPhoneNo: { type: Number, required: true },
    petType: { enum: Object.values(Enum_1.PetType) },
});
exports.default = mongoose_1.default.model('patientCollection', hospitalSchema);
//# sourceMappingURL=Patient.js.map