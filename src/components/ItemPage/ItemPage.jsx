import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pushOrUpdateItemInCart } from "../../store/cart";
import { IoMdArrowRoundBack } from "react-icons/io";

const ItemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountEmail = useSelector((state) => state.account.data.result.email);
  const userLogin = useSelector((state) => state.account.data.success);
  const [errorMsg, setErrorMsg] = useState("");
  const item = useSelector((state) => state.items.selectedItem);
  const [quantity, setQuantity] = useState(item.item_quantity ? 1 : null);
  const quantityCountArray = () => {
    let countArray = [];
    for (let i = 1; i <= item.item_quantity; i++) {
      countArray.push(i);
    }
    return countArray;
  };

  const printRating = (rating) => {
    return "⭐".repeat(rating);
  };

  const handleCart = async (item) => {
    if (userLogin) {
      setErrorMsg("");
      const cartItemToPush = {
        customer_email: accountEmail,
        product_id: item.item_id,
        quantity: quantity,
      };
      const apiEndpointOfCart = "http://localhost:3000/cart";
      try {
        const response = await axios.post(apiEndpointOfCart, cartItemToPush);
        dispatch(pushOrUpdateItemInCart(response.data));
        console.log(response.data);

        // const updateItemQuantity = {
        //   item_id: item.item_id,
        //   reduced_quantity: quantity,
        // };
        // console.log(updateItemQuantity);
        // const apiEndpointOfItems = "http://localhost:3000/items";
        // const itemUpdated = axios.put(apiEndpointOfItems, updateItemQuantity);
        // console.log(itemUpdated.data[0]);
      } catch (error) {
        console.log({ error: error.message });
      }
    } else {
      setErrorMsg("Login to add item");
    }
  };

  const handleOrder = (item) => {};

  return (
    <div className="flex justify-around">
      <div className="basis-1/12 flex flex-row-reverse">
        <button
          onClick={() => navigate("/")}
          className="btn py-1 px-2 mt-10 ms-auto h-12 bg-sky-500 text-white rounded-md"
        >
          <IoMdArrowRoundBack size={"2em"} />
        </button>
      </div>
      <div className="basis-6/12 flex h-[80vh]">
        <img
          src={item.item_image_url}
          alt=""
          className="h-[80%] mx-auto self-center"
        />
      </div>
      <div className="basis-4/12">
        <div className="item-details">
          <h2 className="text-4xl my-4">{item.item_name}</h2>
          <hr />
          <p className="my-2">
            <span className="block text-slate-700">Description:&nbsp;</span>
            {item.item_description}
          </p>
          <p className="my-2">
            <span className=" text-slate-700">Price:</span> ₹{item.item_price}
          </p>
          <p className="my-2">
            <span className=" text-slate-700">Category:</span>{" "}
            {item.item_category}
          </p>
          <p className="my-4">
            <span className=" text-slate-700">Rating:</span>{" "}
            {printRating(item.item_rating)}
          </p>
          <p className="my-2">
            <span className=" text-slate-700">Reviews:</span>{" "}
            {item.item_reviews}
          </p>
          <p>
            <span className=" text-slate-700">Quantity:&nbsp;</span>{" "}
            <select
              name="quantity"
              className="mt-4 mb-4 px-2 py-1 outline-none"
              onChange={(e) => setQuantity(e.target.value)}
              required
            >
              {quantityCountArray().map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </p>
          <p>
            {item.item_quantity > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>
          <span className="text-red-500 text-sm">{errorMsg}</span>
          <div className="my-2 grid grid-cols-1">
            <button
              onClick={() => handleCart(item)}
              className="btn m-2 text-lg py-1 text-white font-medium bg-yellow-500 justify-self-center w-[80%] rounded-md"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleOrder(item)}
              className="btn m-2 text-lg py-1 text-white font-medium bg-lime-500 justify-self-center w-[80%] rounded-md"
            >
              Order now
            </button>
          </div>
        </div>
      </div>
      <div className="basis-1/12"></div>
    </div>
  );
};

export default ItemPage;
