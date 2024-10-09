import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import DashboardPdf from "../DashboardPdf";
import { ToWords } from "to-words";
import ApperaisalForm from "./ApperaisalForm";
import NavBarLetters from "./NavBarLetters";
// import { format } from 'date-fns';

const Offer = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const addHeaderFooter = (doc) => {
      // Add header (company logo, name, and address)
      const logoPath = "../images/panorama.png";
      doc.addImage(logoPath, "PNG", 10, 12, 69, 14, { align: "left" });

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
      doc.text("Website: www.panoramasoftwares.com", 200, 36, {
        align: "right",
      });

      // Add dividers
      doc.setDrawColor(12, 112, 137);
      doc.line(10, 40, 200, 40);
      doc.line(10, 287, 200, 287);

      // Add footer
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Unit no - 621-622, 6th Floor, Tower 1, Assotech Business Cresterra, Sector 135, Noida - 201304, Uttar Pradesh",
        105,
        292,
        { align: "center" }
      );
      doc.text("Classification: Confidential", 105, 297, { align: "center" });
    };

    const addContent = (doc, data) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);

      // Add recipient name and date
      doc.text(`Dear ${data.name},`, 20, 55);
      //   doc.text(`Date: ${format(new Date(data.date), 'dd MMMM, yyyy')}`, 150, 55);

      // Add Job Offer Letter title
      doc.setFont("helvetica", "bold");
      doc.text("Job Offer Letter", 105, 65, { align: "center" });

      doc.setFont("helvetica", "normal");
      let y = 75;

      // Add offer details
      doc.text(
        `We are pleased to offer you the position of ${data.position} with Panorama Software Solutions.`,
        20,
        y
      );
      y += 5;
      //   doc.text(`Your joining date will be the ${format(new Date(data.joiningDate), 'do of MMMM yyyy')}, on the following terms and conditions:`, 20, y);

      // Add offer terms
      const terms = [
        {
          title: "Designation:",
          content: `Your present designation is ${data.position} we may change this designation from time to time, to reflect a change in your responsibilities.`,
        },
        {
          title: "Emoluments:",
          content:
            "You will be paid a monthly salary as discussed with you. Details will be provided in the Appointment Letter after your joining. We will review these emoluments annually, based on your performance, attitude to work, and conformance with other terms and conditions of employment; but we shall be under no obligation to increase them.",
        },
        {
          title: "Probation:",
          content:
            "You will be on probation for the first 6 months, the period of probation may be extended, at our sole discretion, for a further period of 6 months depending on your performance. We will issue a written probation extension notice for any extension beyond the first 6 months. During the probation period, the company is at liberty to terminate the service at any time by giving 30 days' notice.",
        },
        {
          title: "Termination",
          content:
            " We reserve the right to terminate your services by giving you 30 days notice or by paying 15 days in lieu of on the basis of your performance. However, if Any information given by you at the time of your interview is found to be false or incorrect or in case of any Professional misconduct or non-performance, yourservices are liableto be terminated without any notice or Payment of salary in lieu of",
        },
        {
          title: "Leave",
          content:
            " You will be allowed to leave based on the policies in force at the time. Presently, you are entitled to 12 working days leave each year. Leave will accrue from the date of joining but can be availed only after Confirmation. You are expected to take prior approval before going on leave. If you are absent from work from Home without prior permission, or you overstay your leave or take more leaves than you are entitled to, we Shall be at the liberty to treat you as voluntarily having abandoned the service of the company. While working On the client side, you will be following the holiday calendar of the client.",
        },
        {
          title: "Other employment",
          content:
            " You will not, while working at Panorama Software solutions, undertake directly or indirectly employment with, or provision of paid services or material unpaid involvement with any other Organization, without express permission from us. Doing so will be cause for immediate dismissal. Involvement with any other organization, without express permission from us. Doing so will cause immediate dismissal and take legal action.",
        },
      ];

      terms.forEach((term, index) => {
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${term.title}`, 20, y);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(term.content, 170);
        doc.text(lines, 20, y + 5);
        y += 5 * lines.length;
      });

      // Add second page if needed
      if (y > 270) {
        doc.addPage();
        addHeaderFooter(doc);
        y = 50;
      }

      // Add signature lines
      y = Math.max(y, 230);
      doc.text("Sincerely,", 20, y);
      y += 20;
      doc.line(20, y, 80, y);
      doc.text("HR Executive", 20, y + 5);
      doc.text("Panorama Software Solutions", 20, y + 10);
      doc.text("Noida, UP, India", 20, y + 15);

      doc.line(130, y, 190, y);
      doc.text("Employee", 130, y + 5);
    };

    // Add content to first page
    addHeaderFooter(doc);
    addContent(doc, data);

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

export default Offer;
