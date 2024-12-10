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

import NavBarLetters from "./NavBarLetters";
import AppointmentForm from "./AppointmentForm";

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
  title: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    // marginVertical: 10,
    top: 45,
    textDecoration: "underline",
    color: "#0c7089",
    marginBottom: 25,
  },
  content: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 30,
    color: "#0c7089",
  },
  paragraph: {
    marginTop: 5,
    marginBottom: 12,
    textAlign: "justify",
    letterSpacing: 0.2,
    fontFamily: "Times-Roman",
    fontSize: 10,
  },
  subPoint: {
    marginLeft: 15, // This creates the indent for sub-points
    marginBottom: 5,
    textAlign: "justify",
    letterSpacing: 0.2,
    fontFamily: "Times-Roman",
  },
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
  //horizental line code
  line1: {
    height: 0.8,
    backgroundColor: "black",
    width: "100%",
    top: 8.5,
  },
  line2: {
    height: 0.8,
    backgroundColor: "black",
    width: "88.5%",
    position: "absolute",
    bottom: 50,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 30,
    top: 40,
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
// Salary function code----
const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // No decimals
  })
    .format(amount)
    .replace("₹", "")
    .trim(); // Remove INR symbol if needed
};

// PDF Document component
const Appointment = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="../images/panorama.png" />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>
            {/* {data.includePvtLtd ? "PANORAMA SOFTWARE SOLUTIONS PVT LTD" : "PANORAMA SOFTWARE SOLUTIONS"} */}
            PANORAMA SOFTWARE SOLUTIONS PVT LTD
          </Text>
          <Text>
            Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra,
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
        <Text style={styles.greetingText2}>
          <Text style={styles.bold}>Dear {data.name}</Text>,
        </Text>
        <Text style={styles.greetingText1}>
          Date: <Text style={styles.bold}>{data.issuedate}</Text>
        </Text>
      </View>
      <Text style={styles.title}>
        <Text style={styles.bold}>Letter Of Appointment</Text>
      </Text>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          The management is pleased to engage your services on the following
          undertaking:{" "}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>1.</Text> Starting from
          <Text style={styles.bold}> {data.date}</Text> you will provide your
          services as <Text style={styles.bold}>{data.designation}</Text>{" "}
          supporting Panorama's Team in Noida.
        </Text>
        <Text style={styles.paragraph}>
          <Text>
            You assure and undertake to be respectful of the following
            obligations in rendering your services:
          </Text>{" "}
        </Text>
        <Text style={styles.subPoint}>
          <Text>
            • To abide by the company's rules and maintain a behavior that
            safeguards the Company's image.
          </Text>
        </Text>
        <Text style={styles.subPoint}>
          <Text>
            • To abide by the procedures of the Company concerning the services
            entrusted to you.{" "}
          </Text>
        </Text>
        <Text style={styles.subPoint}>
          <Text>
            • To maintain a high standard of efficiency and diligence in your
            work, exerting full efforts to develop and protect the interests of
            the Company.
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>2.</Text> Your C.T.C. has been fixed as{" "}
          <Text style={styles.bold}>{formatINR(data.salary)} INR </Text>per
          annum
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>3.</Text> You will be on probation for the
          first Six Months. Upon confirmation, your services are terminable with
          six months’ notice or payment thereof without assigning any reason.
          The assignment in this Company may also terminate before the date of
          expiry of the attendance formerly requested, by mutual agreement or
          non-fulfillment of this cooperation relationship or your misconduct.
          However, during the probation period, the services may be terminated
          by giving 30 days’ notice or 15 days salary in lieu thereof.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>4.</Text> The above monthly pay covers 1
          (one) calendar day of leave per month. This leave shall be scheduled
          in accordance with the Company's convenience, and the leave can be
          accumulated over the months till December of the same year but cannot
          be encashed. For details, please refer to the Company leave policy.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>5.</Text> You will need to submit to this
          office, copies of your resume and testimonials, for the Company's
          record. You will report to this Office any changes regarding your
          qualifications or certifications
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>6.</Text> Keeping in view the special nature
          of the Company's business, you shall be required to enter into a
          necessary Confidential Agreement with the Company. During the course
          of your employment with this Company, you shall maintain strict
          confidentiality as to our affairs and shall make no disclosure to any
          person not legally entitled hereto; nor shall you permit or allow any
          person to inspect or have access to any books, documents, and
          belongings to or in the possession of our offices. Your
          confidentiality obligation shall continue even after the expiry of
          your employment with the Company for any reason.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>7.</Text> You shall make good any loss or
          damage to the Company's property caused by your negligence or any
          deliberate act. Your termination for such a cause shall not relieve
          you from the liability to make good such loss or damage, or be
          considered as a waiver of the company's legal remedies. Further, the
          company shall not be responsible for any termination damages on this
          ground.
        </Text>
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

    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>8.</Text> The Company expects you to work
          with a high standard of efficiency and economy. You will carry out the
          instructions of your superiors diligently and will not act in a
          manner, which leads to any adverse report from the management.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>9.</Text> You will be a full-time Employee
          of our Company and devote your full time and attention to the business
          of the Company. During the period of your employment, you shall not
          engage yourself in any manner, in any other service or business or
          profession or trade or as an agent or servant of any other person or
          firm whether remunerative or honorary unless agreed between you and
          Company in writing.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>10.</Text> During your working hours, and at
          any other time, you shall not involve in any activity whatsoever which
          is not connected with work or business of our Company. In case you are
          found engaged as mentioned above; your services will be terminated
          without giving any notice or salary in lieu thereof.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>11.</Text>This letter of appointment has
          been issued to you on the undertaking that there is nothing in your
          past records which are objectionable. If it comes to the notice of
          this company at any time that any declaration given by you to this
          Company is false or you have willfully suppressed any information,
          your services may be terminated without any notice or compensation in
          lieu thereof.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>12.</Text>This Letter of Appointment and the
          Service Agreement signed along with this constituted the entire
          agreement between the parties and can only be amended in writing,
          signed by both the parties.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>13.</Text>This letter of appointment cancels
          and supersedes any previous understanding, written, oral or implied
          that you may have of ours.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>14.</Text> Kindly sign, date and return the
          annexed copy of this letter of appointment for your acceptance
        </Text>
        <View
          style={{
            marginTop: 160,
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
                Panorama Software Solutions Pvt Ltd
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

export default function Offer() {
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
              Generate Appointment Letter
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <AppointmentForm
                  onSubmit={handleFormSubmit}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          {formData && (
            <div className="bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
              <PDFViewer width="100%" height="800px">
                <Appointment data={formData} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
