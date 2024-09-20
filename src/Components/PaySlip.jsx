import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import DashboardPdf from "../Components/DashboardPdf";
import PayrollForm from "./PayrollForm";

export function callForHello() {
  console.log("this function is saying hello");
}
const PaySlip = () => {
  const [inputText, setInputText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

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

  /*   // Check for missing fields
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error("Missing fields:", missingFields);
      setErrorMessage(true);
      setTimeout(() => {
        // Check for missing fields
        const missingFields = Object.entries(requiredFields)
          .filter(([key, value]) => !value)
          .map(([key]) => key);

        if (missingFields.length > 0) {
          console.error("Missing fields:", missingFields);
          setErrorMessage(true);
          setTimeout(() => {
            setErrorMessage(false);
          }, 7000);
          return;
        }
        setErrorMessage(false);
      }, 7000);
      return;
    }

    setCommonDataForPdf(() => ({
      invoiceNo,
      dateOfInvoice,
      companyName,
      add1,
      add2,
      state,
      gstIn,
      resource,
      gstRate,
      currencyType,
    }));
    calculateTotals(gstRate);
    handleRenderPdfPreview();
  }

  // function for showing and hiding pdf preview
  function handleRenderPdfPreview() {
    generatePDF();
    setIsPdfPreviewVisible(true);
  }

  // function responsible for download of pdf
  function handleFileSave() {
    generatePDF("active");
  }

*/
  // Values variables END-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  const generatePDF = (status) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [300, 225], // w,h
    });

    // document border rectangle

    doc.rect(15, 30, 195, 140);

    //panorama image - left-top logo

    const imgData1 = "./images/panorama.png";
    doc.addImage(imgData1, "PNG", 20, 37, 51, 11);

    // panorama image - low opacity watermark
    const imgData = "./images/pano-logo-30.png";

    doc.addImage(imgData, "PNG", 60, 90, 100, 22);

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
    doc.text(": PSS105", 60, 75);
    doc.text("Pay Date", 20, 80);
    doc.text(": 05-09-2024", 60, 80);
    doc.text("Name", 115, 75);
    doc.text(": Saurav Saksena", 150, 75);
    doc.text("Bank Name", 115, 80);
    doc.text(": HDFC Bank", 150, 80);

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
    doc.text("75,000.00", 80, 115);
    doc.text("House Rent Allowance", 20, 120);
    doc.text("1,600.00", 80, 120);
    doc.text("Project Allowance", 20, 125);
    doc.text("1,100.00", 80, 125);
    doc.text("Medical Allowance", 20, 130);
    doc.text("1,300.00", 80, 130);
    doc.text("Conveyance Allowance", 20, 135);
    doc.text("1,000.00", 80, 135);

    // horizontal divider
    doc.line(15, 140, 210, 140);

    doc.text("Total Earnings (Rounded)", 20, 145);
    doc.text("80,000.00", 80, 145);

    // horizontal divider
    doc.line(15, 147, 210, 147);

    // Deductions
    doc.text("TDS", 115, 115);
    doc.text("0.00", 175, 115);
    doc.text("Total Deductions", 115, 145);
    doc.text("0.00", 175, 145);

    // Net Pay
    doc.text("Net Pay (Rounded)", 115, 152);
    doc.text("80,000.00", 175, 152);

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
  }, [inputText]);

  return (
    <div className="mx-auto">
      <PayrollForm />
      <DashboardPdf />
      <div className="bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
        {/* <button
          onClick={generatePDFmain}
          className="py-1 m-2 w-32 px-2 rounded-md bg-pano-blue text-white shadow-lg font-sans"
        >
          Generate PDF
        </button> 
        <div className="border font-sans border-black w-auto p-2 m-2 rounded-md">
          <label>Select file : </label>
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".csv, .xlsx, .xls"
          />
        </div>
        */}
        {/* {isPdfPreviewVisible ? ( */}
        <>
          {/* <div className="relative h-10 w-full mb-5">
            <p className="absolute top-0 right-28 w-22 mx-5 p-2 ">
              can't see preview?{" "}
            </p>
            <button
              onClick={handleFileSave}
              className="absolute top-0 right-0 w-22 mx-5 border boder-black p-2 text-sm rounded-lg bg-slate-600 text-white "
            >
              Download PDF
            </button>
          </div> */}
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "800px" }}
            frameBorder="0"
            title="PDF Preview"
          ></iframe>
        </>
        {/* ) : (
          <div className="mx-2">
            Please upload and Generate PDF to see preview
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PaySlip;

function ErrorComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ x: -10, opacity: 1 }}
      exit={{ opacity: 0, x: 0 }}
      className="flex items-center m-1 p-3 w-fit text-sm text-red-800 border border-red-300 rounded-lg bg-gray-50 ml-auto"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
        <span className="font-medium">Alert!</span> Change a few things up and
        try generating again.
      </div>
    </motion.div>
  );
}
