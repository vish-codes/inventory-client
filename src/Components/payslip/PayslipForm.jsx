import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfMonth } from "date-fns"; // Make sure to import this

const PayslipForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    bankName: "",
    payDate: new Date(),
    totalPay: "",
    basicPay: "",
    houseRentAllowance: "",
    projectAllowance: "",
    medicalAllowance: "",
    conveyanceAllowance: "",
    tds: "", // Add this new field
    netPay: "", // Add this field to store the net pay after TDS deduction
    includePvtLtd: true, // Add this new field
    payPeriod: new Date(),
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      payDate: date,
      payPeriod: startOfMonth(date),
    });
  };

  const handlePayPeriodChange = (date) => {
    setFormData({ ...formData, payPeriod: startOfMonth(date) });
  };

  /*
  function calculateValues(originalAmount) {
  const basicPayPercentage = 0.8333333333333334
  const HouseRentAllowance = 0.05333333333333334
  const projectAllowance = 0.03666666666666667
  const medicalAllowance = 0.043333333333333335
  const conveyanceAllowance = 0.03333333333333333 
  
  const basicPay = originalAmount * basicPayPercentage;
  const value1 = originalAmount * HouseRentAllowance;
  const value2 = originalAmount * projectAllowance;
  const value3 = originalAmount * medicalAllowance;
  const value4 = originalAmount * conveyanceAllowance;

  return {
    basicPay: basicPay.toFixed(2),
    value1: value1.toFixed(2),
    value2: value2.toFixed(2),
    value3: value3.toFixed(2),
    value4: value4.toFixed(2),
  };
}

// Example usage:
const originalAmount = 60;
const result = calculateValues(originalAmount);
console.log(result);

   */

  useEffect(() => {
    function calculateValues() {
      if (!formData.totalPay) return;

      const totalPay = parseFloat(formData.totalPay);
      const tds = parseFloat(formData.tds) || 0;

      let basicPay,
        houseRentAllowance,
        projectAllowance,
        medicalAllowance,
        conveyanceAllowance;

      if (totalPay < 25000) {
        // Fixed allowances for salaries below 25000
        houseRentAllowance = 1600;
        projectAllowance = 1100;
        medicalAllowance = 1300;
        conveyanceAllowance = 1000;

        // Calculate basic pay as the remaining amount
        basicPay =
          totalPay -
          (houseRentAllowance +
            projectAllowance +
            medicalAllowance +
            conveyanceAllowance);

        // Ensure basic pay is not negative
        basicPay = Math.max(basicPay, 0);
      } else {
        // Percentage-based calculation for salaries 25000 and above
        const basicPayPercentage = 0.8;
        const houseRentAllowancePercentage = 0.06;
        const projectAllowancePercentage = 0.05;
        const medicalAllowancePercentage = 0.055;
        const conveyanceAllowancePercentage = 0.035;

        // Calculate all values
        basicPay = Math.round(totalPay * basicPayPercentage);
        houseRentAllowance = Math.round(
          totalPay * houseRentAllowancePercentage
        );
        projectAllowance = Math.round(totalPay * projectAllowancePercentage);
        medicalAllowance = Math.round(totalPay * medicalAllowancePercentage);
        conveyanceAllowance = Math.round(
          totalPay * conveyanceAllowancePercentage
        );

        // Calculate the sum of all components
        const sum =
          basicPay +
          houseRentAllowance +
          projectAllowance +
          medicalAllowance +
          conveyanceAllowance;

        // Adjust basic pay to ensure the total matches
        basicPay += totalPay - sum;
      }

      const netPay = totalPay - tds;

      setFormData((prevData) => ({
        ...prevData,
        basicPay: basicPay,
        houseRentAllowance: houseRentAllowance,
        projectAllowance: projectAllowance,
        medicalAllowance: medicalAllowance,
        conveyanceAllowance: conveyanceAllowance,
        netPay: netPay,
        totalPay: totalPay,
      }));
    }

    calculateValues();
  }, [formData.totalPay, formData.tds]); // Add formData.tds as a dependency

  // Separate function for formatting currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      payDate: formatDate(formData.payDate),
      payPeriod: formatPayPeriod(formData.payPeriod),
    };
    onSubmit(formattedData);
    console.log(formattedData);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPayPeriod = (date) => {
    if (!date) return "";
    return format(date, "MMMM yyyy");
  };

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-lg text-center font-medium text-gray-900">Preview</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Employee ID:</strong> {formData.empId}
        </p>
        <p>
          <strong>Bank Name:</strong> {formData.bankName}
        </p>
        <p>
          <strong>Pay Date:</strong> {formatDate(formData.payDate)}
        </p>
        <p>
          <strong>Pay Period:</strong> {formatPayPeriod(formData.payPeriod)}
        </p>
        <p>
          <strong>Total Pay:</strong> {formData.totalPay}
        </p>
        <p>
          <strong>Basic Pay:</strong> {formData.basicPay}
        </p>
        <p>
          <strong>House Rent Allowance:</strong> {formData.houseRentAllowance}
        </p>
        <p>
          <strong>Project Allowance:</strong> {formData.projectAllowance}
        </p>
        <p>
          <strong>Medical Allowance:</strong> {formData.medicalAllowance}
        </p>
        <p>
          <strong>Conveyance Allowance:</strong> {formData.conveyanceAllowance}
        </p>
        <p>
          <strong>TDS:</strong> {formData.tds}
        </p>
        <p>
          <strong>Net Pay:</strong> {formData.netPay}
        </p>
        <p>
          <strong>Include "Pvt Ltd":</strong>{" "}
          {formData.includePvtLtd ? "Yes" : "No"}
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
          Generate Payslip
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
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
            htmlFor="empId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Employee ID
          </label>
          <input
            type="text"
            name="empId"
            id="empId"
            value={formData.empId}
            onChange={handleChange}
            placeholder="EMP123"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="bankName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            id="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="HDFC Bank"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="payPeriod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pay Period
            </label>
            <DatePicker
              selected={formData.payPeriod}
              onChange={handlePayPeriodChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="payDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pay Date
            </label>
            <DatePicker
              selected={formData.payDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Click to select date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="totalPay"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Total Pay
          </label>
          <input
            type="number"
            name="totalPay"
            id="totalPay"
            value={formData.totalPay}
            onChange={handleChange}
            placeholder="Enter Total Pay"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tds"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            TDS
          </label>
          <input
            type="number"
            name="tds"
            id="tds"
            value={formData.tds}
            onChange={handleChange}
            placeholder="Enter TDS"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        <div>
          <label
            htmlFor="basicPay"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Basic Pay
          </label>
          <input
            type="number"
            name="basicPay"
            id="basicPay"
            value={formData.basicPay}
            onChange={handleChange}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
        <div>
          <label
            htmlFor="houseRentAllowance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            House Rent Allowance
          </label>
          <input
            type="number"
            name="houseRentAllowance"
            id="houseRentAllowance"
            value={formData.houseRentAllowance}
            onChange={handleChange}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="projectAllowance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Allowance
          </label>
          <input
            type="number"
            name="projectAllowance"
            id="projectAllowance"
            value={formData.projectAllowance}
            onChange={handleChange}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
        <div>
          <label
            htmlFor="medicalAllowance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Medical Allowance
          </label>
          <input
            type="number"
            name="medicalAllowance"
            id="medicalAllowance"
            value={formData.medicalAllowance}
            onChange={handleChange}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
        <div>
          <label
            htmlFor="conveyanceAllowance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Conveyance Allowance
          </label>
          <input
            type="number"
            name="conveyanceAllowance"
            id="conveyanceAllowance"
            value={formData.conveyanceAllowance}
            onChange={handleChange}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label
            htmlFor="netPay"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Net Pay
          </label>
          <input
            type="number"
            name="netPay"
            id="netPay"
            value={formData.netPay}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="includePvtLtd"
          name="includePvtLtd"
          checked={formData.includePvtLtd}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="includePvtLtd"
          className="text-sm font-medium text-gray-700"
        >
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
          type="button"
          onClick={handlePreview}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-pano-dark-blue  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Preview
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Payslip Details
      </h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );
};

export default PayslipForm;
