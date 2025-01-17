import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import countryList from "../../assets/countryList";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [accountExits, setAccountExits] = useState(true);
  const accountAlreadyExistsMsg =
    "Account already exists. Please try with another email.";

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      password: e.target.value,
    });
    if (e.target.value === passwords.confirmPassword) {
      setPasswordsMatch(true);
      setFormData({ ...formData, password: e.target.value });
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswords({
      ...passwords,
      confirmPassword: e.target.value,
    });
    if (e.target.value === passwords.password) {
      setPasswordsMatch(true);
      setFormData({ ...formData, password: e.target.value });
    } else {
      setPasswordsMatch(false);
    }
  };

  const [fileContent, setFileContent] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    country: "",
    city: "",
    street_address: "",
    postal_code: "",
    phone_number: "",
    birthdate: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = "http://localhost:3000/accounts";

    // Create a FormData object
    const formDataToSend = new FormData();

    formDataToSend.append("avatar", fileContent);

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (passwordsMatch) {
      try {
        // Making a POST request using Axios to upload the file and send form data
        console.log(formDataToSend);
        const response = await axios.post(apiEndpoint, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          setAccountExits(true);
          navigate("/login");
        } else if (!response.data.success) {
          setAccountExits(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const currentDate = new Date();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    setFileContent(event.target.files[0]);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setImage(content);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="min-h-screen flex bg-gray-300">
      <div className="basis-1/12 flex">
        <button
          onClick={() => navigate("/")}
          className="btn py-1 px-2 mt-10 mx-auto h-12 bg-sky-500 text-white rounded-md"
        >
          <IoMdArrowRoundBack size={"2em"} />
        </button>
      </div>
      <div className="basis-11/12 my-auto me-8 bg-white p-8 rounded shadow-md">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <span className="text-red-500 text-sm">
            {!accountExits && accountAlreadyExistsMsg}
          </span>
        </div>
        <form
          name="signUp"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <div
              className=" bg-no-repeat bg-center bg-contain w-48 h-48 "
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: image
                  ? `url(${image})`
                  : `url("/devImages/dummyProfileImage.jpg")`,
              }}
            >
              <input
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="w-full h-full outline-0 w-full border-4 opacity-0 border-blue-500 rounded-md"
              />
            </div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-600"
            >
              Your profile picture
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div name="first_name" className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="last_name" className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="email" className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="birthdate" className="mb-4">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-600"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                min="1900-01-01"
                max={currentDate}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="country" className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-600"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              >
                <option value="" disabled>
                  Please choose one option
                </option>
                {Object.entries(countryList).map(([key, value]) => (
                  <option key={key}> {key}</option>
                ))}
              </select>
            </div>
            <div name="city" className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              >
                <option value="" disabled>
                  Please choose one option
                </option>
                {Object.entries(
                  formData.country && countryList[formData.country]
                ).map(([key, value]) => (
                  <option key={nanoid()}> {value}</option>
                ))}
              </select>
            </div>
            <div name="gender" className="mb-4 ">
              <span className="block text-sm font-medium text-gray-600">
                Gender
              </span>
              <div className="mt-4 grid grid-cols-3">
                <label>
                  Male&nbsp;
                  <input
                    name="gender"
                    type="radio"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Female&nbsp;
                  <input
                    name="gender"
                    type="radio"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Other&nbsp;
                  <input
                    name="gender"
                    type="radio"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div name="password" className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={passwords.password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="confirmPassword" className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
              <span className="text-red-500 text-sm">
                {passwordsMatch ? "" : "password did not match"}
              </span>
            </div>
            <div name="phone_number" className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                pattern="^[0-9 +()-]*$"
                placeholder="Enter phone number"
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="street_address" className="mb-4">
              <label
                htmlFor="street_address"
                className="block text-sm font-medium text-gray-600"
              >
                Street Address
              </label>
              <input
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div name="postal_code" className="mb-4">
              <label
                htmlFor="postal_code"
                className="block text-sm font-medium text-gray-600"
              >
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
          </div>
          <div name="submit" className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-700 btn text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </button>
            <span className="text-red-500 text-sm">
              {!accountExits && accountAlreadyExistsMsg}
            </span>
          </div>
        </form>
        <span className="block mt-6 text-center text-slate-600">
          Have a account?&nbsp;
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:font-bold hover:underline"
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
