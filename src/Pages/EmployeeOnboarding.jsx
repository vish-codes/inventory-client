import { useState, useEffect } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const API_URL = "http://localhost:3000/api/employee";

const emptyForm = {
  name: "",
  position: "",
  working_on: "",
  emp_code: "",
};

const EmployeeOnboarding = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setShowPreview(false);
  };

  const handleEditEmployee = (emp) => {
    setFormData({
      name: emp.name || "",
      position: emp.position || "",
      working_on: emp.working_on || "",
      emp_code: emp.emp_code || "",
    });
    setEditingId(emp.id);
    setShowForm(true);
    setShowPreview(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
    setShowForm(false);
  };

  const handleEditPreview = () => {
    setShowPreview(false);
    setShowForm(true);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      if (!res.ok) throw new Error("Operation failed");
      await fetchEmployees();
      setShowPreview(false);
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchEmployees();
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <DashboardPdf />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Employee Onboarding
        </h1>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {loading && <div className="text-blue-600 mb-3">Loading...</div>}

        {/* Add Button */}
        {!showForm && !showPreview && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md shadow"
            >
              + Add Employee
            </button>
          </div>
        )}

        {/* Employee Table */}
        {!showForm && !showPreview && (
          <div className="overflow-x-auto pb-8">
            <table className="min-w-full border text-center">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Position</th>
                  <th className="p-2 border">Working On</th>
                  <th className="p-2 border">Emp Code</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-3">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="border p-1">{emp.id}</td>
                      <td className="border p-1">{emp.name}</td>
                      <td className="border p-1">{emp.position || "-"}</td>
                      <td className="border p-1">{emp.working_on || "-"}</td>
                      <td className="border p-1">{emp.emp_code || "-"}</td>
                      <td className="border p-1">
                        <button
                          className="mr-2 px-2 py-1 text-blue-700 hover:underline"
                          onClick={() => handleEditEmployee(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-600 hover:underline"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteId && (
          <div className="mb-6 bg-yellow-50 p-4 rounded flex flex-col gap-2 border border-yellow-200">
            <span>Are you sure you want to delete employee ID {deleteId}?</span>
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-700 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                placeholder="Enter position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Working On
              </label>
              <input
                type="text"
                name="working_on"
                placeholder="Project/Department"
                value={formData.working_on}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Employee Code
              </label>
              <input
                type="text"
                name="emp_code"
                placeholder="Enter employee code"
                value={formData.emp_code}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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
                onClick={() => {
                  setShowForm(false);
                  setFormData(emptyForm);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Preview */}
        {showPreview && (
          <div className="bg-gray-50 border p-4 rounded">
            <h2 className="font-bold text-lg mb-3 text-blue-700">Preview</h2>
            <dl className="mb-4 grid grid-cols-2 gap-y-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{formData.name}</dd>
              <dt className="font-semibold">Position:</dt>
              <dd>{formData.position || "-"}</dd>
              <dt className="font-semibold">Working On:</dt>
              <dd>{formData.working_on || "-"}</dd>
              <dt className="font-semibold">Employee Code:</dt>
              <dd>{formData.emp_code || "-"}</dd>
            </dl>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditPreview}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-800 text-white font-semibold rounded-md shadow"
              >
                Edit
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white font-semibold rounded-md shadow"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeOnboarding;
