import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = ({ className }) => {
  const ratings = 5;
  const [rating, setRating] = useState("");

  useEffect(() => {
    let rating = "";
    for (let i = 0; i < ratings; i++) {
      rating += "⭐";
    }
    console.log("rating");
    setRating(rating);
  }, [ratings, rating]);

  return (
    <div className={className}>
      <ul className="flex flex-wrap justify-around">
        <li className="w-64 m-4">
          <div className="flex flex-col">
            <Link to="">
              <img
                src={import.meta.env.VITE_ROOT_PATH + "/RichDad&PoorDad.webp"}
                className=" h-64"
                alt="Rich Dad Poor Dad"
              />
            </Link>
            <div className="flex flex-col w-full">
              <Link to="">
                <h5 className="text-2xl">Rich Dad Poor Dad</h5>
              </Link>
              <p className="text-md text-slate-500">
                What the Rich Teach Their Kids About Money, That the Poor &
                Middle Class Do Not!
              </p>
              <span className="">{rating}</span>
              <p className="text-3xl text-slate-900">
                <span className="text-sm float-start text-zinc-500 mt-1">
                  ₹
                </span>
                1200
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
