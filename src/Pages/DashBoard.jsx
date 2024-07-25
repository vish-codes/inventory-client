import { useContext, useState } from "react";
import DashboardNavBar from "../Components/DashboardNavBar";
import LaptopTable from "../Components/LaptopTable";
import NewEntry from "./NewEntry";
import ReAssignForm from "../Components/ReAssignForm";
import ShowNumberCount from "../Components/ShowNumberCount";
import { AppContext } from "../App";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReassign, setIsOpenReassign] = useState(false);
  const {listData} = useContext(AppContext)

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
      <LaptopTable toggleOpenReassign={toggleOpenReassign} />
      {isOpen ? <NewEntry toggleClose={toggleClose} /> : null}
      {isOpenReassign ? (
        <ReAssignForm toggleCloseReassign={toggleCloseReassign} />
      ) : null}
      <button
        className="px-4 py-1 bg-indigo-500 w-32 text-sm font-medium m-1 text-white rounded-md shadow-md  hover:bg-indigo-600 ml-12"
        onClick={toggleOpen}
      >
        Add Entry +
      </button>
    </div>
  );
}
