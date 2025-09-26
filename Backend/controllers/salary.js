const Salary = require('../models/salary.js');
const Staff = require('../models/staff.js');
const express = require('express');

const router = express.Router();

function Calculation(basicSalary, hours, days, manualAllowance = null, role = '') {
    let data = {
        tax: 0,
        epf: 0,
        etf: 0,
        allowance: 0,
        overtime: 0, // New field for overtime
        netSalary: 0
    };


    
    // Convert to numbers for calculation
    basicSalary = parseFloat(basicSalary);
    
    // Handle optional parameters - if not provided, treat them as undefined
    hours = hours ? parseFloat(hours) : undefined;
    days = days ? parseFloat(days) : undefined;
    
    // Standard full-time hours per month (assuming 160 hours)
    const standardHours = 160;
    // Standard working days per month (assuming 20 days)
    const standardDays = 20;
    
    // Set allowance - either use manual value or calculate it
    if (manualAllowance !== null && manualAllowance !== '') {
        data.allowance = parseFloat(manualAllowance);
    } else if (basicSalary > 0 && hours && hours >= standardHours && days && days >= standardDays) {
        data.allowance = basicSalary * 3 / 100.0;
    } else {
        data.allowance = 0;
    }

   
    // Calculate Overtime based on role
    if (role && basicSalary > 0) {
       
        if (role === 'Security') {
            // OT calculation for Security role
            data.overtime = (basicSalary / (12 * 30)) * hours * 2;
        } else if (role === 'Fisherman' || role === 'Store Keeper') {
           
            // OT calculation for Fisherman and Store Keeper roles
            if (days) {
              
                data.overtime = (basicSalary / (15.0)) * days * 2;
            }
        } else if (role !== '') {
            // OT calculation for all other roles
            data.overtime = (basicSalary / (8 * 20)) * hours * 2;
        }
    }
    


    // Calculate EPF, ETF and net salary based on available information
    if (basicSalary > 0) {
        if (hours && hours >= standardHours) {
            // Full time
            data.epf = basicSalary * 8 / 100.0;
            data.etf = basicSalary * 3 / 100.0;
            
            data.netSalary = (basicSalary + data.allowance + data.overtime - data.epf - data.etf);
        } else if (hours) {
            // Part time with specified hours
            const hoursRatio = hours / standardHours;
            
            // Pro-rate based on days also if available
            let proRateRatio = hoursRatio;
            if (days) {
                const daysRatio = Math.min(days / standardDays, 1); // Max 1 (100%)
                proRateRatio = Math.min(daysRatio, hoursRatio);
            }
            
            const proRatedSalary = basicSalary * proRateRatio;
            
            data.epf = proRatedSalary * 8 / 100.0;
            data.etf = proRatedSalary * 3 / 100.0;
            
            data.netSalary = (proRatedSalary + data.allowance + data.overtime - data.epf - data.etf);
        } else {
            // No hours specified, use basic salary directly
            data.epf = basicSalary * 8 / 100.0;
            data.etf = basicSalary * 3 / 100.0;
            
            data.netSalary = (basicSalary + data.allowance + data.overtime - data.epf - data.etf);
        }
    }
    
    // Convert values to strings with 2 decimal places
    Object.keys(data).forEach(key => {
        data[key] = data[key].toFixed(2);
    });
    
    return data;
}

