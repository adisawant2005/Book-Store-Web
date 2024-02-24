import React from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

const Header = ({ handleSidebarDisable }) => {
  return (
    <nav className=" w-full bg-slate-700">
      <ul className="flex flex-row justify-between h-full">
        <li className="basis-2/12 flex justify-start my-auto">
          <Link to="#" className="invert h-16">
            <button className="my-auto" onClick={handleSidebarDisable}>
              <IoReorderThree size={"4em"} />
            </button>
          </Link>
        </li>
        <li className="basis-5/12 flex justify-center h-full ">
          <div className="flex flex-row w-full my-3 rounded-md bg-slate-600 border-4 border-slate-900">
            <input
              type="text"
              id="searchBar"
              placeholder="Enter the book you NEED"
              className="rounded-s-sm text-2xl w-full outline-none"
            />
            <label htmlFor="searchBar">
              <button className="translate-y-1 hover:-translate-y-0.5 hover:transition">
                <IoMdSearch size={"2em"} />
              </button>
            </label>
          </div>
        </li>
        <li className="basis-1/12 flex justify-center ">
          <Link
            to="http://localhost:5173/order"
            className="text-white text-center my-auto"
          >
            <h1 className="text-2xl font-semibold p-2">Orders</h1>
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center my-auto">
          <Link to="http://localhost:5173/cart" className="invert h-16">
            <PiShoppingCartDuotone size={"4em"} />
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center ">
          <Link
            to="http://localhost:5173/login"
            className="text-white text-center my-auto"
          >
            <button className="text-2xl btn btn-primary px-2 py-1 rounded-md">
              Login
            </button>
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center ">
          <Link
            to="http://localhost:5173/signup"
            className="text-white text-center my-auto"
          >
            <button className="text-2xl btn btn-secondary px-2 py-1 rounded-md">
              Signup
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
