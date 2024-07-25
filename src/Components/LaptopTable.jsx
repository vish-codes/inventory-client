import { useContext } from "react";
import { AppContext } from "../App";

const LaptopTable = ({ toggleOpenReassign }) => {
  const { listData, handleDelete, getLaptopIds } = useContext(AppContext);
  console.log("this is list main data", listData);
  const tableData = listData?.data;
  console.log("this is cutout data" , tableData);

  return (
    <div className="overflow-y-auto mx-10 my-3 shadow-lg rounded">
      <table className="min-w-full bg-white border-2 border-gray-500 shadow-md rounded-md">
        <thead className="bg-indigo-200">
          <tr>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              S.No.
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Sys ID
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Laptop Name
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Owned By
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Accessories
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Remark
            </th>
            <th className="px-8 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableData?.map((laptop, index) => (
            <TableRows
              laptop={laptop}
              toggleOpenReassign={toggleOpenReassign}
              ind={index}
              key={index}
              handleDelete={handleDelete}
              getLaptopIds={getLaptopIds}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function TableRows({
  laptop,
  ind,
  toggleOpenReassign,
  handleDelete,
  getLaptopIds,
}) {
  // console.log(laptop);
  function handleUpdate() {
    getLaptopIds(laptop._id);
    toggleOpenReassign();
  }
  return (
    <tr>
      <td className="px-8 py-1 whitespace-nowrap">{ind + 1}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.systemId}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.laptopName}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.ownerName}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.assignedTo}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.accessories}</td>
      <td className="px-8 py-1 whitespace-nowrap">{laptop.remark}</td>
      <td className="px-8 py-1 whitespace-nowrap">
        <button
          className="px-4 py-1 bg-indigo-400 text-sm font-medium m-1 text-white rounded-md shadow-md mr-2 hover:bg-indigo-500"
          onClick={handleUpdate}
        >
          Re-Assign
        </button>
        <button
          onClick={() => handleDelete(laptop._id)}
          className="px-4 m-1 text-sm font-medium  py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default LaptopTable;
