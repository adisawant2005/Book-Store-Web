import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Cart,
  Order,
  FAQs,
  About,
  CustomerCare,
  AccountPage,
  ItemPage,
  SellerPage,
  PutItemOnSale,
  UpdateItemOnSale,
} from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/accountpage",
        element: <AccountPage />,
      },
      {
        path: "/itempage",
        element: <ItemPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/sellerpage",
        element: <SellerPage />,
      },
      {
        path: "/sell_item_page",
        element: <PutItemOnSale />,
      },
      {
        path: "/update_item_page",
        element: <UpdateItemOnSale />,
      },
      {
        path: "/faqs",
        element: <FAQs />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/customercare",
        element: <CustomerCare />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
