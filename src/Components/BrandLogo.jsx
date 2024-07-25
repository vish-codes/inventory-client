
import { Link } from "react-router-dom";

const BrandLogo = ({ children }) => {
  return (
    <Link to="/">
      <h1 className="font-[pacifico] text-slate-800 flex flex-row justify-center items-center text-5xl">
        {children}
      </h1>
    </Link>
  );
};

export default BrandLogo;