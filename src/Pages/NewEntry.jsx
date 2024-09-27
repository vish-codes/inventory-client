import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReAssign({ toggleClose }) {
  const [id, setId] = useState("");
  const [laptop, setLaptop] = useState("");
  const [isOwnedByClient, setIsOwnedByClient] = useState(false);
  const [ownedBy, setOwnedBy] = useState("Company");
  const [laptopClientName, setLaptopClientName] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(null);
  const [empId, setEmpId] = useState("");
  const [laptopPass, setLaptopPass] = useState("");

  const [accessoryIds, setAccessoryIds] = useState({});

  const [errors, setErrors] = useState({});

  const { addNewEntry } = useContext(AppContext);

  function handleOwnedBy(e) {
    setOwnedBy(e.target.value);
    setIsOwnedByClient(e.target.value === "Client");
  }

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  useEffect(() => {
    if (startDate) {
      const date = formatDate(startDate);
      setFinalDate(date);
    }
  }, [startDate]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption((prev) => {
      if (event.target.checked) {
        setAccessoryIds((prevIds) => ({ ...prevIds, [value]: "" }));
        return [...prev, value];
      } else {
        setAccessoryIds((prevIds) => {
          const newIds = { ...prevIds };
          delete newIds[value];
          return newIds;
        });
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleAccessoryIdChange = (accessory, id) => {
    setAccessoryIds((prevIds) => ({ ...prevIds, [accessory]: id }));
  };

  function validateForm() {
    const newErrors = {};
    if (!id) newErrors.id = "Laptop Id is required.";
    if (!laptop) newErrors.laptop = "Laptop Name is required.";
    if (!laptopPass) newErrors.laptopPass = "Laptop Password is required.";
    if (!employeeName) newErrors.employeeName = "Assign To field is required.";
    if (!empId) newErrors.empId = "Employee Id is required.";
    if (!finalDate) newErrors.finalDate = "Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return; // Prevent form submission if validation fails

    let tempObj = {
      systemId: id.trim(),
      date: finalDate,
      laptopName: laptop.trim(),
      laptopPass: laptopPass.trim(),
      assignedTo: employeeName.trim(),
      empId: empId.trim(),
      ownedBy: ownedBy.trim(),
      ownerName: laptopClientName.trim(),
      remark: remarks.trim(),
      accessories: selectedOption.map((accessory) => ({
        name: accessory,
        id: accessoryIds[accessory],
      })),
    };

    addNewEntry(tempObj);
    toggleClose();
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Laptop Id:
                </label>
                <input
                  type="text"
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.id ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                {errors.id && (
                  <p className="text-red-500 text-sm mt-1">{errors.id}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Laptop Name:
                </label>
                <input
                  type="text"
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.laptop ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  value={laptop}
                  onChange={(e) => setLaptop(e.target.value)}
                />
                {errors.laptop && (
                  <p className="text-red-500 text-sm mt-1">{errors.laptop}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Laptop Password:
                </label>
                <input
                  type="text"
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.laptopPass ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  value={laptopPass}
                  onChange={(e) => setLaptopPass(e.target.value)}
                />
                {errors.laptopPass && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.laptopPass}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date:
                </label>
                <Datepicker
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.finalDate ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                {errors.finalDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.finalDate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                  Owned By:
                </span>
                <div className="mt-1">
                  <label className="inline-flex items-center mb-2">
                    <input
                      type="radio"
                      className="form-radio"
                      value="Company"
                      checked={ownedBy === "Company"}
                      onChange={handleOwnedBy}
                      required
                    />
                    <span className="mx-2">Company</span>
                  </label>
                  <label className="inline-flex items-center mb-2">
                    <input
                      type="radio"
                      className="form-radio"
                      value="Client"
                      checked={ownedBy === "Client"}
                      onChange={handleOwnedBy}
                      required
                    />
                    <span className="mx-2">Client</span>
                  </label>
                </div>
                {isOwnedByClient && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Client Name:
                    </label>
                    <input
                      type="text"
                      className="mt-1 block border-2 border-indigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      value={laptopClientName}
                      onChange={(e) => setLaptopClientName(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                  Accessories:
                </span>
                <div className="mt-2">
                  {["Charger", "Keyboard", "Mouse"].map((accessory) => (
                    <div key={accessory} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          value={accessory}
                          onChange={handleOptionChange}
                          checked={selectedOption.includes(accessory)}
                        />
                        <span className="mx-2">{accessory}</span>
                      </label>
                      {selectedOption.includes(accessory) && (
                        <input
                          type="text"
                          className="ml-2 border-2 border-indigo-500 font-sans text-sm shadow-inner rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                          placeholder={`${accessory} ID`}
                          value={accessoryIds[accessory] || ""}
                          onChange={(e) =>
                            handleAccessoryIdChange(accessory, e.target.value)
                          }
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
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.employeeName ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                {errors.employeeName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.employeeName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Employee Id:
                </label>
                <input
                  type="text"
                  className={`mt-1 block border-2 font-sans text-sm shadow-inner w-full rounded-md ${
                    errors.empId ? "border-red-500" : "border-indigo-500"
                  } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
                {errors.empId && (
                  <p className="text-red-500 text-sm mt-1">{errors.empId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Remarks:
                </label>
                <textarea
                  className="mt-1 block border-2 border-indigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleClose}
                  className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
