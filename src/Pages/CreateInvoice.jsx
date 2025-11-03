import { useState, useEffect } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const API_URL = "http://localhost:3000/api/projects";

const BILLING_METHODS = ["days", "hours", "month"];

const emptyForm = {
  name: "",
  client_id: "",
  emp_id: "",
  billing_amt: "",
  active: true,
  billing_method: "days",
  overtime_amt: "",
};

const CreateInvoice = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      // API might return {message, projects: []}; handle both cases
      const rows = Array.isArray(data)
        ? data
        : Array.isArray(data.projects)
        ? data.projects
        : [];
      setProjects(rows);
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

  const handleEdit = (p) => {
    setFormData({
      name: p.name || "",
      client_id: p.client_id?.toString?.() || "",
      emp_id: p.emp_id?.toString?.() || "",
      billing_amt: p.billing_amt?.toString?.() || "",
      active: typeof p.active === "boolean" ? p.active : true,
      billing_method: BILLING_METHODS.includes(p.billing_method)
        ? p.billing_method
        : "days",
      overtime_amt: p.overtime_amt?.toString?.() || "",
    });
    setEditingId(p.id);
    setShowForm(true);
    setShowPreview(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "active" && type === "checkbox") {
      setFormData((prev) => ({ ...prev, active: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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
      const payload = {
        name: formData.name,
        client_id: Number(formData.client_id),
        emp_id: Number(formData.emp_id),
        billing_amt:
          formData.billing_amt === "" ? 0 : Number(formData.billing_amt),
        active: !!formData.active,
        billing_method: BILLING_METHODS.includes(formData.billing_method)
          ? formData.billing_method
          : "days",
        overtime_amt:
          formData.overtime_amt === "" ? 0 : Number(formData.overtime_amt),
      };
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Operation failed");
      }
      await fetchProjects();
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
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }
      await fetchProjects();
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
          Project Management
        </h1>
        {error && (
          <div className="text-red-600 mb-3 whitespace-pre-wrap">{error}</div>
        )}
        {loading && <div className="text-blue-600 mb-3">Loading...</div>}

        {!showForm && !showPreview && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md shadow"
            >
              Add Project
            </button>
          </div>
        )}

        {!showForm && !showPreview && (
          <div className="overflow-x-auto pb-8">
            <table className="min-w-full border text-center">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Client</th>
                  <th className="p-2 border">Employee</th>
                  <th className="p-2 border">Billing Amt</th>
                  <th className="p-2 border">Active</th>
                  <th className="p-2 border">Method</th>
                  <th className="p-2 border">Overtime Amt</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-3">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id}>
                      <td className="border p-1">{p.id}</td>
                      <td className="border p-1">{p.name}</td>
                      <td className="border p-1">
                        {p.client_name || p.client_id}
                      </td>
                      <td className="border p-1">{p.emp_id}</td>
                      <td className="border p-1">{p.billing_amt}</td>
                      <td className="border p-1">{String(p.active)}</td>
                      <td className="border p-1">{p.billing_method}</td>
                      <td className="border p-1">{p.overtime_amt}</td>
                      <td className="border p-1">
                        <button
                          className="mr-2 px-2 py-1 text-blue-700 hover:underline"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-600 hover:underline"
                          onClick={() => handleDelete(p.id)}
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

        {deleteId && (
          <div className="mb-6 bg-yellow-50 p-4 rounded flex flex-col gap-2 border border-yellow-200">
            <span>Are you sure you want to delete project ID {deleteId}?</span>
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

        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
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
              <div>
                <label className="block font-medium text-gray-700">
                  Client ID
                </label>
                <input
                  type="number"
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  type="number"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Billing Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="billing_amt"
                  value={formData.billing_amt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Overtime Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="overtime_amt"
                  value={formData.overtime_amt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
                  {BILLING_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <label className="inline-flex items-center mt-6">
                <input
                  type="checkbox"
                  name="active"
                  checked={!!formData.active}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5"
                />
                <span className="ml-2">Active</span>
              </label>
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

        {showPreview && (
          <div className="bg-gray-50 border p-4 rounded">
            <h2 className="font-bold text-lg mb-3 text-blue-700">Preview</h2>
            <dl className="mb-4 grid grid-cols-2 gap-y-2">
              <dt className="font-semibold">Project Name:</dt>
              <dd>{formData.name}</dd>
              <dt className="font-semibold">Client ID:</dt>
              <dd>{formData.client_id}</dd>
              <dt className="font-semibold">Employee ID:</dt>
              <dd>{formData.emp_id}</dd>
              <dt className="font-semibold">Billing Amount:</dt>
              <dd>{formData.billing_amt || 0}</dd>
              <dt className="font-semibold">Overtime Amount:</dt>
              <dd>{formData.overtime_amt || 0}</dd>
              <dt className="font-semibold">Billing Method:</dt>
              <dd>{formData.billing_method}</dd>
              <dt className="font-semibold">Active:</dt>
              <dd>{String(!!formData.active)}</dd>
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

export default CreateInvoice;
