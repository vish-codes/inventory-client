import React from "react";
import DashboardNavBar from "../Components/DashboardNavBar";
import ShowNumberCount from "../Components/ShowNumberCount";
import HistoryAgGridTable from "../Components/HistoryAgGridTable";

export default function History() {
  return (
    <div
      className={`bg-gray-50 shadow-lg flex flex-col rounded-2xl w-screen h-screen`}
    >
      <DashboardNavBar />
      {/* {showPopup ? <Popup /> : null} */}
      {/* <ShowNumberCount listData={listData} /> */}
      <HistoryAgGridTable />
    </div>
  );
}
