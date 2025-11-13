import { useState, useEffect } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const API_URL = "http://localhost:3000/api/invoices";

const emptyForm = {
  invoice_no: "",
  project_id: "",
  issue_date: "",
  total_amount: "",
  days: "",
  paid_leaves: "",
  unpaid_leaves: "",
  over_time: "",
};

const CreateInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 🔹 Fetch All Invoices
  async function fetchInvoices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [];
      setInvoices(rows);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Form Handlers
  const handleOpenForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setShowPreview(false);
  };

  const handleEdit = (invoice) => {
    setFormData({
      invoice_no: invoice.invoice_no || "",
      project_id: invoice.project_id?.toString?.() || "",
      issue_date: invoice.issue_date ? invoice.issue_date.slice(0, 10) : "",
      total_amount: invoice.total_amount?.toString?.() || "",
      days: invoice.days?.toString?.() || "",
      paid_leaves: invoice.paid_leaves?.toString?.() || "",
      unpaid_leaves: invoice.unpaid_leaves?.toString?.() || "",
      over_time: invoice.over_time?.toString?.() || "",
    });
    setEditingId(invoice.id);
    setShowForm(true);
    setShowPreview(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // 🔹 Final Submit (POST / PUT)
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        invoice_no: formData.invoice_no,
        project_id: Number(formData.project_id),
        issue_date: formData.issue_date || new Date(),
        total_amount: Number(formData.total_amount || 0),
        days: Number(formData.days || 0),
        paid_leaves: Number(formData.paid_leaves || 0),
        unpaid_leaves: Number(formData.unpaid_leaves || 0),
        over_time: Number(formData.over_time || 0),
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

      await fetchInvoices();
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

  // 🔹 Delete Invoice
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
      await fetchInvoices();
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI
  return (
    <div className="mx-auto">
      <DashboardPdf />
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Invoice Management
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
              Add Invoice
            </button>
          </div>
        )}

        {!showForm && !showPreview && (
          <div className="overflow-x-auto pb-8">
            <table className="min-w-full border text-center">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Invoice No</th>
                  <th className="p-2 border">Project ID</th>
                  <th className="p-2 border">Issue Date</th>
                  <th className="p-2 border">Total Amount</th>
                  <th className="p-2 border">Days</th>
                  <th className="p-2 border">Paid Leaves</th>
                  <th className="p-2 border">Unpaid Leaves</th>
                  <th className="p-2 border">Overtime</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-3">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="border p-1">{inv.id}</td>
                      <td className="border p-1">{inv.invoice_no}</td>
                      <td className="border p-1">{inv.project_id}</td>
                      <td className="border p-1">
                        {inv.issue_date?.slice(0, 10)}
                      </td>
                      <td className="border p-1">{inv.total_amount}</td>
                      <td className="border p-1">{inv.days}</td>
                      <td className="border p-1">{inv.paid_leaves}</td>
                      <td className="border p-1">{inv.unpaid_leaves}</td>
                      <td className="border p-1">{inv.over_time}</td>
                      <td className="border p-1">
                        <button
                          className="mr-2 px-2 py-1 text-blue-700 hover:underline"
                          onClick={() => handleEdit(inv)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-600 hover:underline"
                          onClick={() => handleDelete(inv.id)}
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
            <span>Are you sure you want to delete invoice ID {deleteId}?</span>
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
                Invoice No
              </label>
              <input
                type="text"
                name="invoice_no"
                value={formData.invoice_no}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Project ID
                </label>
                <input
                  type="number"
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Total Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Days</label>
                <input
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Paid Leaves
                </label>
                <input
                  type="number"
                  name="paid_leaves"
                  value={formData.paid_leaves}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Unpaid Leaves
                </label>
                <input
                  type="number"
                  name="unpaid_leaves"
                  value={formData.unpaid_leaves}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Overtime
                </label>
                <input
                  type="number"
                  name="over_time"
                  value={formData.over_time}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
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
              {Object.entries(formData).map(([key, val]) => (
                <div key={key} className="contents">
                  <dt className="font-semibold capitalize">
                    {key.replace("_", " ")}:
                  </dt>
                  <dd>{val || "—"}</dd>
                </div>
              ))}
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
