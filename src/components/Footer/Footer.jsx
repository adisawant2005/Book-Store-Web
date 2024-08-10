import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" py-3 py-4 z-10">
      <ul className="flex justify-center px-auto text-slate-900">
        <li className="">
          <Link
            to="http://localhost:5173/"
            className=" px-2 opacity-50 hover:pointer hover:font-bold hover:opacity-100 text-white "
          >
            Home
          </Link>
        </li>
        <li className="">
          <Link
            to="http://localhost:5173/login"
            className=" px-2 opacity-50 hover:pointer hover:font-bold hover:opacity-100 text-white "
          >
            Login
          </Link>
        </li>
        <li className="">
          <Link
            to="http://localhost:5173/signup"
            className="px-2 opacity-50 hover:pointer hover:font-bold hover:opacity-100 text-white "
          >
            Signup
          </Link>
        </li>
        <li className="">
          <Link
            to="http://localhost:5173/faqs"
            className=" px-2 opacity-50 hover:pointer hover:font-bold hover:opacity-100 text-white "
          >
            FAQs
          </Link>
        </li>
        <li className="">
          <Link
            to="http://localhost:5173/about"
            className="px-2 opacity-50 hover:pointer hover:font-bold hover:opacity-100 text-white"
          >
            About
          </Link>
        </li>
      </ul>
      <p className="text-center text-white opacity-50 ">
        © 2024 {"Aditya, Siddhesh, Atharva"} Company, Inc
      </p>
    </footer>
  );
};

export default Footer;
