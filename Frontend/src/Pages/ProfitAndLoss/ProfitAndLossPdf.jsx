import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts - using a more reliable approach
// Using standard fonts that are built into the PDF renderer
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

// Helper function to safely parse numbers
const safeParseFloat = (value) => {
  if (value === undefined || value === null) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Helper function to safely format numbers
const formatNumber = (value) => {
  try {
    return safeParseFloat(value).toFixed(2);
  } catch (error) {
    console.error("Error formatting number:", error);
    return "0.00";
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0284c7",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  companyInfo: {
    marginTop: 20,
    marginBottom: 30,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0284c7",
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    marginBottom: 3,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 12,
    fontWeight: "bold",
  },
});

const ProfitAndLossPdf = ({
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
  incomeTaxPercentage,
}) => {
  try {
    // Safely parse all numeric values
    const parsedFishSales = safeParseFloat(fishSales);
    const parsedCostOfSales = safeParseFloat(costOfSales);
    const parsedOtherIncome = safeParseFloat(otherIncome);
    const parsedAdminExpenses = safeParseFloat(adminExpenses);
    const parsedFleetMaintenanceCost = safeParseFloat(fleetMaintenanceCost);
    const parsedOtherExpenses = safeParseFloat(otherExpenses);
    const parsedProfitBeforeTax = safeParseFloat(profitBeforeTax);
    const parsedIncomeTax = safeParseFloat(incomeTax);
    const parsedNetProfit = safeParseFloat(netProfit);
    const parsedIncomeTaxPercentage = safeParseFloat(incomeTaxPercentage);
    
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Profit and Loss Statement</Text>
            <Text style={styles.subtitle}>
              For the year Ended 31 December {selectedYear || "N/A"}
            </Text>
            <Text style={styles.subtitle}>Unit LKR(Rs.)</Text>
          </View>

          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Fish Mart</Text>
            <Text style={styles.companyDetails}>
              No. 12, Lighthouse Street, Fort, Galle, 80000, Sri Lanka
            </Text>
            <Text style={styles.companyDetails}>
              Tel: +94 113 123 4567 | Email: info@Fishmart.lk
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sales</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Fish Sales</Text>
              <Text style={styles.value}>Rs. {formatNumber(parsedFishSales)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cost Of Sales</Text>
              <Text style={styles.value}>{formatNumber(parsedCostOfSales)}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.label}>Gross Profit</Text>
              <Text style={styles.value}>
                {formatNumber(parsedFishSales - parsedCostOfSales)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income & Expenses</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Other Income</Text>
              <Text style={styles.value}>
                {formatNumber(parsedOtherIncome)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Administration Expenses</Text>
              <Text style={styles.value}>
                {formatNumber(parsedAdminExpenses)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fleet Maintenance Expenses</Text>
              <Text style={styles.value}>
                {formatNumber(parsedFleetMaintenanceCost)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Other Expenses</Text>
              <Text style={styles.value}>
                {formatNumber(parsedOtherExpenses)}
              </Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.label}>Profit Before Tax</Text>
              <Text style={styles.value}>{formatNumber(parsedProfitBeforeTax)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income Tax</Text>
            <View style={styles.row}>
              <Text style={styles.label}>
                Income Tax ({formatNumber(parsedIncomeTaxPercentage)}%)
              </Text>
              <Text style={styles.value}>{formatNumber(parsedIncomeTax)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profit Of The Year</Text>
            <View style={[styles.total, { fontWeight: 'normal' }]}>
              <Text style={styles.label}>Profit Of The Year</Text>
              <Text style={styles.value}>{formatNumber(parsedNetProfit)}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  } catch (error) {
    console.error("Error rendering PDF:", error);
    // Return a simple error document
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Error Generating PDF</Text>
            <Text style={styles.subtitle}>
              There was an error generating the Profit and Loss Statement.
            </Text>
            <Text style={styles.subtitle}>
              Please try again or contact support.
            </Text>
          </View>
        </Page>
      </Document>
    );
  }
};

export default ProfitAndLossPdf;
