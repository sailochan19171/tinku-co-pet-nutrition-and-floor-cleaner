import React from 'react';

const Benefits: React.FC = () => {
  return (
    <section className="section-premium bg-white">
      <div className="container-premium">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Content */}
          <div className="lg:w-1/2 lg:pr-12">
            <p className="eyebrow mb-3">Why Tinku & Co.</p>
            <h2 className="heading-section mb-3">The Benefits</h2>
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">of a science-led diet</h3>
            <div className="mt-4">
              <button className="btn-primary text-base rounded-md">
                Find Your Ideal Recipe
              </button>
            </div>
          </div>

          {/* Cat Image */}
          <div className="lg:w-1/2">
            <div className="card-soft p-4">
              <img
                src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Orange tabby cat"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;