import React from 'react';
import { Microscope, Award, Users, BookOpen } from 'lucide-react';

const NutritionScience: React.FC = () => {
  return (
    <section id="solutions" className="section-premium bg-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-6">Pet Nutrition Solutions</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Complete, balanced, and delicious meals tailored to your pet’s unique needs—visible on any screen
            with clean spacing, consistent padding, and a polished layout.
          </p>
        </div>

        {/* Solution Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {/* Simplified: smaller badges for a cleaner, less busy grid */}
          <div className="text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Microscope className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Digestive Health</h4>
            <p className="text-gray-700">Prebiotics and fiber blends support sensitive stomachs and healthy gut flora.</p>
          </div>
          <div className="text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Skin & Coat</h4>
            <p className="text-gray-700">Omega fatty acids and essential nutrients for a glossy coat and healthy skin.</p>
          </div>
          <div className="text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Joint Support</h4>
            <p className="text-gray-700">Glucosamine, chondroitin, and balanced minerals for mobility and comfort.</p>
          </div>
          <div className="text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Weight & Energy</h4>
            <p className="text-gray-700">Calorie-conscious recipes to maintain ideal body condition and vitality.</p>
          </div>
        </div>

        {/* Life-Stage Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold text-blue-600 mb-6">Right Nutrition, Every Stage</h4>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Puppy & Kitten</h5>
                    <p className="text-gray-600">Protein-rich, DHA-enabled recipes for healthy growth and development.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Adult</h5>
                    <p className="text-gray-600">Balanced macros and micronutrients for everyday activity and maintenance.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Senior</h5>
                    <p className="text-gray-600">Support for joints, cognition, and digestion to keep seniors thriving.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/573239/pexels-photo-573239.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy pets enjoying balanced meals"
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionScience;