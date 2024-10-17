import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ApperaisalForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    date: "",
    includePvtLtd: true, // Add this new field
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
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
    };
    onSubmit(formattedData);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-lg text-center font-medium text-gray-900">Preview</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>New Salary:</strong> ₹
          {parseFloat(formData.salary).toLocaleString("en-IN")}
        </p>
        <p>
          <strong>Effective Date:</strong> {formatDate(formData.date)}
        </p>
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
          Generate Appraisal Letter
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handlePreview} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Employee Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          New Salary (per annum)
        </label>
        <input
          type="number"
          name="salary"
          id="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter new salary"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Effective Date
        </label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Click to select date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="includePvtLtd"
          name="includePvtLtd"
          checked={formData.includePvtLtd}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="includePvtLtd" className="text-sm font-medium text-gray-700">
          Include "Pvt Ltd" in company name?
        </label>
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
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-pano-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Preview
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Appraisal Letter Details
      </h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );
};

export default ApperaisalForm;
