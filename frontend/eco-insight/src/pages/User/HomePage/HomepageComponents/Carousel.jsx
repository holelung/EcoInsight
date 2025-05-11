// src/pages/User/HomePage/HomepageComponents/Carousel.jsx
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../../../../assets/EcoInsigthLogo2.png';
import slide2 from '../../../../assets/ExampleImg1.png';
import slide3 from '../../../../assets/ExampleImg2.png';

const slides = [
  { url: slide1, link: '/login' },
  { url: slide2, link: '/board/cert' },
  { url: slide3, link: '/dashboard' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;

  const goPrev = () => setCurrent(current === 0 ? lastIndex : current - 1);
  const goNext = () => setCurrent(current === lastIndex ? 0 : current + 1);

  // 자동 재생을 위한 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
        // 함수형 업데이트로 current 값을 안전하게 가져와서 다음 인덱스로 설정
        setCurrent((curr) => (curr === lastIndex ? 0 : curr + 1));
    }, 3000); // 3초(3000ms)마다 이미지 전환

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(intervalId);
  }, [lastIndex]);

  return (
    <div className="relative w-full max-w-7xl mx-auto aspect-[4/3] overflow-visible">
      {/* 이미지 영역만 크롭 */}
      <div className="w-full h-full overflow-hidden bg-gray-100 rounded-lg">
        {slides.map((slide, idx) => (
          <Link
            key={idx}
            to={slide.link}
            className={`
              absolute inset-0 transition-opacity duration-500
              ${idx === current
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'}
            `}
          >
            <img
              src={slide.url}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-contain"
            />
          </Link>
        ))}
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        &#9664;
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        &#9654;
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-800 bg-opacity-50 p-1 rounded-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
