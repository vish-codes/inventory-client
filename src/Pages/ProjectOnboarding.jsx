import React, { useState, useEffect } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const ProjectOnboarding = () => {
  const [formData, setFormData] = useState({
    name: "",
    client_id: "",
    emp_id: "",
    billing_amt: "",
    billing_method: "days",
    overtime_amt: "",
    active: true,
  });

  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // ✅ Fetch clients and employees for dropdowns
  useEffect(() => {
    fetchClients();
    fetchEmployees();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/clients");
      const data = await res.json();
      if (res.ok) setClients(data);
    } catch (error) {
      console.error("❌ Failed to fetch clients:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee");
      const data = await res.json();
      if (res.ok) setEmployees(data);
    } catch (error) {
      console.error("❌ Failed to fetch employees:", error);
    }
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOpenForm = () => setShowForm(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
    setShowForm(false);
  };

  const handleEdit = () => {
    setShowPreview(false);
    setShowForm(true);
  };

  // ✅ Submit to backend (integrated API)
  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        client_id: Number(formData.client_id),
        emp_id: Number(formData.emp_id),
        billing_amt: Number(formData.billing_amt),
        billing_method: formData.billing_method,
        overtime_amt: formData.overtime_amt
          ? Number(formData.overtime_amt)
          : 0,
        active: formData.active,
      };

      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Project created successfully!");
        console.log("Created Project:", data.project);
        setFormData({
          name: "",
          client_id: "",
          emp_id: "",
          billing_amt: "",
          billing_method: "days",
          overtime_amt: "",
          active: true,
        });
      } else {
        alert(`❌ ${data.message || "Failed to create project"}`);
      }
    } catch (error) {
      console.error("❌ Error creating project:", error);
      alert("❌ Network or server error while creating project.");
    } finally {
      setLoading(false);
      setShowPreview(false);
      setShowForm(false);
    }
  };

  return (
    <div className="mx-auto">
      <DashboardPdf />
      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Project Onboarding
        </h1>

        {!showForm && !showPreview && (
          <div className="flex justify-end">
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md shadow"
            >
              Add Entry
            </button>
          </div>
        )}

        {/* ✅ Project Form */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client */}
              <div>
                <label className="block font-medium text-gray-700">Client</label>
                <select
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee */}
              <div>
                <label className="block font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Base Amount */}
              <div>
                <label className="block font-medium text-gray-700">
                  Base Amount
                </label>
                <input
                  type="number"
                  name="billing_amt"
                  value={formData.billing_amt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              {/* Overtime Amount */}
              <div>
                <label className="block font-medium text-gray-700">
                  Overtime Amount
                </label>
                <input
                  type="number"
                  name="overtime_amt"
                  value={formData.overtime_amt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Billing Method */}
            <div>
              <label className="block font-medium text-gray-700">
                Billing Method
              </label>
              <select
                name="billing_method"
                value={formData.billing_method}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="month">Month</option>
              </select>
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label className="font-medium text-gray-700">Active</label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md shadow"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ✅ Preview Section */}
        {showPreview && (
  <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 mt-4">
    <h2 className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Project Preview
    </h2>

    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base">
      <dt className="font-semibold text-gray-700">Project Name:</dt>
      <dd className="text-gray-900">{formData.name || "-"}</dd>

      <dt className="font-semibold text-gray-700">Client:</dt>
      <dd className="text-gray-900">
        {clients.find((c) => c.id === Number(formData.client_id))?.name || "-"}
      </dd>

      <dt className="font-semibold text-gray-700">Employee:</dt>
      <dd className="text-gray-900">
        {employees.find((e) => e.id === Number(formData.emp_id))?.name || "-"}
      </dd>

      <dt className="font-semibold text-gray-700">Base Amount:</dt>
      <dd className="text-gray-900">{formData.billing_amt || "-"}</dd>

      <dt className="font-semibold text-gray-700">Overtime Amount:</dt>
      <dd className="text-gray-900">{formData.overtime_amt || "-"}</dd>

      <dt className="font-semibold text-gray-700">Billing Method:</dt>
      <dd className="capitalize text-gray-900">{formData.billing_method || "-"}</dd>

      <dt className="font-semibold text-gray-700">Active:</dt>
      <dd className={`font-semibold ${formData.active ? "text-green-600" : "text-red-600"}`}>
        {formData.active ? "Yes" : "No"}
      </dd>
    </dl>

    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow transition"
      >
        Edit
      </button>
      <button
        onClick={handleFinalSubmit}
        disabled={loading}
        className={`px-4 py-2 font-semibold rounded-lg shadow transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ProjectOnboarding;
