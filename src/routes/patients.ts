import express from 'express';
import patientsService from '../services/patients';
import { parseString, toEntries, toNewPatient, toPatientId } from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
    const data = patientsService.getPatients();
    if (!data) {
        res.status(404).send('Patients not found');
    }
    res.json(data);
});

router.get('/:id', (req, res) => {

    const id = toPatientId(req.params.id);
    const patient = patientsService.getById(id);
    if (!patient) {
        res.status(404).send('Patient not found');
    }
    res.json(patient);
});


router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);


});
router.post('/entry/:id', (req, res) => {
    
        const id = parseString(req.params.id);
        const newEntry = toEntries(req.body);
        const addedEntry = patientsService.addEntryById(id, newEntry);
        res.json(addedEntry);
  
});

export default router;