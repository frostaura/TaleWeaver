import React from 'react';
import { Carousel as AntCarousel } from 'antd';

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

const CustomCarousel: React.FC<CarouselProps> = ({ 
  items, 
  autoRotateInterval = 4000,
  className = '',
  isFullPage = false
}) => {
  if (!items.length) return null;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoRotateInterval > 0,
    autoplaySpeed: autoRotateInterval,
    effect: 'fade' as const,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    adaptiveHeight: true,
  };

  return (
    <div 
      className={`ant-carousel-wrapper ${isFullPage ? 'fullpage' : ''} ${className}`}
      style={{
        position: isFullPage ? 'fixed' : 'relative',
        top: isFullPage ? 0 : 'auto',
        left: isFullPage ? 0 : 'auto',
        width: isFullPage ? '100vw' : '100%',
        height: isFullPage ? '100vh' : 'auto',
        zIndex: isFullPage ? 1 : 'auto',
      }}
    >
      <AntCarousel 
        {...carouselSettings}
        style={{ height: '100%' }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <div 
              style={{
                height: isFullPage ? '100vh' : '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isFullPage ? '2rem' : '1rem',
                minHeight: '300px',
              }}
            >
              {item.component ? (
                // Render the component if it exists (for full-page mode)
                <div style={{ width: '100%', height: '100%' }}>
                  {item.component}
                </div>
              ) : (
                // Render the traditional carousel item
                <div style={{ textAlign: 'center' }}>
                  {item.icon && (
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                      {item.icon}
                    </div>
                  )}
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    margin: '0 0 1rem 0',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    margin: 0,
                    lineHeight: 1.5,
                    maxWidth: '400px'
                  }}>
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </AntCarousel>
    </div>
  );
};

export default CustomCarousel;