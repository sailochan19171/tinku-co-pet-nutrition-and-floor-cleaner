import React from 'react';

// Hero layout: oversized headline on the left with 3D-styled image beside text,
// centered CTA, light blue gradient background. Button triggers onStartQuiz.

import { useNavigate } from 'react-router-dom';

type HeroProps = {
  onStartQuiz?: () => void;
};

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#dff0fb] to-[#c8e3f6] px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-16 sm:pb-24">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Text + Image side-by-side */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Image on the text side with subtle 3D effect */}
          <div className="order-2 lg:order-1 w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="/hero-dog.png"
                alt="Happy dog"
                className="w-[260px] sm:w-[320px] lg:w-[380px] h-auto select-none pointer-events-none transform-gpu rotate-3 -skew-y-1 drop-shadow-2xl shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
              />
              {/* Base shadow pad for depth */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg opacity-40 bg-black/20" />
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 lg:max-w-3xl">
            <h1 className="font-extrabold leading-[0.9] text-blue-700 tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[9rem]">
              <span className="block">Advanced</span>
              <span className="block">Nutrition</span>
            </h1>
            <p className="mt-6 text-blue-700/90 text-xl sm:text-2xl md:text-3xl font-semibold">
              backed by science
            </p>

            <div className="mt-10 flex sm:justify-start justify-center gap-3">
              <button
                onClick={() => navigate('/find-recipe')}
                className="btn-primary text-base"
              >
                Find Your Formula
              </button>
              <a href="#categories" className="btn-outline text-base">Shop Now</a>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
