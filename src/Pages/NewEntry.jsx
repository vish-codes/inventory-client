import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReAssign({ toggleClose }) {
  const [formData, setFormData] = useState({
    systemId: '',
    laptopName: '',
    laptopPass: '',
    date: new Date(),
    ownedBy: 'Company',
    ownerName: '',
    accessories: [],
    accessoryIds: {},
    assignedTo: '',
    empId: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});
  const { addNewEntry } = useContext(AppContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleOwnedByChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      ownedBy: value,
      ownerName: value === 'Company' ? '' : prev.ownerName
    }));
  };

  const handleAccessoryChange = (accessory, checked, id = '') => {
    setFormData(prev => {
      if (id === '') {
        const newAccessories = checked 
          ? [...new Set([...prev.accessories, accessory])]
          : prev.accessories.filter(item => item !== accessory);
        
        const newAccessoryIds = { ...prev.accessoryIds };
        if (!checked) {
          delete newAccessoryIds[accessory];
        }

        return {
          ...prev,
          accessories: newAccessories,
          accessoryIds: newAccessoryIds
        };
      }
      else {
        return {
          ...prev,
          accessoryIds: {
            ...prev.accessoryIds,
            [accessory]: id
          }
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      systemId: 'Laptop ID',
      laptopName: 'Laptop Name',
      laptopPass: 'Laptop Password',
      assignedTo: 'Assign To',
      empId: 'Employee ID'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${label} is required`;
      }
    });

    if (formData.ownedBy === 'Client' && !formData.ownerName?.trim()) {
      newErrors.ownerName = 'Client Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const accessoriesData = [...new Set(formData.accessories)].map(accessory => ({
      name: accessory,
      id: formData.accessoryIds[accessory] || ''
    }));

    const submissionData = {
      systemId: formData.systemId.trim(),
      date: formatDate(formData.date),
      laptopName: formData.laptopName.trim(),
      laptopPass: formData.laptopPass.trim(),
      assignedTo: formData.assignedTo.trim(),
      empId: formData.empId.trim(),
      ownedBy: formData.ownedBy,
      ownerName: formData.ownedBy === 'Client' ? formData.ownerName.trim() : '',
      remark: formData.remarks.trim(),
      accessories: accessoriesData
    };

    console.log('Submission Data:', submissionData);

    addNewEntry(submissionData);
    toggleClose();
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Laptop Id:
                  </label>
                  <input
                    type="text"
                    name="systemId"
                    value={formData.systemId}
                    onChange={handleInputChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.systemId ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                  {errors.systemId && (
                    <p className="text-red-500 text-sm mt-1">{errors.systemId}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Laptop Name:
                  </label>
                  <input
                    type="text"
                    name="laptopName"
                    value={formData.laptopName}
                    onChange={handleInputChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.laptopName ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                  {errors.laptopName && (
                    <p className="text-red-500 text-sm mt-1">{errors.laptopName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Laptop Password:
                  </label>
                  <input
                    type="text"
                    name="laptopPass"
                    value={formData.laptopPass}
                    onChange={handleInputChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.laptopPass ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                  {errors.laptopPass && (
                    <p className="text-red-500 text-sm mt-1">{errors.laptopPass}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <Datepicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.date ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                </div>

                <div className="mb-4 md:col-span-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Owned By:
                  </span>
                  <div className="mt-1 flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        value="Company"
                        checked={formData.ownedBy === "Company"}
                        onChange={handleOwnedByChange}
                        required
                      />
                      <span className="ml-2">Company</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        value="Client"
                        checked={formData.ownedBy === "Client"}
                        onChange={handleOwnedByChange}
                        required
                      />
                      <span className="ml-2">Client</span>
                    </label>
                  </div>
                </div>

                {formData.ownedBy === 'Client' && (
                  <div className="mb-4 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Client Name:
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="mt-1 block border-2 border-indigo-500 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3"
                    />
                  </div>
                )}

                <div className="mb-4 md:col-span-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Accessories:
                  </span>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Charger", "Earphones", "Mouse"].map((accessory) => (
                      <div key={accessory} className="flex items-center">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={formData.accessories.includes(accessory)}
                            onChange={(e) =>
                              handleAccessoryChange(accessory, e.target.checked)
                            }
                          />
                          <span className="ml-2">{accessory}</span>
                        </label>
                        {formData.accessories.includes(accessory) && (
                          <input
                            type="text"
                            value={formData.accessoryIds[accessory] || ""}
                            onChange={(e) =>
                              handleAccessoryChange(accessory, true, e.target.value)
                            }
                            className="ml-2 w-1/3 border-2 border-indigo-500 font-sans text-sm shadow-inner rounded-md h-7 px-3"
                            placeholder={`ID`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Assign To:
                  </label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.assignedTo ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                  {errors.assignedTo && (
                    <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Employee Id:
                  </label>
                  <input
                    type="text"
                    name="empId"
                    value={formData.empId}
                    onChange={handleInputChange}
                    className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md h-8 px-3 ${
                      errors.empId ? "border-red-500" : "border-indigo-500"
                    } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  />
                  {errors.empId && (
                    <p className="text-red-500 text-sm mt-1">{errors.empId}</p>
                  )}
                </div>

                <div className="mb-4 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Remarks:
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="mt-1 block border-2 border-indigo-500 font-sans text-sm shadow-inner w-full rounded-md h-18 px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 md:col-span-2">
                <button
                  type="submit"
                  className="ml-4 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pano-blue hover:bg-pano-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleClose}
                  className="ml-4 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
