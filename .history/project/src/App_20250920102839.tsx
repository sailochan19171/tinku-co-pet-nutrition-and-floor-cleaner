import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';

import Muscles from './components/Muscles';
import HealthBenefits from './components/HealthBenefits';
import NutritionScience from './components/NutritionScience';
import NutritionGuide from './components/NutritionGuide';
// import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';

import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import PetQuizModal from './components/PetQuizModal';
// import MealPlanPreview from './components/MealPlanPreview'; // temporarily disabled
import SplashScreen from './components/SplashScreen';
import CookieGate from './components/CookieGate';
import PortionVisualizer from './components/PortionVisualizer';
import BodyConditionScore from './components/BodyConditionScore';
import StoreLocator from './components/StoreLocator';

// New pages
import QuizPage from './pages/QuizPage';
import JourneyPage from './pages/JourneyPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Lifted state from NutritionGuide -> used to auto-fill PortionVisualizer
  const [vizSpecies, setVizSpecies] = useState<'Dog' | 'Cat'>('Dog');
  const [vizDailyCalories, setVizDailyCalories] = useState<number>(600);
  const [vizMealsPerDay, setVizMealsPerDay] = useState<number>(2);

  useEffect(() => {
    const onScroll = () => setShowTop((window.scrollY || 0) > 300);
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="space-y-6 sm:space-y-8">
        <Hero onStartQuiz={() => setQuizOpen(true)} />
        {/* <div id="meal-plan" className="scroll-mt-24">
          <MealPlanPreview />
        </div> */}
        <ProductCategories />
        <Muscles />
        <HealthBenefits />
        <NutritionScience />
        <NutritionGuide
          onCalculated={(data) => {
            setVizSpecies(data.species);
            setVizDailyCalories(data.dailyCalories);
            setVizMealsPerDay(data.mealsPerDay);
            // Smooth-scroll user to the visualizer for continuity
            const el = document.querySelector('#portion-visualizer');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
        {/* New: Portion Visualizer and BCS Guide */}
        <PortionVisualizer
          species={vizSpecies}
          dailyCalories={vizDailyCalories}
          mealsPerDay={vizMealsPerDay}
        />
        <BodyConditionScore />
        <AboutUs />
        <FAQ />
        <StoreLocator />
      </main>

      {/* Mobile-only Scroll to Top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="md:hidden fixed bottom-20 right-4 z-50 px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 font-semibold"
        >
          Top
        </button>
      )}

      <ChatBot />
      <Footer />
      <PetQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Fallback to hide splash in case the SplashScreen onFinish doesn't fire
    const t = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <CookieGate>
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
      {!showSplash && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-recipe" element={<QuizPage />} />
          <Route path="/start-journey" element={<JourneyPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      )}
    </CookieGate>
  );
}

export default App;