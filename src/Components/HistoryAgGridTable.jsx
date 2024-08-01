import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Loader from "./Loader";

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
      flex: 1,
    },
    {
      field: "FromDate",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "ToDate",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "SystemId",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "LaptopName",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "AssignedTo",
      valueGetter: (params) =>
        `${params.data.AssignedTo} (${params.data.EmpId})`,
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "Accessories",
      filter: "agSetColumnFilter",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
  ];

  const paginationPageSize = 10;

  return (
    <div className="ag-theme-quartz flex flex-col w-full h-full p-5">
      {isLoading ? (
        <Loader />
      ) : (
        <AgGridReact
          rowData={rowData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          // className="w-full h-full"
          onFirstDataRendered={(params) => params.api.sizeColumnsToFit()} // column fix for widths on first render
        />
      )}
    </div>
  );
}
