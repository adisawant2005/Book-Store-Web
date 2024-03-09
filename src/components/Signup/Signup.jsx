import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import countryList from "../../assets/countryList";

const SignUp = () => {
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
      console.log("Password matched");
      console.log(passwords);
    } else {
      setPasswordsMatch(false);
      console.log("Password did not match");
      console.log(passwords);
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
      console.log("Password matched");
      console.log(passwords);
    } else {
      setPasswordsMatch(false);
      console.log("Password did not match");
      console.log(passwords);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordsMatch) {
      console.log(formData);
      // const data = await fetch("http://localhost:3000/accounts", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
    } else {
      console.log("Passwords not confirmed");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const calculateAge = () => {
    const birthDate = new Date(formData.birthdate);
    const currentDate = new Date();
    const timeDifference = currentDate - birthDate;
    const yearDifference = Math.floor(
      timeDifference / (365.25 * 24 * 60 * 60 * 1000)
    );
    setFormData({ ...formData, age: yearDifference });
    console.log("formData.age before Re-rendering");
    console.log(formData.age);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    country: "",
    city: "",
    streetAddress: "",
    postalCode: "",
    phoneNumber: "",
    birthdate: "",
    profilePicture: "",
  });

  useEffect(() => {
    console.log("using Effecct");
    calculateAge();
  }, [formData.birthdate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white md:w-[80%] w-[100%] p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div className="mb-4">
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
            <div className="mb-4 ">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-600"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-600"
              >
                postalCode
              </label>
              <input
                type="number"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                phoneNumber
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="^[0-9 +()-]*$"
                placeholder="Enter phone number"
                className="mt-1 p-2 w-full border-4 border-blue-500 rounded-md outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 btn text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
