import React from 'react';
import { Heart, Shield, Zap, Brain, Bone, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthBenefits: React.FC = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Omega-3 fatty acids and taurine support cardiovascular function and maintain healthy heart rhythm.",
      color: "bg-red-500"
    },
    {
      icon: Shield,
      title: "Immune System",
      description: "Antioxidants, vitamins C & E boost natural defenses and help fight off infections.",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Energy & Vitality",
      description: "High-quality proteins and complex carbohydrates provide sustained energy for active lifestyles.",
      color: "bg-yellow-500"
    },
    {
      icon: Brain,
      title: "Cognitive Function",
      description: "DHA and EPA support brain development in puppies and cognitive health in senior pets.",
      color: "bg-purple-500"
    },
    {
      icon: Bone,
      title: "Joint & Bone Health",
      description: "Glucosamine, chondroitin, and calcium maintain strong bones and flexible joints.",
      color: "bg-blue-500"
    },
    {
      icon: Eye,
      title: "Vision Support",
      description: "Beta-carotene and lutein help maintain healthy eyesight throughout your pet's life.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="health" className="section-premium bg-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center transform -translate-y-10 md:-translate-y-16">
        <svg viewBox="0 0 512 512" aria-hidden="true" className="w-[700px] h-[700px] text-blue-900/10">
          <circle cx="140" cy="140" r="48" fill="currentColor" />
          <circle cx="240" cy="110" r="48" fill="currentColor" />
          <circle cx="320" cy="120" r="48" fill="currentColor" />
          <circle cx="400" cy="160" r="48" fill="currentColor" />
          <ellipse cx="260" cy="320" rx="160" ry="120" fill="currentColor" />
        </svg>
      </div>
      <div className="relative z-10 container-premium">
        {/* Heading with centered decorative paw background (behind text only) */}
        <div className="relative text-center mb-16">

          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
              Complete Health
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8">
              Benefits
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our scientifically formulated nutrition supports every aspect of your pet's health, 
              from nose to tail, inside and out.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              {/* Simplified icon badge */}
              <div className={`w-12 h-12 ${benefit.color} rounded-full flex items-center justify-center mb-4 opacity-90`}>
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-600 mb-4">{benefit.title}</h4>
              <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-4xl font-bold text-blue-600 mb-6">Visible Results</h4>
              <h5 className="text-2xl font-semibold text-gray-800 mb-6">in Just 30 Days</h5>
              <div className="space-y-3">
                {[
                  'Shinier, healthier coat',
                  'Increased energy and playfulness',
                  'Better digestion and smaller stools',
                  'Improved dental health',
                  'Enhanced immune response',
                ].map((text, i) => (
                  <div key={i} className="flex items-center">
                    <span className="mr-3 h-1.5 w-1.5 rounded-full bg-brand-primary inline-block"></span>
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/start-journey')} className="mt-8 btn-primary text-base rounded-md">
                Start Your Pet's Journey
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Happy healthy dog running"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">30</div>
                <div className="text-sm">Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;