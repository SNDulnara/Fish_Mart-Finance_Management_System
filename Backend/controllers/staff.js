const Staff = require('../models/staff.js');

const createStaff = async (req, res) => {
    try {
        if (!req.body.full_name || !req.body.role || !req.body.email ||
            !req.body.phone_number || !req.body.address || !req.body.salary ||
            !req.body.hire_date || !req.body.status) {
            return res.status(400).send({
                message: 'Send all required fields: full_name, role, email, phone_number, address, salary, hire_date, status',
            });
        }

        const newStaff = {
            full_name: req.body.full_name,
            role: req.body.role,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            salary: req.body.salary,
            hire_date: req.body.hire_date,
            status: req.body.status
        };

        const staff = await Staff.create(newStaff);

        return res.status(201).send(staff);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

const getStaffs = async (req, res) => {
    try {
        const staff = await Staff.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            count: staff.length,
            data: staff,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

const getStaffById = async (req, res) => {
    try {
        const { _id } = req.params;

        const staff = await Staff.findById({ _id });
        return res.status(200).json(staff)
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

const updateStaff = async (req, res) => {
    try {
        if (!req.body.full_name || !req.body.role || !req.body.email ||
            !req.body.phone_number || !req.body.address || !req.body.salary ||
            !req.body.hire_date || !req.body.status) {
            return res.status(400).send({
                message: 'Send all required fields: full_name, role, email, phone_number, address, salary, hire_date, status',
            });
        }

        const { _id } = req.params;

        const result = await Staff.findByIdAndUpdate(_id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        return res.status(200).send({ message: 'Staff member updated successfully', result });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const { _id } = req.params;

        const result = await Staff.findByIdAndDelete(_id);

        if (!result) {
            return res.status(404).json({ message: 'Staff member not found' })
        }

        return res.status(200).send({ message: 'Staff member deleted successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

const getStaffDataByStaffId = async (req, res) => {
    try {
        const { staff_id } = req.params;
        
        const staff = await Staff.findOne({ staff_id: staff_id });
        
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        
        return res.status(200).json({
            full_name: staff.full_name,
            salary: staff.salary
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createStaff,
    getStaffs,
    getStaffById,
    updateStaff,
    deleteStaff,
    getStaffDataByStaffId
};