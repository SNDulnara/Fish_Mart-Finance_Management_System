import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import backgroundImage from '../../images/Salary/17.jpg';
import { FaFileDownload, FaTrash } from 'react-icons/fa';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0369a1',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  descriptionColumn: {
    flex: 2
  },
  valueColumn: {
    flex: 1,
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 10,
    color: '#4B5563'
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563'
  },
  companyInfo: {
    marginBottom: 20
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0369a1',
    textAlign: 'center'
  },
  companyDetails: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 2
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 5
  },
  inventoryListContainer: {
    marginLeft: '2rem',
    fontSize: '0.875rem',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    marginTop: '0.25rem',
    marginBottom: '0.5rem'
  },
  inventoryItem: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2
  },
  inventoryItemLast: {
    borderBottom: 'none'
  },
  inventoryItemName: {
    flex: 2
  },
  inventoryItemValue: {
    flex: 1,
    textAlign: 'right'
  },
  inventoryText: {
    fontSize: 9,
    color: '#4B5563'
  },
  inventoryValue: {
    fontSize: 9,
    color: '#4B5563',
    textAlign: 'right'
  },
  inventoryDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    marginLeft: 20,
    paddingLeft: 5
  },
  inventoryDetailText: {
    fontSize: 8,
    color: '#6B7280'
  }
});

