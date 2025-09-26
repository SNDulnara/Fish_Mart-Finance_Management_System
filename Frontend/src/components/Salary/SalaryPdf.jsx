import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

// Create modern styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 30,
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
  employeeSection: {
    marginBottom: 20,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 4,
  },
  employeeInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    flex: 1,
  },
  employeeId: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
    textAlign: "right",
  },
  employeeRole: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
    fontStyle: "italic",
  },
  salaryDetailsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
    backgroundColor: "#e2e8f0",
    padding: 8,
    borderRadius: 4,
  },
  salaryBreakdown: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    marginTop: 10,
  },
  salaryRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    padding: 8,
  },
  lastRow: {
    flexDirection: "row",
    padding: 8,
  },
  highlightedRow: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    padding: 8,
    fontWeight: "bold",
  },
  label: {
    flex: 2,
    fontSize: 11,
    color: "#475569",
  },
  value: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
    color: "#0f172a",
  },
  highlightedValue: {
    flex: 1,
    fontSize: 12,
    textAlign: "right",
    color: "#0369a1",
    fontWeight: "bold",
  },
  netSalarySection: {
    marginTop: 15,
    backgroundColor: "#0ea5e9",
    borderRadius: 4,
    padding: 10,
    flexDirection: "row",
  },
  netSalaryLabel: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  netSalaryValue: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
  },
  disclaimer: {
    marginTop: 5,
    fontSize: 8,
    color: "#94a3b8",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 8,
    color: "#94a3b8",
  },
});

const SalaryPdf = ({ salary }) => {
  // Format a date string as DD Month YYYY
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
            <Text style={styles.documentTitle}>SALARY STATEMENT</Text>
          </View>
          <View>
            <Text style={styles.companyDetails}>Date: {formatDate()}</Text>
            <Text style={styles.companyDetails}>Ref: SLR/{salary.s_id}</Text>
          </View>
        </View>

        {/* Employee Information */}
        <View style={styles.employeeSection}>
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>{salary.name}</Text>
            <Text style={styles.employeeId}>Staff ID: {salary.staff_id}</Text>
          </View>
          <Text style={styles.employeeRole}>{salary.role || 'Staff Member'}</Text>
          <Text style={styles.companyDetails}>Payment Period: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        </View>

        {/* Salary Details */}
        <Text style={styles.salaryDetailsTitle}>Salary Details</Text>
        
        <View style={styles.salaryBreakdown}>
          {/* Earnings */}
          <View style={styles.highlightedRow}>
            <Text style={styles.label}>EARNINGS</Text>
            <Text style={styles.value}>AMOUNT (Rs.)</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>Basic Salary</Text>
            <Text style={styles.value}>{parseFloat(salary.basicSalary).toLocaleString('en-US')}</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>Allowance</Text>
            <Text style={styles.value}>{parseFloat(salary.allowance).toLocaleString('en-US')}</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>Overtime</Text>
            <Text style={styles.value}>{parseFloat(salary.overtime || 0).toLocaleString('en-US')}</Text>
          </View>
          
          {/* Deductions */}
          <View style={styles.highlightedRow}>
            <Text style={styles.label}>DEDUCTIONS</Text>
            <Text style={styles.value}>AMOUNT (Rs.)</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>EPF</Text>
            <Text style={styles.value}>{parseFloat(salary.epf).toLocaleString('en-US')}</Text>
          </View>
          <View style={styles.lastRow}>
            <Text style={styles.label}>ETF</Text>
            <Text style={styles.value}>{parseFloat(salary.etf).toLocaleString('en-US')}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.salaryBreakdown}>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>Total Earnings</Text>
            <Text style={styles.value}>
              {(parseFloat(salary.basicSalary) + 
               parseFloat(salary.allowance) + 
               parseFloat(salary.overtime || 0)).toLocaleString('en-US')}
            </Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.label}>Total Deductions</Text>
            <Text style={styles.value}>
              {(parseFloat(salary.epf) + 
               parseFloat(salary.etf)).toLocaleString('en-US')}
            </Text>
          </View>
        </View>
        
        {/* Net Salary */}
        <View style={styles.netSalarySection}>
          <Text style={styles.netSalaryLabel}>NET SALARY</Text>
          <Text style={styles.netSalaryValue}>Rs. {parseFloat(salary.netSalary).toLocaleString('en-US')}</Text>
        </View>

        {/* Additional Information */}
        {salary.days && (
          <Text style={{...styles.companyDetails, marginTop: 15}}>
            Days Worked: {salary.days} | Hours: {salary.hours || 'N/A'}
          </Text>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is an automatically generated document and does not require a signature.</Text>
          <Text style={styles.disclaimer}>
            For any salary related inquiries, please contact the HR department at hr@oceanpearl.lk
          </Text>
        </View>

        {/* Page Number */}
        <Text style={styles.pageNumber}>Page 1 of 1</Text>
      </Page>
    </Document>
  );
};

export default SalaryPdf;
