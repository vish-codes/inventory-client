import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import OfferForm from './OfferForm';
import NavBarLetters from './NavBarLetters';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 10,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 24,
  },
  companyInfo: {
    flexGrow: 1,
    textAlign: 'right',
    fontSize: 8,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  content: {
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: 'center',
    color: 'grey',
  },
});

// PDF Document component
const OfferLetterPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="../images/panorama.png" />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>PANORAMA SOFTWARE SOLUTIONS PVT LTD</Text>
          <Text>Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra,</Text>
          <Text>Sector 135, Noida - 201304, Uttar Pradesh</Text>
          <Text>Mobile: +919888887651</Text>
          <Text>Email: Hr@panoramasoftware.in</Text>
          <Text>Website: www.panoramasoftwares.com</Text>
        </View>
      </View>

      {/* Content */}
      <Text>Date: {data.letterDate}</Text>
      <Text>Dear {data.name},</Text>
      <Text style={styles.title}>Job Offer Letter</Text>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          We are pleased to offer you the position of <Text style={styles.bold}>Software Engineer</Text> with Panorama Software Solutions. 
          Your joining date will be the <Text style={styles.bold}>{data.joiningDate}</Text>, on the following terms and conditions:
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>1. Designation:</Text> Your present designation is <Text style={styles.bold}>Software Engineer</Text>. 
          We may change this designation from time to time, to reflect a change in your responsibilities.
        </Text>

        {/* Add more paragraphs here */}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector 135, Noida - 201304, Uttar Pradesh
        {'\n'}
        Classification: Confidential
      </Text>
    </Page>

    {/* Add a second page here if needed */}
  </Document>
);

export default function OfferLetterTemplate() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowForm(false);
  };

  return (
    <div className="mx-auto bg-gray-50">
      <NavBarLetters />
      <div className="max-w-7xl mx-auto">
        <div className="mt-5">
          <button
            onClick={() => setShowForm(true)}
            className="py-1 px-4 mx-24 rounded-md bg-pano-blue text-white shadow-lg font-sans hover:bg-blue-600 transition-colors"
          >
            Generate Offer Letter
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <OfferForm
                onSubmit={handleFormSubmit}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {formData && (
          <div className="bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
            <PDFViewer width="100%" height="800px">
              <OfferLetterPDF data={formData} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
