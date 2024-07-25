import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
export default function AgGridTable() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "SNo", maxWidth: 80 },
    { field: "Date", maxWidth: 120 },
    { field: "System Id", maxWidth: 160 },
    { field: "Laptop Name" },
    { field: "Owned By" },
    { field: "Assigned To" },
    { field: "Accessories" },
    { field: "Remark" },
    { field: "Action" },
  ]);
  return (
    <div
      className="ag-theme-quartz"
      // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
