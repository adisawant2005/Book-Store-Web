import React, { useEffect, useState } from "react";
import axios from "axios";
import DdataFieldWR from "./DataFieldWR";
import { nanoid } from "nanoid";
import countryList from "../../assets/countryList";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountData } from "../../store/account";
import { IoMdArrowRoundBack } from "react-icons/io";

const AccountPage = () => {
  const accountData = useSelector((state) => state.account.data.result);
  const userDataSuccess = useSelector((state) => state.account.data.success);
  const dispatch = useDispatch();
  const [data, updateData] = useState(accountData);
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (updating) {
      const apiEndpoint = "http://localhost:3000/accounts";

      const formDataToUpdate = new FormData();

      if (file) {
        formDataToUpdate.append("avatar", file);
        setFile(null);
      }

      Object.entries(data).forEach(([key, value]) => {
        formDataToUpdate.append(key, value);
      });

      try {
        // Making a PUT request using Axios to upload the file and send form data
        const response = await axios.put(apiEndpoint, formDataToUpdate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          dispatch(updateAccountData(response.data));
        } else {
          console.error({
            message: "Error uploading",
            result: response.data,
          });
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    }
  };

  useEffect(() => {
    updateData(accountData);
  }, [accountData]);

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-6">
          {updating ? (
            <button
              className="btn py-1 px-2 mt-4 bg-sky-500 text-white rounded-md"
              onClick={(e) => {
                updateData(accountData);
                setUpdating(!updating);
              }}
            >
              <IoMdArrowRoundBack />
            </button>
          ) : (
            ""
          )}
          <span className="ms-4 text-2xl font-bold mb-4">User Information</span>
          <div className="bg-gray-100 p-4 flex justify-center items-center">
            {updating ? (
              <div className=" m-3">
                <label htmlFor="avatar">
                  Profile Picture:&nbsp;
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    className="outline-none py-1 px-2 w-[100%] border-2 borser-sky-800 "
                  />
                </label>
              </div>
            ) : (
              <img
                name="avatar"
                src={data.profile_picture_address}
                alt="Profile Picture"
                className="rounded-full h-24 w-24 object-cover"
              />
            )}
          </div>

          <div className={`${updating ? "grid grid-cols-2" : ""}`}>
            {updating ? (
              ""
            ) : (
              <p>
                <strong>Email:&nbsp;</strong> {data.email}
              </p>
            )}
            <DdataFieldWR
              Updating={updating}
              title="First name"
              name="first_name"
              type="text"
              value={data.first_name}
              onChange={handleChange}
            />
            <DdataFieldWR
              Updating={updating}
              title="Last name"
              name="last_name"
              type="text"
              value={data.last_name}
              onChange={handleChange}
            />
            {updating ? (
              <div className="m-3">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="outline-none py-1 px-2 w-[100%] border-2 borser-sky-800 "
                  required
                >
                  <option value="" disabled>
                    {data.country}
                  </option>
                  {Object.entries(countryList).map(([key, value]) => (
                    <option key={key}> {key}</option>
                  ))}
                </select>
              </div>
            ) : (
              <p>
                <strong>Country:&nbsp;</strong> {data.country}
              </p>
            )}
            {updating ? (
              <div className="m-3">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  className="outline-none py-1 px-2 w-[100%] border-2 borser-sky-800 "
                  required
                >
                  <option value="" disabled>
                    {data.city}
                  </option>
                  {Object.entries(countryList[data.country]).map(
                    ([key, value]) => (
                      <option key={nanoid()}> {value}</option>
                    )
                  )}
                </select>
              </div>
            ) : (
              <p>
                <strong>City:&nbsp;</strong> {data.city}
              </p>
            )}
            <DdataFieldWR
              Updating={updating}
              title="Street Address"
              name="street_address"
              type="text"
              value={data.street_address}
              onChange={handleChange}
            />
            <DdataFieldWR
              Updating={updating}
              title="Postal Code"
              name="postal_code"
              type="text"
              value={data.postal_code}
              onChange={handleChange}
            />
            <DdataFieldWR
              Updating={updating}
              title="Phone Number"
              false
              name="phone_number"
              type="text"
              value={data.phone_number}
              onChange={handleChange}
            />
            <DdataFieldWR
              Updating={updating}
              title="Birthdate"
              name="birthdate"
              type="text"
              value={data.birthdate}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="btn py-1 px-2 mt-4 bg-yellow-500 text-white rounded-md"
              onClick={(e) => {
                if (userDataSuccess) {
                  setUpdating(!updating);
                  handleUpdate(e);
                }
              }}
            >
              {updating ? "Submit" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
