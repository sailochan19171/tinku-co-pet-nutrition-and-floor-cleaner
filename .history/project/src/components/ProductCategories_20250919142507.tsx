import React from 'react';

// Polished ecommerce-style grid using existing theme utilities
// - section-premium / container-premium for spacing and width
// - eyebrow + heading-section for consistent headings
// - card-soft + card-hover + card-img for cards
// - price + price-compare, simple stars, and optional badges

const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: 'Puppy & Kitten',
      price: '₹899',
      compareAt: '₹999',
      description: 'Essential nutrition for growing pets',
      image:
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['High protein', 'DHA for brain development', 'Easy to digest'],
      badge: 'new',
      rating: 4.8,
      reviews: 132,
    },
    {
      title: 'Adult Dogs',
      price: '₹1,299',
      compareAt: '₹1,499',
      description: 'Complete nutrition for active adult dogs',
      image:
        'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Balanced nutrition', 'Joint support', 'Healthy coat'],
      badge: 'best',
      rating: 4.7,
      reviews: 289,
    },
    {
      title: 'Adult Cats',
      price: '₹1,099',
      compareAt: '',
      description: 'Tailored nutrition for indoor and outdoor cats',
      image:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Taurine enriched', 'Hairball control', 'Urinary health'],
      badge: '',
      rating: 4.6,
      reviews: 174,
    },
    {
      title: 'Senior Pets',
      price: '₹1,499',
      compareAt: '₹1,699',
      description: 'Specialized care for aging companions',
      image:
        'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Joint mobility', 'Cognitive support', 'Easy digestion'],
      badge: 'sale',
      rating: 4.5,
      reviews: 96,
    },
    {
      title: 'Prescription Diet',
      price: '₹1,799',
      compareAt: '',
      description: 'Therapeutic nutrition for health conditions',
      image:
        'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Veterinary recommended', 'Clinically proven', 'Targeted therapy'],
      badge: 'best',
      rating: 4.9,
      reviews: 64,
    },
    {
      title: 'Treats & Snacks',
      price: '₹399',
      compareAt: '₹499',
      description: 'Healthy rewards for training and bonding',
      image:
        'https://images.pexels.com/photos/7516366/pexels-photo-7516366.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Natural ingredients', 'Training sized', 'Dental benefits'],
      badge: 'sale',
      rating: 4.4,
      reviews: 210,
    },
  ];

  const Badge = ({ type }: { type?: string }) => {
    if (!type) return null;
    const cls =
      type === 'sale' ? 'badge-sale' : type === 'new' ? 'badge-new' : 'badge-best';
    const label = type === 'sale' ? 'Sale' : type === 'new' ? 'New' : 'Best Seller';
    return <span className={`${cls}`}>{label}</span>;
  };

  const Stars = ({ value }: { value: number }) => {
    // Render simple inline stars; not half-stars for simplicity
    const full = Math.round(value);
    return (
      <span className="stars" aria-label={`${value} out of 5 stars`}>
        {'★★★★★'.slice(0, full)}{'☆☆☆☆☆'.slice(0, 5 - full)}
      </span>
    );
  };

  return (
    <section id="categories" className="section-premium bg-white">
      {/* Invisible anchors for Dogs and Cats to land on this section */}
      <div id="dogs" className="-mt-24 pt-24" aria-hidden="true"></div>
      <div id="cats" className="-mt-24 pt-24" aria-hidden="true"></div>

      <div className="container-premium">
        <div className="text-center mb-12 reveal-up">
          <p className="eyebrow mb-2">Shop by life stage</p>
          <h2 className="heading-section mb-3">Complete Nutrition</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            From playful puppies to wise seniors, find the perfect formula for your pet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group card-soft card-hover overflow-hidden reveal-up">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="card-img group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 space-x-2">
                  <Badge type={category.badge} />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h4 className="text-base font-semibold text-gray-900">{category.title}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="price">{category.price}</span>
                    {category.compareAt && (
                      <span className="price-compare">{category.compareAt}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Stars value={category.rating} />
                  <span className="text-xs text-gray-500">({category.reviews})</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {category.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-primary inline-block"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <button className="flex-1 btn-primary rounded-md">Add to Cart</button>
                  <button className="btn-outline rounded-md">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
