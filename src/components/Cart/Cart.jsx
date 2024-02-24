import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <main className="w-full">
      <div name="Shopping Cart" className="flex">
        <div
          name="Shopping Cart List"
          className="basis-10/12 flex flex-col items-start bg-white"
        >
          <div
            name="Header"
            className=" me-2 mb-4 w-full flex items-end justify-between border-b-2 "
          >
            <h1 className="text-4xl font-semibold text-cyan-600 mx-4 mt-4 mb-2">
              Shopping Cart
            </h1>
            <span className=" text-slate-400 mx-4 ">price</span>
          </div>

          <div name="Cart" className=" w-full">
            <div>
              <ul className="flex flex-col">
                <li className="">
                  <ul className="flex h-64">
                    <li className="w-64">
                      <img
                        className="w-full"
                        src="ramayana.jpg"
                        alt="Ramayan Book"
                      />
                    </li>
                    <li className="flex flex-col mt-4 ms-4 me-auto ">
                      <h1 className="text-3xl text-slate-900 font-semibold">
                        Rmayana
                      </h1>
                      <span className="text-green-600">In Stock</span>
                      <span className="text-md text-slate-500">
                        The great story of Ram
                      </span>
                    </li>
                    <li className="text-2xl font-semibold ms-auto mt-4 me-4">
                      <span>₹ 500</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          name="Subtotal Amount"
          className="basis-2/12 my-4 me-4 ms-2 flex flex-col px-4 pt-2 pb-4 border-2 rounded-2xl bg-white"
        >
          <div className="flex text-slate-700 text-xl mb-4">
            <div>
              <h1>Subtotal&nbsp;</h1>
              <span>(1 item):&nbsp;</span>
              <span>₹500</span>
            </div>
          </div>
          <div className="text-sm">
            <Link to="#" className="btn btn-secondary rounded-md py-2 px-4">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
