import React from 'react';
import { Award, Globe, Users, Heart } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="section-premium bg-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
            About
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8">
            Tinku & Co.
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            For over five decades, we've been dedicated to advancing pet nutrition through
            scientific research, innovation, and an unwavering commitment to pet health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h4 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h4>
            <div className="space-y-4 text-gray-700">
              <p>
                At Tinku & Co., we’re not just making pet treats — we’re crafting moments of joy, love, and health for your furry family members. Named after our founder's beloved golden retriever, Tinku, the brand is a heartfelt tribute to the special bond between pets and their parents.
              </p>
              <p>
                We specialize in small-batch, preservative-free dog treats and ice creams made with real, human-grade ingredients. With every product, we blend chef-level care, pet nutrition science, and a touch of indulgence to elevate the everyday treat into something extraordinary.
              </p>
              <p>
                Because for us, dogs aren’t just pets — they’re family.
              </p>
            </div>
          </div>
          <div>
            <div className="relative border border-gray-200 rounded-none p-4">
              <img
                src="https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Dr. Mark Tinku with pets"
                className="w-full rounded-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-none flex items-center justify-center mx-auto mb-4 border border-gray-300">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-600 mb-2">Excellence</h5>
            <p className="text-gray-700">Committed to the highest standards in pet nutrition research and manufacturing.</p>
          </div>
          <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-none flex items-center justify-center mx-auto mb-4 border border-gray-300">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-600 mb-2">Global Reach</h5>
            <p className="text-gray-700">Serving pet families in over 80 countries with locally adapted nutrition solutions.</p>
          </div>
          <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-none flex items-center justify-center mx-auto mb-4 border border-gray-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-600 mb-2">Expert Team</h5>
            <p className="text-gray-700">Over 200 veterinarians, nutritionists, and researchers dedicated to pet health.</p>
          </div>
          <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-none flex items-center justify-center mx-auto mb-4 border border-gray-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-600 mb-2">Pet Love</h5>
            <p className="text-gray-700">Every decision we make is guided by our love for pets and their wellbeing.</p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-none p-8 lg:p-12">
          <h4 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Mission</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 mb-3">Advance Science</h5>
              <p className="text-gray-600">Continuously push the boundaries of pet nutrition research to discover new ways to improve pet health.</p>
            </div>
            <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 mb-3">Educate Owners</h5>
              <p className="text-gray-600">Provide pet parents with the knowledge and tools they need to make informed nutrition decisions.</p>
            </div>
            <div className="text-center border border-gray-200 rounded-none p-6 hover:border-blue-300 transition-colors duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 mb-3">Transform Lives</h5>
              <p className="text-gray-600">Help pets live longer, healthier, and happier lives through superior nutrition.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;