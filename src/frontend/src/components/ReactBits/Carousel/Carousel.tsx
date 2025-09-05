import React, { useState, useEffect } from 'react';
import './Carousel.css';

export interface CarouselItem {
  title: string;
  description: string;
  icon?: string;
  component?: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoRotateInterval?: number;
  className?: string;
  isFullPage?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoRotateInterval = 4000,
  className = '',
  isFullPage = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1 || autoRotateInterval === 0) return;

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

  const currentItem = items[currentIndex];

  return (
    <div className={`reactbits-carousel ${isFullPage ? 'fullpage' : ''} ${className}`}>
      <div className="carousel-background">
        <div className="carousel-content">
          {currentItem.component ? (
            // Render the component if it exists (for full-page mode)
            <div className="carousel-scene">
              {currentItem.component}
            </div>
          ) : (
            // Render the traditional carousel item
            <div className="carousel-item">
              {currentItem.icon && (
                <div className="carousel-icon">{currentItem.icon}</div>
              )}
              <h3 className="carousel-title">{currentItem.title}</h3>
              <p className="carousel-description">{currentItem.description}</p>
            </div>
          )}
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
          {items.map((item, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${item.title}`}
              title={item.title}
            >
              {isFullPage && item.icon ? (
                <span className="indicator-icon">{item.icon}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;