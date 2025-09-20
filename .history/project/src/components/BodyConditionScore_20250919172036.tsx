import React from 'react';

// Body Condition Score Guide (BCS 1–9) with concise tips.
// Uses simple emoji placeholders; you can replace with images later via /public assets.
const BCS_CARDS = [
  { score: 1, title: 'Emaciated', tip: 'Visible ribs, spine, and hip bones. Consult a vet; increase calories safely.', emoji: '🥄' },
  { score: 2, title: 'Very Thin', tip: 'Ribs easily seen, minimal fat. Gradual increase in food; nutrient-dense diet.', emoji: '🍗' },
  { score: 3, title: 'Thin', tip: 'Ribs palpable with little fat. Slightly increase portions; monitor weekly.', emoji: '🍽️' },
  { score: 4, title: 'Underweight', tip: 'Slight waist, ribs palpable. Increase calories 5–10%.', emoji: '➕' },
  { score: 5, title: 'Ideal', tip: 'Ribs palpable without excess fat; visible waist. Maintain current portions.', emoji: '✅' },
  { score: 6, title: 'Overweight', tip: 'Slight fat over ribs; less waist. Reduce treats; add 10–15 min activity.', emoji: '⚖️' },
  { score: 7, title: 'Heavy', tip: 'Noticeable fat deposits; no waist. Reduce portions 10%; increase walks.', emoji: '🚶' },
  { score: 8, title: 'Obese', tip: 'Ribs difficult to feel; abdominal distension. Switch to weight management diet.', emoji: '📉' },
  { score: 9, title: 'Severely Obese', tip: 'Severe fat deposits; labored movement. Vet-supervised weight plan.', emoji: '🏥' },
];

const BodyConditionScore: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="body-condition-score">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600">Body Condition Score (1–9)</h2>
          <p className="text-gray-600 mt-2">Use these visual cues to gauge your pet's condition and adjust feeding accordingly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BCS_CARDS.map(({ score, title, tip, emoji }) => (
            <div key={score} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">BCS {score}</div>
                <div className="text-2xl" aria-hidden>{emoji}</div>
              </div>
              <div className="mt-2 text-blue-600 font-semibold">{title}</div>
              <p className="mt-2 text-sm text-gray-600">{tip}</p>

              {/* Progress representation from lean (1) to obese (9) */}
              <div className="mt-5">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${score <= 4 ? 'bg-green-500' : score <= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${(score / 9) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Lean</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-600 text-center">
          Note: Always consult your veterinarian for a personalized plan, especially for pets with medical conditions.
        </p>
      </div>
    </section>
  );
};

export default BodyConditionScore;