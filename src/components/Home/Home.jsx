import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItems, selectedItem } from "../../store/items";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const apiEndpoint = "http://localhost:3000/items";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        dispatch(updateItems(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiEndpoint, dispatch]);

  const handleClick = (item) => {
    dispatch(selectedItem(item));
  };

  const printRating = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="">
      <ul className="flex flex-wrap justify-around">
        {items &&
          items.map((item) => (
            <li key={item.item_id} className="w-64 m-4">
              <Link to="/itempage" onClick={() => handleClick(item)}>
                <div className="flex flex-col">
                  <div>
                    <img
                      src={item.item_image_url}
                      className="m-3 h-64"
                      alt="item_image"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <h5 className="text-2xl">{item.item_name}</h5>
                    <span className="text-md text-slate-500 truncate">
                      {item.item_description}
                    </span>
                    <span className="">{printRating(item.item_rating)}</span>
                    <span className="text-slate-800">
                      <span className="text-slate-500">reviews:&nbsp;</span>
                      {item.item_reviews}
                    </span>
                    <p className="text-3xl text-slate-900">
                      <span className="text-sm float-start text-zinc-500 mt-1">
                        ₹
                      </span>
                      {item.item_price}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
