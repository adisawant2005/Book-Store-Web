import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-64">
      <img
        src="https://img.freepik.com/free-vector/realistic-almond-walnut-dark-chocolate-bar-package-template-vector-illustration_1284-68284.jpg?size=626&ext=jpg"
        className="w-full"
        alt="Cadbury"
      />
      <div className="flex flex-col">
        <h5 className="text-2xl">Item Title</h5>
        <p className="text-xl">Item descripton</p>
        <p>₹100</p>
        <div>
          <h3>Rating</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
