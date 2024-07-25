import { useContext, useState } from "react";
import DashboardNavBar from "../Components/DashboardNavBar";
import LaptopTable from "../Components/LaptopTable";
import NewEntry from "./NewEntry";
import ReAssignForm from "../Components/ReAssignForm";
import ShowNumberCount from "../Components/ShowNumberCount";
import { AppContext } from "../App";
import DeleteWarning from "../Components/DeleteWarning";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReassign, setIsOpenReassign] = useState(false);
  const { listData } = useContext(AppContext);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [getLaptopId, setGetLaptopId] = useState(null);

  const { handleDelete } = useContext(AppContext);
  //------------------------------------

  function resetGetLaptopId(){
    setGetLaptopId(null)
  }

  function getIdForDeletion(id) {
    toggleWarningOn();
    console.log(id);
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
    console.log("Toggled open state");
    setIsOpen(true);
  }
  function toggleClose() {
    console.log("toggled close state"); 
    setIsOpen(false);
  }
  function toggleOpenReassign() {
    console.log("Toggled open state");
    setIsOpenReassign(true);
  }
  function toggleCloseReassign() {
    console.log("toggled close state");
    setIsOpenReassign(false);
  }

  return (
    <div
      className={`bg-gray-50 shadow-lg flex flex-col rounded-2xl w-screen h-screen`}
    >
      <DashboardNavBar />
      <ShowNumberCount listData={listData} />
      <button
        className="flex font-sans items-center ml-10 justify-center rounded-3xl text-white border-2 border-pano-blue text-l bg-pano-blue shoadow-inner w-40 hover:bg-white hover:text-pano-blue hover:border-pano-blue"
        onClick={toggleOpen}
      >
        Add Entry +
      </button>
      {deleteWarn ? (
        <DeleteWarning resetGetLaptopId={resetGetLaptopId} getLaptopId={getLaptopId} toggleWarningOff={toggleWarningOff} />
      ) : null}
      <LaptopTable
        toggleWarningOn={toggleWarningOn}
        toggleOpenReassign={toggleOpenReassign}
        getIdForDeletion={getIdForDeletion}
      />
      {isOpen ? <NewEntry toggleClose={toggleClose} /> : null}
      {isOpenReassign ? (
        <ReAssignForm toggleCloseReassign={toggleCloseReassign} />
      ) : null}
    </div>
  );
}
