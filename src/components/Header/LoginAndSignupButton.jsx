import { Link } from "react-router-dom";

const LoginAndSignupButton = () => {
  return (
    <>
      <li className="basis-1/12 flex justify-center ">
        <Link to="/login" className="text-white text-center my-auto">
          <button className="text-2xl btn btn-primary px-2 py-1 rounded-md">
            Login
          </button>
        </Link>
      </li>
      <li className="basis-1/12 flex justify-center ">
        <Link to="/signup" className="text-white text-center my-auto">
          <button className="text-2xl btn btn-secondary px-2 py-1 rounded-md">
            Signup
          </button>
        </Link>
      </li>
    </>
  );
};

export default LoginAndSignupButton;
