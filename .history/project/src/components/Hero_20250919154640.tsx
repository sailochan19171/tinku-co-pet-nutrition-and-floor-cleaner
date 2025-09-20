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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ff] via-[#d8edff] to-[#c8e3f6] px-6 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-12 sm:pb-16">
      {/* Soft background accents without whitespace */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Tight grid to avoid gaps */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="lg:max-w-2xl">
            <p className="eyebrow mb-3">Premium Pet Nutrition</p>
            <h1 className="heading-hero leading-[0.95] text-blue-700">
              Tailored Food for Healthier, Happier Pets
            </h1>
            <p className="mt-4 text-gray-700 text-lg sm:text-xl">
              Clinically guided recipes crafted by nutrition experts—balanced for energy, digestion, skin & coat, and joint support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/find-recipe')}
                className="btn-primary"
              >
                Find Your Formula
              </button>
              <a href="#categories" className="btn-outline">Shop Now</a>
            </div>

            {/* Trust badges without icons */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg bg-white/70 ring-1 ring-black/5 py-2 text-sm font-semibold text-blue-700">Human-Grade</div>
              <div className="rounded-lg bg-white/70 ring-1 ring-black/5 py-2 text-sm font-semibold text-blue-700">Vet-Formulated</div>
              <div className="rounded-lg bg-white/70 ring-1 ring-black/5 py-2 text-sm font-semibold text-blue-700">No Fillers</div>
              <div className="rounded-lg bg-white/70 ring-1 ring-black/5 py-2 text-sm font-semibold text-blue-700">Made Fresh</div>
            </div>
          </div>

          {/* Image with subtle motion */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/hero-dog.png"
                alt="Happy dog"
                className="w-[260px] sm:w-[340px] lg:w-[420px] h-auto select-none pointer-events-none transform-gpu drop-shadow-2xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out will-change-transform hover:scale-[1.03]"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg opacity-40 bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
