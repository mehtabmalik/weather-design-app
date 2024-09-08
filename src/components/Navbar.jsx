import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-cyan-400 shadow-lg p-3 gap-5 flex items-center text-center border-b-orange-300">
      <div className="font-bold hover:text-gray-500 text-2xl transition-colors duration-300 cursor-pointer">
        <Link to="/">Weather</Link>
      </div>
      <div className="font-bold cursor-pointer mt-1 hover:text-gray-500">
        <Link to="/history">Weather History</Link>
      </div>
    </div>
  );
};

export default Navbar;
