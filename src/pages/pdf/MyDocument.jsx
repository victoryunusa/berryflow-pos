import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "react-qr-code";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  qrImage: {
    width: "100%",
    height: "100%",
  },
});

const url = `https://getnelsa.com/`;

// Create Document Component
const MyDocument = () => (
  <Document title="Victor" fileName="Victor">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}></View>
      <View style={styles.section}>
        <Image allowDangerousPaths src={url} style={styles.qrImage} />
      </View>
    </Page>
  </Document>
);

export default MyDocument;
