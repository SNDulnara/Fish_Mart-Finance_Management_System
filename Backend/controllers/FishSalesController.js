const FishSales = require('../models/FishSales');

const getAllFishSales = async (req, res) => {
  try {
    const { year } = req.query;
    console.log('Fetching fish sales for year:', year);
    
    if (!year) {
      return res.status(400).json({
        success: false,
        message: 'Year parameter is required'
      });
    }

    // Create start and end dates for the year
    const startDate = new Date(year, 0, 1); // January 1st of the year
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // December 31st of the year

    console.log('Date range:', startDate, 'to', endDate);

    // Get all fish sales for the year
    const fishSales = await FishSales.find({
      sale_date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    console.log('Found fish sales:', fishSales.length);

    // Calculate total fish sales
    const totalFishSales = fishSales.reduce((sum, sale) => sum + sale.sale_price, 0);

    console.log('Total fish sales:', totalFishSales);

    res.json({
      success: true,
      fishSales: totalFishSales.toFixed(2)
    });
  } catch (error) {
    console.error('Error getting sales data:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting sales data',
      error: error.message
    });
  }
};

module.exports = {
  getAllFishSales
}; 