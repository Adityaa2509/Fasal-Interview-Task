import React, { useState, useEffect } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 4; // Number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full">
      <div className={`carousel-item relative w-full ${currentSlide === 0 ? 'block' : 'hidden'}`}>
        <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" onClick={() => setCurrentSlide((currentSlide - 1 + slideCount) % slideCount)} className="btn btn-circle">❮</a> 
          <a href="#slide2" onClick={() => setCurrentSlide((currentSlide + 1) % slideCount)} className="btn btn-circle">❯</a>
        </div>
      </div> 
      <div className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
        <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" onClick={() => setCurrentSlide((currentSlide - 1 + slideCount) % slideCount)} className="btn btn-circle">❮</a> 
          <a href="#slide3" onClick={() => setCurrentSlide((currentSlide + 1) % slideCount)} className="btn btn-circle">❯</a>
        </div>
      </div> 
      <div className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
        <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" onClick={() => setCurrentSlide((currentSlide - 1 + slideCount) % slideCount)} className="btn btn-circle">❮</a> 
          <a href="#slide4" onClick={() => setCurrentSlide((currentSlide + 1) % slideCount)} className="btn btn-circle">❯</a>
        </div>
      </div> 
      <div className={`carousel-item relative w-full ${currentSlide === 3 ? 'block' : 'hidden'}`}>
        <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" onClick={() => setCurrentSlide((currentSlide - 1 + slideCount) % slideCount)} className="btn btn-circle">❮</a> 
          <a href="#slide1" onClick={() => setCurrentSlide((currentSlide + 1) % slideCount)} className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
