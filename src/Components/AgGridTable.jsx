import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import DownArrow from "./DownArrow";
import { AppContext } from "../App";
export default function AgGridTable({toggleWarningOn}) {
  const { listData } = useContext(AppContext);
  useEffect(() => {
    console.log(listData);
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

  const [rowData, setRowData] = useState([{}]);

  const [colDefs, setColDefs] = useState([
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
    // { field: "EmpId", maxWidth:100 },
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
      // valueGetter: (el)=>console.log(el.data.laptopId),
      cellRenderer: ButtonForTest,
      flex: 1,
      cellClass: "no-divider",
    },
  ]);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 22];
  return (
    <div
      className="ag-theme-quartz"
      // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        columnDefs={colDefs}
        filter={true}
        // domLayout="autoHeight"
      />
    </div>
  );
}

function ButtonForTest() {
  return (
    <>
      {" "}
      <button onClick={()=>alert('sdfdsf')} className="px-4 py-1 bg-pano-blue text-sm font-medium m-1 text-white rounded-md shadow-md mr-2 hover:bg-blue-800">
        Re-Assign
      </button>
      <button className="px-4 m-1 text-sm font-medium  py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
        Delete
      </button>
    </>
  );
}
