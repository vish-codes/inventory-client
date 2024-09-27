import { useEffect, useState } from "react";

const PayslipForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    bankName: "",
    payDate: "",
    totalPay: "",
    basicPay: "",
    houseRentAllowance: "",
    projectAllowance: "",
    medicalAllowance: "",
    conveyanceAllowance: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("the target is here :", e.target.name);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.totalPay) {
      const totalPay = parseFloat(formData.totalPay);
      const basicPay = totalPay * 0.85;
      const houseRentAllowance = totalPay * 0.05333;
      const projectAllowance = totalPay * 0.03667;
      const medicalAllowance = totalPay * 0.04333;
      const conveyanceAllowance = totalPay * 0.03333;

      setFormData({
        ...formData,
        basicPay: formatCurrency(basicPay),
        houseRentAllowance: formatCurrency(houseRentAllowance),
        projectAllowance: formatCurrency(projectAllowance),
        medicalAllowance: formatCurrency(medicalAllowance),
        conveyanceAllowance: formatCurrency(conveyanceAllowance),
        netPay: formatCurrency(totalPay),
        totalPay: formatCurrency(totalPay),
      });
    }
  }, [formData.totalPay]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
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
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Payslip Details
      </h2>
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
              htmlFor="payDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              id="payDate"
              value={formData.payDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
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
          <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="basicPay" className="block text-sm font-medium text-gray-700 mb-1">
            Basic Pay
          </label>
          <input
            type="number"
            name="basicPay"
            id="basicPay"
            value={formData.basicPay}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="houseRentAllowance" className="block text-sm font-medium text-gray-700 mb-1">
            House Rent Allowance
          </label>
          <input
            type="number"
            name="houseRentAllowance"
            id="houseRentAllowance"
            value={formData.houseRentAllowance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label htmlFor="projectAllowance" className="block text-sm font-medium text-gray-700 mb-1">
            Project Allowance
          </label>
          <input
            type="number"
            name="projectAllowance"
            id="projectAllowance"
            value={formData.projectAllowance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="medicalAllowance" className="block text-sm font-medium text-gray-700 mb-1">
            Medical Allowance
          </label>
          <input
            type="number"
            name="medicalAllowance"
            id="medicalAllowance"
            value={formData.medicalAllowance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="conveyanceAllowance" className="block text-sm font-medium text-gray-700 mb-1">
            Conveyance Allowance
          </label>
          <input
            type="number"
            name="conveyanceAllowance"
            id="conveyanceAllowance"
            value={formData.conveyanceAllowance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Payslip
          </button>
        </div>
      </form>
    </div>
  );
};

const renderPreview = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Preview</h3>
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
        <strong>Pay Date:</strong> {formData.payDate}
      </p>
      <p>
        <strong>Total Pay:</strong> {formatCurrency(formData.totalPay)}
      </p>
      <p>
        <strong>Basic Pay:</strong> {formatCurrency(formData.basicPay)}
      </p>
      <p>
        <strong>House Rent Allowance:</strong>{" "}
        {formatCurrency(formData.houseRentAllowance)}
      </p>
      <p>
        <strong>Project Allowance:</strong>{" "}
        {formatCurrency(formData.projectAllowance)}
      </p>
      <p>
        <strong>Medical Allowance:</strong>{" "}
        {formatCurrency(formData.medicalAllowance)}
      </p>
      <p>
        <strong>Conveyance Allowance:</strong>{" "}
        {formatCurrency(formData.conveyanceAllowance)}
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
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pano-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Payslip
      </button>
    </div>
  </div>);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Payslip Details
      </h2>
      {showPreview ? renderPreview() : renderForm()}
    </div>
  );


export default PayslipForm;
