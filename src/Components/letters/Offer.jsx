import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { ToWords } from "to-words";
import OfferForm from "./OfferForm";
import NavBarLetters from "./NavBarLetters";

// Initialize ToWords
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: true,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
    },
  },
});

export default function Offer() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Helper function to add justified text
    const addJustifiedText = (text, startY, fontSize = 10, lineHeight = 5) => {
      doc.setFontSize(fontSize);
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const subPointIndent = 10;
      const maxWidth = pageWidth - 2 * margin;

      const lines = text.split("\n");
      let y = startY;

      lines.forEach((line, lineIndex) => {
        const isSubPoint = /^\s*[a-z]\)/.test(line);
        const currentMargin = isSubPoint ? margin + subPointIndent : margin;
        const currentMaxWidth = isSubPoint
          ? maxWidth - subPointIndent
          : maxWidth;

        const segments = line.split(/(\*\*.*?\*\*)/);
        let lineContent = [];
        let currentLineWidth = 0;

        segments.forEach((segment) => {
          const isBold = segment.startsWith("**") && segment.endsWith("**");
          const text = isBold ? segment.slice(2, -2) : segment;
          const words = text.split(" ");

          words.forEach((word, wordIndex) => {
            const wordWidth =
              (doc.getStringUnitWidth(word) * fontSize) /
              doc.internal.scaleFactor;
            const spaceWidth =
              (doc.getStringUnitWidth(" ") * fontSize) /
              doc.internal.scaleFactor;

            if (
              currentLineWidth + wordWidth + spaceWidth > currentMaxWidth &&
              lineContent.length > 0
            ) {
              // Print the current line
              printJustifiedLine(
                doc,
                lineContent,
                currentMargin,
                y,
                currentMaxWidth,
                fontSize,
                false
              );
              y += lineHeight;
              lineContent = [];
              currentLineWidth = 0;
            }

            lineContent.push({ text: word, isBold, width: wordWidth });
            currentLineWidth += wordWidth + spaceWidth;
          });
        });

        // Print the last line of the paragraph
        if (lineContent.length > 0) {
          printJustifiedLine(
            doc,
            lineContent,
            currentMargin,
            y,
            currentMaxWidth,
            fontSize,
            true
          );
          y += lineHeight;
        }

        // Add extra space between paragraphs
        if (lineIndex < lines.length - 1) {
          y += lineHeight / 2;
        }
      });

      return y;
    };

    const printJustifiedLine = (
      doc,
      lineContent,
      margin,
      y,
      maxWidth,
      fontSize,
      isLastLine
    ) => {
      const lineWidth = lineContent.reduce((sum, item) => sum + item.width, 0);
      const spaces = lineContent.length - 1;

      let spaceWidth;
      if (isLastLine || spaces === 0) {
        // Don't justify the last line or lines with single words
        spaceWidth =
          (doc.getStringUnitWidth(" ") * fontSize) / doc.internal.scaleFactor;
      } else {
        spaceWidth = (maxWidth - lineWidth) / spaces;
      }

      let xOffset = margin;
      lineContent.forEach((item, index) => {
        doc.setFont("helvetica", item.isBold ? "bold" : "normal");
        doc.text(item.text, xOffset, y);
        xOffset += item.width + (index < spaces ? spaceWidth : 0);
      });
    };

    // Header function
    const addHeader = () => {
      // company logo
      const logoPath = "../images/panorama.png";
      doc.addImage(logoPath, "PNG", 10, 10, 69, 14, { align: "left" });

      // company name and address
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont("times", "bold");
      doc.text("PANORAMA SOFTWARE SOLUTIONS PVT LTD", 200, 15, {
        align: "right",
      });
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra,",
        200,
        20,
        { align: "right" }
      );
      doc.text("Sector 135, Noida - 201304, Uttar Pradesh", 200, 24, {
        align: "right",
      });
      doc.text("Mobile: +919888887651", 200, 28, { align: "right" });
      doc.text("Email: Hr@panoramasoftware.in", 200, 32, { align: "right" });
      doc.text("Website: www.panoramasoftwares.com", 200, 36, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");

      // Reset text color
      doc.setTextColor(12, 112, 137);
      // divider
      doc.line(10, 40, 200, 40);
    };

    // Footer function
    const addFooter = () => {
      doc.setFontSize(9.5);
      doc.setTextColor(120, 120, 120);
      doc.line(9, 279, 201, 279);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector 135, Noida - 201304, Uttar Pradesh",
        105,
        285,
        { align: "center" }
      );
      doc.text("Classification: Confidential", 105, 290, { align: "center" });
      doc.setTextColor(12, 112, 137);
    };

    // greetings here
    // letterDate, name
    doc.setFontSize(10);
    doc.setTextColor(12, 112, 137);
    doc.text(`Date : ${data.letterDate}`, 190, 53, { align: "right" });
    doc.text(`Dear ${data.name},`, 20, 53);
    doc.text("Job Offer Letter", 105, 65, { align: "center" });
    doc.setDrawColor(12, 112, 137);
    doc.line(92, 66, 118, 66);
    doc.setDrawColor(0);

    // Content for page one
    let contentPageOne = [
      `We are pleased to offer you the position of **${data.designation}** with Panorama Software Solutions. Your joining date will be the **${data.joiningDate}**, on the following terms and conditions:`,
      `**1. Designation:** Your present designation is **${data.designation}**. We may change this designation from time to time, to reflect a change in your responsibilities.`,
      "**2. Emoluments:** You will be paid a monthly salary as discussed with you. Details will be provided in the Appointment Letter after your joining. We will review these emoluments annually, based on your performance, attitude to work, and conformance with other terms and conditions of employment; but we shall be under no obligation to increase them.",
      `**3. Probation:** You will be on probation for the first**${data.probationPeriod} months**, the period of probation may be extended, at our sole discretion, for a further period of 6 months depending on your performance. We will issue a written probation extension notice for any extension beyond the first**${data.probationPeriod} months**. During the probation period, the company is at liberty to terminate the service at any time by giving 30 days notice.`,
      "**4. Termination:** We reserve the right to terminate your services by giving you 30 days notice or by paying 15 days in lieu of on the basis of your performance. However, if Any information given by you at the time of your interview is found to be false or incorrect or in case of any Professional misconduct or non-performance, your services are liable to be terminated without any notice or Payment of salary in lieu of.",
      "**5. Leave:** You will be allowed to leave based on the policies in force at the time. Presently, you are entitled to 12 working days leave each year. Leave will accrue from the date of joining but can be availed only after Confirmation. You are expected to take prior approval before going on leave. If you are absent from work from Home without prior permission, or you overstay your leave or take more leaves than you are entitled to, we Shall be at the liberty to treat you as voluntarily having abandoned the service of the company. While working On the client side, you will be following the holiday calendar of the client.",
      "**6. Other employment:** You will not, while working at **Panorama** **Software****Solutions**, undertake directly or indirectly employment with, or provision of paid services or material unpaid involvement with any other Organization, without express permission from us. Doing so will be cause for immediate dismissal. Involvement with any other organization, without express permission from us. Doing so will cause immediate dismissal and take legal action.",
      "**7. Project:** This is to clarify that if a project is issued on your name whilst serving Panorama Software Solutions, then it will be considered Panorama Software Solutions intellectual property. Even after your termination or the completion of your bond, that project will belong to Panorama Software Solutions. You will have no right over the projects assigned to you after you leave, which was earlier issued on your name by Panorama Software Solutions.",
    ];

    // Content for page two
    let contentPageTwo = [
      "**8. Confidentiality:** You will maintain complete confidentiality with respect to all information, documents, and materials about Panorama Software Solutions and its clients that may come into your possession in the Course of your employment with the company. You will not divulge any such information, documents or materials to anyone outsider the company for any reason. This obligation will extend to proprietary information, Documents, and materials belonging to the company, clients or other third parties, which are received by you, you also agree that even after the company, you will not disclose confidential information given to you by clients or the company in the course of your employment, nor make use or appear to make use of such information in ways likely to damage the interests of those clients or of the company.",
      "Also you must not share or discuss the details of compensation with anybody within the company or the Clients. Not following this would also be treated as a serious confidentiality breach.",
      "**9. Communications:** Should the company wish to formally communicate with you about your employment:",
      "a) In the absence of any written communication about a change of address, all communication will be sent to the address in the application, and shall be deemed to have been received by you.",
      "b) Any written communication given to you in presence of witnesses or displayed on a notice board in the office will be deemed to have been given to you even if you refuse it.",
      "**10. Code-of-conduct:** You are at all times expected to behave in a manner that brings credit to yourself and to the company. You are also required to follow office policies and procedures, as described in the memorandums communicated to your form from time to time. While working at the client's office, you are expected to follow the code-of-conduct of the client failing which would entitle us to terminate your services.",
      "**11. Notice-Period:** The followings are the conditions pertaining to the Notice Period: -",
      "a) You will be required to give three months notice in writing to the Panorama Software solution.",
      "b) No leave can be availed during the Notice Period. In case anyone takes any leaves during the notice period, their working day will be stretched accordingly.",
      "c) That salary will not be credited during the notice period. That the said salary will be credited within 45 working days after the employee's last day or after completion of Notice Period.",
      `**12. Employment Duration: Bond Period:** A **${
        data.bondPeriod
      }-year bond (${
        data.bondPeriod * 12
      }** **months** + **3 months** **notice** **period** **mandatory)**  period will be in effect starting from the mentioned start date above. During the bond period, you will be required to remain employed with Panorama Software Solutions. If you choose to terminate your employment before the completion of the bond period, you will be obligated to pay Panorama Software Solutions a lump sum amount of 2 Lakh Rupees (INR) or whatever money was credited to you by the company (whichever one is higher) plus any expenses incurred in connection with your recruitment, training, or relocation as per the company's policy.`,
      "Please convey your acceptance of this offer letter and terms and conditions there to by returning the enclosed copy duly signed.",
    ];

    // Add header to first page
    addHeader();

    // Add content for page one
    let y = 80;
    contentPageOne.forEach((paragraph) => {
      y = addJustifiedText(paragraph, y, 10, 5) + 2;
      if (y > 270) {
        doc.addPage();
        addHeader();
        y = 50;
      }
    });

    // Add footer to page one
    addFooter();

    // Add page two without header
    doc.addPage();
    y = 20;

    contentPageTwo.forEach((paragraph) => {
      y = addJustifiedText(paragraph, y, 10, 5) + 2;
      if (y > 270) {
        doc.addPage();
        y = 50;
      }
    });

    // Add signature lines
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text("Sincerely,", 20, y);
    y += 20;
    doc.text("HR Executive", 20, y);
    doc.text("Employee", 150, y);
    y += 5;
    doc.text("Panorama Software Solutions", 20, y);
    y += 5;
    doc.text("Noida, UP, India", 20, y);

    // Add footer to the last page
    addFooter();

    // Generate PDF preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  useEffect(() => {
    if (formData) {
      generatePDF(formData);
    }
    return () => URL.revokeObjectURL(pdfUrl);
  }, [formData]);

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
            <iframe
              src={pdfUrl}
              style={{ width: "100%", height: "800px" }}
              frameBorder="0"
              title="Job Offer Letter Preview"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
