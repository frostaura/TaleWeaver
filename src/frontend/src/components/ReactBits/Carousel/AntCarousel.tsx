import React, { useState } from 'react';
import { Carousel as AntCarousel, Button } from 'antd';
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
                  position: 'relative',
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


        {/* Custom Indicators - Mobile First Legend */}
        <div style={{
          position: 'absolute',
          bottom: isFullPage ? '2rem' : '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: isFullPage ? '1rem' : '0.5rem',
          zIndex: 3,
          // Mobile-first responsive adjustments
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '0 1rem',
          maxWidth: '90%',
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
                // Mobile-first touch target improvements
                minHeight: isFullPage ? '50px' : '44px',
                minWidth: isFullPage ? '50px' : '44px',
                // Better mobile touch response
                touchAction: 'manipulation',
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
          
          /* Mobile-first responsive improvements */
          @media (max-width: 768px) {
            .ant-carousel-wrapper {
              touch-action: pan-x;
            }
            
            .ant-carousel .slick-slide {
              padding: 0.5rem;
            }
            
            .ant-carousel .slick-track {
              /* Enable hardware acceleration for smoother swipes */
              transform: translate3d(0, 0, 0);
            }
            
            /* Better touch targets for mobile */
            .ant-carousel-wrapper button {
              min-width: 44px !important;
              min-height: 44px !important;
            }
          }
          
          /* Ensure smooth swipe on touch devices */
          .ant-carousel .slick-list {
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Disable text selection during swipe */
          .ant-carousel .slick-slide {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
      </style>
    </div>
  );
};

export default CustomCarousel;