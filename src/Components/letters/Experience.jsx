//React Lib----------------------------------------------------------------------

import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import ExperienceForm from "./ExperienceForm";
import NavBarLetters from "./NavBarLetters";

// Register fonts
Font.register({
  family: "Helvetica",
  src: "https://fonts.cdnfonts.com/s/29136/Helvetica.woff",
});

Font.register({
  family: "Helvetica-Bold",
  src: "https://fonts.cdnfonts.com/s/29136/Helvetica-Bold.woff",
});

Font.register({
  family: "Times-Roman",
  src: "https://fonts.cdnfonts.com/s/29136/Times-Roman.woff",
});

Font.register({
  family: "Times-Bold",
  src: "https://fonts.cdnfonts.com/s/29136/Times-Bold.woff",
});

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 20,
    paddingBottom: 65,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    marginTop: 15,
  },
  logo: {
    width: 180,
    height: 40,
    position: "absolute",
  },
  companyInfo: {
    flexGrow: 1,
    textAlign: "right",
    fontSize: 8,
    fontFamily: "Times-Roman",
  },
  companyName: {
    fontSize: 12,
    fontFamily: "Times-Bold",
  },
  //Main Heading Code for ToMayWhomConcern-----
  title: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    // marginVertical: 10,
    top: 46,
    textDecoration: "underline",
    color: "#0c7089",
    marginBottom: 25,
  },
  content: {
    marginTop: 80,
    marginBottom: 10,
    marginHorizontal: 30,
    color: "#0c7089",
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
    letterSpacing: 0.2,
    fontFamily: "Times-Roman",
    fontSize: 10,
  },
  /*  subPoint: {
    marginLeft: 15, // This creates the indent for sub-points
    marginBottom: 5,
    textAlign: "justify",
    letterSpacing: 0.2,
  }, */
  bold: {
    fontFamily: "Times-Bold",
  },
  footer: {
    position: "absolute",
    fontSize: 9,
    bottom: 20,
    left: 35,
    right: 35,
    textAlign: "center",
    color: "grey",
  },
  /* Code Horizental line */
  line1: {
    height: 0.7,
    backgroundColor: "black",
    width: "100%",
    top: 8.5,
  },
  line2: {
    height: 0.7,
    backgroundColor: "black",
    width: "88.5%",
    position: "absolute",
    bottom: 50,
  },
  greetingContainer: {
    marginTop: 50,
  },
  greetingText1: {
    top: 6,
    color: "#0c7089",
  },
  greetingText2: {
    top: 6,
    color: "#0c7089",
  },
});

// PDF Document component
const Experiences = ({ data }) => {
  const pronoun = data.gender === "female" ? "her" : "his";
  const pronounSubject = data.gender === "female" ? "She" : "He";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="../images/panorama.png" />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {data.addPvtLtd
                ? "PANORAMA SOFTWARE SOLUTIONS PVT LTD"
                : "PANORAMA SOFTWARE SOLUTIONS"}
            </Text>
            <Text>
              Unit no - 621-622, 6th Floor, Tower 1, Assotech Business
              Cresterra,
            </Text>
            <Text>Sector 135, Noida - 201304, Uttar Pradesh</Text>
            <Text>Mobile: +919888887651</Text>
            <Text>Email: Hr@panoramasoftware.in</Text>
            <Text>Website: www.panoramasoftwares.com</Text>
          </View>
        </View>

        {/* divider line */}
        <View style={styles.line1} />

        {/* Content */}
        <View style={styles.greetingContainer}>
          <Text style={styles.title}>
            <Text style={styles.bold}>To Whomsoever It May Concern</Text>
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.paragraph}>
            This letter certifies that{" "}
            <Text style={styles.bold}>{data.name}</Text> was an employee in the
            role of <Text style={styles.bold}>{data.designation}</Text> with{" "}
            <Text style={styles.bold}>
              {data.addPvtLtd
                ? "PANORAMA SOFTWARE SOLUTIONS PVT LTD"
                : "PANORAMA SOFTWARE SOLUTIONS"}{" "}
            </Text>{" "}
            during the period from <Text style={styles.bold}>{data.date}</Text>{" "}
            to <Text style={styles.bold}>{data.enddate}</Text>.{" "}
          </Text>
          <Text style={styles.paragraph}>
            <Text>
              Throughout {pronoun} tenure with us,{" "}
              <Text style={styles.bold}>{data.name}</Text> consistently
              demonstrated unwavering dedication and loyalty
            </Text>{" "}
            <Text>to {pronoun} work and responsibilities. </Text>
            <Text>
              {pronounSubject} commitment to excellence has significantly
              contributed to the success of
            </Text>{" "}
            <Text>our team and the organization as a whole.</Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text>
              {pronounSubject} has done an exemplary job while serving in this
              role. {pronounSubject} has always maintained a professional and
            </Text>{" "}
            <Text>courteous attitude while working with our company.</Text>
          </Text>

          <Text style={styles.paragraph}>
            <Text>
              {pronounSubject} decided to end {pronoun} employment with our
              company, and we wish {pronoun} all the best in future career
            </Text>{" "}
            <Text>opportunities.</Text>{" "}
          </Text>
          <Text style={{ ...styles.paragraph, marginBottom: 0, marginTop: 2 }}>
            Please contact us for any additional information.
          </Text>
          <Text style={{ ...styles.paragraph, marginBottom: 0, marginTop: 60 }}>
            {" "}
            Sincerely,{" "}
          </Text>
          <View
            style={{
              marginTop: 130,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingRight: 20,
            }}
          >
            <View>
              <Text style={{ ...styles.paragraph, marginBottom: 1 }}>
                <Text style={styles.bold}>HR Executive</Text>
              </Text>
              <Text style={{ ...styles.paragraph, marginBottom: 1 }}>
                <Text style={styles.bold}>
                  {data.addPvtLtd
                    ? "Panorama Software Solution Pvt Ltd"
                    : "Panorama Software Solution"}{" "}
                </Text>
              </Text>
              <Text style={{ ...styles.paragraph, marginBottom: 1 }}>
                <Text style={styles.bold}>Noida, UP, India</Text>
              </Text>
            </View>
            <Text
              style={{
                ...styles.paragraph,
                marginBottom: 1,
                alignSelf: "flex-start",
                marginLeft: 10,
              }}
            >
              <Text style={styles.bold}>Employee</Text>
            </Text>
          </View>
        </View>

        {/* Bottom divider line */}
        <View style={styles.line2} />

        {/* Footer */}
        <Text style={styles.footer}>
          Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra,
          Sector 135, Noida - 201304, Uttar Pradesh
          {"\n"}
          Classification: Confidential
        </Text>
      </Page>
    </Document>
  );
};

export default function Experience() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowForm(false);
  };

  return (
    <div className="mx-auto">
      <NavBarLetters />
      <div className="max-w-7xl mx-auto">
        <div className="flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
          <div className="mt-5">
            <button
              onClick={() => setShowForm(true)}
              className="py-1 px-4 mx-24 rounded-md bg-pano-blue text-white shadow-lg font-sans hover:bg-blue-600 transition-colors"
            >
              Generate Experience Letter
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <ExperienceForm
                  onSubmit={handleFormSubmit}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          {formData && (
            <div className="bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
              <PDFViewer width="100%" height="800px">
                <Experiences data={formData} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
