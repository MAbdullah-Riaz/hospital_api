import express from 'express';
import {
  addNewPatient,
  updatePatient,
  deletePatient,
  getAllPatient,
} from '../controllers/Patients';

const router = express.Router();

router.route('/getAll').get(getAllPatient);
router.route('/addNew').post(addNewPatient);
router.route('/update/:id').patch(updatePatient);
router.route('/delete/:id').delete(deletePatient);

export default router;
