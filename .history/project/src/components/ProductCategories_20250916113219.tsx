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
          <h2 className="text-5xl lg:text-6xl font-bold text-brand-primary mb-4">
            Complete Nutrition
          </h2>
          <h3 className="text-3xl lg:text-4xl font-semibold text-brand-primary mb-6">
            for Every Life Stage
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From playful puppies to wise seniors, we have the perfect nutrition solution
            for every stage of your pet's life journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-brand-tint2/50">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-brand-primary mb-2">{category.title}</h4>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-brand-accent1 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-brand-primary hover:bg-brand-primaryDark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
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