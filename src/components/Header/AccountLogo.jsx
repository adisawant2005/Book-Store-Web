import React from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function AccountLogo() {
  return (
    <li className="basis-1/12 flex justify-center my-auto">
      <Link to="http://localhost:5173/accountpage" className="invert mt-5 h-16">
        <FaRegUserCircle size={"2.5em"} />
      </Link>
    </li>
  );
}

export default AccountLogo;
