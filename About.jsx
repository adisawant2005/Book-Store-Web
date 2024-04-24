import { Link } from "react-router-dom";
import './About.css'
const About = () => {
  
  return (
   <>
    <title>About Us - E-Bookstore</title>
   

<header>
    <h1>About Us - E-Bookstore</h1>
</header>

<nav>
    <a href="#">Home</a>
    <a href="#">Books</a>
    <a href="#">FAQ</a>
    <a href="#">Contact</a>
</nav>

<div class="container">
    <h2>Our Story</h2>
    <p>Welcome to E-Bookstore, your one-stop destination for digital reading materials. We believe in making knowledge accessible to everyone, anytime, anywhere. Our journey began with a simple idea - to revolutionize the way people read and learn by providing a vast collection of e-books covering various genres.</p>
    <p>Since our inception, we have been committed to offering high-quality e-books at affordable prices, ensuring that readers of all ages and interests can find something they love. Whether you're a student, professional, or leisure reader, we have something for everyone.</p>
    <h2>Meet Our Team</h2>
    <div class="team">
        <div class="team-member">
            <img src="https://via.placeholder.com/100" alt="Team Member 1"/>
            <h3>Aditya Sawant</h3>
            <p>Founder</p>
        </div>
        <div class="team-member">
            <img src="https://via.placeholder.com/100" alt="Team Member 2"/>
            <h3>Atharva Deshmukh</h3>
            <p>co-founder</p>
        </div>
        <div class="team-member">
            <img src="https://via.placeholder.com/100" alt="Team Member 3"/>
            <h3>Siddhesh Lamkhade </h3>
            <p>Co-founder</p>
        </div>
    </div>
</div>


</>
  );
};

export default About;
