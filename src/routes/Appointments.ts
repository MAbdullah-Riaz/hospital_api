import express from 'express';
import {
  addNewAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getUnpaidAppointments,
} from '../controllers/Appointments';

const router = express.Router();

router.route('/addNew').post(addNewAppointment);
router.route('/getAll/:id').get(getAllAppointments);
router.route('/update/:id').patch(updateAppointment);
router.route('/delete/:id').delete(deleteAppointment);
router.route('/getUnpaid').get(getUnpaidAppointments);

export default router;
