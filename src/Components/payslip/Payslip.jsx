import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import DashboardPdf from "../../Components/DashboardPdf";
import PayslipForm from "./PayslipForm";

const Payslip = () => {
  const [inputText, setInputText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isPdfPreviewVisible, setIsPdfPreviewVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);////
  const [formData, setFormData] = useState(null);

  const paySlipVariables = {
    companyAddLine1: "Panorama Software Solutions",
    companyAddLine2: "621-622, Tower 1, Assotech Business Cresterra",
    companyAddLine3: "Sector-135, Noida-201301, Uttar Pradesh",
    payslipForPeriod: "Payslip for the period of",
    empId: "Employee ID",
    payDate: "Pay Date",
    Name: "Name",
    bankName: "Bank Name",
    Earnings: "Earnings",
    Amount: "Amount",
    Deductions: "Deductions",
    basicPay: "Basic Pay",
    houseRentAllowance: "House Rent Allowance",
    projectAllowance: "Project Allowance",
  };

  const generatePDF = () => {
    if (!formData) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [270, 225], // w,h
    });

    // document border rectangle

    doc.rect(15, 30, 195, 140);

    //panorama image - left-top logo

    const imgformDate1 = "./images/panorama.png";
    doc.addImage(imgformDate1, "PNG", 20, 37, 51, 11);

    // panorama image - low opacity watermark
    const imgformDate = "./images/pano-logo-30.png";

    doc.addImage(imgformDate, "PNG", 60, 90, 100, 22);

    // Company address
    doc.setFontSize(11); // Reduced font size for better fit
    doc.setFont("helvetica", "bold");
    const companyName = formData.includePvtLtd
      ? "Panorama Software Solutions Pvt Ltd"
      : "Panorama Software Solutions";

    // Calculate the width of the longest line
    doc.setFontSize(9);
    const addressLine1 = "621-622, Tower 1, Assotech Business Cresterra";
    const addressLine2 = "Sector-135, Noida-201301, Uttar Pradesh";
    const longestLineWidth = Math.max(
      (doc.getStringUnitWidth(companyName) * 11) / doc.internal.scaleFactor,
      (doc.getStringUnitWidth(addressLine1) * 9) / doc.internal.scaleFactor,
      (doc.getStringUnitWidth(addressLine2) * 9) / doc.internal.scaleFactor
    );

    const textX = 220 - 15 - longestLineWidth; // Right margin at 15mm from right edge, aligned to the longest line

    // Company name
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(companyName, textX, 40);

    // Address lines
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(addressLine1, textX, 45);
    doc.text(addressLine2, textX, 50);

    // Title
    doc.setFontSize(10);
    const payPeriod = formData.payPeriod || "Invalid date";
    doc.text(`Payslip for the period of ${payPeriod}`, 80, 65);

    // Employee Details
    doc.setFontSize(9);
    doc.text("Employee ID", 20, 75);
    doc.text(`: ${formData.empId}`, 60, 75);
    doc.text("Pay Date", 20, 80);
    doc.text(`: ${formData.payDate}`, 60, 80);
    doc.text("Name", 115, 75);
    doc.text(`: ${formData.name}`, 150, 75);
    doc.text("Bank Name", 115, 80);
    doc.text(`: ${formData.bankName}`, 150, 80);
    doc.setFont("helvetica", "normal");

    // Table Headers for Earnings and Deductions
    doc.setFontSize(10);
    doc.text("Earnings", 20, 106);
    doc.text("Amount", 83, 106);
    doc.text("Deductions", 115, 106);
    doc.text("Amount", 175, 106);

    // horizontal divider
    doc.line(15, 100, 210, 100);
    doc.line(15, 110, 210, 110);

    // vertical divider
    doc.line(110, 100, 110, 147);

    // Earnings
    doc.text("Basic Pay", 20, 115);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.basicPay)}.00`, 95, 115, { align: "right" });
    doc.text("House Rent Allowance", 20, 120);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.houseRentAllowance)}.00`, 95, 120, { align: "right" });
    doc.text("Project Allowance", 20, 125);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.projectAllowance)}.00`, 95, 125, { align: "right" });
    doc.text("Medical Allowance", 20, 130);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.medicalAllowance)}.00`, 95, 130, { align: "right" });
    doc.text("Conveyance Allowance", 20, 135);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.conveyanceAllowance)}.00`, 95, 135, { align: "right" });

    // horizontal divider
    doc.line(15, 140, 210, 140);

    // Total Earnings (Rounded)
    doc.text("Total Earnings (Rounded)", 20, 145);
    const totalEarningsX = 95;
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.totalPay)}.00`, totalEarningsX, 145, { align: "right" });

    // horizontal divider
    doc.line(15, 147, 210, 147);

    // Deductions
    doc.text("TDS", 115, 115);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.tds ? formData.tds : 0)}.00`, 187, 115, {
      align: "right",
    });
    doc.text("Total Deductions", 115, 145);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.tds ? formData.tds : 0)}.00`, 187, 145, {
      align: "right",
    });

    // Net Pay
    doc.text("Net Pay (Rounded)", 115, 152);
    doc.text(`${new Intl.NumberFormat('en-IN').format(formData.netPay)}.00`, 187, 152, { align: "right" });

    // horizontal divider
    doc.line(15, 160, 210, 160);

    // Footer message
    doc.setFontSize(8.5);
    doc.text(
      "Message: This is a computer generated document and does not require signature.",
      20,
      165
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
  }, [formData]);

  const handleFormSubmit = (formData) => {
    setFormData(formData);
    setShowForm(false);
    generatePDF(formData);
  };

  return (
    <div className="mx-auto">
      <DashboardPdf />
      <div className="max-w-7xl mx-auto">
        <div className="flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
          <div className="mt-5">
            <button
              onClick={() => setShowForm(true)}
              className="py-1 px-4 mx-24 rounded-md bg-pano-blue text-white shadow-lg font-sans hover:bg-blue-600 transition-colors"
            >
              Generate Payslip
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <PayslipForm
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
                title="PDF Preview"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payslip;
