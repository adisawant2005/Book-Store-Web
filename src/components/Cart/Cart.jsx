import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectedItem } from "../../store/items";
import { deleteCartItem } from "../../store/cart";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItems, deleteCartItems } from "../../store/cart";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.account.data.result);
  const userLogin = useSelector((state) => state.account.data.success);
  const items = useSelector((state) => state.items.items);
  const cart = useSelector((state) => state.cart.cart_items);

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
          console.log(userLogin, response.data);
        } catch (error) {
          console.log({ error: error.message });
        }
      } else {
        dispatch(deleteCartItems());
      }
    };

    getCartItems();
  }, [user]);

  useEffect(() => {
    console.log(cart, "cartItems");
  }, [cart]);

  const handleClick = (item) => {
    dispatch(selectedItem(item));
  };

  const handleRemoveFromCart = async (item) => {
    const itemToRemove = {
      product_id: item.item_id,
      customer_email: user.email,
    };
    console.log(user.email, userLogin);
    const apiEndpoint = "http://localhost:3000/cart";
    try {
      const removedItem = await axios.delete(apiEndpoint, {
        data: itemToRemove,
      });
      console.log(removedItem.data.customer_email);
      console.log(cart);
      dispatch(deleteCartItem(removedItem.data));
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
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
          className="basis-8/12 flex flex-col items-start bg-white"
        >
          <div
            name="Header"
            className=" me-2 mb-4 w-full flex items-end justify-between border-b-4 "
          >
            <h1 className="text-4xl font-semibold text-cyan-600 mx-4 mt-4 mb-2">
              Shopping Cart
            </h1>
            <span className=" text-slate-400 mx-12 ">price</span>
          </div>
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
                  <li className="flex flex-col mt-4 ms-4 me-auto">
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
                      <span className="text-slate-700">Quantity:&nbsp;</span>
                      {item.item_quantity}
                    </span>
                    <span className="text-md text-slate-500 text-ellipsis overflow-hidden">
                      {item.item_description}
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="btn py-0.5 w-32 text-sm bg-slate-200 text-white rounded-md"
                    >
                      <span className="text-slate-800">Remove from cart</span>
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
        </div>

        <div
          name="Subtotal Amount"
          className="basis-3/12 my-4 me-4 ms-2 flex flex-col px-4 pt-2 pb-4 border-2 rounded-2xl bg-white"
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
