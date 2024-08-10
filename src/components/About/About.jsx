import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className=" font-cursive ">
      <img
        src="Book_Store_Pic.jpg"
        className="z-[-10] opacity-80 absolute w-full h-[100vh] bg-cover bg-no-repeat bg-center"
        alt=""
      />
      <h1 className="text-4xl text-center font-bold underline text-purple-700">
        About this E-Bookstore Website Project
      </h1>
      <div className="w-3/4 mx-auto mt-10">
        <h2 className="text-3xl font-bold mx-50">
          📚 E-Book Store Project - Powered by PERN Stack 🚀
        </h2>
        <div className="text-2xl">
          <p>Welcome to my latest project: E-Book Store!</p>
          <p>This project is a work in progress.</p>
          <p>
            I’m excited to share the progress on my latest project: E-Book
            Store! Currently in its dummy phase, this application is built using
            the PERN stack—PostgreSQL, Express.js, React.js, and Node.js.
          </p>
        </div>
        <hr />
        <div className="text-2xl">
          <p>🔧 Features:</p>
          <p>
            <strong>User Authentication:</strong>Secure log in and sign up to
            access the store.
          </p>
          <p>
            <strong>Book Sales:</strong> Users can put their e-books on sale and
            manage them effortlessly.
          </p>
          <p>
            <strong>Item Management:</strong> Update and view all the books that
            are currently on sale.
          </p>
          <p>
            <strong>Profile Management:</strong> Update your account details and
            profile picture.
          </p>
          <p>
            <strong>Cart Management:</strong> Add and remove books from the
            cart.
          </p>
          <p>
            <strong>Order Management:</strong> View and manage your orders.
          </p>
          <p>
            <strong>Purchasing:</strong>
            Browse and buy books seamlessly.
          </p>
          <p>
            <strong>Payment:</strong> Do payments with multiple payment methods.
          </p>
        </div>
        <hr />
        <p className="text-2xl">
          This project is a work in progress, and I’m excited about the
          potential it holds. Stay tuned for more updates!
          <span className="invert">✨</span>
        </p>
      </div>
    </main>
  );
};

export default About;
