import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import { selectedItem } from "../../store/items";
import {
  updateCartItems,
  deleteCartItem,
  deleteCartItems,
} from "../../store/cart";
import delivery_location from "../../assets/delivery_location";
import { IoMdArrowRoundBack } from "react-icons/io";
import { StickyMessage } from "../index";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDate = new Date();

  const [message, setMessage] = useState(<></>);
  const [showStickyMessage, setShowStickyMessage] = useState(false);
  const showStickyMessageHandler = (message) => {
    setMessage(message);
    setShowStickyMessage(true);
  };

  const user = useSelector((state) => state.account.data.result);
  const userLogin = useSelector((state) => state.account.data.success);
  const items = useSelector((state) => state.items.items);
  const cart = useSelector((state) => state.cart.cart_items);

  /* to rerender the cart if the item quantity changes */
  const [cart_checkState, setCart_checkState] = useState();
  let cart_check;

  const cart_items = items
    .filter((item) =>
      cart.some((cartItem) => cartItem.product_id === item.item_id)
    )
    .map((item) => {
      const quantity = cart.filter(
        (cartItem) => cartItem.product_id === item.item_id
      )[0].quantity;
      return { ...item, item_quantity: quantity };
    });

  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [totalCalculatedCost, setTotalCalculatedCost] = useState({
    totalItemsPrice: 0,
    totalTax: 0,
    totalCostAfterGST: 0,
    totalShippingCost: 0,
  });
  const [proceedToCheckOut, setProceedToCheckOut] = useState(false);
  const [payment_method, setPaymentMethod] = useState("");
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
  const [UPIid, setUPIid] = useState("");
  const [wrongUPIid, setWrongUPIid] = useState(false);

  const handleNumberOfCartItems = () => {
    let totalNumberOfItems = 0;
    for (let i = 0; i < cart_items.length; i++) {
      totalNumberOfItems += cart_items[i].item_quantity;
    }
    return totalNumberOfItems;
  };

  const handleTotalCalculatedCost = () => {
    let totalItemsPrice = 0;
    let totalTax = 0;
    let totalCostAfterGST = 0;
    let totalShippingCost = 0;
    for (let i = 0; i < cart_items.length; i++) {
      let itemTotalPrice =
        cart_items[i].item_quantity * cart_items[i].item_price;
      totalItemsPrice += itemTotalPrice;
      totalTax += (itemTotalPrice * orderDetails.tax_rate) / 100;
      totalShippingCost += orderDetails.shipping_cost;
    }
    totalCostAfterGST = totalItemsPrice + totalTax;

    if (totalCostAfterGST > 1000 || cart.length === 0) {
      totalShippingCost = 0;
    }
    return {
      totalItemsPrice,
      totalTax,
      totalCostAfterGST,
      totalShippingCost,
    };
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

  useEffect(() => {
    setTotalNumberOfItems(handleNumberOfCartItems());
    setTotalCalculatedCost(handleTotalCalculatedCost);
  }, [cart]);

  useEffect(() => {
    const getCartItems = async () => {
      if (userLogin) {
        const apiEndpoint = "http://localhost:3000/cart";
        try {
          const response = await axios.get(apiEndpoint, {
            params: {
              customer_email: user.email,
            },
          });
          dispatch(updateCartItems(response.data));
        } catch (error) {
          console.log({ error: error.message });
        }
      } else {
        dispatch(deleteCartItems());
      }
    };

    getCartItems();
  }, [user]);

  const handleClick = (item) => {
    dispatch(selectedItem(item));
  };

  const handleRemoveFromCart = async (item) => {
    const itemToRemove = {
      product_id: item.item_id,
      customer_email: user.email,
    };
    const apiEndpoint = "http://localhost:3000/cart";
    try {
      const removedItem = await axios.delete(apiEndpoint, {
        data: itemToRemove,
      });
      dispatch(deleteCartItem(removedItem.data));
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const handleChoosePaymentMethod = (method) => {
    setPaymentMethod(method);
    setOrderDetails((state) => {
      return { ...state, payment_method: method };
    });
  };

  return (
    <>
      <StickyMessage
        message={message}
        duration={3000}
        isActive={showStickyMessage}
        setIsActive={setShowStickyMessage}
      />
      <main className="w-full">
        <div name="Shopping Cart" className="flex">
          <div className="basis-1/12 flex">
            <button
              onClick={() => navigate("/")}
              className="btn py-1 px-2 mt-10 mx-auto h-12 bg-sky-500 text-white rounded-md"
            >
              <IoMdArrowRoundBack size={"2em"} />
            </button>
          </div>
          <div
            name="Shopping Cart List"
            className={` ${
              proceedToCheckOut ? "basis-6/12" : "basis-8/12"
            } flex flex-col bg-white`}
          >
            <div
              name="Header"
              className=" me-2 mb-4 w-full flex items-end justify-between border-b-4 "
            >
              <h1 className="text-4xl font-semibold text-cyan-600 mx-4 mt-4 mb-2">
                {proceedToCheckOut ? "Order Summary" : "Shopping Cart"}
              </h1>
              <span className=" text-slate-400 me-8 ">price</span>
            </div>
            {cart_items.length !== 0 ? (
              <ul className="flex flex-col w-full">
                {cart_items.map((item) => (
                  <li key={item.item_id} className="m-2 p-2 border-b-2 w-full">
                    <ul className="flex h-48">
                      <li className="h-48 w-48 shrink-0">
                        <Link
                          className="h-48 w-48"
                          to="/itempage"
                          onClick={() => handleClick(item)}
                        >
                          <img
                            className="max-h-48 max-w-48 mx-auto my-auto"
                            src={item.item_image_url}
                            alt="Book Name"
                          />
                        </Link>
                      </li>
                      <li className="flex flex-col w-full mt-4 ms-4 me-auto">
                        <h1 className="text-3xl text-slate-900 font-semibold">
                          {item.item_name}
                        </h1>
                        <span>
                          {item.item_quantity > 0 ? (
                            <span className="text-green-600">In Stock</span>
                          ) : (
                            <span className="text-red-500">Out of Stock</span>
                          )}
                        </span>
                        <span>
                          <span className="text-slate-700">
                            Quantity:&nbsp;
                          </span>
                          {item.item_quantity}
                        </span>
                        <textarea
                          value={item.item_description}
                          className="w-[80%] h-28 text-md text-slate-500"
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#f4f6f6 white",
                            scrollBehavior: "smooth",
                          }}
                        />
                        <button
                          onClick={() => handleRemoveFromCart(item)}
                          className="btn mt-2 py-0.5 w-32 text-sm bg-slate-200 text-white rounded-md"
                        >
                          <span className="text-slate-800">
                            Remove from cart
                          </span>
                        </button>
                      </li>
                      <li className="text-2xl font-semibold ms-auto mt-4 me-4 ">
                        <span className="block">
                          <span>₹</span>
                          {item.item_price}
                        </span>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="block font-bold text-3xl text-center m-10 text-slate-400">
                {userLogin
                  ? "Your Cart is empty"
                  : "Please log in to add items in cart"}
              </span>
            )}
          </div>
          <OrderSummary
            proceedToCheckOut={proceedToCheckOut}
            totalNumberOfItems={totalNumberOfItems}
            setTotalCalculatedCost={setTotalCalculatedCost}
            user={user}
            cart={cart}
            cart_items={cart_items}
            totalCalculatedCost={totalCalculatedCost}
            orderDetails={orderDetails}
            handleOrderDetails={handleOrderDetails}
            delivery_location={delivery_location}
            payment_method={payment_method}
            handleChoosePaymentMethod={handleChoosePaymentMethod}
            UPIid={UPIid}
            userLogin={userLogin}
            setProceedToCheckOut={setProceedToCheckOut}
            showStickyMessageHandler={showStickyMessageHandler}
          />
        </div>
      </main>
    </>
  );
};

export default Cart;
