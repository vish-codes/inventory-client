import { useContext } from "react";
import { AppContext } from "../App";
import NavLanding from "../Components/NavLanding";
import LandingText from "../Components/LandingText";
import DownArrow from "../Components/DownArrow";
import Button from "../Components/Button";
import AgGridTable from "../Components/AgGridTable";

export default function Landing() {
  // const formatDate = (date) =>
  // new Intl.DateTimeFormat("en", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  //   weekday: "long",
  // }).format(new Date(date));
  // console.log(formatDate("23-11-2003"))

  return (
    <div className="bg-gray-100 shadow-lg flex flex-col rounded-2xl w-screen min-h-screen">
      <NavLanding />
      <div className="mx-10">
        <LandingText
          headline="Manage Your Inventory"
          followUp="Discover streamlined inventory management solutions that optimize sourcing, storage, and sales processes. Our system ensures efficient stock control, cost minimization, and prompt customer delivery. By leveraging data insights, we enhance operational efficiency, reduce waste, and meet fluctuating demands effectively"
          headCol={"amber"}
        />
        <DownArrow />
        <Button />
        <AgGridTable />
      </div>
    </div>
  );
}
