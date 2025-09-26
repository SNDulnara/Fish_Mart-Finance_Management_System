const express = require('express');
const { 
    createSalary, 
    getAllSalaries, 
    getSalaryById, 
    updateSalary, 
    deleteSalary, 
    getAllNetSalaries 
} = require('../controllers/salary.js');

const router = express.Router();

router.post('/', createSalary);
router.get('/getallnetsalaries', getAllNetSalaries);
router.get('/', getAllSalaries);
router.get('/:_id', getSalaryById);
router.put('/:_id', updateSalary);
router.delete('/:_id', deleteSalary);

module.exports = { router };
