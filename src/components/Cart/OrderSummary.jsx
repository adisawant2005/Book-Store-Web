import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems } from "../../store/cart";
import { useNavigate } from "react-router-dom";

function OrderSummary({
  proceedToCheckOut,
  totalNumberOfItems,
  user,
  cart,
  cart_items,
  totalCalculatedCost,
  setTotalCalculatedCost,
  orderDetails,
  handleOrderDetails,
  delivery_location,
  payment_method,
  handleChoosePaymentMethod,
  UPIid,
  userLogin,
  setProceedToCheckOut,
  showStickyMessageHandler,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDate = new Date();

  const matchingLocations = delivery_location.filter(
    (item) => item.shipping_address === orderDetails.shipping_address
  );

  const [currentDeliveryLocation, setCurrentDeliveryLocation] = useState({
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip_code: "",
    shipping_country: "",
  });

  const OrderDetailsTemplate = {
    customer_email: user.email,
    product_id: "", //......................
    product_image_address: "", //......................
    product_name: "", //......................
    product_description: "", //......................
    quantity: 0, //......................
    unit_price: 0, //......................
    payment_method: orderDetails.payment_method,
    card_number:
      orderDetails.card_number.length === 19 ? orderDetails.card_number : "",
    card_cvv: orderDetails.card_cvv.length === 3 ? orderDetails.card_cvv : "",
    card_expiry_date: orderDetails.card_expiry_date,
    upi_id: orderDetails.upi_id,
    tax_rate: orderDetails.tax_rate,
    shipping_cost: 0, //......................
    shipping_address: currentDeliveryLocation.shipping_address,
    shipping_city: currentDeliveryLocation.shipping_city,
    shipping_state: currentDeliveryLocation.shipping_state,
    shipping_zip_code: currentDeliveryLocation.shipping_zip_code,
    shipping_country: currentDeliveryLocation.shipping_country,
    shipping_method: "Express",
  };

  useEffect(() => {
    setCurrentDeliveryLocation((state) =>
      matchingLocations.length > 0 ? matchingLocations[0] : state
    );
  }, [orderDetails, useSelector((state) => state.cart.cart_items)]);

  const handlePlaceOrder = () => {
    if (orderDetails.shipping_address !== "") {
      if (
        orderDetails.payment_method === "card" &&
        orderDetails.card_number.length === 19 &&
        orderDetails.card_cvv.length === 3 &&
        orderDetails.card_expiry_date !== ""
      ) {
        console.log("Ready to POST card details");
        handleOrderForEachItem(cart_items);
      } else if (
        orderDetails.payment_method === "upi" &&
        orderDetails.upi_id !== ""
      ) {
        console.log("Ready to POST upi details");
        handleOrderForEachItem(cart_items);
      } else if (orderDetails.payment_method === "cash") {
        console.log("Ready to POST cash details");
        handleOrderForEachItem(cart_items);
      } else {
        // console.log("Please fill all the payment details");
        showStickyMessageHandler(
          <>
            <strong>Please fill all the payment details</strong>
          </>
        );
      }
    } else {
      //   console.log("Please fill the address");
      showStickyMessageHandler(
        <>
          <strong>Please fill the address</strong>
        </>
      );
    }
  };

  const handleOrderForEachItem = (cart_items) => {
    cart_items.forEach(async (item) => {
      const shipping_cost =
        totalCalculatedCost.totalShippingCost === 0
          ? 0
          : orderDetails.shipping_cost;
      const itemDetails = {
        ...OrderDetailsTemplate,
        shipping_cost: shipping_cost,
        product_id: item.item_id,
        product_image_address: item.item_image_url,
        quantity: item.item_quantity,
        unit_price: item.item_price,
        product_name: item.item_name,
        product_description: item.item_description,
      };

      const apiEndpoint = "http://localhost:3000/order";
      try {
        console.log("oreder page");
        const response = await axios.post(apiEndpoint, itemDetails);
        console.log(response.data);
        showStickyMessageHandler(
          <>
            <strong>Order Placed Successfully</strong>
          </>
        );
        setTimeout(() => navigate("/order"), 3000);
        setTotalCalculatedCost((prev) => {
          return {
            ...prev,
            totalItemsPrice: 0,
            totalTax: 0,
            totalCostAfterGST: 0,
            totalShippingCost: 0,
          };
        });
      } catch (error) {
        console.error({ error: error.message, message: "order summery page" });
      }
    });

    const deleteItemsFromCart = async () => {
      try {
        const apiEndpoint = "http://localhost:3000/cart";
        const userDetails = { customer_email: user.email, delete_all: true };
        console.log(userDetails);
        const response = await axios.delete(apiEndpoint, { data: userDetails });
        console.log(response.data);
        dispatch(deleteCartItems());
      } catch (error) {
        console.error({ error: error.message, message: "cart summery page" });
      }
    };
    deleteItemsFromCart();
  };

  return (
    <div
      name="Subtotal Amount"
      className={` ${
        proceedToCheckOut ? "basis-5/12" : "basis-3/12"
      } my-4 me-4 ms-2 flex flex-col px-4 pt-2 pb-4 border-2 rounded-2xl bg-white`}
    >
      <div>
        {proceedToCheckOut ? (
          <>
            <div>
              <div className="text-xl">
                <span className="block font-medium text-lg text-gray-600">
                  Total number of items :&nbsp;
                  <span className="inline-block text-slate-900">
                    {totalNumberOfItems}
                  </span>
                </span>
                <div className="border-2 border-blue-500 px-2 mt-2">
                  <span className="flex justify-between  font-medium text-lg text-gray-600">
                    Cost of items :&nbsp;
                    <span className="inline-block text-slate-900">
                      ₹{totalCalculatedCost.totalItemsPrice}
                    </span>
                  </span>
                  <span className="flex justify-between  font-medium text-lg text-gray-600">
                    Total tax ({orderDetails.tax_rate}% GST) :&nbsp;
                    <span className="inline-block text-slate-900">
                      ₹{totalCalculatedCost.totalTax}
                    </span>
                  </span>
                  <span className="flex justify-between  font-medium text-lg text-gray-600">
                    Shipping cost :&nbsp;
                    <span className="inline-block text-slate-900">
                      ₹{totalCalculatedCost.totalShippingCost}
                    </span>
                  </span>
                  <span className="flex justify-between  font-medium text-lg text-gray-600">
                    Order total :&nbsp;
                    <span className="inline-block text-slate-900">
                      ₹
                      {totalCalculatedCost.totalCostAfterGST +
                        totalCalculatedCost.totalShippingCost}
                    </span>
                  </span>
                </div>
                <span className="text-gray-600 text-sm mb-2">
                  Order Above ₹ 1000 for free delivery
                </span>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="delivery_address"
                  className="block font-medium text-gray-600"
                >
                  Delivery address :
                </label>
                <select
                  id="shipping_address"
                  name="shipping_address"
                  value={orderDetails.shipping_address}
                  onChange={handleOrderDetails}
                  className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                  required
                >
                  <option value="" disabled>
                    Choose your preferred address
                  </option>
                  {delivery_location.map((delivery_location) => (
                    <option key={nanoid()}>
                      {" "}
                      {delivery_location.shipping_address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 ">
                <span className="block font-medium text-lg text-gray-600">
                  Choose your preferred payment option :
                </span>
                <div className="mt-4 grid grid-cols-3">
                  <label>
                    Card&nbsp;
                    <input
                      name="gender"
                      type="radio"
                      value="male"
                      checked={payment_method === "card"}
                      onChange={() => handleChoosePaymentMethod("card")}
                      required
                    />
                  </label>

                  <label>
                    UPI&nbsp;
                    <input
                      name="gender"
                      type="radio"
                      value="female"
                      checked={payment_method === "upi"}
                      onChange={() => handleChoosePaymentMethod("upi")}
                      required
                    />
                  </label>

                  <label>
                    On delivery&nbsp;
                    <input
                      name="gender"
                      type="radio"
                      value="other"
                      checked={payment_method === "cash"}
                      onChange={() => handleChoosePaymentMethod("cash")}
                      required
                    />
                  </label>
                </div>
                {payment_method === "card" ? (
                  <>
                    <span className="mt-4 block">
                      Enter your Card details :
                    </span>
                    <div className="grid grid-cols-2">
                      <div className="mb-4 col-span-2">
                        <label
                          htmlFor="card_number"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="card_number"
                          value={orderDetails.card_number}
                          onChange={handleOrderDetails}
                          className="mt-1 p-2 w-full border-4 border-slate-500 rounded-md outline-none"
                          required
                        />
                      </div>
                      <div className="mb-4 w-20">
                        <label
                          htmlFor="card_cvv"
                          className="block text-sm font-medium text-gray-600"
                        >
                          CVV
                        </label>
                        <input
                          type="password"
                          name="card_cvv"
                          value={orderDetails.card_cvv}
                          onChange={handleOrderDetails}
                          className="mt-1 p-2 w-full border-4 border-slate-500 rounded-md outline-none"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="birthdate"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          id="card_expiry_date"
                          name="card_expiry_date"
                          value={orderDetails.card_expiry_date}
                          onChange={handleOrderDetails}
                          min={currentDate}
                          className="mt-1 p-2 w-full border-4 border-slate-500 rounded-md outline-none"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {payment_method === "upi" ? (
                  <>
                    <div className="mb-4 col-span-2">
                      <label
                        htmlFor="upi_id"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Enter UPI id
                      </label>
                      <input
                        type="text"
                        name="upi_id"
                        value={UPIid}
                        onChange={handleOrderDetails}
                        className="mt-1 p-2 w-full border-4 border-slate-500 rounded-md outline-none"
                        required
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {payment_method === "cash" ? (
                  <>
                    <span className="mt-4 block text-sm text-slate-700">
                      You can pay using card, upi or cash on delivery
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex justify-center text-sm">
              <button
                onClick={(e) => {
                  handlePlaceOrder();
                }}
                className="btn btn-secondary rounded-md text-lg mt-4 py-2 px-4"
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex text-slate-700 text-xl mb-4">
              <div>
                <span className="inline-block">Subtotal&nbsp;</span>
                <span className="inline-block">
                  ({totalNumberOfItems} item):&nbsp;
                </span>
                <span className="inline-block">
                  {" "}
                  ₹ {totalCalculatedCost.totalItemsPrice}
                </span>
              </div>
            </div>
            <div className="flex justify-center text-sm">
              <button
                onClick={(e) =>
                  userLogin && setProceedToCheckOut((state) => !state)
                }
                className="btn btn-secondary rounded-md text-lg py-2 px-4"
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
