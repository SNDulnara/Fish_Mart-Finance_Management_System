const mongoose = require('mongoose');
const ProfitAndLoss = require('./../models/ProfitAndLoss.js');
const FishSales = require('./../models/FishSales.js');

const saveProfit = async (request, response) => {
    try {
        const { year, profit } = request.body;

        if (!year || profit === undefined) {
            return response.status(400).send({
                message: 'Send all required fields: year, profit',
            });
        }

        // Check if profit for this year already exists
        const existingProfit = await ProfitAndLoss.findOne({ year });

        if (existingProfit) {
            // Update existing profit
            const updatedProfit = await ProfitAndLoss.findByIdAndUpdate(
                existingProfit._id,
                { profit },
                { new: true }
            );
            return response.status(200).send(updatedProfit);
        } else {
            // Create new profit record
            const newProfit = await ProfitAndLoss.create({
                year,
                profit
            });
            return response.status(201).send(newProfit);
        }
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

const getProfitForYear = async (request, response) => {
    try {
        const year = parseInt(request.params.year);

        if (!year || isNaN(year)) {
            return response.status(400).send({
                message: 'Valid year is required',
            });
        }

        console.log(`Fetching data for year: ${year}`);

        // Get fish sales for the year
        const fishSales = await FishSales.aggregate([
            {
                $match: {
                    sale_date: {
                        $gte: new Date(`${year}-01-01T00:00:00Z`),
                        $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
                    }
                }
            },
            {
                $project: {
                    totalPrice: { $multiply: ["$sale_price", "$quantity_kg"] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ]);

        console.log('Fish sales result:', fishSales);

        // Get stored profit record
        const profitRecord = await ProfitAndLoss.findOne({ year });
        console.log('Profit record:', profitRecord);

        // Calculate totals
        const totalSales = fishSales.length > 0 ? fishSales[0].totalSales : 0;
        const storedProfit = profitRecord ? profitRecord.profit : 0;

        return response.status(200).send({
            year,
            fishSales: totalSales,
            otherProfit: storedProfit,
            totalProfit: totalSales + storedProfit
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

module.exports = {
    saveProfit,
    getProfitForYear
}; 