import React, { useState, useEffect } from 'react';
import './Carousel.css';

export interface CarouselItem {
  title: string;
  description: string;
  icon?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoRotateInterval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoRotateInterval = 4000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [items.length, autoRotateInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (!items.length) return null;

  return (
    <div className={`reactbits-carousel ${className}`}>
      <div className="carousel-background">
        <div className="carousel-content">
          <div className="carousel-item">
            {items[currentIndex].icon && (
              <div className="carousel-icon">{items[currentIndex].icon}</div>
            )}
            <h3 className="carousel-title">{items[currentIndex].title}</h3>
            <p className="carousel-description">{items[currentIndex].description}</p>
          </div>
        </div>
        
        <div className="carousel-controls">
          <button 
            className="carousel-nav carousel-nav-prev" 
            onClick={goToPrevious}
            aria-label="Previous item"
          >
            ‹
          </button>
          <button 
            className="carousel-nav carousel-nav-next" 
            onClick={goToNext}
            aria-label="Next item"
          >
            ›
          </button>
        </div>

        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;