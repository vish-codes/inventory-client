import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function AgGridTable({
  toggleWarningOn,
  toggleOpenReassign,
  getIdForDeletion,
  togglehistoryOn,
}) {
  const { listData, isLoading } = useContext(AppContext);
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
      minWidth: 60,
      valueGetter: "node.rowIndex + 1",
      filter: true,
      floatingFilter: true,
    },
    { field: "Date", minWidth: 150, filter: true, floatingFilter: true },
    {
      field: "SystemId",
      minWidth: 130,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "LaptopName",
      minWidth: 150,
      // valueGetter: (el) => el.data.laptopName,
      cellRenderer: ReDirectToHistoryComponent,
      cellRendererParams: {
        togglehistoryOn,
      },
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "OwnedBy",
      valueGetter: (el) => el.data.OwnedBy + " (" + el.data.OwnerName + ")",
      minWidth: 150,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "AssignedTo",
      valueGetter: (el) => el.data.AssignedTo + " (" + el.data.EmpId + ")",
      minWidth: 190,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Accessories",
      minWidth: 120,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Remark",
      minWidth: 180,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Action",
      minWidth: 200,
      cellRenderer: "buttonForTest",
      cellRendererParams: {
        toggleWarningOn,
        toggleOpenReassign,
        getIdForDeletion,
      },
      flex: 1,
      cellClass: "no-divider",
    },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20];

  return (
    <div
      className="ag-theme-quartz m-5"
      style={{ height: "calc(100vh - 150px)", overflow: "hidden" }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <AgGridReact
          rowData={rowData}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          columnDefs={columnDefs}
          components={{
            buttonForTest: ButtonForTest,
          }}
          rowSelection="multiple"
          onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
          domLayout="autoHeight"
        />
      )}
    </div>
  );
}

function ReDirectToHistoryComponent(params) {
  const { value, data, togglehistoryOn } = params;
  const { getLaptopIdsForHistory } = useContext(AppContext);
  function handleClick() {
    getLaptopIdsForHistory(data._id);
    togglehistoryOn();
  }
  return (
    <button className="text-blue-500 hover:underline" onClick={handleClick}>
      {value}
    </button>
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
      <button
        onClick={handleReAssignClick}
        className="px-3 py-1 bg-pano-blue text-xs font-medium m-1 text-white rounded-md shadow-md mr-2 hover:bg-blue-800"
      >
        Re-Assign
      </button>
      <button
        onClick={handleDeleteClick}
        className="px-3 py-1 text-xs font-medium m-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        Delete
      </button>
      {/* <img src='./images/history.png' />; */}
    </>
  );
}
