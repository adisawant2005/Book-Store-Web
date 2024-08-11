import { useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrders, deleteOrder } from "../../store/order";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_email = useSelector((state) => state.account.data.result.email);
  const orders = useSelector((state) => state.orders.orderedItems) || "";
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );
  sortedOrders.forEach((item) => {
    console.log(item.order_date);
  });

  const queryParams = {
    customer_email: user_email,
  };

  useEffect(() => {
    const apiEndpoint = "http://localhost:3000/order";
    const sendGetRequest = async () => {
      try {
        const response = await axios.get(apiEndpoint, {
          params: queryParams,
        });
        dispatch(updateOrders(response.data.orders));
      } catch (error) {
        console.error({ error: error.message });
      }
    };

    sendGetRequest();
  }, [user_email]);

  const handleDeleteOrder = async (item) => {
    try {
      const apiEndpoint = "http://localhost:3000/order";
      const response = await axios.delete(apiEndpoint, {
        data: {
          customer_id: item.customer_id,
          order_id: item.order_id,
        },
      });
      dispatch(deleteOrder(response.data.orderCancled[0].order_id));
    } catch (error) {
      console.log({ message: "order Page", error: error.message });
    }
  };

  return (
    <main>
      <div className="flex">
        <div className="basis-1/12 flex">
          <button
            onClick={() => navigate("/")}
            className="btn py-1 px-2 mt-10 mx-auto h-12 bg-sky-500 text-white rounded-md"
          >
            <IoMdArrowRoundBack size={"2em"} />
          </button>
        </div>
        <div name="Order Page" className="basis-11/12">
          <div className="block text-5xl text-cyan-600 mx-2 border-b-4 pt-4 font-semibold ">
            <h1 className="mx-4">Orders</h1>
          </div>
          <div>
            {console.log(orders)}
            {sortedOrders.length !== 0 ? (
              sortedOrders.map((item) => (
                <div
                  key={nanoid()}
                  name="ordered_item_template"
                  className="grid grid-cols-6 gap-2 p-2 m-4 border-4 rounded-xl text-stone-800"
                >
                  <div
                    name="product_image"
                    className="col-span-2 my-auto text-center h-52"
                  >
                    <img
                      src={item.product_image_address}
                      alt="product_image_address"
                      className="max-h-52 max-w-52 mx-auto justify-self-center"
                    />
                  </div>
                  <div
                    name="product_&_order_details"
                    className="col-span-3 border-4 p-4 rounded-xl"
                  >
                    <span className="text-xl block">Order details</span>

                    <span className="block text-stone-500">
                      Item Name :&nbsp;
                      <span className="inline-block p-auto text-stone-800">
                        {item.product_name}
                      </span>
                    </span>
                    <span className="flex block text-stone-500">
                      <span>{"Decsription :"}&nbsp;</span>
                      <textarea
                        value={item.product_description}
                        className="w-[80%] h-16 text-md text-stone-800"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "#f4f6f6 white",
                          scrollBehavior: "smooth",
                        }}
                      />
                    </span>
                    <span className="block text-stone-500">
                      Order ID :&nbsp;
                      <span className="inline-block p-auto text-stone-800">
                        {item.order_id}
                      </span>
                    </span>
                    <span className="block text-stone-500">
                      Order Date :&nbsp;
                      <span className="inline-block p-auto text-stone-800">
                        {item.order_date.slice(0, 10)}
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        console.log("cancle button clicked");
                        console.log(item.order_id, item.customer_id);
                        handleDeleteOrder(item);
                      }}
                      className="btn bg-stone-200 text-stone-600 py-1 px-2 rounded-md"
                    >
                      Cancle Order
                    </button>
                  </div>
                  <div
                    name="order_status"
                    className="text-center border-4 p-4 rounded-xl"
                  >
                    <span className="text-xl">Order status</span>
                    <span className="block my-2 text-green-500">
                      {item.order_status}
                    </span>
                    <span className="block text-green-500 my-2">
                      Ordered on&nbsp;
                      {item.order_date.slice(8, 10)}-
                      {item.order_date.slice(5, 7)}-
                      {item.order_date.slice(0, 4)}
                    </span>
                    <span className="block text-green-500 my-2">
                      Arriving till&nbsp;
                      {item.estimated_delivery_date.slice(8, 10)}-
                      {item.estimated_delivery_date.slice(5, 7)}-
                      {item.estimated_delivery_date.slice(0, 4)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-bold text-3xl text-center m-10 text-slate-400">
                you didn't order anything
              </div>
            )}
            {/* <div className="">
          <ul
            name="OrderDetails"
            className="text-2xl text-slate-700 flex pt-4 px-4 "
          >
            <li className="border-b-4 mx-1 basis-4/12 text-center">Product</li>
            <li className="border-b-4 mx-1 basis-2/12 text-center">
              Product Details
            </li>
            <li className="border-b-4 mx-1 basis-2/12 text-center">Order No</li>
            <li className="border-b-4 mx-1 basis-2/12 text-center">
              Order Date
            </li>
            <li className="border-b-4 mx-1 basis-1/12 text-center">Amount</li>
            <li className="border-b-4 mx-1 basis-1/12 text-center">Status</li>
          </ul>
        </div>
        <ul name="Orders" className="text-xl text-slate-500 flex flex-col m-8 ">
          <li>
            <ul name="Order" className="flex">
              <li name="productImage" className=" h-64 w-64 basis-4/12">
                <img
                  className="max-h-full max-w-full mx-auto my-auto"
                  src="StoriesBTI_3DCover.jpg"
                  alt="Book"
                />
              </li>
              <li
                name="productDetails"
                className=" font-medium basis-2/12 text-center mx-auto "
              >
                <h1 className="text-slate-950 text-2xl">
                  Story Behind the Images
                </h1>
                <p className="font-normal text-sm">The Untold Story</p>
              </li>
              <li name="orderNo" className=" basis-2/12 text-center mx-auto ">
                1234
              </li>
              <li name="orderDate" className=" basis-2/12 text-center mx-auto ">
                14/02/2024
              </li>
              <li
                name="amountOfOrder"
                className=" basis-1/12 text-center  mx-auto "
              >
                ₹600
              </li>
              <li
                name="orderStaus"
                className="text-green-600 font-medium basis-1/12 text-center mx-auto "
              >
                Arriving on 01/03/2024
              </li>
            </ul>
          </li>
        </ul> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
