import React, { useEffect, useState } from 'react';
import { Microscope, Award, Users, BookOpen } from 'lucide-react';

// Client-side background removal: make black pixels transparent using a simple chroma key
const ChromaImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src; // same-origin asset
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        // Remove near-white background; soften very light grays to avoid halo
        if (r > 235 && g > 235 && b > 235) {
          d[i + 3] = 0; // transparent
        } else if (r > 220 && g > 220 && b > 220) {
          d[i + 3] = Math.floor(d[i + 3] * 0.4);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setDataUrl(canvas.toDataURL('image/png'));
    };
  }, [src]);

  return <img src={dataUrl || src} alt={alt} className={className} />;
};

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
          <div className="text-center card-soft p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Microscope className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Digestive Health</h4>
            <p className="text-gray-700">Prebiotics and fiber blends support sensitive stomachs and healthy gut flora.</p>
          </div>
          <div className="text-center card-soft p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Skin & Coat</h4>
            <p className="text-gray-700">Omega fatty acids and essential nutrients for a glossy coat and healthy skin.</p>
          </div>
          <div className="text-center card-soft p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-600 mb-2">Joint Support</h4>
            <p className="text-gray-700">Glucosamine, chondroitin, and balanced minerals for mobility and comfort.</p>
          </div>
          <div className="text-center card-soft p-8 hover:shadow-md transition-shadow">
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
              <ChromaImage
                src="/right-nutrition-every-stage.png"
                alt="Complete pet wellness - dog and cat with food"
                className="w-full rounded-lg shadow-lg object-contain bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionScience;