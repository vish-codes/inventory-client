import { useState } from "react";
import { callForHello } from "./PaySlip";

const PayrollForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    bankName: "",
    payDate: "",
    totalPay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("the target is here :", e.target.name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    callForHello();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">PaySlip Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Employee ID Field */}
        <div>
          <label
            htmlFor="empId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee ID
          </label>
          <input
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Bank Name Field */}
        <div>
          <label
            htmlFor="bankName"
            className="block text-sm font-medium text-gray-700"
          >
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter Bank Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Pay Date Field */}
        <div>
          <label
            htmlFor="payDate"
            className="block text-sm font-medium text-gray-700"
          >
            Pay Date
          </label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Total Pay Field */}
        <div>
          <label
            htmlFor="totalPay"
            className="block text-sm font-medium text-gray-700"
          >
            Total Pay
          </label>
          <input
            type="number"
            name="totalPay"
            value={formData.totalPay}
            onChange={handleChange}
            placeholder="Enter Total Pay"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollForm;
