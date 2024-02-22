import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" py-3 my-4">
      <ul className="flex justify-center px-auto">
        <li className="">
          <Link to="http://localhost:5173/" className=" px-2 ">
            Home
          </Link>
        </li>
        <li className="">
          <Link to="http://localhost:5173/login" className=" px-2 ">
            Login
          </Link>
        </li>
        <li className="">
          <Link to="http://localhost:5173/signup" className="px-2 ">
            Signup
          </Link>
        </li>
        <li className="">
          <Link to="http://localhost:5173/faqs" className=" px-2 ">
            FAQs
          </Link>
        </li>
        <li className="">
          <Link to="http://localhost:5173/about" className="px-2">
            About
          </Link>
        </li>
      </ul>
      <p className="text-center">
        © 2024 {"Aditya, Siddhesh, Atharva"} Company, Inc
      </p>
    </footer>
  );
};

export default Footer;
