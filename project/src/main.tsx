import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Minimal, dependency-free scroll reveal using IntersectionObserver
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal-up, .reveal-fade');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target); // Unobserve after reveal for performance
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Root() {
  useReveal();
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
