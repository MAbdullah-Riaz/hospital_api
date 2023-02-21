'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const enum_1 = require('../constants/enum');
const appointmentSchema = new mongoose_1.default.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  patientId: { type: Object },
  currency: {
    type: String,
    default: enum_1.Currency.USD,
    enum: Object.values(enum_1.Currency),
    required: function () {
      return this.isPaid;
    },
  },
  amount: {
    type: Number,
    required: function () {
      return this.isPaid;
    },
  },
});
exports.default = mongoose_1.default.model(
  'appointmentCollection',
  appointmentSchema
);
//# sourceMappingURL=appointments.js.map
