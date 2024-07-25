import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function ReAssignForm({ toggleCloseReassign }) {
  // const [id, setId] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [remarks, setRemarks] = useState("");
  const { handleUpdate } = useContext(AppContext);

  const handleOptionChange = (event) => {
    setSelectedOption((prev) => [...prev, event.target.value]);
  };
  // console.log(selectedOption);

  function handleReassignFormSubmit(e) {
    e.preventDefault();
    let tempObj = {
      assignedTo: assignTo,
      accessories: selectedOption,
      remark: remarks,
    }; 
    handleUpdate(tempObj);
    toggleCloseReassign();
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto shadow-2xl">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <form onSubmit={handleReassignFormSubmit}>
            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-700">
                Laptop ID:
              </label> */}
              {/* <input
                type="text"
                className="mt-1 block disabled:opacity-50 border-2 border-ingigo-500 font-mono shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
                value={id}
                disabled={true}
                onChange={(e) => setId(e.target.value)}
              /> */}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assign To:
              </label>
              <input
                type="text"
                className="mt-1 block border-2 border-ingigo-500 font-mono shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              />
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
                Remarks:
              </label>
              <input
                type="text"
                className="mt-1 block border-2 border-ingigo-500 font-mono shadow-inner w-full rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-500  border-black rounded-md shadow-sm hover:bg-ingigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={handleReassignFormSubmit}
              >
                Confirm
              </button>
              <button
                type="submit"
                className="inline-flex justify-center ml-1 px-4 py-2 text-sm font-medium text-white bg-red-500  border-black rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => toggleCloseReassign()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
