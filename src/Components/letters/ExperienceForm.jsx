import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

import { format } from "date-fns";

const ExperienceForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    date: "",
    enddate: "",
    gender: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, enddate: date });
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
      enddate: formatDate(formData.enddate),
    };
    onSubmit(formattedData);
    Swal.fire({
      icon: "success",
      title: "Experience Letter Generated!",
      showConfirmButton: false,
      timer: 2000,
      backdrop: `
        rgba(0, 0, 0, 0.4)  /* Semi-transparent dark backdrop */
      `,
      customClass: {
        popup: 'swal2-no-blur',
      }
    });
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
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Designation:</strong> {formData.designation}</p>
        <p><strong>Start Date:</strong> {formatDate(formData.date)}</p>
        <p><strong>End Date:</strong> {formatDate(formData.enddate)}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
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
    <form onSubmit={handlePreview} className="space-y-1">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Employee Name :
        </label>
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
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
          Designation :
        </label>
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
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender :
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Effective Start Service Date :
        </label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Click here to select date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">
          End Service Date :
        </label>
        <DatePicker
          selected={formData.enddate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Click here to select date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="addPvtLtd"
          name="addPvtLtd"
          checked={formData.addPvtLtd}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              addPvtLtd: e.target.checked,
            }))
          }
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="addPvtLtd"
          className="text-sm font-medium text-gray-700"
        >
          Optional: Add "Pvt Ltd." in company name?
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
        Experience Letter Details
      </h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );
};

export default ExperienceForm;
