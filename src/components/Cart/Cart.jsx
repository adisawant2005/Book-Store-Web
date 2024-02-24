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
            className=" me-2 flex items-end justify-between border-b-2 "
          >
            <h1 className="text-4xl font-semibold text-cyan-600 mx-4 mt-4 mb-2">
              Shopping Cart
            </h1>
            <span className=" text-slate-400 mx-4 me-4">price</span>
          </div>
        </div>
        <div
          name="Subtotal Amount"
          className="basis-2/12 my-4 me-4 ms-2 flex flex-col px-4 pt-2 pb-4 border-2 rounded-2xl bg-white"
        >
          <div className="flex text-slate-700 text-xl mb-4">
            <h1>Subtotal (1 item):&nbsp;</h1>
            <span>₹800</span>
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
