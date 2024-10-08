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
    <>
      {" "}
      <DashboardPdf />
      <div
        className={`bg-gray-50 shadow-lg flex md:px-7 lg:px-20 flex-col mt-8 rounded-2xl w-full h-screen sm:px-5`}
      >
        {/* <ToastContainer onClick={notify} /> */}
        <ShowNumberCount listData={listData} />
        {isHistoryVisible ? (
          <button
            className="flex font-sans items-center ml-6  justify-center rounded-3xl text-red-500 border-2 border-red-500 text-l bg-white shoadow-inner w-40 hover:bg-red-500 hover:text-white hover:border-red-500"
            onClick={togglehistoryOff}
            disabled={isLoading}
          >
            &larr; Go back
          </button>
        ) : (
          <button
            className="flex font-sans items-center ml-6 justify-center rounded-3xl text-white border-2 border-pano-blue text-l bg-pano-blue shoadow-inner w-40 hover:bg-white hover:text-pano-blue hover:border-pano-blue"
            onClick={toggleOpen}
            disabled={isLoading}
          >
            Add Entry +
          </button>
        )}
        <h2 className="font-sans text-center font-bold underline text-xl pt-4 text-gray-600">
          {isHistoryVisible ? "History" : "Accessories"} Table
        </h2>

        {deleteWarn ? (
          <DeleteWarning
            resetGetLaptopId={resetGetLaptopId}
            getLaptopId={getLaptopId}
            toggleWarningOff={toggleWarningOff}
          />
        ) : null}

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
        {isOpen ? <NewEntry toggleClose={toggleClose} /> : null}
        {isOpenReassign ? (
          <ReAssignForm toggleCloseReassign={toggleCloseReassign} />
        ) : null}
      </div>
    </>
  );
}
