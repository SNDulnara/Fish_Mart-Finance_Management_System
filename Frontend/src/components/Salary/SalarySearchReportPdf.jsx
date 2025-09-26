import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#0369a1",
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0369a1",
  },
  companyDetails: {
    fontSize: 10,
    color: "#4b5563",
    marginTop: 4,
  },
  documentTitle: {
    fontSize: 12,
    backgroundColor: "#0369a1",
    color: "white",
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 4,
    marginTop: 8,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f1f5f9",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
  },
  nameCell: {
    width: "20%",
  },
  roleCell: {
    width: "15%",
  },
  salaryCell: {
    width: "15%",
    textAlign: "right",
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#94a3b8",
  },
});

const SalarySearchReportPdf = ({ searchResults, searchQuery }) => {
  // Calculate summary statistics
  const totalRecords = searchResults.length;
  const totalSalary = searchResults.reduce((sum, record) => sum + parseFloat(record.netSalary), 0);
  const averageSalary = totalRecords > 0 ? totalSalary / totalRecords : 0;

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs. ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>Fish Mart</Text>
            <Text style={styles.companyDetails}>No 12, Lighthouse Street, Fort, Galle, 80000, Sri Lanka</Text>
            <Text style={styles.companyDetails}>Tel: +94 11 123 4567 | Email: info@Fishmart.lk</Text>
            <Text style={styles.documentTitle}>SALARY SEARCH REPORT</Text>
          </View>
          <View>
            <Text style={styles.companyDetails}>Date: {formatDate()}</Text>
            <Text style={styles.companyDetails}>Search Query: "{searchQuery}"</Text>
          </View>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.nameCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.roleCell]}>Role</Text>
            <Text style={[styles.tableCell, styles.salaryCell]}>Basic Salary</Text>
            <Text style={[styles.tableCell, styles.salaryCell]}>Allowance</Text>
            <Text style={[styles.tableCell, styles.salaryCell]}>Net Salary</Text>
          </View>

          {/* Table Body */}
          {searchResults.map((record, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.nameCell]}>{record.name}</Text>
              <Text style={[styles.tableCell, styles.roleCell]}>{record.role || '-'}</Text>
              <Text style={[styles.tableCell, styles.salaryCell]}>{formatCurrency(record.basicSalary)}</Text>
              <Text style={[styles.tableCell, styles.salaryCell]}>{formatCurrency(record.allowance)}</Text>
              <Text style={[styles.tableCell, styles.salaryCell]}>{formatCurrency(record.netSalary)}</Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Records Found: {totalRecords}</Text>
          <Text style={styles.summaryText}>Total Salary Amount: {formatCurrency(totalSalary)}</Text>
          <Text style={styles.summaryText}>Average Salary: {formatCurrency(averageSalary)}</Text>
        </View>

        <Text style={styles.footer}>
          This is a computer-generated report from Fish Mart Salary Management System
        </Text>
      </Page>
    </Document>
  );
};

export default SalarySearchReportPdf; 