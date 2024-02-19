import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" py-3 my-4">
      <ul className="flex flex-col justify-center px-3">
        <li className="">
          <Link to="#" className=" px-2 ">
            Home
          </Link>
        </li>
        <li className="">
          <Link to="#" className=" px-2 ">
            Features
          </Link>
        </li>
        <li className="">
          <Link to="#" className="px-2 ">
            Pricing
          </Link>
        </li>
        <li className="">
          <Link to="#" className=" px-2 ">
            FAQs
          </Link>
        </li>
        <li className="">
          <Link to="#" className="px-2">
            About
          </Link>
        </li>
      </ul>
      <p className="text-center">© 2023 Company, Inc</p>
    </footer>
  );
};

export default Footer;
