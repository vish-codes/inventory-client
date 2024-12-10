
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { format } from "date-fns";
import '../../App.css'; 

const AppointmentForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    date: "",
    salary: "",
    issuedate: ""
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative salary
    if (name === "salary" && value < 0) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name) => (date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date: formatDate(formData.date),
      issuedate: formatDate(formData.issuedate),
    };
    onSubmit(formattedData);
    Swal.fire({
      icon: "success",
      title: "Appointment Letter Generated!",
      showConfirmButton: false,
      timer: 2000,
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'swal2-no-blur', 
      }
    });
  };

  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if date is invalid
    return format(new Date(date), "dd MMMM yyyy"); // Format date as needed
  };

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-lg text-center font-medium text-gray-900">Preview</h3>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Designation:</strong> {formData.designation}</p>
        <p><strong>Effective Starting Date:</strong> {formatDate(formData.date)}</p>
        <p><strong>Salary:</strong> {formData.salary}</p>
        <p><strong>Issue Date:</strong> {formatDate(formData.issuedate)}</p>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-pano-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Experience Letter
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handlePreview} className="space-y-2">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Employee Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Employee Designation:</label>
        <input
          type="text"
          name="designation"
          id="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Eg. Software Engineer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Effective Joining Date:</label>
        <DatePicker
          selected={formData.date ? new Date(formData.date) : null}
          onChange={handleDateChange("date")}
          dateFormat="dd/MM/yyyy"
          placeholderText="Click here to select date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary : (per annum)</label>
        <input
          type="number"
          name="salary"
          id="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter here salary"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="issuedate" className="block text-sm font-medium text-gray-700 mb-1">Issue Date:</label>
        <DatePicker
          selected={formData.issuedate ? new Date(formData.issuedate) : null}
          onChange={handleDateChange("issuedate")}
          dateFormat="dd/MM/yyyy"
          placeholderText="Click here to select date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          aria-label="Preview appointment letter details"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-pano-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Preview
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Appointment Letter Details</h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );
};

export default AppointmentForm;
