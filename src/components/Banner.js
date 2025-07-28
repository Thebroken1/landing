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

function Banner({ strings }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Run once on mount, no dependency needed
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []); // empty array so runs only once

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Safe fallback for strings keys
  const t = (key, fallback) => (strings && strings[key]) || fallback || '';

  return (
    <div className="banner">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="banner-image"
      />

      {/* Overlay content */}
      <div className="banner-content">
        <h1 className="headline">{t('banner_headline', 'Study in Germany')}</h1>
        <p className="subheadline">{t('banner_subheadline', 'Your future starts here. Join thousands of students today!')}</p>
        <Button
          as="input"
          type="button"
          value={t('banner_apply_button', 'Apply Now')}
          className="cta-button"
          onClick={() => {
            const section = document.getElementById('contactus');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Arrows */}
      <button className="arrow prev" onClick={prevImage} aria-label="Previous Slide">&#10094;</button>
      <button className="arrow next" onClick={nextImage} aria-label="Next Slide">&#10095;</button>
    </div>
  );
}

export default Banner;
