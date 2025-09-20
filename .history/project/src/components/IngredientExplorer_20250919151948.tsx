import React, { useMemo, useState } from 'react';

// Lightweight interactive section: filterable, searchable ingredient cards with
// smooth expand/collapse (max-height transition) and no icon dependencies.

type Ingredient = {
  id: string;
  name: string;
  tags: string[]; // e.g., ["digestive", "skin", "energy"]
  summary: string;
  details: string[]; // bullet points
};

const ALL_INGREDIENTS: Ingredient[] = [
  {
    id: 'chicken',
    name: 'Chicken',
    tags: ['muscle', 'energy'],
    summary: 'High-quality animal protein to support lean muscles and overall vitality.',
    details: [
      'Rich in essential amino acids for tissue repair and growth',
      'Highly palatable and easy to digest for most pets',
      'Pairs well with whole grains or sweet potato for balanced energy',
    ],
  },
  {
    id: 'salmon',
    name: 'Salmon',
    tags: ['skin', 'cognitive'],
    summary: 'Omega-3 powerhouse that supports skin, coat, joints, and brain health.',
    details: [
      'EPA & DHA help reduce inflammation and support joint comfort',
      'Promotes a glossy coat and healthy skin barrier',
      'Excellent for cognitive function in puppies and seniors',
    ],
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    tags: ['digestive', 'fiber'],
    summary: 'Gentle source of fiber that helps regulate digestion and stool quality.',
    details: [
      'Prebiotic fiber nourishes beneficial gut bacteria',
      'Helps with stool consistency during dietary transitions',
      'Naturally rich in vitamins A and C',
    ],
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    tags: ['energy', 'digestive'],
    summary: 'Complex carbohydrates for sustained energy and gut-friendly fiber.',
    details: [
      'Low glycemic load supports steady energy release',
      'Beta-carotene supports immune and eye health',
      'Pairs well with lean proteins for balanced meals',
    ],
  },
  {
    id: 'probiotics',
    name: 'Probiotics',
    tags: ['digestive', 'immune'],
    summary: 'Live beneficial cultures that support gut balance and immunity.',
    details: [
      'May reduce occasional diarrhea and support regularity',
      'Helps maintain a healthy microbiome after antibiotics',
      'Often paired with prebiotic fibers for synergy',
    ],
  },
  {
    id: 'glucosamine',
    name: 'Glucosamine + Chondroitin',
    tags: ['joint'],
    summary: 'Joint-support duo that helps maintain cartilage and mobility.',
    details: [
      'Supports comfort for active and senior pets',
      'Often combined with EPA/DHA and MSM',
      'Best used consistently for visible results',
    ],
  },
];

const FILTERS = [
  { id: 'digestive', label: 'Digestive' },
  { id: 'skin', label: 'Skin & Coat' },
  { id: 'energy', label: 'Energy' },
  { id: 'joint', label: 'Joint' },
  { id: 'cognitive', label: 'Cognitive' },
  { id: 'immune', label: 'Immune' },
  { id: 'fiber', label: 'Fiber' },
  { id: 'muscle', label: 'Muscle' },
];

const IngredientExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_INGREDIENTS.filter((ing) => {
      const qMatch = !q || ing.name.toLowerCase().includes(q) || ing.summary.toLowerCase().includes(q);
      const fMatch = active.length === 0 || active.some((f) => ing.tags.includes(f));
      return qMatch && fMatch;
    });
  }, [query, active]);

  const toggleFilter = (id: string) => {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleExpand = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section id="ingredients" className="section-premium bg-white">
      <div className="container-premium">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">Explore ingredients</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-3">Ingredient Explorer</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Search and filter to learn how each ingredient supports your pet’s unique needs.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <input
              placeholder="Search ingredients or benefits (e.g., coat, digestion)"
              className="w-full md:max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="text-sm text-gray-600">{filtered.length} matches</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = active.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    on ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            {active.length > 0 && (
              <button
                onClick={() => setActive([])}
                className="px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ing) => {
            const isOpen = !!expanded[ing.id];
            return (
              <div key={ing.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{ing.name}</h3>
                    <p className="text-gray-700 mt-1">{ing.summary}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(ing.id)}
                    aria-expanded={isOpen}
                    className="ml-2 shrink-0 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors"
                  >
                    {isOpen ? 'Hide' : 'Learn more'}
                  </button>
                </div>

                {/* animated panel using max-height */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? 400 : 0 }}
                >
                  <div className="mt-4 pt-1 border-t border-gray-200">
                    <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
                      {ing.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ing.tags.map((t) => (
                        <span key={t} className="inline-block text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IngredientExplorer;