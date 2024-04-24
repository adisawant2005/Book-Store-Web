import React from "react";
import './FAQ.css';


const FAQs = () => {
 
  <></>
  var questions = document.querySelectorAll('.question');
  questions.forEach(function(question) {
      question.addEventListener('click', function() {
          var answer = this.nextElementSibling;
          if (answer.style.display === 'block') {
              answer.style.display = 'none';
              this.querySelector('.arrow').classList.remove('open');
          } else {
              answer.style.display = 'block';
              this.querySelector('.arrow').classList.add('open');
          }
      });
  });
  

  return (
    <>
    
<header>
    <h1>E-Bookstore</h1>
</header>

<nav>
    <a href="#">Home</a>
    <a href="#">Books</a>
    <a href="#">FAQ</a>
    <a href="#">Contact</a>
</nav>

<div class="container">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-item">
        <div class="question"><span class="arrow"></span> How do I purchase an e-book?</div>
        <div class="answer">To purchase an e-book, simply browse our collection, select the book you want, and click on the "Buy Now" button. Follow the checkout process to complete your purchase.</div>
    </div>
    <div class="faq-item">
        <div class="question"><span class="arrow"></span> What formats are available for e-books?</div>
        <div class="answer">We offer e-books in PDF, EPUB, and MOBI formats to ensure compatibility with various devices and e-readers.</div>
    </div>
    <div class="faq-item">
        <div class="question"><span class="arrow"></span> Can I read e-books on my Kindle?</div>
        <div class="answer">Yes, you can read e-books purchased from our store on your Kindle device. Simply download the MOBI format and transfer it to your Kindle using USB or email.</div>
    </div>
    <div class="faq-item">
        <div class="question"><span class="arrow"></span> Do you offer refunds for e-books?</div>
        <div class="answer">We do not offer refunds for e-books due to the nature of digital content. However, if you encounter any issues with your purchase, please contact our support team for assistance.</div>
    </div>
    <div class="faq-item">
        <div class="question"><span class="arrow"></span> Can I access my purchased e-books on multiple devices?</div>
        <div class="answer">Yes, you can access your purchased e-books on multiple devices as long as they are registered to the same account. Simply log in to your account on the desired device to download or read your e-books.</div>
    </div>
</div>
</>
    
  );
};

export default FAQs;
