import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemsOnSale,
  setItemOnSaleForUpdate,
  deleteItemOnSale,
} from "../../store/items";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { getAccountData } from "../../store/account";

const SellerPage = () => {
  const dispatch = useDispatch();
  const accountDetails = useSelector((state) => state.account.data.result);
  const userLogged = useSelector((state) => state.account.data.success);
  const itemsOnSale = useSelector((state) => state.items.itemsOnSale);

  const apiEndpoint = "http://localhost:3000/items";
  const fetchItemsOnSaleData = async (accountDetails) => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          user_email: accountDetails.email,
          user_password: accountDetails.password,
        },
      });
      dispatch(updateItemsOnSale(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (accountDetails.email !== "") {
      fetchItemsOnSaleData(accountDetails);
    }
  }, [accountDetails]);

  const handleUpdateItem = (obj) => {
    dispatch(setItemOnSaleForUpdate(obj));
  };

  const handleDeleteItem = async (obj) => {
    console.log("Handling Delete");
    const dataObj = {
      ...obj,
      user_email: accountDetails.email,
      user_password: accountDetails.password,
    };
    const request = await axios.delete(apiEndpoint, { data: dataObj });
    console.log(request.data);
    if (request.data.success) {
      dispatch(deleteItemOnSale(obj));
    }
  };

  return (
    <main className="">
      <header className="block text-5xl text-cyan-600 mx-2 mb-8 border-b-4 pt-4 font-semibold ">
        Sell Your Book...
      </header>
      {userLogged ? (
        itemsOnSale.length > 0 ? (
          <div>
            <div className="mx-8 my-6">
              <Link
                to="/sell_item_page"
                className="px-5 py-2 text-white text-3xl bg-cyan-500 rounded-full"
              >
                Put your item on sell
              </Link>
            </div>
            <div className="border-4 rounded-3xl mx-8 my-4 py-2">
              <header className="block text-4xl text-cyan-600 mx-2 mb-8 border-b-4 pt-4 font-semibold ">
                Your items for sell
              </header>
              <ul>
                {itemsOnSale.map((item) => (
                  <li
                    key={nanoid()}
                    className="flex border-2 rounded-xl m-4 p-2"
                  >
                    <div name="item details" className="flex basis-4/6">
                      <div className="basis-2/6 w-48 h-48">
                        <img
                          className="max-w-48 max-h-48 m-auto justify-self-center"
                          src={item.item_image_url}
                          alt="product image"
                        />
                      </div>
                      <div className="basis-4/6 flex flex-col ">
                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item ID : &nbsp;
                          </span>{" "}
                          {item.item_id}
                        </span>
                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item name : &nbsp;
                          </span>{" "}
                          {item.item_name}
                        </span>
                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item description : &nbsp;
                          </span>
                          <textarea
                            value={item.item_description}
                            className="w-full h-16"
                            style={{
                              height: "75px",
                              scrollbarWidth: "thin",
                              scrollbarColor: "#f4f6f6 white",
                              scrollBehavior: "smooth",
                            }}
                          />
                        </span>

                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item price : &nbsp;
                          </span>{" "}
                          ₹{item.item_price}
                        </span>
                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item category : &nbsp;
                          </span>
                          {item.item_category}
                        </span>
                        <span className="text-stone-800">
                          <span className="text-stone-900 font-semibold">
                            Item quantity : &nbsp;
                          </span>
                          {item.item_quantity}
                        </span>
                      </div>
                    </div>
                    <div className="basis-2/6 grid justify-items-center ">
                      <Link
                        name="update button"
                        to="/update_item_page"
                        onClick={() => handleUpdateItem(item)}
                        className=" block bg-yellow-500 text-white rounded-full m-auto px-4 py-2 "
                      >
                        Update item
                      </Link>
                      <button
                        name="delete button"
                        onClick={() => handleDeleteItem(item)}
                        className=" block bg-red-500 text-white rounded-full m-auto px-4 py-2 "
                      >
                        Delete item
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mx-8 my-4 py-2">
            <span className="block font-bold text-3xl text-center text-slate-400">
              We don't have any items on sale
            </span>
            <div className="flex">
              <Link
                to="/sell_item_page"
                className="mx-auto mt-10 mb-4 px-6 py-3 text-white text-3xl bg-cyan-500 rounded-full"
              >
                Let's put your item on sell
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="font-bold text-3xl text-center text-slate-400">
          <span>Please login to see your items on sale</span>
        </div>
      )}
    </main>
  );
};

export default SellerPage;
