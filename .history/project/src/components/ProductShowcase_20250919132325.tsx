import React from 'react';

const ProductShowcase: React.FC = () => {
  return (
    <section className="section-premium bg-gradient-to-b from-blue-50 to-white">
      <div className="container-premium">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="card-soft p-4">
              <img
                src="https://images.pexels.com/photos/7516366/pexels-photo-7516366.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Pet food products"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2 lg:pl-12">
            <p className="eyebrow mb-3">Formulated by experts</p>
            <h2 className="heading-section mb-4">For strong bones</h2>
            <p className="text-gray-700">Calcium-rich recipes with balanced minerals to support skeletal health at every life stage.</p>
            <div className="mt-6">
              <button className="btn-primary text-base rounded-md">
                Find Your Formula
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;