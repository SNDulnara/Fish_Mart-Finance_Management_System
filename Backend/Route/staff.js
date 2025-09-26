const express = require('express');
const { 
    createStaff, 
    getStaffs, 
    getStaffById, 
    updateStaff, 
    deleteStaff, 
    getStaffDataByStaffId
} = require('../controllers/staff.js');

const router = express.Router();

router.post('/', createStaff);
router.get('/', getStaffs);
router.get('/staff-data/:staff_id', getStaffDataByStaffId);
router.get('/:_id', getStaffById);
router.put('/:_id', updateStaff);
router.delete('/:_id', deleteStaff);

module.exports = { router };
    
