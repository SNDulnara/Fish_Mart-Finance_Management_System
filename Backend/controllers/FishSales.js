const FishSales = require('./../models/FishSales.js');

const getAllFishSales = async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        //console.log(`Fetching all fish sales for year: ${year}`);

        const fishSales = await FishSales.aggregate([
            {
                // Match documents that have a sale_date between January 1st and December 31st of the provided year
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

        // Return the total sales amount for the provided year
        return res.status(200).json({
            totalSales: fishSales.length > 0 ? fishSales[0].totalSales : 0
        });
    } catch (error) {
        console.error('Error fetching all fish sales:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSales = async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching sale with ID: ${id}`);
    try {
        const fishSales = await FishSales.findById(id);
        if (!fishSales) {
            return res.status(404).json({ message: 'Fish Sale not found' });
        }
        return res.status(200).json(fishSales);
    } catch (error) {
        console.error('Error fetching fish sale by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllFishSales,
    getSales
};