const SOFP = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("2025");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    propertyPlantEquipment: '',
    otherCurrentAssets: '',
    debtor: '',
    cash: '',
    capital: '',
    nonCurrentLiabilities: '',
    currentLiabilities: ''
  });
  const [financialData, setFinancialData] = useState({
    inventory: 0,
    profitForYear: 0,
    basePPE: 500000,
    baseCapital: 3000000
  });

  const [errors, setErrors] = useState({
    propertyPlantEquipment: '',
    otherCurrentAssets: '',
    debtor: '',
    cash: '',
    capital: '',
    nonCurrentLiabilities: '',
    currentLiabilities: ''
  });

  // Add new state for inventory details
  const [inventoryDetails, setInventoryDetails] = useState([]);

  // Function to fetch profit data for the selected year
  const fetchProfitData = async () => {
    try {
      setLoading(true);
      
      // Fetch profit data directly from the ProfitAndLoss table
      const response = await axios.get(`http://localhost:3000/api/profitandloss/${selectedYear}`);
      
      console.log('Profit API response:', response.data);
      
      // Check if we have a profit record for this year
      if (response.data && response.data.otherProfit !== undefined) {
        setFinancialData(prevData => ({
          ...prevData,
          profitForYear: response.data.otherProfit
        }));
        setMessage({ text: 'Profit data fetched successfully', type: 'success' });
      } else {
        // If no profit data found, set to 0
        setFinancialData(prevData => ({
          ...prevData,
          profitForYear: 0
        }));
        setMessage({ text: 'No profit data found for this year', type: 'info' });
      }
    } catch (error) {
      console.error('Error fetching profit data:', error);
      setMessage({ text: 'Error fetching profit data', type: 'error' });
      // Set profit to 0 in case of error
      setFinancialData(prevData => ({
        ...prevData,
        profitForYear: 0
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfitData();
  }, [selectedYear]);

  useEffect(() => {
    const fetchInventoryValue = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/inventory/total-value');
        if (response.data.success && selectedYear === "2025") {
          setFinancialData(prev => ({
            ...prev,
            inventory: response.data.totalValue
          }));
          setInventoryDetails(response.data.items);
        } else {
          setFinancialData(prev => ({
            ...prev,
            inventory: 0
          }));
          setInventoryDetails([]);
        }
      } catch (error) {
        console.error('Error fetching inventory value:', error);
        setFinancialData(prev => ({
          ...prev,
          inventory: 0
        }));
        setInventoryDetails([]);
      }
    };

    fetchInventoryValue();
  }, [selectedYear]);

  const validateInput = (value, field) => {
    if (value === "") return "";
    if (isNaN(value)) return "Please enter a valid number";
    if (parseFloat(value) < 0) return "Value cannot be negative";
    if (parseFloat(value) > 99999999) return "Value cannot exceed 7 digits";
    return "";
  };

  const handleInputChange = (e, setter, field) => {
    const value = e.target.value;
    const error = validateInput(value, field);
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    if (!error) {
      setter(value);
    }
  };

  const clearForm = () => {
    setFormData({
      propertyPlantEquipment: '',
      otherCurrentAssets: '',
      debtor: '',
      cash: '',
      capital: '',
      nonCurrentLiabilities: '',
      currentLiabilities: ''
    });
    setErrors({
      propertyPlantEquipment: '',
      otherCurrentAssets: '',
      debtor: '',
      cash: '',
      capital: '',
      nonCurrentLiabilities: '',
      currentLiabilities: ''
    });
    setMessage({ text: 'Form cleared successfully', type: 'success' });
  };

  // Calculate totals
  const totalCurrentAssets = 
    parseFloat(formData.cash || 0) + 
    parseFloat(formData.debtor || 0) + 
    parseFloat(formData.otherCurrentAssets || 0) + 
    financialData.inventory;
  
  const totalPPE = financialData.basePPE + parseFloat(formData.propertyPlantEquipment || 0);
  const totalNonCurrentAssets = totalPPE;
  
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalLiabilities = 
    parseFloat(formData.currentLiabilities || 0) + 
    parseFloat(formData.nonCurrentLiabilities || 0);
  
  const capital = parseFloat(formData.capital || 0) + financialData.baseCapital;
  const totalEquityAndLiabilities = capital + financialData.profitForYear + totalLiabilities;

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.companyInfo}>
          <Text style={styles.header}>Statement of Financial Position</Text>
          <Text style={styles.text}>As at 31 December {selectedYear}</Text>
          <Text style={styles.text}>Unit LKR (Rs.)</Text>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.companyName}>Fish Mart</Text>
          <Text style={styles.companyDetails}>
            No. 12, Lighthouse Street, Fort, Galle, 80000, Sri Lanka
          </Text>
          <Text style={styles.companyDetails}>
            Tel: +94 113 123 4567 | Email: info@Fishmart.lk
          </Text>
          <View style={styles.horizontalLine}></View>
        </View>

        {/* Non current assets Section - Moved to top */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Non Current Assets</Text>
          <View style={styles.horizontalLine}></View>
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Property, Plant and Equipment</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{totalPPE.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.boldText}>Total Non Current Assets</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.boldText}>{totalNonCurrentAssets.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Current assets Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Current Assets</Text>
          <View style={styles.horizontalLine}></View>
          
          {/* Main Inventory heading */}
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Inventory</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{financialData.inventory.toFixed(2)}</Text>
            </View>
          </View>
          
          {/* Inventory breakdown - without duplicate total */}
          {selectedYear === "2025" && inventoryDetails.map((item, index) => (
            <View key={index} style={styles.inventoryDetailRow}>
              <View style={styles.descriptionColumn}>
                <Text style={styles.inventoryDetailText}>
                  • {item.name} ({item.physical_stock} units × Rs.{item.unit_price.toFixed(2)})
                </Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={styles.inventoryDetailText}>
                  Rs. {(item.physical_stock * item.unit_price).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          <View style={{ marginVertical: 3 }} />

          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Debtor</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{(parseFloat(formData.debtor) || 0).toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Other Current Assets</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{(parseFloat(formData.otherCurrentAssets) || 0).toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Cash</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{(parseFloat(formData.cash) || 0).toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.boldText}>Total Current Assets</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.boldText}>{totalCurrentAssets.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalRow}>
          <View style={styles.descriptionColumn}>
            <Text style={styles.boldText}>Total Assets</Text>
          </View>
          <View style={styles.valueColumn}>
            <Text style={styles.boldText}>{totalAssets.toFixed(2)}</Text>
          </View>
        </View>

        {/* Equity section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Equity</Text>
          <View style={styles.horizontalLine}></View>
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Capital</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{capital.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Profit for the Year</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{financialData.profitForYear.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.boldText}>Total Equity</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.boldText}>{(capital + financialData.profitForYear).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Liabilities section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Liabilities</Text>
          <View style={styles.horizontalLine}></View>
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Non Current Liabilities</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{(parseFloat(formData.nonCurrentLiabilities) || 0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.text}>Current Liabilities</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.text}>{(parseFloat(formData.currentLiabilities) || 0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <View style={styles.descriptionColumn}>
              <Text style={styles.boldText}>Total Liabilities</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.boldText}>{totalLiabilities.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalRow}>
          <View style={styles.descriptionColumn}>
            <Text style={styles.boldText}>Total Equity and Liabilities</Text>
          </View>
          <View style={styles.valueColumn}>
            <Text style={styles.boldText}>{totalEquityAndLiabilities.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleGeneratePDF = async () => {
    try {
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SOFP_${selectedYear}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessage({ text: 'Error generating PDF. Please try again.', type: 'error' });
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex justify-center py-4 gap-4"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {message.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full flex-1">
        <h1 className="text-2xl font-bold text-sky-600">Financial Settings</h1>

        <p className="text-gray-600 text-sm mt-6">Select Year</p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        {loading && (
          <div className="text-center py-2">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-sky-600"></div>
            <p className="text-gray-600 text-sm mt-2">Loading profit data...</p>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Current Profit for {selectedYear}</h2>
          <p className="text-2xl font-bold text-sky-600 mt-2">
            ${financialData.profitForYear.toFixed(2)}
          </p>
        </div>

        <p className="text-gray-600 text-sm mt-6">Property, Plant and Equipment</p>
        {errors.propertyPlantEquipment && (
          <p className="text-red-500 text-sm mt-2">{errors.propertyPlantEquipment}</p>
        )}
        <input
          type="text"
          value={formData.propertyPlantEquipment}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, propertyPlantEquipment: value })), "propertyPlantEquipment")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
          placeholder={`Base: ${financialData.basePPE.toLocaleString()}`}
        />

        <p className="text-gray-600 text-sm mt-6">Other Current Assets</p>
        {errors.otherCurrentAssets && (
          <p className="text-red-500 text-sm mt-2">{errors.otherCurrentAssets}</p>
        )}
        <input
          type="text"
          value={formData.otherCurrentAssets}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, otherCurrentAssets: value })), "otherCurrentAssets")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Debtor</p>
        {errors.debtor && (
          <p className="text-red-500 text-sm mt-2">{errors.debtor}</p>
        )}
        <input
          type="text"
          value={formData.debtor}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, debtor: value })), "debtor")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Cash</p>
        {errors.cash && (
          <p className="text-red-500 text-sm mt-2">{errors.cash}</p>
        )}
        <input
          type="text"
          value={formData.cash}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, cash: value })), "cash")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Capital</p>
        {errors.capital && (
          <p className="text-red-500 text-sm mt-2">{errors.capital}</p>
        )}
        <input
          type="text"
          value={formData.capital}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, capital: value })), "capital")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
          placeholder={`Base: ${financialData.baseCapital.toLocaleString()}`}
        />

        <p className="text-gray-600 text-sm mt-6">Non-Current Liabilities</p>
        {errors.nonCurrentLiabilities && (
          <p className="text-red-500 text-sm mt-2">{errors.nonCurrentLiabilities}</p>
        )}
        <input
          type="text"
          value={formData.nonCurrentLiabilities}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, nonCurrentLiabilities: value })), "nonCurrentLiabilities")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Current Liabilities</p>
        {errors.currentLiabilities && (
          <p className="text-red-500 text-sm mt-2">{errors.currentLiabilities}</p>
        )}
        <input
          type="text"
          value={formData.currentLiabilities}
          onChange={(e) => handleInputChange(e, (value) => setFormData(prev => ({ ...prev, currentLiabilities: value })), "currentLiabilities")}
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={clearForm}
            className="bg-red-600 text-white font-semibold rounded-md p-2 w-full cursor-pointer z-10 flex items-center justify-center"
          >
            <FaTrash className="mr-2" />
            Clear Form
          </button>
          <button
            onClick={handleGeneratePDF}
            className="bg-sky-600 text-white font-semibold rounded-md p-2 w-full cursor-pointer z-10 flex items-center justify-center"
          >
            <FaFileDownload className="mr-2" />
            Generate PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex-3">
        <div className="text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-[2.6rem] font-extrabold text-sky-600 mb-4">
            Statement of Financial Position
          </h1>
          <div>
            <p className="text-gray-800 font-medium">
              As at 31 December {selectedYear}
            </p>
            <p className="text-gray-800 font-medium">Unit LKR(Rs.)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-[32px] font-bold text-sky-600">Fish Mart</p>
            <p className="text-gray-900">
              No. 12, Lighthouse Street, Fort, Galle, 80000, Sri Lanka
            </p>
            <p className="text-gray-900">
              Tel: +94 113 123 4567 | Email: info@Fishmart.lk
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Assets
          </h2>
          
          <div className="mt-4">
            <div className="flex justify-between text-gray-800 font-bold">
              <p>NON-CURRENT ASSETS</p>
              <span>{(financialData.basePPE + parseFloat(formData.propertyPlantEquipment || 0)).toFixed(2)}</span>
            </div>
            <div className="ml-4">
              <div className="flex justify-between text-gray-800">
                <p>Property, Plant and Equipment</p>
                <span>{(financialData.basePPE + parseFloat(formData.propertyPlantEquipment || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-gray-800 font-bold">
              <p>CURRENT ASSETS</p>
              <span>{(parseFloat(formData.cash || 0) + parseFloat(formData.debtor || 0) + parseFloat(formData.otherCurrentAssets || 0) + financialData.inventory).toFixed(2)}</span>
            </div>
            <div className="ml-4">
              <div className="flex justify-between text-gray-800">
                <div>
                  <p>Inventory</p>
                  {selectedYear === "2025" && inventoryDetails.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                        {item.name} ({item.physical_stock} units × Rs.{item.unit_price.toFixed(2)})
                      </span>
                      <span>
                        Rs. {(item.physical_stock * item.unit_price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Other Current Assets</p>
                <span>{(parseFloat(formData.otherCurrentAssets) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Debtor</p>
                <span>{(parseFloat(formData.debtor) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Cash</p>
                <span>{(parseFloat(formData.cash) || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-300 pt-2">
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total Assets</p>
              <span>{(parseFloat(formData.cash || 0) + parseFloat(formData.debtor || 0) + parseFloat(formData.otherCurrentAssets || 0) + financialData.inventory + financialData.basePPE + parseFloat(formData.propertyPlantEquipment || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Equity and Liabilities
          </h2>
          
          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Capital</p>
              <span>{capital.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Profit for the Year</p>
              <span>{financialData.profitForYear.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-bold mt-2">
              <p>Total Equity</p>
              <span>{(capital + financialData.profitForYear).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Non-Current Liabilities</p>
              <span>{(parseFloat(formData.nonCurrentLiabilities) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Current Liabilities</p>
              <span>{(parseFloat(formData.currentLiabilities) || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-300 pt-2">
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total Equity and Liabilities</p>
              <span>{(capital + financialData.profitForYear + parseFloat(formData.nonCurrentLiabilities || 0) + parseFloat(formData.currentLiabilities || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOFP; 