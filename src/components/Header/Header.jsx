import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginAndSignupButton from "./LoginAndSignupButton";
import AccountLogo from "./AccountLogo";
import axios from "axios";
import { updateItems, selectedItem } from "../../store/items";
import { useSelector, useDispatch } from "react-redux";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

const Header = ({ handleSidebarDisable }) => {
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.account.data);
  const items = useSelector((state) => state.items.items);
  const [userLogin, setUserLogin] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchBarActive, setSearchBarActive] = useState(false);

  useEffect(() => {
    setUserLogin(accountData.success);
    console.log(searchedItems);
  }, [accountData, searchText]);

  const handleSearchText = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      setSearchBarActive(true);
      // console.log(searchBarActive);
    } else {
      setSearchBarActive(false);
      // console.log(searchBarActive);
    }

    const apiEndpoint = "http://localhost:3000/items/search-items";
    console.log(e.target.value);

    try {
      const response = await axios.get(apiEndpoint, {
        params: { search_text: e.target.value },
      });

      setSearchedItems(response.data.items);
      // dispatch(updateItems(response.data.items));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchClick = (item) => {
    dispatch(selectedItem(item));
    setSearchText("");
    setSearchBarActive(false);
  };

  return (
    <nav className=" w-full bg-slate-700">
      <ul className="flex flex-row relative justify-between h-[10vh] pe-20 ps-8">
        <li className="basis-2/12 flex flex-row justify-self-start my-auto">
          <Link to="#" className="flex flex-row justify-self-start invert h-16">
            <button
              className="justify-self-start my-auto"
              onClick={handleSidebarDisable}
            >
              <IoReorderThree size={"4em"} />
            </button>
          </Link>
        </li>
        <li
          className={`${
            userLogin ? "basis-6/12" : "basis-5/12"
          } flex flex-col justify-center mr-20 my-3`}
        >
          <div className="absolute top-0 ms-[-50px] w-[40%] ">
            <div className="flex flex-row relative mt-2 rounded-md bg-slate-600 border-4 border-slate-900">
              <input
                type="text"
                id="searchTextBar"
                value={searchText}
                onChange={handleSearchText}
                placeholder="Search the books here"
                className="rounded-s-sm px-1 text-2xl w-full outline-none"
              />
              <label htmlFor="searchTextBar">
                <button className=" p-1 hover:-translate-y-0.5 hover:transition">
                  <IoMdSearch size={"2em"} />
                </button>
              </label>
            </div>
            <div className=" relative mt-2">
              {searchBarActive && searchedItems.length > 0 ? (
                <>
                  {searchedItems.map((item) => (
                    <>
                      <ul className="flex flex-col relative">
                        <li className="relative">
                          <Link
                            to="/itempage"
                            onClick={() => handleSearchClick(item)}
                            className="flex flex-row opacity-85 bg-white hover:opacity-100 hover:duration-500 hover:cursor-pointer"
                          >
                            <img
                              src={item.item_image_url}
                              alt="item image"
                              className="h-16 m-2 hover:transition hover:h-16 "
                            />
                            <span>{item.item_name}</span>
                          </Link>
                        </li>
                      </ul>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </li>
        <li className="basis-1/12 flex justify-center ">
          <Link to="/order" className="text-white text-center my-auto">
            <h1 className="text-2xl font-semibold p-2">Orders</h1>
          </Link>
        </li>
        <li className="basis-1/12 flex justify-center my-auto">
          <Link to="/cart" className="invert h-16">
            <PiShoppingCartDuotone size={"4em"} />
          </Link>
        </li>
        {userLogin ? <AccountLogo /> : <LoginAndSignupButton />}
      </ul>
    </nav>
  );
};

export default Header;
