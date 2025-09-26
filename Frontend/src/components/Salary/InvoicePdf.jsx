import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#9bdceb", // Background color for the entire page
    padding: 20, // Added padding for better spacing
    justifyContent: "center", // Center align horizontally
    alignItems: "center", // Center align vertically
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center", // Center align text inside the section
  },
  image: {
    marginVertical: 50,
    marginHorizontal: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333", // Darker color for better readability
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666", // Slightly darker color for better readability
  },
});

const InvoicePdf = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.text}>Order ID: {order.o_id}</Text>
        <Text style={styles.text}>Select Package: {order.packagename}</Text>
        <Text style={styles.text}>Customer name: {order.customername}</Text>
        <Text style={styles.text}>Phone: {order.phone}</Text>
        <Text style={styles.text}>Email: {order.email}</Text>
        <Text style={styles.text}>Billing Address: {order.billingaddress}</Text>
      </View>
      {/* You can add images or other elements as needed */}
    </Page>
  </Document>
);

export default InvoicePdf;
