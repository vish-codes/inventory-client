import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

export default function AgGridTable({
  toggleWarningOn,
  toggleOpenReassign,
  getIdForDeletion,
}) {
  const { listData } = useContext(AppContext);
  const [rowData, setRowData] = useState([{}]);

  useEffect(() => {
    let data = listData?.data?.map((data) => ({
      ...data,
      Date: data.date,
      SystemId: data.systemId,
      LaptopName: data.laptopName,
      OwnedBy: data.ownedBy,
      OwnerName: data.ownerName,
      EmpId: data.empId,
      AssignedTo: data.assignedTo,
      Accessories: data.accessories,
      Remark: data.remark,
    }));
    setRowData(data);
  }, [listData]);

  const columnDefs = [
    {
      field: "SNo",
      maxWidth: 100,
      valueGetter: "node.rowIndex + 1",
      filter: true,
      floatingFilter: true,
    },
    { field: "Date", maxWidth: 140, filter: true, floatingFilter: true },
    {
      field: "SystemId",
      maxWidth: 100,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "LaptopName",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "OwnedBy",
      valueGetter: (el) => el.data.OwnedBy + " (" + el.data.OwnerName + ")",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "AssignedTo",
      valueGetter: (el) => el.data.AssignedTo + " (" + el.data.EmpId + ")",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Accessories",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Remark",
      maxWidth: 200,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Action",
      maxWidth: 350,
      cellRenderer: "buttonForTest",
      cellRendererParams: {
        toggleWarningOn,
        toggleOpenReassign,
        getIdForDeletion,
        // params
      },
      flex: 1,
      cellClass: "no-divider",
    },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 22];

  return (
    <div className="ag-theme-quartz m-5" style={{ height: 567 }}>
      <AgGridReact
        rowData={rowData}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        columnDefs={columnDefs}
        components={{
          buttonForTest: ButtonForTest,
        }}
      />
    </div>
  );
}

function ButtonForTest(params) {
  const { data, toggleWarningOn, toggleOpenReassign, getIdForDeletion } =
    params;
  const { getLaptopIds } = useContext(AppContext);

  const handleReAssignClick = () => {
    getLaptopIds(data._id);
    toggleOpenReassign();
  };

  const handleDeleteClick = () => {
    getIdForDeletion(data._id);
    toggleWarningOn();
  };
  return (
    <>
      {" "}
      <button
        onClick={handleReAssignClick}
        className="px-4 py-1 bg-pano-blue text-sm font-medium m-1 text-white rounded-md shadow-md mr-2 hover:bg-blue-800"
      >
        Re-Assign
      </button>
      <button
        onClick={handleDeleteClick}
        className="px-4 m-1 text-sm font-medium  py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        Delete
      </button>
    </>
  );
}
