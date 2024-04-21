import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getAccountData } from "../../store/account";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [queryParams, setQueryParams] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const apiEndpoint = "http://localhost:3000/accounts";
      // Use Axios to make a GET request with query parameters
      const response = await axios.get(apiEndpoint, {
        params: queryParams,
      });

      dispatch(getAccountData(response.data));
      setError("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid password");
        console.error("Unauthorized. Please check your credentials.");
      } else if (error.response && error.response.status === 404) {
        setError("Invalid email");
        console.error("Resource not found. Please check your request.");
      } else {
        console.error("Unexpected status code:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  setTimeout(() => {
    if (loading) {
      return <Spinner />;
    }
  }, 1000);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-28 w-auto"
          src={import.meta.env.VITE_ROOT_PATH + "/devImages/BookLogo.png"}
          alt="Your Company"
        />

        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          name="LoginForm"
          className="space-y-6"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={queryParams.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="text-red-500 text-sm">
                {error === "Invalid email" ? error : ""}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={queryParams.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="text-red-500 text-sm">
                {error === "Invalid password" ? error : ""}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            <span className="text-red-500 text-sm">
              {error !== "Invalid email" && error !== "Invalid password"
                ? error
                : ""}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
