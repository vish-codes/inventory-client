import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import DashboardPdf from "../DashboardPdf";
import { ToWords } from "to-words";
import ApperaisalForm from "./ApperaisalForm";
import NavBarLetters from "./NavBarLetters";

// Move toWords initialization outside the component
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

const Apperaisal = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // company logo
    const logoPath = "../images/panorama.png";
    doc.addImage(logoPath, "PNG", 10, 12, 69, 14, { align: "left" });

    // company name and address
    doc.setFontSize(12);
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
    doc.text("Website: www.panoramasoftwares.com", 200, 36, { align: "right" });

    doc.setTextColor(12, 112, 137);
    doc.setFont("helvetica", "bold");

    // divider top
    doc.line(9, 40, 201, 40);

    // Add salutation
    doc.setFontSize(11);
    doc.text(`Dear ${data.name},`, 20, 60);

    // Add subject line
    doc.setFontSize(11);
    const text = "Sub: Appraisal Letter";
    doc.text(text, 105, 75, { align: "center" });

    const textWidth = doc.getTextWidth(text);
    doc.line(85.5, 76, 85.5 + textWidth, 76);

    // Add body paragraphs
    doc.setFontSize(10);
    let yPos = 90;
    const lineHeight = 5;
    const paragraphs = [
      "In continuation to your sustained performance, we are glad to inform you that your revised compensation is 2,76,000/-(Rupees Two Lakh and Seventy-Six Thousand only) per annum with effect from 01-April-2024.",
      "We are confident that you will meet your responsibility with the same level of enthusiasm and enterprise which you have exhibited since you came to work with your company.",
      "The salary increment should be strictly confidential to you only. Kindly ensure that you do not disclose, any information regarding your remuneration/terms of employment, to any other employee of the Company except to your HOD, Reporting Manager, HR Head and Finance Head. Failure to do so will attract an immediate disciplinary action that will lead to reversal of the appraisal and may result in immediate termination without any notice.",
    ];

    // Update the salary information paragraph
    const salaryInWords = toWords.convert(data.salary);
    const salaryFormatted = parseFloat(data.salary).toLocaleString("en-IN");
    const salaryParagraph = `In continuation to your sustained performance, we are glad to inform you that your revised compensation is ${salaryFormatted}/-(${salaryInWords}) per annum with effect from ${data.date}.`;

    paragraphs[0] = salaryParagraph;

    paragraphs.forEach((para) => {
      const lines = doc.splitTextToSize(para, 170);
      lines.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += lineHeight;
      });
      yPos += 5;
    });

    doc.text(
      "All other Terms and conditions of your appointment will remain the same as per your last",
      20,
      155
    );

    doc.text("appointment letter.", 20, 160);

    doc.setFont("helvetica", "normal");

    doc.text(
      "However, these terms and conditions will be superseded by rules, regulations,",
      53,
      160
    );

    doc.text(
      "policies and processes as given in the latest version of Employee Handbook at any point of time.",
      20,
      165
    );

    doc.setFont("helvetica", "bold");
    doc.text("Keep up your good performance!", 20, 180);

    doc.setFont("helvetica", "normal");
    doc.text("Sincerely,", 20, 190);

    // Add signature area
    doc.setFont("helvetica", "bold");
    doc.text("HR Executive", 20, 225);
    doc.text("Panorama Software Solutions", 20, 231);
    doc.text("Noida, UP, India", 20, 237);
    doc.text("Employee", 180, 225, { align: "right" });

    // divider botton
    doc.line(9, 279, 201, 279);

    // Add footer
    doc.setFontSize(9.5);
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector 135, Noida - 201304, Uttar Pradesh",
      105,
      285,
      { align: "center" }
    );
    doc.text("Classification: Confidential", 105, 290, { align: "center" });

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
            Generate Appraisal Letter
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <ApperaisalForm
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
              title="Appraisal Letter Preview"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apperaisal;
