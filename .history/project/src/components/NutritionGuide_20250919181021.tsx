import React, { useState } from 'react';
import { Calculator, Clock, Scale, Activity } from 'lucide-react';

type NutritionCalculated = {
  species: 'Dog' | 'Cat';
  dailyCalories: number;
  mealsPerDay: number;
};

interface NutritionGuideProps {
  onCalculated?: (data: NutritionCalculated) => void;
}

const NutritionGuide: React.FC<NutritionGuideProps> = ({ onCalculated }) => {
  // Local state for calculator inputs
  const [petType, setPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [age, setAge] = useState<'Puppy/Kitten' | 'Adult' | 'Senior'>('Adult');
  const [activity, setActivity] = useState<'Low' | 'Moderate' | 'High'>('Moderate');

  // Result state
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const [cupsPerDay, setCupsPerDay] = useState<number | null>(null);
  const [mealsPerDay, setMealsPerDay] = useState<number | null>(null);

  // Simple model:
  // - Convert lbs -> kg
  // - RER = 70 * (kg^0.75)
  // - Species/age/activity multipliers to get MER (daily calories)
  // - Convert calories to cups using kcal per cup (defaults below)
  const KCAL_PER_CUP_DOG = 350; // example food density
  const KCAL_PER_CUP_CAT = 300;

  const getAgeFactor = (species: 'Dog' | 'Cat', age: typeof age) => {
    // Typical guideline ranges
    if (species === 'Dog') {
      if (age === 'Puppy/Kitten') return 3.0; // growing puppies can be 2–3x RER
      if (age === 'Senior') return 1.1; // seniors often slightly reduced
      return 1.6; // adult
    } else {
      if (age === 'Puppy/Kitten') return 2.5; // kittens ~2–2.5x RER
      if (age === 'Senior') return 1.0; // maintenance
      return 1.2; // adult cat baseline
    }
  };

  const getActivityFactor = (lvl: typeof activity) => {
    if (lvl === 'Low') return 0.9;
    if (lvl === 'High') return 1.2;
    return 1.0; // Moderate
  };

  const getMealsPerDay = (age: typeof age) => {
    if (age === 'Puppy/Kitten') return 3;
    if (age === 'Senior') return 2; // smaller, frequent works well
    return 2; // adult
  };

  const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

  const calculate = () => {
    const w = parseFloat(weightLbs);
    if (!w || w <= 0) {
      setDailyCalories(null);
      setCupsPerDay(null);
      setMealsPerDay(null);
      return;
    }

    const kg = w * 0.45359237;
    const RER = 70 * Math.pow(kg, 0.75);
    const speciesFactor = getAgeFactor(petType, age);
    const activityFactor = getActivityFactor(activity);

    const MER = RER * speciesFactor * activityFactor; // daily calories
    const kcalPerCup = petType === 'Dog' ? KCAL_PER_CUP_DOG : KCAL_PER_CUP_CAT;
    const cups = MER / kcalPerCup;

    const roundedMER = round(MER);
    const computedMeals = getMealsPerDay(age);

    setDailyCalories(roundedMER);
    setCupsPerDay(round(cups, 2));
    setMealsPerDay(computedMeals);

    // Notify parent (App/Home) so Portion Visualizer can auto-fill
    onCalculated?.({
      species: petType,
      dailyCalories: roundedMER,
      mealsPerDay: computedMeals,
    });
  };

  return (
    <section id="nutrition" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
            Nutrition
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8">
            Made Simple
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding your pet's nutritional needs doesn't have to be complicated. 
            Our expert guide helps you make the right choices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h4 className="text-3xl font-bold text-blue-600 mb-8">Feeding Guidelines</h4>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-800 mb-2">Right Portion Size</h5>
                  <p className="text-gray-600">Feed according to your pet's weight, age, and activity level. Our feeding charts provide precise measurements.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-800 mb-2">Feeding Schedule</h5>
                  <p className="text-gray-600">Puppies need 3-4 meals daily, adult pets 2 meals, and seniors may benefit from smaller, frequent meals.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-800 mb-2">Activity Adjustment</h5>
                  <p className="text-gray-600">Active pets need more calories, while less active pets need portion control to maintain healthy weight.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
              <Calculator className="w-8 h-8 mr-3" />
              Portion Calculator
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value as 'Dog' | 'Cat')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  min={1}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value as 'Puppy/Kitten' | 'Adult' | 'Senior')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Puppy/Kitten">Puppy/Kitten (0-1 year)</option>
                  <option value="Adult">Adult (1-7 years)</option>
                  <option value="Senior">Senior (7+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as 'Low' | 'Moderate' | 'High')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button
                onClick={calculate}
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Calculate Portions
              </button>
            </div>
          </div>
        </div>

        {/* Results panel */}
        {dailyCalories !== null && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-16">
            <h5 className="text-xl font-semibold text-green-800 mb-4">Daily Portion Recommendation</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-900">
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <div className="text-sm text-green-700">Estimated Daily Calories</div>
                <div className="text-2xl font-bold">{dailyCalories} kcal</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <div className="text-sm text-green-700">Cups per Day</div>
                <div className="text-2xl font-bold">{cupsPerDay}</div>
                <div className="text-xs text-green-600 mt-1">Assuming {petType === 'Dog' ? 350 : 300} kcal/cup</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <div className="text-sm text-green-700">Meals per Day</div>
                <div className="text-2xl font-bold">{mealsPerDay}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-green-700">This is a general guideline. Always monitor body condition and consult your veterinarian for personalized advice.</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-blue-200">Protein Minimum</div>
              <p className="text-sm mt-2">High-quality protein for muscle development and maintenance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-blue-200">Fat Content</div>
              <p className="text-sm mt-2">Essential fatty acids for coat health and energy</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionGuide;