import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { BsCartCheck } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";

const Sidebar = ({ disable }) => {
  return (
    <div
      className={`${
        disable ? "hidden" : "block"
      } flex flex-col w-56 p-3 h-screen bg-slate-700`}
    >
      <Link
        to="http://localhost:5173/"
        className="flex items-center mb-3 text-white"
      >
        <img
          src={import.meta.env.VITE_ROOT_PATH + "/BookLogo.webp"}
          alt="Side Bar Image"
          className="w-12"
        />
        <span className="text-3xl p-3">Sidebar</span>
      </Link>
      <hr />
      <ul className="flex flex-col text-xl">
        <li className="nav-item">
          <Link to="http://localhost:5173/" className="flex text-slate-950">
            <span className="mt-1">
              <IoHomeOutline />
            </span>
            &nbsp; Home
          </Link>
        </li>
        <li>
          <Link to="http://localhost:5173/cart" className="flex text-white">
            <span className="mt-1">
              <TiShoppingCart />
            </span>
            &nbsp;Cart
          </Link>
        </li>
        <li>
          <Link to="http://localhost:5173/order" className="flex text-white">
            <span className="mt-1">
              <BsCartCheck />
            </span>
            &nbsp;Orders
          </Link>
        </li>
        <li>
          <Link
            to="http://localhost:5173/customercare"
            className="flex text-white"
          >
            <span className="mt-1">
              <RiCustomerService2Line />
            </span>
            &nbsp;Customer Care
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <Link
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </Link>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <Link className="dropdown-item" to="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
