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
  const { addNewEntry } = useContext(AppContext);

  function handleOwnedBy(e) {
    setOwnedBy(e.target.value);
    if (e.target.value == "client") {
      setIsOwnedByClient(true);
    } else {
      setIsOwnedByClient(false);
    }
  }
  console.log(startDate);
  // date formatting fuction :)
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // weekday: "long",
    }).format(new Date(date));

  // getting date formatted here :)
  useEffect(() => {
    if (startDate) {
      const date = formatDate(startDate);
      setFinalDate(date);
      console.log(date);
    }
  }, [startDate]);

  // console.log('Date:', startDate, 'Type of :', typeof startDate);
  const handleOptionChange = (event) => {
    setSelectedOption((prev) => [...prev, event.target.value]);
  };
  // console.log(selectedOption);

  function handleFormSubmit(e) {
    e.preventDefault();
    let tempObj = {
      systemId: id,
      date: finalDate,
      laptopName: laptop,
      assignedTo: employeeName,
      empId,
      ownedBy,
      ownerName: laptopClientName,
      accessories: selectedOption,
      remark: remarks,
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
      <div className="fixed z-10 inset-0 overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Laptop Id:
                </label>
                <input
                  type="text"
                  className="mt-1 block border-2 border-ingigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Laptop Name:
                </label>
                <input
                  type="text"
                  className="mt-1 block border-2 border-ingigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={laptop}
                  onChange={(e) => setLaptop(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date:
                </label>
                <Datepicker
                  className="border-2 border-ingigo-500 rounded-md text-sm w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                  Owned By:
                </span>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      value="company"
                      checked={ownedBy === "Company"}
                      onChange={handleOwnedBy}
                    />
                    <span className="ml-2">Company</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      value="client"
                      checked={ownedBy === "Client"}
                      onChange={handleOwnedBy}
                    />
                    <span className="ml-2">Client</span>
                  </label>
                </div>
                {isOwnedByClient && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Client Name:
                    </label>
                    <input
                      type="text"
                      className="mt-1 block border-2 border-ingigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      value={laptopClientName}
                      defaultValue="Panorama"
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
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value="Headphone"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Headphone</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value="Keyboard"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Keyboard</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value="Mouse"
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Mouse</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Assign To:
                </label>
                <input
                  type="text"
                  className="mt-1 block border-2 border-ingigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Employee Id:
                </label>
                <input
                  type="text"
                  className="mt-1 block border-2 border-ingigo-500 font-sans text-sm shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Remarks:
                </label>
                <textarea
                  rows="2"
                  className="mt-1 text-sm block border-2 border-ingigo-500 font-sans shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Leave a comment..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Remarks:
                </label>
                <input
                  type="text"
                  className="mt-1 block border-2 border-ingigo-500 font-sans shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                /> */}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => toggleClose()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center ml-1 px-4 py-2 text-sm font-medium text-white bg-pano-blue  border-black rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleFormSubmit}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
