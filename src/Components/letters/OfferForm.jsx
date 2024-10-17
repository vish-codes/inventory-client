import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const OfferForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    joiningDate: "",
    letterDate: "",
    probationPeriod: 6,
    bondPeriod: 2,
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      joiningDate: formatDate(formData.joiningDate),
      letterDate: formatDate(formData.letterDate),
    };
    onSubmit(formattedData);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "do MMMM yyyy");
  };

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-lg text-center font-medium text-gray-900">Preview</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Designation:</strong> {formData.designation}
        </p>
        <p>
          <strong>Joining Date:</strong> {formatDate(formData.joiningDate)}
        </p>
        <p>
          <strong>Letter Date:</strong> {formatDate(formData.letterDate)}
        </p>
        <p>
          <strong>Probation Period:</strong> {formData.probationPeriod} months
        </p>
        <p>
          <strong>Bond Period:</strong> {formData.bondPeriod} years
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
          Generate Offer Letter
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handlePreview} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
            
          />
        </div>
        <div>
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Designation
          </label>
          <input
            type="text"
            name="designation"
            id="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="joiningDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Joining Date
          </label>
          <DatePicker
            selected={formData.joiningDate}
            onChange={(date) => handleDateChange(date, "joiningDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            
          />
        </div>
        <div>
          <label
            htmlFor="letterDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Letter Date
          </label>
          <DatePicker
            selected={formData.letterDate}
            onChange={(date) => handleDateChange(date, "letterDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            
          />
        </div>
        <div>
          <label
            htmlFor="probationPeriod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Probation Period (months)
          </label>
          <input
            type="number"
            name="probationPeriod"
            id="probationPeriod"
            value={formData.probationPeriod}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            
          />
        </div>
        <div>
          <label
            htmlFor="bondPeriod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bond Period (years)
          </label>
          <input
            type="number"
            name="bondPeriod"
            id="bondPeriod"
            value={formData.bondPeriod}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            
          />
        </div>
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
        Offer Letter Details
      </h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );
};

export default OfferForm;
