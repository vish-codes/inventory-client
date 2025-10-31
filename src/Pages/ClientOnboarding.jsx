import React, { useState, useEffect } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const API_URL = "http://localhost:3000/api/clients";

const emptyForm = {
  name: "",
  address: "",
  state: "",
  gst_number: "",
  company_id: "",
};

const ClientOnboarding = () => {
  // UI and loading
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null); // For delete confirmation

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle open form for add
  const handleOpenForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setShowPreview(false);
  };
  // Handle open form for edit
  const handleEditClient = (client) => {
    setFormData({ ...client });
    setEditingId(client.id);
    setShowForm(true);
    setShowPreview(false);
  };

  // Form changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Preview logic
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
    setShowForm(false);
  };
  const handleEditPreview = () => {
    setShowPreview(false);
    setShowForm(true);
  };

  // Final submit (Add or Edit)
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let res, added;
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
      added = await res.json();
      await fetchClients();
      // Reset
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

  // Delete logic
  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchClients();
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardPdf />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Client Onboarding
        </h1>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {loading && <div className="text-blue-600 mb-3">Loading...</div>}
        {/* Add New Button */}
        {!showForm && !showPreview && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md shadow"
            >
              Add Client
            </button>
          </div>
        )}
        {/* CRUD Table */}
        {!showForm && !showPreview && (
          <div className="overflow-x-auto pb-8">
            <table className="min-w-full border text-center">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">State</th>
                  <th className="p-2 border">GST</th>
                  <th className="p-2 border">Company ID</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-3">
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id}>
                      <td className="border p-1">{client.id}</td>
                      <td className="border p-1">{client.name}</td>
                      <td className="border p-1">{client.address}</td>
                      <td className="border p-1">{client.state}</td>
                      <td className="border p-1">{client.gst_number}</td>
                      <td className="border p-1">{client.company_id}</td>
                      <td className="border p-1">
                        <button
                          className="mr-2 px-2 py-1 text-blue-700 hover:underline"
                          onClick={() => handleEditClient(client)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-600 hover:underline"
                          onClick={() => handleDelete(client.id)}
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
        {/* CONFIRM DELETE */}
        {deleteId && (
          <div className="mb-6 bg-yellow-50 p-4 rounded flex flex-col gap-2 border border-yellow-200">
            <span>Are you sure you want to delete client ID {deleteId}?</span>
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
        {/* ADD/EDIT FORM */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                GST Number
              </label>
              <input
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Company ID
              </label>
              <input
                type="text"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
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
        {/* PREVIEW FORM */}
        {showPreview && (
          <div className="bg-gray-50 border p-4 rounded">
            <h2 className="font-bold text-lg mb-3 text-blue-700">Preview</h2>
            <dl className="mb-4 grid grid-cols-2 gap-y-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{formData.name}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd>{formData.address}</dd>
              <dt className="font-semibold">State:</dt>
              <dd>{formData.state}</dd>
              <dt className="font-semibold">GST:</dt>
              <dd>{formData.gst_number}</dd>
              <dt className="font-semibold">Company ID:</dt>
              <dd>{formData.company_id}</dd>
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

export default ClientOnboarding;
