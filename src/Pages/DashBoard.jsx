import { useContext, useState } from "react";
import DashboardNavBar from "../Components/DashboardNavBar";
import NewEntry from "./NewEntry";
import ReAssignForm from "../Components/ReAssignForm";
import ShowNumberCount from "../Components/ShowNumberCount";
import { AppContext } from "../App";
import DeleteWarning from "../Components/DeleteWarning";
import AgGridTable from "../Components/AgGridTable";
import HistoryAgGridTable from "../Components/HistoryAgGridTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPdf from "../Components/DashboardPdf";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReassign, setIsOpenReassign] = useState(false);
  const { listData } = useContext(AppContext);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [getLaptopId, setGetLaptopId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const { handleDelete, isLoading } = useContext(AppContext);
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
  const notify = () => toast("Item Deleted!");

  // for re-assign confirmation
  const reAssignNotify = () =>
    toast("Re-Assigned Successfully!", {
      className: "bg-blue-500 text-white border border-blue-700",
      bodyClassName: "text-sm font-medium",
      progressClassName: "bg-blue-300",
    });

  // for new entry confirmation
  const NewEntryNotify = () => toast("New Entry Added Successfully!");

  return (
    <div className="bg-gray-50">
      <DashboardPdf />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="bg-gray-50 flex flex-col mx-auto mt-8 w-full min-h-screen sm:px-5 md:px-7 lg:px-20">
          <ShowNumberCount listData={listData} />
          <div className="flex justify-between items-center mt-6 mb-4">
            {isHistoryVisible ? (
              <button
                className="flex font-sans items-center ml-5 justify-center rounded-3xl text-red-500 border-2 border-red-500 text-l bg-white shadow-inner w-40 hover:bg-red-500 hover:text-white hover:border-red-500"
                onClick={togglehistoryOff}
                disabled={isLoading}
              >
                &larr; Go back
              </button>
            ) : (
              <button
                className="flex font-sans items-center ml-5 justify-center rounded-3xl text-white border-2 border-pano-blue text-l bg-pano-blue shadow-inner w-40 hover:bg-white hover:text-pano-blue hover:border-pano-blue"
                onClick={toggleOpen}
                disabled={isLoading}
              >
                Add Entry +
              </button>
            )}
            <h2 className="font-sans text-center font-bold underline text-xl text-gray-600">
              {isHistoryVisible ? "History" : "Accessories"} Table
            </h2>
            <div className="w-40"></div> {/* Spacer for alignment */}
          </div>

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
