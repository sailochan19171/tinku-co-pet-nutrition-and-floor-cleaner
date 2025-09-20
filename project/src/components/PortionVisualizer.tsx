import React, { useEffect, useMemo, useState } from 'react';

// Portion Visualizer: converts daily calories -> cups and grams with per-meal split
// No external icon dependencies. Uses Tailwind for styling.

type Species = 'Dog' | 'Cat';

interface PortionVisualizerProps {
  species?: Species;
  dailyCalories?: number;
  mealsPerDay?: number;
}

const PortionVisualizer: React.FC<PortionVisualizerProps> = (props) => {
  const [species, setSpecies] = useState<Species>(props.species ?? 'Dog');
  const [dailyCalories, setDailyCalories] = useState<number>(props.dailyCalories ?? 600);
  const [kcalPerCupDog] = useState<number>(350);
  const [kcalPerCupCat] = useState<number>(300);
  const [gramsPerCup, setGramsPerCup] = useState<number>(100);
  const [mealsPerDay, setMealsPerDay] = useState<number>(props.mealsPerDay ?? 2);

  // Sync internal state when parent sends new defaults (e.g., after NutritionGuide calculates)
  useEffect(() => {
    if (typeof props.species !== 'undefined') setSpecies(props.species);
  }, [props.species]);

  useEffect(() => {
    if (typeof props.dailyCalories === 'number') setDailyCalories(props.dailyCalories);
  }, [props.dailyCalories]);

  useEffect(() => {
    if (typeof props.mealsPerDay === 'number') setMealsPerDay(props.mealsPerDay);
  }, [props.mealsPerDay]);

  const kcalPerCup = species === 'Dog' ? kcalPerCupDog : kcalPerCupCat;

  const { cupsPerDay, gramsPerDay, cupsPerMeal, gramsPerMeal } = useMemo(() => {
    const cups = dailyCalories > 0 && kcalPerCup > 0 ? dailyCalories / kcalPerCup : 0;
    const grams = cups * gramsPerCup;
    const meals = Math.max(1, Math.round(mealsPerDay));
    return {
      cupsPerDay: cups,
      gramsPerDay: grams,
      cupsPerMeal: cups / meals,
      gramsPerMeal: grams / meals,
    };
  }, [dailyCalories, kcalPerCup, gramsPerCup, mealsPerDay]);

  const pctOf2000 = Math.min(100, Math.round((dailyCalories / 2000) * 100));

  return (
    <section className="py-16 bg-white" id="portion-visualizer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600">Portion Visualizer</h2>
          <p className="text-gray-600 mt-2">Convert daily calories into cups and grams. Adjust meals to see per-meal portions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as Species)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Daily Calories</label>
                <span className="text-sm text-gray-600">{dailyCalories} kcal</span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                step={10}
                value={dailyCalories}
                onChange={(e) => setDailyCalories(parseInt(e.target.value, 10) || 0)}
                className="w-full accent-blue-600"
                aria-label="Daily calories"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">kcal per cup</label>
                <input
                  type="number"
                  min={100}
                  max={600}
                  value={kcalPerCup}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">Preset: {species === 'Dog' ? 'Dog 350' : 'Cat 300'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">grams per cup</label>
                <input
                  type="number"
                  min={60}
                  max={150}
                  value={gramsPerCup}
                  onChange={(e) => setGramsPerCup(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typical dry food: ~100g per cup</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Meals per day</label>
                <span className="text-sm text-gray-600">{mealsPerDay} meal{mealsPerDay > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                step={1}
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(parseInt(e.target.value, 10) || 1)}
                className="w-full accent-blue-600"
                aria-label="Meals per day"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-200">
                <div className="text-sm text-gray-600">Cups per Day</div>
                <div className="text-3xl font-bold text-gray-900">{cupsPerDay.toFixed(2)} cups</div>
                <div className="text-xs text-gray-500 mt-1">Based on {kcalPerCup} kcal/cup</div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200">
                <div className="text-sm text-gray-600">Grams per Day</div>
                <div className="text-3xl font-bold text-gray-900">{gramsPerDay.toFixed(0)} g</div>
                <div className="text-xs text-gray-500 mt-1">{gramsPerCup} g/cup</div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200">
                <div className="text-sm text-gray-600">Cups per Meal</div>
                <div className="text-3xl font-bold text-gray-900">{cupsPerMeal.toFixed(2)} cups</div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200">
                <div className="text-sm text-gray-600">Grams per Meal</div>
                <div className="text-3xl font-bold text-gray-900">{gramsPerMeal.toFixed(0)} g</div>
              </div>
            </div>

            {/* Visual bars */}
            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Calorie target</span>
                <span>{pctOf2000}% of 2000 kcal</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-blue-500 to-blue-700"
                  style={{ width: `${pctOf2000}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: If splitting into {mealsPerDay} meals, serve ~{gramsPerMeal.toFixed(0)} g ({cupsPerMeal.toFixed(2)} cups) per meal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortionVisualizer;