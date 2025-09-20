import React from 'react';

// Hero layout: oversized headline on the left with 3D-styled image beside text,
// centered CTA, light blue gradient background. Button triggers onStartQuiz.

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  onStartQuiz?: () => void;
};

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
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

            <motion.h1
              className="heading-hero"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="block">Tailored Food for</span>
              <span className="block">Healthier, <span className="text-amber-600">Happier</span> Pets</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-gray-700 text-lg sm:text-xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              Clinically guided recipes crafted by nutrition experts—balanced for energy, digestion, skin & coat, and joint support.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <button
                onClick={() => navigate('/find-recipe')}
                className="btn-primary"
              >
                Find Your Formula
              </button>
              <a href="#categories" className="btn-outline">Shop Now</a>
            </motion.div>


          </div>

          {/* Image with subtle motion */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <motion.img
                src="/hero-beagle.jpg"
                alt="Happy dog"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true }}
                className="w-[260px] sm:w-[340px] lg:w-[420px] h-auto select-none pointer-events-none transform-gpu transition-transform duration-700 ease-out will-change-transform hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
