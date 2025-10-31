import React, { useState } from "react";
import DashboardPdf from "../Components/DashboardPdf";

const ProjectOnboarding = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectManager: "",
    client: "",
    startDate: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleFinalSubmit = () => {
    setShowPreview(false);
    setShowForm(false);
    setFormData({
      projectName: "",
      projectManager: "",
      client: "",
      startDate: "",
    });
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
        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Project Manager
              </label>
              <input
                type="text"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
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
                onClick={() => setShowForm(false)}
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
            <dl className="mb-4">
              <dt className="font-semibold">Project Name:</dt>
              <dd className="mb-2">{formData.projectName}</dd>
              <dt className="font-semibold">Project Manager:</dt>
              <dd className="mb-2">{formData.projectManager}</dd>
              <dt className="font-semibold">Client:</dt>
              <dd className="mb-2">{formData.client}</dd>
              <dt className="font-semibold">Start Date:</dt>
              <dd>{formData.startDate}</dd>
            </dl>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEdit}
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

export default ProjectOnboarding;
