import React, { useEffect, useState } from "react";
import ProfitAndLossPdf from "./ProfitAndLossPdf";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import backgroundImage from "../../images/Salary/17.jpg";
import axios from "axios";
import { FaFileDownload, FaSave } from "react-icons/fa";
import ProfitLossChart from "./ProfitLossChart";

const ProfitAndLoss = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [fishSales, setFishSales] = useState("0.0");
  const [fleetMaintenanceCost, setFleetMaintenanceCost] = useState("0.0");
  const [otherIncome, setOtherIncome] = useState("");
  const [adminExpenses, setAdminExpenses] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [incomeTaxPercentage, setIncomeTaxPercentage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    otherIncome: "",
    adminExpenses: "",
    otherExpenses: "",
    incomeTaxPercentage: "",
  });

  const costOfSales = "0.0";

  // Function to safely convert string to float and handle errors
  const parseToFloat = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0.0 : parsedValue;
  };

  // Calculating gross profit
  const grossProfit = parseToFloat(fishSales) - parseToFloat(costOfSales);
  // Calculating Profit Before Tax
  const profitBeforeTax =
    grossProfit +
    parseToFloat(otherIncome || "0.0") -
    parseToFloat(adminExpenses || "0.0") -
    parseToFloat(fleetMaintenanceCost || "0.0") -
    parseToFloat(otherExpenses || "0.0");
  // Calculating Income Tax
  const incomeTax =
    (parseToFloat(incomeTaxPercentage || "0.0") / 100) * profitBeforeTax;
  const netProfit = profitBeforeTax - incomeTax;

  const handleSaveProfit = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/api/profitandloss', {
        year: selectedYear,
        profit: netProfit
      });
      alert('Profit saved successfully!');
    } catch (error) {
      console.error('Error saving profit:', error);
      alert('Failed to save profit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/api/fishsales/getallfishsales?year=${selectedYear}`
      )
      .then((response) => {
        console.log('Sales response:', response.data);
        if (response.data.success) {
          setFishSales(response.data.fishSales || "0.00");
        } else {
          console.error('Error in sales response:', response.data.message);
          setFishSales("0.00");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
        setFishSales("0.00");
        setLoading(false);
      });
  }, [selectedYear]);

  // Fetch fleet maintenance cost
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/api/fleetmaintenance/total-cost?year=${selectedYear}`
      )
      .then((response) => {
        console.log('Fleet maintenance response:', response.data);
        if (response.data.success) {
          setFleetMaintenanceCost(response.data.totalCost || "0.00");
        } else {
          console.error('Error in fleet maintenance response:', response.data.message);
          setFleetMaintenanceCost("0.00");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching fleet maintenance data:', error);
        setFleetMaintenanceCost("0.00");
        setLoading(false);
      });
  }, [selectedYear]);

  const handleInputChange = (e, setter, field) => {
    const value = e.target.value;

    // Check if the value can be converted to a valid number
    if (value === "" || !isNaN(value)) {
      // Check for 7-digit limit
      if (value !== "" && parseFloat(value) > 99999999) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Value cannot exceed 7 digits",
        }));
        return;
      }
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
      setter(value);
    } else {
      // If not a valid number, show error
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Please enter a valid number",
      }));
    }
  };

  const handleGeneratePDFFallback = async () => {
    try {
      setLoading(true);
      console.log("Starting PDF generation with data:", {
        fishSales,
        costOfSales,
        otherIncome,
        adminExpenses,
        fleetMaintenanceCost,
        otherExpenses,
        profitBeforeTax,
        incomeTax,
        netProfit,
        selectedYear,
        incomeTaxPercentage
      });
      
      // Create a simplified version of the PDF document
      const doc = (
        <ProfitAndLossPdf
          fishSales={fishSales}
          costOfSales={costOfSales}
          otherIncome={otherIncome}
          adminExpenses={adminExpenses}
          fleetMaintenanceCost={fleetMaintenanceCost}
          otherExpenses={otherExpenses}
          profitBeforeTax={profitBeforeTax}
          incomeTax={incomeTax}
          netProfit={netProfit}
          selectedYear={selectedYear}
          incomeTaxPercentage={incomeTaxPercentage}
        />
      );
      
      console.log("PDF document created, generating blob...");
      const blob = await pdf(doc).toBlob();
      console.log("PDF blob generated, size:", blob.size);
      
      const url = URL.createObjectURL(blob);
      console.log("URL created:", url);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ProfitAndLoss-${selectedYear}.pdf`;
      document.body.appendChild(link);
      console.log("Link element created and appended to body");
      
      link.click();
      console.log("Link clicked, download should start");
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log("Cleanup completed");
      }, 100);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Provide more specific error messages based on the error type
      let errorMessage = 'Failed to generate PDF. Please try again.';
      
      if (error.message && error.message.includes('font')) {
        errorMessage = 'Font error: The PDF generator is having trouble with fonts. Please try again or contact support.';
      } else if (error.message && error.message.includes('Unknown')) {
        errorMessage = 'Unknown error: There was an unexpected error generating the PDF. Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
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

        <p className="text-gray-600 text-sm mt-6">Other Income</p>
        {errors.otherIncome && (
          <p className="text-red-500 text-sm mt-2">{errors.otherIncome}</p>
        )}
        <input
          type="text"
          value={otherIncome}
          onChange={(e) =>
            handleInputChange(e, setOtherIncome, "otherIncome")
          }
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Administration Expenses</p>
        {errors.adminExpenses && (
          <p className="text-red-500 text-sm mt-2">{errors.adminExpenses}</p>
        )}
        <input
          type="text"
          value={adminExpenses}
          onChange={(e) =>
            handleInputChange(e, setAdminExpenses, "adminExpenses")
          }
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Other Expenses</p>
        {errors.otherExpenses && (
          <p className="text-red-500 text-sm mt-2">{errors.otherExpenses}</p>
        )}
        <input
          type="text"
          value={otherExpenses}
          onChange={(e) =>
            handleInputChange(e, setOtherExpenses, "otherExpenses")
          }
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />

        <p className="text-gray-600 text-sm mt-6">Income Tax Percentage</p>
        {errors.incomeTaxPercentage && (
          <p className="text-red-500 text-sm mt-2">
            {errors.incomeTaxPercentage}
          </p>
        )}
        <input
          type="text"
          value={incomeTaxPercentage}
          onChange={(e) =>
            handleInputChange(e, setIncomeTaxPercentage, "incomeTaxPercentage")
          }
          className="p-2 border border-gray-300 rounded-md mt-4 w-full"
        />
        <div className="mt-6">
          <button
            onClick={handleGeneratePDFFallback}
            disabled={isLoading}
            className="bg-sky-600 text-white font-semibold rounded-md p-2 mt-6 w-full cursor-pointer z-10 flex items-center justify-center hover:bg-sky-700"
          >
            {isLoading ? (
              <span>Generating PDF...</span>
            ) : (
              <>
                <FaFileDownload className="mr-2" />
                Generate PDF
              </>
            )}
          </button>
          <button
            onClick={handleSaveProfit}
            disabled={isLoading}
            className="bg-green-600 text-white font-semibold rounded-md p-2 mt-4 w-full cursor-pointer z-10 flex items-center justify-center hover:bg-green-700"
          >
            <FaSave className="mr-2" />
            Save Profit
          </button>
        </div>
      </div>

      <div
        id="pdf-content"
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "12pt",
        }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex-3"
      >
        <div className="text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-[2.6rem] font-extrabold text-sky-600 mb-4">
            Profit and Loss Statement
          </h1>
          <div>
            <p className="text-gray-800 font-medium">
              For the year Ended 31 December {selectedYear}
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
            Sales
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Fish Sales</p>
              <div className="flex items-center space-x-2">
                <span>Rs. {parseToFloat(fishSales).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Cost Of Sales</p>
              <div className="flex items-center space-x-2">
                <span>{parseToFloat(costOfSales).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Gross Profit</p>
              <div className="flex items-center space-x-2">
                <span>{grossProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Income & Expenses
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Other Income</p>
              <div className="flex items-center space-x-2">
                <span>{parseToFloat(otherIncome || "0.0").toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Administration Expenses</p>
              <div className="flex items-center space-x-2">
                <span>{parseToFloat(adminExpenses || "0.0").toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Fleet Maintenance Expenses</p>
              <div className="flex items-center space-x-2">
                <span>{parseToFloat(fleetMaintenanceCost || "0.0").toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Other Expenses</p>
              <div className="flex items-center space-x-2">
                <span>{parseToFloat(otherExpenses || "0.0").toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Profit Before Tax</p>
              <div className="flex items-center space-x-2">
                <span>{profitBeforeTax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Income Tax
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Income Tax ({parseToFloat(incomeTaxPercentage || "0.0")}%)</p>
              <div className="flex items-center space-x-2">
                <span>{incomeTax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Profit Of The Year
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-gray-800">
              <p>Profit Of The Year</p>
              <div className="flex items-center space-x-2">
                <span>{netProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <ProfitLossChart />
      </div>
    </div>
  );
};

export default ProfitAndLoss;
