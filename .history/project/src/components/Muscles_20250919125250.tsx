import React from 'react';
import { Fish, Drumstick, Apple } from 'lucide-react';

const Muscles: React.FC = () => {
  return (
    <section className="section-premium bg-white">
      <div className="container-premium">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8">
              The Benefits
              of a science-led diet
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              We use only high-quality protein sources in our foods since they are the 
              essential building blocks of all tissues and organs of the body.
            </p>
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                Find Your Ideal Recipe
              </button>
            </div>
          </div>
          
          {/* Cat Image and Icons */}
          <div className="lg:w-1/2 relative">
            <div className="flex justify-center mb-8 lg:mb-0">
              <img
                src="/muscles-cat.png"
                alt="Cat looking up"
                className="w-full max-w-sm mx-auto"
              />
            </div>
            
            {/* Simplified: remove floating nutrition icon bubbles for a cleaner look */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Muscles;