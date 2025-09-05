import React, { useState } from 'react';
import { Carousel as AntCarousel, Button, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CarouselRef } from 'antd/es/carousel';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = React.useRef<CarouselRef>(null);

  const goToPrevious = () => {
    carouselRef.current?.prev();
  };

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const goToSlide = (index: number) => {
    carouselRef.current?.goTo(index);
  };

  const handleAfterChange = (current: number) => {
    setCurrentIndex(current);
  };

  if (!items.length) return null;

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoRotateInterval > 0,
    autoplaySpeed: autoRotateInterval,
    afterChange: handleAfterChange,
    effect: 'fade' as const,
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
        background: isFullPage ? 'transparent' : 'auto',
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(139, 69, 19, 0.8) 0%,
              rgba(160, 82, 45, 0.8) 25%,
              rgba(218, 165, 32, 0.8) 50%,
              rgba(255, 215, 0, 0.8) 75%,
              rgba(255, 140, 0, 0.8) 100%
            )
          `,
          backgroundSize: isFullPage ? '400% 400%' : 'cover',
          animation: isFullPage ? 'gradientShift 8s ease infinite' : 'none',
        }}
      >
        <AntCarousel 
          ref={carouselRef} 
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
                  position: 'relative'
                }}
              >
                {item.component ? (
                  // Render the component if it exists (for full-page mode)
                  <div style={{ width: '100%', height: '100%' }}>
                    {item.component}
                  </div>
                ) : (
                  // Render the traditional carousel item
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    {item.icon && (
                      <div style={{ 
                        fontSize: '3rem', 
                        marginBottom: '1rem',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                      }}>
                        {item.icon}
                      </div>
                    )}
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      color: 'white',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      margin: '0 0 1rem 0',
                      letterSpacing: '0.5px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
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

        {/* Custom Navigation Controls */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1rem',
          pointerEvents: 'none',
          zIndex: 3
        }}>
          <Button 
            type="text"
            icon={<LeftOutlined />}
            onClick={goToPrevious}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'all',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <Button 
            type="text"
            icon={<RightOutlined />}
            onClick={goToNext}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'all',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>

        {/* Custom Indicators */}
        <div style={{
          position: 'absolute',
          bottom: isFullPage ? '2rem' : '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: isFullPage ? '1rem' : '0.5rem',
          zIndex: 3
        }}>
          {items.map((item, index) => (
            <Button
              key={index}
              type="text"
              onClick={() => goToSlide(index)}
              style={{
                width: isFullPage ? '50px' : '12px',
                height: isFullPage ? '50px' : '12px',
                borderRadius: isFullPage ? '12px' : '50%',
                background: index === currentIndex 
                  ? (isFullPage ? 'rgba(100, 108, 255, 0.3)' : 'white')
                  : 'rgba(255, 255, 255, 0.4)',
                border: isFullPage && index === currentIndex 
                  ? '1px solid #646cff' 
                  : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isFullPage ? '1.5rem' : '0.8rem',
                backdropFilter: 'blur(5px)',
                boxShadow: index === currentIndex && isFullPage
                  ? '0 0 20px rgba(100, 108, 255, 0.4)'
                  : index === currentIndex
                  ? '0 0 10px rgba(255, 255, 255, 0.6)'
                  : 'none',
                transition: 'all 0.3s ease',
                padding: 0,
                minWidth: 'auto'
              }}
              onMouseEnter={(e) => {
                if (isFullPage) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                } else {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (isFullPage) {
                  e.currentTarget.style.background = index === currentIndex 
                    ? 'rgba(100, 108, 255, 0.3)' 
                    : 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                } else {
                  e.currentTarget.style.background = index === currentIndex 
                    ? 'white' 
                    : 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isFullPage && item.icon ? (
                <span style={{ 
                  opacity: index === currentIndex ? 1 : 0.7,
                  color: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  textShadow: index === currentIndex ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {item.icon}
                </span>
              ) : null}
            </Button>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .ant-carousel .slick-slide {
            text-align: center;
            height: auto;
            line-height: normal;
            background: transparent;
            overflow: hidden;
          }
          
          .ant-carousel .slick-slide h3 {
            color: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default CustomCarousel;