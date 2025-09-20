import React, { useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const consentText = 'I agree to receive marketing communications from Tinku & Co. and understand I can unsubscribe at any time.';
      const res = await fetch(`${API_BASE}/api/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consentText, source: 'footer' })
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setMessage('Subscribed! Please check your inbox for updates.');
      setEmail('');
    } catch (e) {
      setStatus('error');
      setMessage('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white px-6 sm:px-8 lg:px-12 border-t border-gray-700 rounded-none">
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/tinku-logo.png"
                alt="Tinku & Co. logo"
                className="h-12 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Science-backed nutrition for your beloved pets. Quality ingredients, proven results.
            </p>

            {/* Email subscribe input + button */}
            <label htmlFor="footer-email" className="sr-only">Subscribe for updates</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to subscribe"
                className="w-full max-w-xs p-3 bg-gray-800/60 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSubscribe}
                disabled={!email || status === 'loading'}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">
              I agree to receive marketing communications from Tinku & Co. and understand I can unsubscribe at any time.
            </p>
            {message && (
              <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
            )}

            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-white cursor-pointer text-sm">Facebook</a>
              <a className="text-gray-400 hover:text-white cursor-pointer text-sm">Twitter</a>
              <a className="text-gray-400 hover:text-white cursor-pointer text-sm">Instagram</a>
              <a className="text-gray-400 hover:text-white cursor-pointer text-sm">YouTube</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Dog Food</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Cat Food</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Treats</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Supplements</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Pet Care Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Store Locator</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Tinku & Co. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm border-b border-transparent hover:border-gray-400 pb-1 transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;