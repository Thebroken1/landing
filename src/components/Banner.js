import "./Banner.css";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const images = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg',
  '/6.jpg'
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="banner">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="banner-image"
      />

      {/* Overlay content */}
      <div className="banner-content">
        <h1 className="headline">Study in Germany</h1>
        <p className="subheadline">Your future starts here. Join thousands of students today!</p>
        <Button as="input" type="button" value="Apply Now" className="cta-button" onClick={() => {const section = document.getElementById('contactus');if (section) {section.scrollIntoView({ behavior: 'smooth' });
        }}}/>
      </div>

      {/* Arrows */}
      <button className="arrow prev" onClick={prevImage}>&#10094;</button>
      <button className="arrow next" onClick={nextImage}>&#10095;</button>
    </div>
  );
}

export default Banner;
