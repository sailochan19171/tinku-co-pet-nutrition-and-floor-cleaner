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
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-tint2 to-white px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-16 sm:pb-24">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Text + Image side-by-side */}
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Image (lighter shadow, less tilt for calmer look) */}
          <div className="order-2 lg:order-1 w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="/hero-dog.png"
                alt="Happy dog"
                className="w-[240px] sm:w-[300px] lg:w-[360px] h-auto select-none pointer-events-none transform-gpu rotate-1 -skew-y-1 drop-shadow-lg"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-full blur-md opacity-30 bg-black/20" />
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 lg:max-w-3xl">
            <h1 className="font-extrabold leading-tight text-brand-primary tracking-tight text-5xl sm:text-6xl md:text-7xl">
              <span className="block">Advanced</span>
              <span className="block">Nutrition</span>
            </h1>
            <p className="mt-6 text-brand-primary/90 text-xl sm:text-2xl font-semibold">
              backed by science
            </p>

            <div className="mt-10 flex sm:justify-start justify-center">
              <button
                onClick={() => navigate('/find-recipe')}
                className="bg-brand-primary hover:bg-brand-primaryDark text-white font-semibold py-3 px-7 rounded-lg text-base shadow-sm transition-colors duration-200"
              >
                Find Your Formula
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