const createSalary = async (request, response) => {
    try {
        if (!request.body.staff_id || !request.body.name || !request.body.basicSalary) {
            return response.status(400).send({
                message: 'Send all required fields: staff_id, name, basicSalary',
            });
        }

        // Format staff_id to ensure it's in the correct format
        const staffId = String(request.body.staff_id).toUpperCase();
        if (!/^S-\d{4}$/.test(staffId)) {
            return response.status(400).send({
                message: 'Staff ID must be in format S-XXXX (e.g., S-1234)',
            });
        }

        // First, get the staff role from the staff collection
        const staffMember = await Staff.findOne({ staff_id: staffId });
        const staffRole = staffMember ? staffMember.role : '';
        
        const newSalary = {
            staff_id: staffId,
            name: request.body.name,
            basicSalary: request.body.basicSalary,
            role: staffRole
        };
        
        // Only include optional fields if they are provided
        if (request.body.hours) newSalary.hours = request.body.hours;
        if (request.body.days) newSalary.days = request.body.days;
        if (request.body.allowance) newSalary.allowance = request.body.allowance;

        // Calculate salary details with role for OT calculation
        const calculatedSalary = Calculation(
            request.body.basicSalary,
            request.body.hours,
            request.body.days,
            request.body.allowance,
            staffRole
        );

        // Populate the new salary object with calculated values
        newSalary.epf = calculatedSalary.epf;
        newSalary.etf = calculatedSalary.etf;
        newSalary.tax = calculatedSalary.tax;
        newSalary.overtime = calculatedSalary.overtime; // Add overtime field
        
        // Only use calculated allowance if no manual allowance was provided
        if (!request.body.allowance || request.body.allowance === '') {
            newSalary.allowance = calculatedSalary.allowance;
        }
        
        newSalary.netSalary = calculatedSalary.netSalary;

        // Create a new Salary entry in the database
        const salary = await Salary.create(newSalary);

        return response.status(201).send(salary);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

const getAllSalaries = async (request, response) => {
    try {
        const salary = await Salary.find({})
            .sort({ createdAt: -1 })
            .lean();

        const formattedSalaries = salary.map(record => ({
            ...record,
            staff_id: String(record.staff_id)
        }));

        return response.status(200).json({
            count: formattedSalaries.length,
            data: formattedSalaries,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

const getSalaryById = async (request, response) => {
    try {
        const { _id } = request.params;
        const salary = await Salary.findById(_id);
        return response.status(200).json(salary);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

const updateSalary = async (request, response) => {
    try {
        if (!request.body.name || !request.body.basicSalary) {
            return response.status(400).send({
                message: 'Send all required fields: name, basicSalary',
            });
        }

        const { _id } = request.params;
        
        // Get the salary record to find the staff_id and role
        const currentSalary = await Salary.findById(_id);
        if (!currentSalary) {
            return response.status(404).json({ message: 'Salary not found' });
        }

        // Get the staff role if not already stored in the salary record
        let staffRole = currentSalary.role;
        if (!staffRole && currentSalary.staff_id) {
            const staffMember = await Staff.findOne({ staff_id: currentSalary.staff_id });
            staffRole = staffMember ? staffMember.role : '';
        }

        const newSalary = {
            name: request.body.name,
            basicSalary: request.body.basicSalary,
            role: staffRole // Make sure role is preserved
        };

        // Only include optional fields if they are provided
        if (request.body.hours) newSalary.hours = request.body.hours;
        if (request.body.days) newSalary.days = request.body.days;
        if (request.body.allowance) newSalary.allowance = request.body.allowance;

        // Calculate salary details with role for OT calculation
        const calculatedSalary = Calculation(
            request.body.basicSalary,
            request.body.hours,
            request.body.days,
            request.body.allowance,
            staffRole
        );

        // Populate the new salary object with calculated values
        newSalary.epf = calculatedSalary.epf;
        newSalary.etf = calculatedSalary.etf;
        newSalary.tax = calculatedSalary.tax;
        newSalary.overtime = calculatedSalary.overtime; // Add overtime field
        
        // Only use calculated allowance if no manual allowance was provided
        if (!request.body.allowance || request.body.allowance === '') {
            newSalary.allowance = calculatedSalary.allowance;
        }
        
        newSalary.netSalary = calculatedSalary.netSalary;

        const result = await Salary.findByIdAndUpdate(_id, newSalary, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Salary not found' });
        }

        return response.status(200).send({ message: 'Salary updated successfully', result });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
};

const deleteSalary = async (request, response) => {
    try {
        const { _id } = request.params;
        const result = await Salary.findByIdAndDelete(_id);

        if (!result) {
            return response.status(404).json({ message: 'Salary record not found' });
        }

        return response.status(200).send({ message: 'Salary deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

const getAllNetSalaries = async (req, res) => {
    let { year } = req.query;

    // If year is not provided or invalid, use the current year
    if (!year || isNaN(year)) {
        year = new Date().getFullYear();
    }

    try {
        // Aggregate query to get all net salaries for the given year
        const salaries = await Salary.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00Z`),
                        $lt: new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`),
                    },
                },
            },
            {
                $group: {
                    _id: null, 
                    totalNetSalary: { $sum: { $toDouble: "$netSalary" } },
                },
            },
        ]);

        // Return the net salaries for the requested year
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

module.exports = {
    createSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
    getAllNetSalaries
};
