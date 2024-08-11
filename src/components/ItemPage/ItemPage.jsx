import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pushOrUpdateItemInCart } from "../../store/cart";
import { IoMdArrowRoundBack } from "react-icons/io";
import { StickyMessage } from "../index";
import OrderSummary from "./OrderSummery";
import delivery_location from "../../assets/delivery_location";

const ItemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.data.result);
  const userLogin = useSelector((state) => state.account.data.success);
  const items = useSelector((state) => state.items.items);
  const item = useSelector((state) => state.items.selectedItem);
  const [quantity, setQuantity] = useState(item.item_quantity > 0 ? 1 : 0);
  const [orderNow, setOrderNow] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    payment_method: "",
    card_number: "",
    card_cvv: "",
    card_expiry_date: "",
    upi_id: "",
    tax_rate: 12,
    shipping_cost: 70,
    shipping_address: "",
  });
  const [payment_method, setPaymentMethod] = useState("");
  const [UPIid, setUPIid] = useState("");
  const [wrongUPIid, setWrongUPIid] = useState(false);
  const [totalCalculatedCost, setTotalCalculatedCost] = useState({
    totalItemsPrice: 0,
    totalTax: 0,
    totalCostAfterGST: 0,
    totalShippingCost: 0,
  });
  const [message, setMessage] = useState(<></>);
  const [showStickyMessage, setShowStickyMessage] = useState(false);
  const showStickyMessageHandler = (message) => {
    setMessage(message);
    setShowStickyMessage(true);
  };
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

  const handleTotalCalculatedCost = () => {
    const totalItemsPrice = quantity * item.item_price;
    const totalTax = (totalItemsPrice * orderDetails.tax_rate) / 100;
    const totalCostAfterGST = totalItemsPrice + totalTax;
    const totalShippingCost =
      totalCostAfterGST > 1000 ? 0 : orderDetails.shipping_cost;

    setTotalCalculatedCost({
      totalItemsPrice: totalItemsPrice,
      totalTax: totalTax,
      totalCostAfterGST: totalCostAfterGST,
      totalShippingCost: totalShippingCost,
    });
  };

  const handleCart = async (item) => {
    if (!userLogin) {
      showStickyMessageHandler(
        <span className="text-red-500">Please login to place order</span>
      );
      return;
    }

    const cartItemToPush = {
      customer_email: user.email,
      product_id: item.item_id,
      quantity: quantity,
    };
    const apiEndpointOfCart = "http://localhost:3000/cart";
    try {
      const response = await axios.post(apiEndpointOfCart, cartItemToPush);
      dispatch(pushOrUpdateItemInCart(response.data));
      setMessage(
        <>
          <strong>Item Added to Cart</strong>
        </>
      );
      setShowStickyMessage(true);
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
  };

  const handleOrderDetails = (e) =>
    setOrderDetails((state) => {
      const { name, value } = e.target;
      let details = {};
      if (name === "card_number") {
        const formatCardNumber = (input) => {
          // Remove all non-digits
          let formattedInput = input.replace(/\D/g, "");
          formattedInput = formattedInput.slice(0, 16);
          // Add space after every 4 characters
          formattedInput = formattedInput.replace(/(\d{4})/g, "$1 ").trim();
          return formattedInput;
        };

        const formattedCardNumber = formatCardNumber(value);
        details = {
          ...state,
          [name]: formattedCardNumber,
        };
      } else if (name === "card_cvv") {
        const formatCVV = (cvv) => {
          // Remove any non-digit characters
          let sanitizedCVV = cvv.replace(/\D/g, "");
          sanitizedCVV = sanitizedCVV.slice(0, 3);
          return sanitizedCVV;
        };

        const formattedCVV = formatCVV(value);
        details = {
          ...state,
          [name]: formattedCVV,
        };
      } else if (name === "upi_id") {
        let upiID = value.trim();
        const parts = upiID.split("@");

        if (parts.length === 2 && parts[0] !== "" && parts[1] !== "") {
          const userID = parts[0];
          const upiHandle = parts[1];
          setUPIid(`${userID}@${upiHandle}`);
          setWrongUPIid(false);
          details = {
            ...state,
            [name]: `${userID}@${upiHandle}`,
          };
        } else {
          setUPIid(upiID);
          setWrongUPIid(true);
          details = {
            ...state,
            [name]: "",
          };
        }
      } else {
        details = {
          ...state,
          [name]: value,
        };
      }

      return details;
    });

  const handleChoosePaymentMethod = (method) => {
    setPaymentMethod(method);
    setOrderDetails((state) => {
      return { ...state, payment_method: method };
    });
  };

  const handleOrderButton = (item) => {
    if (!userLogin) {
      showStickyMessageHandler(
        <span className="text-red-500">Please login to place order</span>
      );
      return;
    }
    setOrderNow((prev) => !prev);
  };

  useEffect(() => {
    handleTotalCalculatedCost();
    console.log(totalCalculatedCost);
  }, [quantity, item, orderDetails]);

  return (
    <>
      <StickyMessage
        message={message}
        duration={3000}
        isActive={showStickyMessage}
        setIsActive={setShowStickyMessage}
      />
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
          <div className="item-details mt-12">
            <h2 className="text-4xl my-4">{item.item_name}</h2>
            <hr />
            <p className="my-2">
              <span className="block text-slate-700">Description:&nbsp;</span>
              <textarea
                value={item.item_description}
                className="w-full h-28"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#f4f6f6 white",
                  scrollBehavior: "smooth",
                }}
              />
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
            <div className="my-2 grid grid-cols-1">
              <button
                onClick={() => handleCart(item)}
                className="btn m-2 text-lg py-1 text-white font-medium bg-yellow-500 justify-self-center w-[80%] rounded-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleOrderButton(item)}
                className="btn m-2 text-lg py-1 text-white font-medium bg-lime-500 justify-self-center w-[80%] rounded-md"
              >
                Order now
              </button>
            </div>
            <OrderSummary
              orderNow={orderNow}
              itemQuantity={quantity}
              item={item}
              user={user}
              totalCalculatedCost={totalCalculatedCost}
              orderDetails={orderDetails}
              handleOrderDetails={handleOrderDetails}
              delivery_location={delivery_location}
              payment_method={payment_method}
              handleChoosePaymentMethod={handleChoosePaymentMethod}
              UPIid={UPIid}
              userLogin={userLogin}
              showStickyMessageHandler={showStickyMessageHandler}
            />
          </div>
        </div>
        <div className="basis-1/12"></div>
      </div>
    </>
  );
};

export default ItemPage;
