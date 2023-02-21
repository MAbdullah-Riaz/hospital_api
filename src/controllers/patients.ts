import { response } from 'express';
import HospitalModel from '../models/hospital';

const addNewPatient = async (request, response) => {
  const patientInfo = new HospitalModel({
    ownerName: request.body.ownerName,
    petName: 'Tony',
    ownerAddress: 'New Jersy, United States ',
    ownerPhoneNo: 655231651,
    petType: 'dog',
  });
  try {
    const savedPatientInfo = await patientInfo.save();
    response.send(savedPatientInfo);
  } catch (error) {
    console.log(error.message);
  }
};

const updatePatient = async (request, response) => {
  try {
    const patients = await HospitalModel.updateOne(
      { _id: request.params.id },
      {
        ownerName: request.body.ownerName,
      }
    );
    response.send(patients);
  } catch (error) {
    console.log('Failed to Update Patient ', error);
    response.status(400);
    response.json({
      status: 400,
      success: false,
      error: 'Error while adding patient to the db',
      errorCause: error.message,
    });
  }
};

const deletePatient = async (request, response) => {
  try {
    const patients = await HospitalModel.findByIdAndRemove(request.params.id);
    response.send('Patient deleted : ', patients);
  } catch (error) {
    console.log('Failed to delete patients', error);
    response.status(400);
    response.json({
      status: 400,
      success: false,
      error: 'Error while deleting patient',
      errorCause: error.message,
    });
  }
};

const getAllPatient = async (request, response) => {
  try {
    const patients = await HospitalModel.find();
    response.send(patients);
  } catch (error) {
    console.log('failed to fetch records', error.message);
    response.status(400);
    response.json({
      status: 400,
      success: false,
      error: 'Error while fetching records',
      errorCause: error.message,
    });
  }
};

export { addNewPatient, updatePatient, deletePatient, getAllPatient };
