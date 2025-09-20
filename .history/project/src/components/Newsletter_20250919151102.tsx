import React from 'react';

const Round: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
    {children}
  </div>
);

const Newsletter: React.FC = () => {
  return (
    <section className="section-premium bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container-premium">
        <div className="text-center mb-12">
          <p className="eyebrow text-blue-100 mb-2">Stay in the loop</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Join the Tinku & Co. Family
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Expert tips, exclusive offers, and the latest nutrition research—straight to your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center text-white">
          <div>
            <Round>Tips</Round>
            <h4 className="text-lg font-semibold mb-1">Expert Tips</h4>
            <p className="text-blue-100 text-sm">Weekly nutrition advice from our veterinary team</p>
          </div>
          <div>
            <Round>Deals</Round>
            <h4 className="text-lg font-semibold mb-1">Exclusive Offers</h4>
            <p className="text-blue-100 text-sm">Special discounts and early access to new products</p>
          </div>
          <div>
            <Round>Love</Round>
            <h4 className="text-lg font-semibold mb-1">Pet Stories</h4>
            <p className="text-blue-100 text-sm">Heartwarming success stories from our community</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mr-3">@</span>
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
                  I agree to receive marketing communications from Tinku & Co. and understand I can unsubscribe at any time.
                </p>
              </div>
              <button className="w-full btn-primary text-base rounded-md">
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