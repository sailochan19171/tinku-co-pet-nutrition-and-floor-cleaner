import React from 'react';
import { Mail, Gift, BookOpen, Heart } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the Tinku & Co. Family
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get expert pet nutrition tips, exclusive offers, and the latest research 
            delivered straight to your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Expert Tips</h4>
            <p className="text-blue-100">Weekly nutrition advice from our veterinary team</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Exclusive Offers</h4>
            <p className="text-blue-100">Special discounts and early access to new products</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Pet Stories</h4>
            <p className="text-blue-100">Heartwarming success stories from our community</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Subscribe Now</h3>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>I have a dog</option>
                  <option>I have a cat</option>
                  <option>I have both</option>
                  <option>I'm a pet professional</option>
                </select>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <p className="text-sm text-gray-600">
                  I agree to receive marketing communications from Tinku & Co. and understand 
                  I can unsubscribe at any time.
                </p>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200">
                Subscribe & Get 15% Off
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;