import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
// import Loader from "./Loader";

export default function HistoryAgGridTable({ togglehistoryOn }) {
  const { history, isLoading } = useContext(AppContext);
  const [rowData, setRowData] = useState([]);

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
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      minWidth: 160, 
    },
    {
      field: "SystemId",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      minWidth: 120, 
    },
    {
      field: "LaptopName",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      minWidth: 150, 
    },
    {
      field: "AssignedTo",
      valueGetter: (params) =>
        `${params.data.AssignedTo} (${params.data.EmpId})`,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      minWidth: 200, 
    },
    {
      field: "Accessories",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      minWidth: 190, 
    },
  ];

  const paginationPageSize = 10;

  return (
    <div
      className="ag-theme-quartz m-5 overflow-x-auto"
      style={{ height: "calc(100vh - 150px)", overflow: "auto", minWidth: "100%" }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AgGridReact
          rowData={rowData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onFirstDataRendered={(params) => params.api.sizeColumnsToFit()} // Adjust column minWidth on initial render
        />
      )}
    </div>
  );
}
