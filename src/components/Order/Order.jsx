import { Link } from "react-router-dom";

const Order = () => {
  return (
    <main>
      <div className="w-full text-5xl text-cyan-600 border-b-2 pt-4 font-semibold ">
        <h1 className="mx-4">Orders</h1>
      </div>
      <div>
        <div className="">
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
        </ul>
      </div>
    </main>
  );
};

export default Order;
