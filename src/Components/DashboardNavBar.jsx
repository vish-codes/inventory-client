import { Link } from "react-router-dom";

// interface InputProps {
//   placeholder?: string;
//   type?: string;
//   children?: ReactNode;
// }
const DashboardNavBar = () => {
  return (
    <div className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex justify-between items-center px-12 py-5 ">
      <Link to="/">
        {/* <h1 className="font-[pacifico] text-slate-700 flex flex-row justify-center items-center text-4xl m-2 cursor-pointer">
          Inventory
        </h1> */}
        <img
          className="ml-9"
          src="./images/panorama-light-logo.png"
          alt="panorama-logo"
        />
      </Link>
      <div className="flex items-center space-x-4">
        {/* <p className="font-mono text-xl">Hello,</p> */}
        <div className="bg-gradient-to-t from-pano-dark-blue to-pano-blue text-2xl font-bold font-sans text-white cursor-pointer border-white rounded-full w-14 h-14 flex items-center justify-center">
          U
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
