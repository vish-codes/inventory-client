import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import Load from "../Pages/Load";
// import 'ag-grid-enterprise';

export default function HistoryAgGridTable({ togglehistoryOn }) {
  const { history, isLoading } = useContext(AppContext);
  const [rowData, setRowData] = useState([]);
  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const exportAsExcel = () => {
    if (gridApiRef.current) {
      gridApiRef.current.exportDataAsCsv();
    }
  };

  useEffect(() => {
    let data =
      history?.data?.history?.map((data) => ({
        ...data,
        SystemId: data.systemId,
        LaptopName: data.laptopName,
        FromDate: data.fromDate,
        ToDate: data.toDate,
        EmpId: data.empId,
        AssignedTo: data.assignedTo,
        Accessories: data.accessories,
      })) || [];
    setRowData(data);
  }, [history]);

  const columnDefs = [
    {
      field: "SNo",
      valueGetter: "node.rowIndex + 1",
      filter: true,
      floatingFilter: true,
      minWidth: 80,
    },
    {
      field: "FromDate",
      filter: true,
      floatingFilter: true,
      minWidth: 160,
    },
    {
      field: "ToDate",

      filter: true,
      floatingFilter: true,
      minWidth: 160,
    },
    {
      field: "SystemId",

      filter: true,
      floatingFilter: true,
      minWidth: 120,
    },
    {
      field: "LaptopName",

      filter: true,
      floatingFilter: true,
      minWidth: 150,
    },
    {
      field: "AssignedTo",
      valueGetter: (params) =>
        `${params.data.AssignedTo} (${params.data.EmpId})`,

      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
    {
      field: "Accessories",

      filter: true,
      floatingFilter: true,
      minWidth: 190,
    },
  ];

  const onBtExport = () => {
    gridApi.exportDataAsExcel();
  };

  const paginationPageSize = 10;

  return (
    <div
      className="ag-theme-quartz m-5 overflow-x-auto"
      style={{ height: "calc(100vh - 150px)" }}
    >
      {isLoading ? (
        <Load />
      ) : (
        <>
          <button
            className="font-sans text-l px-4 mb-2 text-green-700 border-2 border-green-700 p-1 rounded-lg hover:text-white hover:bg-green-700 hover:border-2 hover:border-green-700"
            onClick={exportAsExcel}
          >
            Export As CSV
          </button>
          <AgGridReact
            rowData={rowData}
            pagination={true}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={false}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            rowSelection="single"
            animateRows={true}
            ref={gridApiRef}
            onGridReady={onGridReady}
            onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
            overlayNoRowsTemplate={
              '<span aria-live="polite" aria-atomic="true">No data available! Please search for other values</span>'
            }
          />
        </>
      )}
    </div>
  );
}
