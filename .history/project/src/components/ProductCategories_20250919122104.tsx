import React from 'react';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: "Puppy & Kitten",
      description: "Essential nutrition for growing pets",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["High protein", "DHA for brain development", "Easy to digest"]
    },
    {
      title: "Adult Dogs",
      description: "Complete nutrition for active adult dogs",
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Balanced nutrition", "Joint support", "Healthy coat"]
    },
    {
      title: "Adult Cats",
      description: "Tailored nutrition for indoor and outdoor cats",
      image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Taurine enriched", "Hairball control", "Urinary health"]
    },
    {
      title: "Senior Pets",
      description: "Specialized care for aging companions",
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Joint mobility", "Cognitive support", "Easy digestion"]
    },
    {
      title: "Prescription Diet",
      description: "Therapeutic nutrition for health conditions",
      image: "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Veterinary recommended", "Clinically proven", "Targeted therapy"]
    },
    {
      title: "Treats & Snacks",
      description: "Healthy rewards for training and bonding",
      image: "https://images.pexels.com/photos/7516366/pexels-photo-7516366.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Natural ingredients", "Training sized", "Dental benefits"]
    }
  ];

  return (
    <section id="categories" className="py-20 bg-white">
      {/* Invisible anchors for Dogs and Cats to land on this section */}
      <div id="dogs" className="-mt-24 pt-24" aria-hidden="true"></div>
      <div id="cats" className="-mt-24 pt-24" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
            Complete Nutrition
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8">
            for Every Life Stage
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From playful puppies to wise seniors, we have the perfect nutrition solution 
            for every stage of your pet's life journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold text-brand-primary mb-1.5">{category.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-primary inline-block"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full btn-primary rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;