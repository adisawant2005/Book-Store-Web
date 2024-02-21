import React from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

const Header = () => {
  return (
    <nav className=" w-full bg-slate-700">
      <ul className="flex flex-row justify-between">
        <li className="basis-2/12 flex justify-start pt-4">
          <Link className="invert">
            <button>
              <IoReorderThree size={"4em"} />
            </button>
          </Link>
        </li>
        <li className="basis-5/12 h-2/3 flex justify-center pt-4">
          <div className="flex flex-row w-full rounded-lg bg-slate-600 border-4 border-slate-900">
            <input
              type="text"
              id="searchBar"
              className="rounded-s-lg text-2xl w-full outline-none"
            />
            <label htmlFor="searchBar">
              <button className="translate-y-1 hover:-translate-y-0.5 hover:transition">
                <IoMdSearch size={"2em"} />
              </button>
            </label>
          </div>
        </li>
        <li className="basis-1/12 flex justify-center pt-4">
          <Link to="#" className="text-white text-center">
            <h1 className="text-3xl p-2">Orders</h1>
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center pt-4">
          <Link className="invert">
            <PiShoppingCartDuotone size={"4em"} />
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center pt-4">
          <Link
            to="http://localhost:5173/login"
            className="text-white text-center"
          >
            <button className="text-2xl btn btn-primary p-2">Login</button>
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center pt-4">
          <Link
            to="http://localhost:5173/signup"
            className="text-white text-center"
          >
            <button className="text-2xl btn btn-secondary p-2">Signup</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
