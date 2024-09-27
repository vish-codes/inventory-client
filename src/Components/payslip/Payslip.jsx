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
  const [showForm, setShowForm] = useState(false);
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
      format: [300, 225], // w,h
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
    doc.setFontSize(9);
    // line 1
    doc.text("Panorama Software Solutions", 138, 40);
    // line 2
    doc.text("621-622, Tower 1, Assotech Business Cresterra", 138, 45);
    // line 3
    doc.text("Sector-135, Noida-201301, Uttar Pradesh", 138, 50);

    // Title
    doc.setFontSize(10);
    doc.text("Payslip for the period of September 2024", 80, 65);

    // Employee Details
    doc.setFontSize(9);
    doc.text("Employee ID", 20, 75);
    doc.text(formData.empId, 60, 75);
    doc.text("Pay Date", 20, 80);
    doc.text(formData.payDate, 60, 80);
    doc.text("Name", 115, 75);
    doc.text(formData.name, 150, 75);
    doc.text("Bank Name", 115, 80);
    doc.text(formData.bankName, 150, 80);

    // Table Headers for Earnings and Deductions
    doc.setFontSize(10);
    doc.text("Earnings", 20, 106);
    doc.text("Amount", 80, 106);
    doc.text("Deductions", 115, 106);
    doc.text("Amount", 175, 106);

    // horizontal divider
    doc.line(15, 100, 210, 100);
    doc.line(15, 110, 210, 110);

    // vertical divider
    doc.line(110, 100, 110, 147);

    // Earnings
    doc.text("Basic Pay", 20, 115);
    doc.text(formData.basicPay, 80, 115);
    doc.text("House Rent Allowance", 20, 120);
    doc.text(formData.houseRentAllowance, 80, 120);
    doc.text("Project Allowance", 20, 125);
    doc.text(formData.projectAllowance, 80, 125);
    doc.text("Medical Allowance", 20, 130);
    doc.text(formData.medicalAllowance, 80, 130);
    doc.text("Conveyance Allowance", 20, 135);
    doc.text(formData.conveyanceAllowance, 80, 135);

    // horizontal divider
    doc.line(15, 140, 210, 140);

    doc.text("Total Earnings (Rounded)", 20, 145);
    doc.text(`${formData.totalPay}.00`, 80, 145);

    // horizontal divider
    doc.line(15, 147, 210, 147);

    // Deductions
    doc.text("TDS", 115, 115);
    doc.text("0.00", 175, 115);
    doc.text("Total Deductions", 115, 145);
    doc.text("0.00", 175, 145);

    // Net Pay
    doc.text("Net Pay (Rounded)", 115, 152);
    doc.text(`${formData.totalPay}.00`, 175, 152);

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
    <div className="mx-auto bg-gray-50">
      <DashboardPdf />
      <div className="max-w-7xl mx-auto">
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
  );
};

export default Payslip;
