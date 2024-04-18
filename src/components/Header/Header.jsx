import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginAndSignupButton from "./LoginAndSignupButton";
import AccountLogo from "./AccountLogo";
import axios from "axios";
import { updateItems } from "../../store/items";
import { useSelector, useDispatch } from "react-redux";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

const Header = ({ handleSidebarDisable }) => {
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.account.data);
  const items = useSelector((state) => state.items.items);
  const apiEndpoint = "http://localhost:3000/items/search-items";
  const [userLogin, setUserLogin] = useState();
  const [search, setSearch] = useState("");

  const fetchSearchedData = async (search_text) => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: { search_text: search_text },
      });
      dispatch(updateItems(response.data.items));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setUserLogin(accountData.success);
    fetchSearchedData(search);
  }, [accountData, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

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
        <li
          className={`${
            userLogin ? "basis-6/12" : "basis-5/12"
          } flex justify-center h-full `}
        >
          <div className="flex flex-row w-full my-3 rounded-md bg-slate-600 border-4 border-slate-900">
            <input
              type="text"
              id="searchBar"
              value={search}
              onChange={handleSearch}
              placeholder="Enter the book you NEED"
              className="rounded-s-sm px-2 text-2xl w-full outline-none"
            />
            <label htmlFor="searchBar">
              <button className=" p-2 hover:-translate-y-0.5 hover:transition">
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
        {userLogin ? <AccountLogo /> : <LoginAndSignupButton />}
      </ul>
    </nav>
  );
};

export default Header;
