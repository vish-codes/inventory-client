import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

import DashboardPdf from "../../Components/DashboardPdf";

export default function Appointment() {
  const [inputText, setInputText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  //   const [isPdfPreviewVisible, setIsPdfPreviewVisible] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // document border rectangle
    // const imgformDate1 = "";
    // doc.addImage(imgformDate1, "PNG", 15, 10, 50, 30);

    // Add date and text
    doc.setFontSize(10.5);
    doc.setTextColor(12, 112, 137);
    doc.text("Date:", 150, 52);
    doc.setFont("times", "bold");
    doc.text("01st August, 2024", 160, 52);
    doc.setFont("times", "bold");
    doc.text("Dear Krishna Kumar", 30, 52);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.text("Letter of Appointment", 90, 65);

    const textWidth = doc.getTextWidth("Letter of Appointment");
    // Set the underline's starting point slightly below the text
    const startX = 90;
    const startY = 66;
    doc.setDrawColor(12, 112, 137);
    doc.line(startX, startY, startX + textWidth, startY);
    const offsetX = 20;
    const offsetY = 12; // Adjust this value to shift all lines down globally

    doc.setFont("times", "normal");
    doc.text(
      "The management is pleased to engage your services on the following undertaking:",
      30,
      75 + offsetY
    );
    doc.setTextColor(2, 2, 2);
    doc.text("1.", offsetX + 10, 81.5 + offsetY);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text("Starting from", offsetX + 15, 81.5 + offsetY);
    doc.setFont("times", "bold");
    doc.text(
      "17th of July, 2024",
      offsetX + doc.getTextWidth("Starting from ") + 13,
      81.5 + offsetY
    );
    doc.setFont("times", "normal");
    doc.text(
      " you will provide your services as ",
      offsetX + doc.getTextWidth("Starting from 17th of July, 2024") + 16,
      81.5 + offsetY
    );
    doc.setFont("times", "bold");
    doc.text(
      "Software Engineer",
      offsetX +
        doc.getTextWidth(
          "Starting from 17th of July, 2024 you will provide your services as "
        ) +
        13,
      81.5 + offsetY
    );
    doc.setFont("times", "normal");
    doc.text(
      "supporting ",
      offsetX +
        doc.getTextWidth(
          "Starting from 17th of July, 2024 you will provide your services as Software Engineer"
        ) +
        22,
      81.5 + offsetY
    );
    doc.text("Panorama's Team in Noida.", offsetX + 15, 85.5 + offsetY);
    doc.text(
      "You assure and undertake to be respectful of the following obligations in rendering your services:",
      offsetX + 10,
      91.5 + offsetY
    );
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(".", offsetX + 15, 97 + offsetY);
    doc.setFont("times", "normal");
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.text(
      "To abide by the company's rules and to maintain such a behavior in order to safeguard the Company's image.",
      offsetX + 20,
      97 + offsetY
    );
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(".", offsetX + 15, 103 + offsetY);
    doc.setFont("times", "normal");
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.text(
      "To abide by the procedures of the Company with reference to the specific services entrusted to you.",
      offsetX + 20,
      103 + offsetY
    );
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(".", offsetX + 15, 109 + offsetY);
    doc.setFont("times", "normal");
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.text(
      "To maintain a high standard of efficiency and diligence of services and exert full efforts to",
      offsetX + 20,
      109 + offsetY
    );
    doc.text(
      "develop and protect the interests of the Company.",
      offsetX + 20,
      115 + offsetY
    );
    doc.setTextColor(2, 2, 2);
    doc.text("2.", offsetX + 10, 123.5 + offsetY);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text("Your C.T.C. has been fixed as", offsetX + 15, 123.5 + offsetY);
    doc.setFont("times", "bold");
    doc.text("1,80,000 INR", offsetX + 61, 123.5 + offsetY);
    doc.setFont("times", "normal");
    doc.text(
      "per annum.",
      offsetX + 63 + doc.getTextWidth("1,80,000 INR"),
      123.5 + offsetY
    );
    doc.setTextColor(2, 2, 2);
    doc.text("3.", offsetX + 10, 130 + offsetY);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "You will be on probation for the first ",
      offsetX + 15,
      130 + offsetY
    );
    doc.setFont("times", "bold");
    doc.text(
      "Six Months.",
      offsetX +
        14 +
        doc.getTextWidth("You will be on probation for the first "),
      130 + offsetY
    );
    doc.setFont("times", "normal");
    doc.text(
      "Upon confirmation your services are terminable",
      offsetX +
        19 +
        doc.getTextWidth("You will be on probation for the first Six Months."),
      130 + offsetY
    );
    doc.text(
      "with six months's notice or payment thereof without assigning any reason. The assignment in this",
      offsetX + 15,
      134.5 + offsetY
    );
    doc.text(
      "Company may also terminate before the date of expiry of the attendance formerly requested, by ",
      offsetX + 15,
      139.5 + offsetY
    );
    doc.text(
      "mutual agreement or non-fulfillment of this cooperation relationship or your misconduct. However",
      offsetX + 15,
      144.5 + offsetY
    );
    doc.text(
      "during the probation period the services may be terminated by giving 30 days' notice or 15 days",
      offsetX + 15,
      149.5 + offsetY
    );
    doc.text("salary in lieu thereof.", offsetX + 15, 154.5 + offsetY);
    doc.setTextColor(2, 2, 2);
    doc.text("4.", offsetX + 10, 163 + offsetY);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "The above monthly pay covers 1 (one) calendar days of leave per month. This leave shall be",
      offsetX + 15,
      163 + offsetY
    );
    doc.text(
      "scheduled in accordance with the Company's convenience, and the leave can be accumulated over the",
      offsetX + 15,
      167.5 + offsetY
    );
    doc.text(
      "months till December of the same year but cannot be encased. For details please refer to the",
      offsetX + 15,
      172.5 + offsetY
    );
    doc.text("Company leave policy.", offsetX + 15, 177.5 + offsetY);
    doc.setTextColor(2, 2, 2);
    doc.text("5.", offsetX + 10, 185.5 + offsetY);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "You will need to submit to this office, copies of your resume and testimonials, for the Company's",
      offsetX + 15,
      185.5 + offsetY
    );
    doc.text(
      "record. You will report to this Office any changes regarding your qualifications or certifications.",
      offsetX + 15,
      190 + offsetY
    );
    doc.text(
      "Keeping in view the special nature of the Company's business you shall be required to Payment of",
      offsetX + 15,
      195 + offsetY
    );
    doc.text("salary in lieu of.", offsetX + 15, 200 + offsetY);
    // Add a horizontal line below the text
    doc.setTextColor(0, 0, 0);
    const lineStartX = 20;
    const lineEndX = 200;
    const lineY = 250 + offsetY;
    doc.setLineWidth(0.3);
    doc.line(lineStartX, lineY, lineEndX, lineY);
    doc.text(
      "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector-135, Noida-201304, Uttar Pradesh",
      offsetX + 9,
      255 + offsetY
    );
    doc.text("Classification: Confidential", offsetX + 70, 260 + offsetY);

    // Add a new page
    doc.addPage();
    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("6.", offsetX + 10, 20);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "Keeping in view the special nature of the Company's business you shall be required to enter into a",
      offsetX + 15,
      20
    );
    doc.text(
      "necessary Confidential Agreement with the Company. During the course of your employment with this",
      offsetX + 15,
      25
    );
    doc.text(
      "Company, you shall maintain strict confidentiality as to our affairs and shall make no disclosure to",
      offsetX + 15,
      30
    );
    doc.text(
      "any person not legally entitled hereto; nor shall you permit or allow any person to inspect or have",
      offsetX + 15,
      35
    );
    doc.text(
      "access to any books, documents, and your employment with this Company, you shall maintain strict",
      offsetX + 15,
      40
    );
    doc.text(
      "confidentiality as to our affairs and shall make no disclosure to any person not legally entitled here to;",
      offsetX + 15,
      45
    );
    doc.text(
      "nor shall you permit or allow any person to inspect or have access to any books, documents, and",
      offsetX + 15,
      50
    );
    doc.text(
      "belongings to or in the possession of our offices. Your confidentiality obligation shall continue",
      offsetX + 15,
      55
    );
    doc.text(
      "even after the expiry of youremployment with the Company for any reason",
      offsetX + 15,
      60
    );

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("7.", offsetX + 10, 70);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "You shall make good any loss or damage to the Company's property caused by your negligenceor any ",
      offsetX + 15,
      70
    );
    doc.text(
      "deliberate act. Your termination for such a cause shall not relieve you from the liability to make good",
      offsetX + 15,
      75
    );
    doc.text(
      "such loss or damage, or be considered as a waiver of the company's legal remedies. Further the",
      offsetX + 15,
      80
    );
    doc.text(
      "company shall not be responsible for any termination damages on this ground.",
      offsetX + 15,
      85
    );

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("8.", offsetX + 10, 95);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "The Company expects you to work with a high standard of efficiency and economy. You will carry",
      offsetX + 15,
      95
    );
    doc.text(
      "out the instructions of your superiors diligently and will not act in a manner, which leads to any",
      offsetX + 15,
      100
    );
    doc.text("adverse report from the management.", offsetX + 15, 105);

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("9.", offsetX + 10, 115);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "You will be a full time Employee of our Company and devote your full time and attention to the",
      offsetX + 15,
      115
    );
    doc.text(
      "business of the Company. During the period of your employment, you shall not engage yourself in",
      offsetX + 15,
      120
    );
    doc.text(
      "any manner, in any other service or business or profession or trade or as an agent or servant of any",
      offsetX + 15,
      125
    );
    doc.text(
      "other person or firm whether remunerative or honorary unless agreed between you and Company in",
      offsetX + 15,
      130
    );
    doc.text("writing.", offsetX + 15, 135);

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("10.", offsetX + 10, 145);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "During your working hours, and at any other time, you shall not involve in any activity whatsoever",
      offsetX + 15,
      145
    );
    doc.text(
      "which is not connected with work or business of our Company. In case you are found engaged as",
      offsetX + 15,
      150
    );
    doc.text(
      "mentioned above; your services will be terminated without giving any notice or salary inlieu",
      offsetX + 15,
      155
    );
    doc.text("thereof.", offsetX + 15, 160);

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("11.", offsetX + 10, 170);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "This letter of appointment has been issued to you on the undertaking that there is nothing in your",
      offsetX + 15,
      170
    );
    doc.text(
      "past records which are objectionable. If it comes to the notice of this company at any time that any",
      offsetX + 15,
      175
    );
    doc.text(
      "declaration given by you to this Company is false or you have willfully suppressed any ",
      offsetX + 15,
      180
    );
    doc.text(
      "information, your services may be terminated without any notice or compensation in lieu thereof.",
      offsetX + 15,
      185
    );

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("12.", offsetX + 10, 195);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "This Letter of Appointment and the Service Agreement signed along with this constituted the entire",
      offsetX + 15,
      195
    );
    doc.text(
      "agreement between the parties and can only be amended in writing, signed by both the parties.",
      offsetX + 15,
      200
    );

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("13.", offsetX + 10, 210);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "This letter of appointment cancels and supersedes any previous understanding, written,oral or",
      offsetX + 15,
      210
    );
    doc.text("implied that you may have of ours.", offsetX + 15, 215);

    doc.setFont("times", "normal");
    doc.setTextColor(2, 2, 2);
    doc.text("14.", offsetX + 10, 225);
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.setFont("times", "normal");
    doc.text(
      "Kindly sign, date and return the annexed copy of this letter of appointment for your acceptance.",
      offsetX + 15,
      225
    );

    doc.setFont("times", "bold");
    doc.setTextColor(12, 112, 137);
    doc.setFontSize(10.5);
    doc.text("HR Executive", offsetX + 10, 250);
    doc.text("Employee", offsetX + 145, 250);
    doc.text("Panorama Software Solutions", offsetX + 10, 255);
    doc.text("Noida, UP, India", offsetX + 10, 260);
    // Add a horizontal line below the text
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.3);
    let offsetYSecondPage = 25;
    let lineYSecondPage = 250 + offsetYSecondPage;
    doc.setLineWidth(0.3);
    doc.line(lineStartX, lineYSecondPage, lineEndX, lineYSecondPage);
    // Add text to the second page
    doc.setFont("times", "normal");
    doc.text(
      "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector-135, Noida-201304, Uttar Pradesh",
      offsetX + 9,
      255 + offsetYSecondPage
    );
    doc.text(
      "Classification: Confidential",
      offsetX + 70,
      260 + offsetYSecondPage
    );

    // -----------------------blob preview-----------------//

    // Generate a blob URL for the PDF
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    setPdfUrl(url);
  };

  useEffect(() => {
    // Generate the PDF whenever inputText changes
    generatePDF();

    // Clean up the blob URL when the component unmounts or updates
    return () => URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  //   const handleFormSubmit = (formData) => {
  //     setFormData(formData);
  //     setShowForm(false);
  //     generatePDF(formData);
  //   };

  return (
    <div className="mx-auto bg-gray-50">
      <DashboardPdf />
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "800px" }}
            frameBorder="0"
            title="PDF Preview"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
