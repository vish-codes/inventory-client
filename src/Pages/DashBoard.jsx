import { useContext, useState } from "react";
// import DashboardNavBar from "../Components/DashboardNavBar";
import NewEntry from "./NewEntry";
import ReAssignForm from "../Components/ReAssignForm";
import ShowNumberCount from "../Components/ShowNumberCount";
import { AppContext } from "../App";
import DeleteWarning from "../Components/DeleteWarning";
import AgGridTable from "../Components/AgGridTable";
import HistoryAgGridTable from "../Components/HistoryAgGridTable";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPdf from "../Components/DashboardPdf";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReassign, setIsOpenReassign] = useState(false);
  const { listData } = useContext(AppContext);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [getLaptopId, setGetLaptopId] = useState(null);
  // const [showPopup, setShowPopup] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const { isLoading } = useContext(AppContext);
  //------------------------------------//
  // for history compoent toggle

  function togglehistoryOn() {
    setIsHistoryVisible(true);
  }

  function togglehistoryOff() {
    setIsHistoryVisible(false);
  }

  // ---------------------------------- //

  function resetGetLaptopId() {
    setGetLaptopId(null);
  }

  function getIdForDeletion(id) {
    toggleWarningOn();
    setGetLaptopId(id);
  }

  function toggleWarningOn() {
    setDeleteWarn(true);
  }
  function toggleWarningOff() {
    setDeleteWarn(false);
  }
  //------------------------------------
  function toggleOpen() {
    setIsOpen(true);
  }
  function toggleClose() {
    setIsOpen(false);
  }
  function toggleOpenReassign() {
    setIsOpenReassign(true);
  }
  function toggleCloseReassign() {
    setIsOpenReassign(false);
  }

  // for delete confirmation
  // const notify = () => toast("Item Deleted!");

  // for re-assign confirmation
  // const reAssignNotify = () =>
  //   toast("Re-Assigned Successfully!", {
  //     className: "bg-blue-500 text-white border border-blue-700",
  //     bodyClassName: "text-sm font-medium",
  //     progressClassName: "bg-blue-300",
  //   });

  // for new entry confirmation
  // const NewEntryNotify = () => toast("New Entry Added Successfully!");

  return (
    <div className="mx-auto">
      <DashboardPdf />
      <div className="max-w-7xl mx-auto">
        <div className="flex md:px-7 lg:px-20 flex-col mt-3 rounded-2xl w-full h-screen sm:px-5">
          <ShowNumberCount listData={listData} />
          
          {isHistoryVisible ? (
            <button
              className="w-1/6 rounded-md border-2 border-red-500 text-red-500 shadow-lg font-sans hover:bg-red-500 hover:text-white transition-colors"
              onClick={togglehistoryOff}
              disabled={isLoading}
            >
              &larr; Go back
            </button>
          ) : (
            <button
              className="w-1/6 rounded-md bg-pano-blue text-white shadow-lg font-sans hover:bg-white hover:text-pano-blue hover:border-pano-blue border-2 border-pano-blue transition-colors"
              onClick={toggleOpen}
              disabled={isLoading}
            >
              Add Entry +
            </button>
          )}

          <h2 className="font-sans text-center font-bold underline text-xl pt-4 text-gray-600">
            {isHistoryVisible ? "History" : "Accessories"} Table
          </h2>

          {deleteWarn && (
            <DeleteWarning
              resetGetLaptopId={resetGetLaptopId}
              getLaptopId={getLaptopId}
              toggleWarningOff={toggleWarningOff}
            />
          )}

          {isHistoryVisible ? (
            <HistoryAgGridTable togglehistoryOn={togglehistoryOn} />
          ) : (
            <AgGridTable
              togglehistoryOn={togglehistoryOn}
              toggleWarningOn={toggleWarningOn}
              toggleOpenReassign={toggleOpenReassign}
              getIdForDeletion={getIdForDeletion}
            />
          )}

          {isOpen && <NewEntry toggleClose={toggleClose} />}
          {isOpenReassign && (
            <ReAssignForm toggleCloseReassign={toggleCloseReassign} />
          )}
        </div>
      </div>
    </div>
  );
}
