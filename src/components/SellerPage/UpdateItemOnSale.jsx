import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemOnSale } from "../../store/items";
import axios from "axios";
import BookCategories from "../../assets/BookCategories";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { nanoid } from "nanoid";
import { handleFileChange } from "../../modules/index";

const UpdateItemOnSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountDetails = useSelector((state) => state.account.data.result);
  const dummyObjForUpdating = useSelector((s) => s.items.dummyObjForUpdating);

  const [fileContent, setFileContent] = useState(undefined);
  const [image, setImage] = useState(
    dummyObjForUpdating.item_image_url || `url("/devImages/bookImage.png")`
  );
  const [itemDetails, setItemDetails] = useState({
    user_email: accountDetails.email,
    user_password: accountDetails.password,
    ...dummyObjForUpdating,
  });

  const apiEndpoint = "http://localhost:3000/items";
  const fetchItemOnSaleData = async (accountDetails) => {
    try {
      const response = await axios.post(apiEndpoint, itemToPutOnSale);
      dispatch(addItemOnSale(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object
    const itemDetailsToSend = new FormData();

    itemDetailsToSend.append("item_image", fileContent);

    Object.entries(itemDetails).forEach(([key, value]) => {
      itemDetailsToSend.append(key, value);
    });

    try {
      // Making a POST request using Axios to upload the file and send form data
      const response = await axios.put(apiEndpoint, itemDetailsToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/sellerpage");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setItemDetails((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  return (
    <main>
      <header className="block text-4xl text-cyan-600 mx-2 mb-4 border-b-4 pt-4 font-semibold ">
        Update your book details
      </header>
      <div className="flex">
        <div className="basis-1/12 flex">
          <button
            onClick={() => navigate("/sellerpage")}
            className="btn py-1 px-2 mt-4 mx-auto h-12 bg-sky-500 text-white rounded-md"
          >
            <IoMdArrowRoundBack size={"2em"} />
          </button>
        </div>
        <div className="basis-11/12 my-4 me-8">
          <form
            name="signUp"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex border-4 "
          >
            <div className="basis-2/12"></div>
            <div className=" p-20">
              <div
                className="m-3 bg-no-repeat bg-center bg-contain w-80 h-80 "
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundImage: image
                    ? `url(${image})`
                    : `url("/devImages/bookImage.png")`,
                }}
              >
                <input
                  type="file"
                  name="item_image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setFileContent(e.target.files[0]);
                    handleFileChange(e, setImage);
                  }}
                  className="w-full h-full outline-0 border-4 opacity-0 border-blue-500 rounded-md"
                />
              </div>
              <label
                htmlFor="item_image"
                className="block px-20 text-md font-medium text-gray-600"
              >
                Insert Your Book's Image
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4 content-center">
              <div className="block mb-4 mt-3 w-[70%]">
                <label
                  htmlFor="item_name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book name
                </label>
                <input
                  type="text"
                  name="item_name"
                  value={itemDetails.item_name}
                  onChange={handleChange}
                  className="inline w-[300px] mt-1 p-2 border-4 border-blue-500 rounded-md outline-none"
                  required
                />
              </div>
              <div className="block mb-4 w-[70%]">
                <label
                  htmlFor="item_description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book description
                </label>
                <textarea
                  name="item_description"
                  value={itemDetails.item_description}
                  onChange={handleChange}
                  className="inline w-[300px] mt-1 p-2 border-4 border-blue-500 rounded-md outline-none "
                  style={{
                    height: "100px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#f4f6f6 white",
                    scrollBehavior: "smooth",
                  }}
                  required
                />
              </div>
              <div className="block mb-4 w-[70%]">
                <label
                  htmlFor="item_price"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book price
                </label>
                <input
                  type="number"
                  name="item_price"
                  value={itemDetails.item_price}
                  onChange={handleChange}
                  className="inline w-[300px] mt-1 p-2 border-4 border-blue-500 rounded-md outline-none"
                  required
                />
              </div>
              <div className="block mb-4 w-[70%]">
                <label
                  htmlFor="item_category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book category
                </label>
                <select
                  name="item_category"
                  value={itemDetails.item_category}
                  onChange={handleChange}
                  className="inline w-[300px] mt-1 p-2 border-4 border-blue-500 rounded-md outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {BookCategories.map((category) => (
                    <option key={nanoid()}> {category}</option>
                  ))}
                </select>
              </div>
              <div className="block mb-4 w-[70%]">
                <label
                  htmlFor="item_quantity"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book quantity
                </label>
                <input
                  type="number"
                  name="item_quantity"
                  value={itemDetails.item_quantity}
                  onChange={handleChange}
                  className="inline w-[300px] mt-1 p-2 border-4 border-blue-500 rounded-md outline-none"
                  required
                />
              </div>
              <button className="px-4 py-3 bg-yellow-500 rounded-xl mb-3">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateItemOnSale;
