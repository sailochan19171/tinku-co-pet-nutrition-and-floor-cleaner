import React, { useState } from 'react';

const FAQ: React.FC = () => {
  // Simple controlled form state
  const [form, setForm] = useState<{ fullName: string; email: string; productDetails: string }>(
    { fullName: '', email: '', productDetails: '' }
  );
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to backend/email service
    setStatus('success');
  };

  return (
    <section className="section-premium bg-white">
      <div className="container-premium max-w-3xl">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">We’re here to help</p>
          <h2 className="heading-section mb-2">Send us a Message</h2>
          <p className="text-lg text-gray-700">Have questions? Fill out the form and we’ll get back to you.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6"
        >
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700 mb-1">
              Product details
            </label>
            <textarea
              id="productDetails"
              name="productDetails"
              rows={5}
              value={form.productDetails}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary text-base rounded-md"
            >
              Send Message
            </button>
          </div>

          {status === 'success' && (
            <p className="text-green-600 text-sm">Thanks! Your message has been sent.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default FAQ;
