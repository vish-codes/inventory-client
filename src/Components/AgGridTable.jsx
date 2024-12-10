import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Load from "../Pages/Load";

export default function AgGridTable({
  toggleWarningOn,
  toggleOpenReassign,
  getIdForDeletion,
  togglehistoryOn,
}) {
  const { listData, isLoading } = useContext(AppContext);
  const [rowData, setRowData] = useState([{}]);
  const gridApiRef = useRef(null);

  function onGridReady(params) {
    gridApiRef.current = params.api;
    params.api.sizeColumnsToFit();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  }

  function exportAsExcel() {
    if (gridApiRef.current) {
      gridApiRef.current.exportDataAsCsv();
    }
  }

  useEffect(() => {
    let data = listData?.data?.map((data) => ({
      ...data,
      Date: data.date,
      SystemId: data.systemId,
      LaptopName: data.laptopName,
      LaptopPassword: data.laptopPass,
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
      maxWidth: 80,
      valueGetter: "node.rowIndex + 1",
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "Date",
      minWidth: 120,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "SystemId",
      minWidth: 130,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "LaptopName",
      minWidth: 150,
      // valueGetter: (el) => el.data.laptopName,
      cellRenderer: ReDirectToHistoryComponent,
      cellRendererParams: {
        togglehistoryOn,
      },
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "LaptopPassword",
      minWidth: 150,

      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "OwnedBy",
      valueGetter: (el) => el.data.OwnedBy + " (" + el.data.OwnerName + ")",
      minWidth: 150,

      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "AssignedTo",
      valueGetter: (el) => el.data.AssignedTo + " (" + el.data.EmpId + ")",
      minWidth: 190,

      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "Accessories",
      minWidth: 200,
      valueGetter: (params) => {
        if (!params.data.accessories) return "";
        return params.data.accessories
          .map((acc) => `${acc.name} (${acc.id})`)
          .join(", ");
      },
      filter: true,
      floatingFilter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      cellStyle: { lineHeight: "1.2", padding: "8px" },
    },
    {
      field: "Remark",
      minWidth: 180,

      filter: true,
      floatingFilter: true,
      resizable: true,
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
      resizable: true,
    },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  // const paginationPageSizeSelector = [10, 20];

  return (
    <div
      className="ag-theme-quartz m-5"
      style={{
        height: "calc(100vh - 150px)",
        width: "auto",
      }}
    >
      {isLoading ? (
        <Load />
      ) : (
        <>
          <button
            className="font-sans mb-2 text-l px-4 text-white border-2 border-green-700 bg-green-700 p-1 rounded-lg hover:text-green-700 hover:bg-white hover:border-2 hover:border-green-700"
            onClick={exportAsExcel}
          >
            Export As CSV
          </button>
          <div className="overflow-x-auto">
            <AgGridReact
              rowData={rowData}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={false}
              columnDefs={columnDefs}
              rowSelection="single"
              animateRows={true}
              ref={gridApiRef}
              onGridReady={onGridReady}
              overlayNoRowsTemplate={
                '<span aria-live="polite" aria-atomic="true">No data available! Please search for other values</span>'
              }
              components={{
                buttonForTest: ButtonForTest,
              }}
              defaultColDef={{
                resizable: true,
                sortable: true,
              }}
              domLayout="autoHeight"
            />
          </div>
        </>
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
