import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import DashboardPdf from "../Components/DashboardPdf";

const GeneratePDF = () => {
  const [inputText, setInputText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Values variables START -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  // const [dateOfInvoices, setDateOfInvoices] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPdfPreviewVisible, setIsPdfPreviewVisible] = useState(false);

  const [resource, setResource] = useState({});
  const [commonDataForPdf, setCommonDataForPdf] = useState({});
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({ subTotal: "", total: "", igst: "" });

  function generatePDFmain() {
    if (data.length == 0) return alert("Please upload a file first!");
    const {
      ["Invoice no."]: invoiceNo,
      ["Date of Invoice"]: dateOfInvoice,
      ["Comapny Name"]: companyName,
      ["Address line 1"]: add1,
      ["Address line 2"]: add2,
      ["State/Code"]: state,
      ["Gst In"]: gstIn,
      ["Resource 1"]: resource,
      ["Currency Type"]: currencyType,
      ["Gst Rate"]: gstRate,
    } = data[0];

    const requiredFields = {
      invoiceNo,
      dateOfInvoice,
      companyName,
      add1,
      add2,
      state,
      gstIn,
      resource,
      currencyType,
      gstRate,
    };

    // Check for missing fields
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
          // return;
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

  // calculate how subtotal, and total

  const calculateTotals = (gstRate) => {
    // Calculate subtotal
    const subTotal = resourcesArr.reduce(
      (acc, val) => acc + parseFloat(val.payPerDay * val.days),
      0
    );

    // Calculate IGST and total
    const igst = (subTotal * gstRate) / 100;
    const total = subTotal + igst;

    // Set the state with an object containing the totals
    setTotals({ subTotal, igst, total });

    // Return the totals
    return { subTotal, igst, total };
  };

  useEffect(() => {
    generatePDF();
    return () => URL.revokeObjectURL(pdfUrl);
  }, [data, commonDataForPdf]);

  // function that sets data for resources just after file upload
  /*  useEffect(() => {
    if (data.length > 0) {
      data.map((val, i) =>
        setResource((bill) => ({
          ...bill,
          [`value${i}`]: val['Resource 1'],
        }))
      );
    }
  }, [data]); */

  useEffect(() => {
    if (data.length > 0) {
      const resources = data.reduce((acc, val, i) => {
        // Iterate over the existing resource keys
        for (let j = 1; j <= 10; j++) {
          const resourceKey = `Resource ${j}`;

          // Initialize the resource object once for each
          if (!acc[`resource${j}`]) acc[`resource${j}`] = {};

          // Add resource object data ----------
          if (val[resourceKey]) {
            acc[`resource${j}`][`value${i}`] = val[resourceKey];
          }
        }
        return acc;
      }, {});

      // setting accumulated resource objects into an array
      const resourceArray = [];
      for (let j = 1; j <= 10; j++) {
        if (
          resources[`resource${j}`] &&
          Object.keys(resources[`resource${j}`]).length > 0
        ) {
          resourceArray.push(resources[`resource${j}`]);
        }
      }
      setResource(resourceArray);
    }
  }, [data]);

  // BIG SpliT START ---------------------------------- //
  const handleFileUpload = (event) => {
    setIsPdfPreviewVisible(false);
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop();

      // CSV file
      if (fileExtension === "csv") {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            setData(() => results.data);
          },
          error: (error) => {
            alert("Error parsing CSV");
          },
        });
        // Excel file
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const binaryString = e.target.result;
          const workbook = XLSX.read(binaryString, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const csvData = XLSX.utils.sheet_to_csv(worksheet);
          Papa.parse(csvData, {
            header: true,
            complete: (results) => {
              setData(() => results.data);
            },
            error: (error) => {
              alert("Error parsing Excel:");
            },
          });
        };
        reader.readAsBinaryString(file);
      } else {
        alert("Unsupported file format. Please upload a CSV or Excel file.");
      }
    }
  };

  /*
  const users = payload.map((item) => {
    const address = [];

    // Check and add address1 if valid
    if (item.address1 !== "" && item.address1) {
        address.push({ address: item.address1 });
    }

    // Check and add address2 if valid
    if (item.address2 !== "" && item.address2) {
        address.push({ address: item.address2 });
    }

    // Return the transformed object
    return {
        name: item.name,
        age: item.age,
        address: address.length > 0 ? address : undefined,
    };
});
*/

  function prepareData() {
    if (!resource) return;
    let resourceTemp = resource;
    let tempArr = [];

    const trimmedVar = resource.map((val, i) => {
      let customObject = {
        username: val.value0.split("=")[1].trim(),
        workingOn: val.value1.split("=")[1].trim(),
        userId: val.value2.split("=")[1].trim(),
        sacCode: val.value3.split("=")[1].trim(),
        days: parseInt(val.value4.split("=")[1].trim(), 10),
        hours: parseInt(val.value5.split("=")[1].trim(), 10),
        payPerDay: parseFloat(val.value6.split("=")[1].trim()),
        fromDate: val.value7.split("=")[1].trim(),
        toDate: val.value8.split("=")[1].trim(),
      };
      tempArr.push(customObject);
    });

    setResourcesArr(tempArr);
  }

  useEffect(() => {
    if (resource && Object.keys(resource).length > 0) {
      prepareData();
    }
  }, [resource]);

  // BIG SPLIT END ------------------------------------------- //

  const [resourcesArr, setResourcesArr] = useState([
    {
      userId: "123",
      username: "John Doe",
      workingOn: "Maf Carrefour",
      sacCode: "2329",
      fromDate: "1st July",
      toDate: "30th July 2024",
      days: 21,
      hours: 8,
      payPerDay: 3000,
    },
  ]);

  /*
  // invoice date variables
  const day = dateOfInvoices.getDate();
  const month = dateOfInvoices.getMonth() + 1;
  const year = dateOfInvoices.getFullYear();
*/

  // Values variables END-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  const generatePDF = (status) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [300, 225], // w,h
    });

    // doc.text(inputText || 'Hello world!', 10, 10);

    // Header-------------------------------
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text("Panorama Software Solutions", 30, 32);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(61, 121, 216);
    doc.text(
      `INVOICE NO: ${
        commonDataForPdf.invoiceNo ? commonDataForPdf.invoiceNo : ""
      }`,
      112,
      32
    );
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(9.5);
    doc.text("621-622, Tower 1, Assotech Business Cresterra", 30, 42);
    doc.text("Sector - 135, Noida,", 30, 46);
    doc.text("Uttar Pradesh - 201305", 30, 50);

    // Bank Details---------------------------
    // Border Rectangle ----------------------
    doc.rect(30, 56, 170, 20);
    // vertical Divider ----------------------
    doc.line(110, 56, 110, 76);
    // multi horizonal divider ---------------
    doc.line(110, 62, 200, 62);
    doc.line(110, 69, 200, 69);
    // ---------------------------------------
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Bank Details:", 32, 60.5);
    doc.setFont("helvetica", "normal");
    doc.text("Name - Panorama Software Solutions", 32, 65);
    doc.text("Account No - 50200035450418", 32, 69);
    doc.text("IFSC Code - HDFC0002253", 32, 73);
    doc.setFont("helvetica", "bold");
    // Invoice Info-----------------------------
    doc.setFontSize(8.8);
    doc.text(`Date of Invoice: `, 130, 60.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${commonDataForPdf.dateOfInvoice ? commonDataForPdf.dateOfInvoice : ""}`,
      154.6,
      60.5
    );
    // ${day}/${month > 9 ? month : `0${month}`}/${year}
    doc.setFont("helvetica", "bold");
    doc.text("GSTIN: ", 130, 67);
    doc.setFont("helvetica", "normal");
    doc.text("03AAWFP4507D1ZB", 141.8, 67);
    doc.setFont("helvetica", "bold");
    doc.text("PAN: ", 130, 73.5);
    doc.setFont("helvetica", "normal");
    doc.text("AAWFP4507D", 139, 73.5);
    doc.setFontSize(10);
    // // Bill To-------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text("BILL TO", 34, 85.5).rect(32, 81, 52, 7);
    doc.setFontSize(12);
    // doc.text('One two three', 10, 100);

    // To-Adress ----------------------------
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `${commonDataForPdf.companyName ? commonDataForPdf.companyName : ""}`,
      30,
      98
    );

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`${commonDataForPdf.add1 ? commonDataForPdf.add1 : ""}`, 30, 106);
    doc.text(`${commonDataForPdf.add2 ? commonDataForPdf.add2 : ""}`, 30, 110);
    doc.text(
      `${commonDataForPdf.state ? commonDataForPdf.state : ""}`,
      30,
      114
    );

    // Gst IN --------------------------------
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("GSTIN: ", 30, 122);
    doc.text(
      `${commonDataForPdf.gstIn ? commonDataForPdf.gstIn : ""}`,
      43,
      122
    );

    doc.setFontSize(9);
    // main table ---------------------------- // START // ------------------------------------- //
    // doc.rect(30, 130, 165, 42);
    //      ( x   y    w   h ) 42
    // doc.rect(30, 137, 165, 14);  h=> 35 - 21 == 14

    // -----------divider for heading --------------------- //
    // doc.line(30, 137, 195, 137);
    //       xst.yst.xend.yend.

    doc.setFont("helvetica", "bold");

    // MAIN TABLE HERE...***...***...***...***...***...***

    const startY = 130; // Initial Y pos.
    const rowHeight = 14; // Height row
    const numRows = resourcesArr.length;
    const tableHeight = rowHeight * numRows + 25; // calc. dynamic table height
    const totalTableHeight = startY + tableHeight;

    // Draw Table Rectangle ~dynamic~
    doc.rect(30, startY, 165, tableHeight);

    // Heading Divider -------------
    doc.line(30, startY + 7, 195, startY + 7); // Divider below headings

    // Vertical Dividers -----------------
    doc.line(130, startY, 130, totalTableHeight);
    doc.line(160, startY, 160, totalTableHeight);

    // Table Headings --------------------
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    doc.text("DESCRIPTION", 66, startY + 5);
    doc.text("SAC CODE", 135, startY + 5);
    doc.text("AMOUNT", 169, startY + 5);

    // Draw Rows for Each Resource
    resourcesArr.forEach((res, index) => {
      let currentY;

      currentY = startY + 11 + index * rowHeight;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(
        `Consultancy charges ${res.username} on ${res.workingOn} (${res.userId})`,
        31.5,
        currentY
      );
      doc.text(`(${res.fromDate} - ${res.toDate})`, 31.5, currentY + 3.3);

      doc.setFont("helvetica", "bold");
      doc.text(
        `${res.days} Days * ${res.hours} Hours * ${res.payPerDay} ${
          commonDataForPdf.currencyType ? commonDataForPdf.currencyType : "INR"
        }`,
        31.5,
        currentY + 6.7
      );

      doc.setFont("helvetica", "normal");
      const temp = res.payPerDay * res.days;
      doc.text(temp.toString(), 173, currentY + 3.3);

      doc.text(
        `${
          commonDataForPdf.currencyType ? commonDataForPdf.currencyType : "INR"
        }`,
        185,
        currentY + 3.3
      );
      // ------- SAC CODE ----------------//
      doc.text(`${res.sacCode}`, 141, currentY + 3.3);

      // Draw line below each row (won't be for last one)
      if (index < numRows - 1) {
        doc.line(30, currentY + 10, 195, currentY + 10);
      }
    });

    // Subtotal, IGST, and Total Positioning
    const subtotalY = totalTableHeight - 10;
    const igstY = subtotalY + 7;
    const totalY = igstY + 7;

    doc.line(30, subtotalY - 9, 195, subtotalY - 9); // Divider for subtotal -------------------

    doc.text("SUBTOTAL", 31.5, subtotalY - 5);
    doc.text(totals.subTotal.toString(), 173, subtotalY - 5);
    doc.text(
      `${
        commonDataForPdf.currencyType ? commonDataForPdf.currencyType : "INR"
      }`,
      185,
      subtotalY - 5
    );

    doc.line(30, igstY - 10, 195, igstY - 10); // Divider for IGSTb ------------------
    doc.text(
      `IGST ${
        commonDataForPdf.gstRate ? `${commonDataForPdf.gstRate}%` : "N/A"
      }`,
      31.5,
      igstY - 6
    );
    doc.text(totals.igst.toString(), 173, igstY - 6);
    doc.text(
      `${
        commonDataForPdf.currencyType ? commonDataForPdf.currencyType : "INR"
      }`,
      185,
      igstY - 6
    );

    doc.line(30, totalY - 10.5, 195, totalY - 10.5); // Divider for TOTAL ------------------
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", 31.5, totalY - 6.5);
    doc.text(totals.total.toString(), 173, totalY - 6.5);
    doc.text(
      `${
        commonDataForPdf.currencyType ? commonDataForPdf.currencyType : "INR"
      }`,
      185,
      totalY - 6.5
    );

    // Thank You Message Position --------------------
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Thanks for your business.", 28, totalY + 8);

    // -----------------------blob preview-----------------//

    if (status == "active") {
      doc.save(
        `${
          commonDataForPdf.companyName
            ? `${commonDataForPdf.companyName}.pdf`
            : "Invoice.pdf"
        }`
      );
    }

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
  }, [inputText, resourcesArr]);

  return (
    <div>
      <DashboardPdf />
      <div
        className={`bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5`}
      >
        {errorMessage ? <ErrorComponent /> : null}
        <button
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
        {isPdfPreviewVisible ? (
          <>
            <div className="relative h-10 w-full mb-5">
              <p className="absolute top-0 right-28 w-22 mx-5 p-2 ">
                can't see preview?{" "}
              </p>
              <button
                onClick={handleFileSave}
                className="absolute top-0 right-0 w-22 mx-5 border boder-black p-2 text-sm rounded-lg bg-slate-600 text-white "
              >
                Download PDF
              </button>
            </div>
            <iframe
              src={pdfUrl}
              style={{ width: "100%", height: "800px" }}
              frameBorder="0"
              title="PDF Preview"
            ></iframe>
          </>
        ) : (
          <div className="mx-2">
            Please upload and Generate PDF to see preview
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePDF;

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
