"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hospitalSchema = new mongoose_1.default.Schema({
    ownerName: { type: String, required: true },
    petName: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    ownerPhoneNo: { type: Number, required: true },
    petType: { type: String, required: true, enum: ['cat', 'dog', 'bird'] },
});
exports.default = mongoose_1.default.model('patientCollection', hospitalSchema);
//# sourceMappingURL=hospital.js.map