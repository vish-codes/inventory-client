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
import OfferForm from "./OfferForm";
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
    fontFamily: "Times-Roman",
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

// PDF Document component
const OfferLetterPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="../images/panorama.png" />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>
            {data.includePvtLtd
              ? "PANORAMA SOFTWARE SOLUTIONS PVT LTD"
              : "PANORAMA SOFTWARE SOLUTIONS"}
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
          Dear <Text style={styles.bold}>{data.name}</Text>,
        </Text>
        <Text style={styles.greetingText1}>
          Date: <Text style={styles.bold}>{data.letterDate}</Text>
        </Text>
      </View>
      <Text style={styles.title}>
        <Text style={styles.bold}>Job Offer Letter</Text>
      </Text>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          We are pleased to offer you the position of{" "}
          <Text style={styles.bold}>{data.designation}</Text> with{" "}
          <Text style={styles.bold}>Panorama Software Solutions</Text>. Your
          joining date will be{" "}
          <Text style={styles.bold}>{data.joiningDate}</Text>, on the following
          terms and conditions:
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>1. Designation:</Text> Your present
          designation is <Text style={styles.bold}>{data.designation}</Text>. We
          may change this designation from time to time, to reflect a change in
          your responsibilities.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>2. Emoluments:</Text> You will be paid a
          monthly salary as discussed with you. Details will be provided in the
          Appointment Letter after your joining. We will review these emoluments
          annually, based on your performance, attitude to work, and conformance
          with other terms and conditions of employment; but we shall be under
          no obligation to increase them.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>3. Probation:</Text> You will be on
          probation for the first{" "}
          <Text style={styles.bold}>{data.probationPeriod} months</Text>, the
          period of probation may be extended, at our sole discretion, for a
          further period of <Text style={styles.bold}>6 months</Text> depending
          on your performance. We will issue a written probation extension
          notice for any extension beyond the first{" "}
          <Text style={styles.bold}>{data.probationPeriod} months</Text>. During
          the probation period, the company is at liberty to terminate the
          service at any time by giving 30 days notice.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>4. Termination:</Text> We reserve the right
          to terminate your services by giving you 30 days notice or by paying
          15 days in lieu of on the basis of your performance. However, if Any
          information given by you at the time of your interview is found to be
          false or incorrect or in case of any Professional misconduct or
          non-performance, yourservices are liable to be terminated without any
          notice or Payment of salary in lieu of.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>5. Leave:</Text> You will be allowed to
          leave based on the policies in force at the time. Presently, you are
          entitled to 12 working days leave each year. Leave will accrue from
          the date of joining but can be availed only after Confirmation. You
          are expected to take prior approval before going on leave. If you are
          absent from work from Home without prior permission, or you overstay
          your leave or take more leaves than you are entitled to, we Shall be
          at the liberty to treat you as voluntarily having abandoned the
          service of the company. While working On the client side, you will be
          following the holiday calendar of the client.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>6. Other employment:</Text> You will not,
          while working at{" "}
          <Text style={styles.bold}>Panorama Software Solutions</Text>,
          undertake directly or indirectly employment with, or provision of paid
          services or material unpaid involvement with any other Organization,
          without express permission from us. Doing so will be cause for
          immediate dismissal. Involvement with any other organization, without
          express permission from us. Doing so will cause immediate dismissal
          and take legal action.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>7. Project:</Text> This is to clarify that
          if a project is issued on your name whilst serving Panorama Software
          Solutions, then it will be considered Panorama Software Solutions
          intellectual property. Even after your termination or the completion
          of your bond, that project will belong to Panorama Software Solutions.
          You will have no right over the projects assigned to you after you
          leave, which was earlier issued on your name by Panorama Software
          Solutions.
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
          <Text style={styles.bold}>8. Confidentiality:</Text> You will maintain
          complete confidentiality with respect to all information, documents,
          and materials about Panorama Software Solutions and its clients that
          may come into your possession in the course of your employment with
          the company. You will not divulge any such information, documents or
          materials to anyone outside the company for any reason. This
          obligation will extend to proprietary information, documents, and
          materials belonging to the company, clients or other third parties,
          which are received by you. You also agree that even after leaving the
          company, you will not disclose confidential information given to you
          by clients or the company in the course of your employment, nor make
          use or appear to make use of such information in ways likely to damage
          the interests of those clients or of the company.
        </Text>
        <Text style={styles.paragraph}>
          Also, you must not share or discuss the details of compensation with
          anybody within the company or the clients. Not following this would
          also be treated as a serious confidentiality breach.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>9. Communications:</Text> Should the company
          wish to formally communicate with you about your employment:
        </Text>
        <Text style={styles.subPoint}>
          a) In the absence of any written communication about a change of
          address, all communication will be sent to the address in the
          application, and shall be deemed to have been received by you.
        </Text>
        <Text style={styles.subPoint}>
          b) Any written communication given to you in presence of witnesses or
          displayed on a notice board in the office will be deemed to have been
          given to you even if you refuse it.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>10. Code-of-conduct:</Text> You are at all
          times expected to behave in a manner that brings credit to yourself
          and to the company. You are also required to follow office policies
          and procedures, as described in the memorandums communicated to you
          from time to time. While working at the client's office, you are
          expected to follow the code-of-conduct of the client failing which
          would entitle us to terminate your services.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>11. Notice-Period:</Text> The following are
          the conditions pertaining to the Notice Period:
        </Text>
        <Text style={styles.subPoint}>
          a) You will be required to give{" "}
          <Text style={styles.bold}>three months</Text> notice in writing to{" "}
          <Text style={styles.bold}>Panorama Software Solutions</Text>.
        </Text>
        <Text style={styles.subPoint}>
          b) No leave can be availed during the Notice Period. In case anyone
          takes any leaves during the notice period, their working day will be
          stretched accordingly.
        </Text>
        <Text style={styles.subPoint}>
          c) Salary will not be credited during the notice period. The said
          salary will be credited within 45 working days after the employee's
          last day or after completion of Notice Period.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>12. Employment Duration:</Text> Bond Period:{" "}
          A{" "}
          <Text style={styles.bold}>
            {data.bondPeriod}-year bond ({data.bondPeriod * 12} months + 3
            months notice period mandatory) period
          </Text>{" "}
          will be in effect starting from the mentioned start date above. During
          the bond period, you will be required to remain employed with Panorama
          Software Solutions. If you choose to terminate your employment before
          the completion of the bond period, you will be obligated to pay{" "}
          <Text style={styles.bold}>Panorama Software Solutions</Text> a lump
          sum amount of{" "}
          <Text style={styles.bold}>
            2 Lakh Rupees (INR) or whatever money was credited to you by the
            company (whichever one is higher)
          </Text>{" "}
          plus any expenses incurred in connection with your recruitment,
          training, or relocation as per the company's policy.
        </Text>
        <Text style={styles.paragraph}>
          Please convey your acceptance of this offer letter and terms and
          conditions there to by returning the enclosed copy duly signed.
        </Text>
        <Text style={{ ...styles.paragraph, marginBottom: 0, marginTop: 20 }}>
          {" "}
          Sincerely,
        </Text>
        <View
          style={{
            marginTop: 80,
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
              <Text style={styles.bold}>Panorama Software Solutions</Text>
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
    </div>
  );
}
