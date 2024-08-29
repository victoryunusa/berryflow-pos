import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

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

const MyDocument = ({ qrCodeDataUrl }) => (
  <Document title="Victor" fileName="Victor">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={qrCodeDataUrl} style={styles.qrImage} />
      </View>
    </Page>
  </Document>
);

const Viewer = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState("");

  React.useEffect(() => {
    // Generate QR code data URL
    QRCode.toDataURL("https://getnelsa.com/")
      .then((url) => {
        setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between w-full bg-white p-5 text-neutral-700">
        <div>Closed Order Confirmed Order #129 NGN 5056.80</div>
        <div>Closed Order Confirmed Order #129 NGN 5056.80</div>
      </div>
      {qrCodeDataUrl && (
        <PDFDownloadLink
          document={<MyDocument qrCodeDataUrl={qrCodeDataUrl} />}
          fileName="qrcode-vic.pdf"
        >
          {({ loading }) => (loading ? "Loading..." : "Download PDF")}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default Viewer;
