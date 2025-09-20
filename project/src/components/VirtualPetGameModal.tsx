import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Virtual Pet Care Game Modal
// - Users adopt a virtual pet (dog or cat)
// - Keep stats balanced via actions: Feed, Exercise, Play, Rest
// - Healthy choices improve health/strength/happiness; junk makes pet sluggish

export type VirtualPetGameModalProps = {
  open: boolean;
  onClose: () => void;
};

type PetType = 'Dog' | 'Cat';

type PetState = {
  name: string;
  type: PetType;
  // Stats range 0..100
  satiety: number; // how full the pet is (higher = less hungry)
  energy: number;
  happiness: number;
  health: number;
  strength: number; // fitness
};

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

const StatBar: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => {
  const pct = clamp(value);
  const barColor = color || (pct > 66 ? 'bg-emerald-500' : pct > 33 ? 'bg-yellow-500' : 'bg-red-500');
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div className={`h-2 ${barColor} rounded`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const VirtualPetGameModal: React.FC<VirtualPetGameModalProps> = ({ open, onClose }) => {
  const [started, setStarted] = useState(false);
  const [petType, setPetType] = useState<PetType>('Dog');
  const [petName, setPetName] = useState('Buddy');
  const [pet, setPet] = useState<PetState | null>(null);
  const [message, setMessage] = useState<string>('');
  const [tipsOpen, setTipsOpen] = useState(true);
  const lastExerciseRef = useRef<number>(Date.now());

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setStarted(false);
      setPet(null);
      setMessage('');
      setTipsOpen(true);
      setPetType('Dog');
      setPetName('Buddy');
    }
  }, [open]);

  // Initialize pet when starting
  const startGame = () => {
    const initial: PetState = {
      name: petName.trim() || (petType === 'Cat' ? 'Whiskers' : 'Buddy'),
      type: petType,
      satiety: 60,
      energy: 70,
      happiness: 70,
      health: 70,
      strength: 50,
    };
    setPet(initial);
    setStarted(true);
    setMessage(`You adopted ${initial.name} the ${initial.type}! Keep them healthy and happy!`);
    lastExerciseRef.current = Date.now();
  };

  // Passive stat changes every few seconds
  useEffect(() => {
    if (!open || !started || !pet) return;
    const interval = setInterval(() => {
      setPet((prev) => {
        if (!prev) return prev;
        const now = Date.now();
        const secondsSinceExercise = (now - lastExerciseRef.current) / 1000;

        let satiety = clamp(prev.satiety - 4);
        let energy = clamp(prev.energy - 2);
        let happiness = clamp(prev.happiness - (satiety < 30 || energy < 30 ? 3 : 1));
        let health = clamp(prev.health - (satiety < 20 ? 1 : 0));
        let strength = prev.strength;

        if (secondsSinceExercise > 60) {
          strength = clamp(strength - 1);
        }

        return { ...prev, satiety, energy, happiness, health, strength };
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [open, started, pet]);

  // Derived state warnings
  const warnings = useMemo(() => {
    if (!pet) return [] as string[];
    const w: string[] = [];
    if (pet.satiety < 25) w.push(`${pet.name} is very hungry! Feed a balanced meal.`);
    if (pet.energy < 25) w.push(`${pet.name} is low on energy. Time to rest.`);
    if (pet.health < 30) w.push(`${pet.name} isn't feeling well. Choose healthy food and gentle rest.`);
    if (pet.happiness < 25) w.push(`${pet.name} seems sad. Try playtime or a walk.`);
    return w;
  }, [pet]);

  if (!open) return null;

  const doAction = (type: 'HEALTHY_FOOD' | 'JUNK_TREAT' | 'EXERCISE' | 'PLAY' | 'REST') => {
    if (!pet) return;
    let { satiety, energy, happiness, health, strength } = pet;

    const apply = () => setPet({ ...pet, satiety: clamp(satiety), energy: clamp(energy), happiness: clamp(happiness), health: clamp(health), strength: clamp(strength) });

    switch (type) {
      case 'HEALTHY_FOOD': {
        satiety += 25; health += 10; happiness += 5; strength += 5;
        setMessage('Great choice! Balanced nutrition boosts health, strength, and mood.');
        apply();
        break;
      }
      case 'JUNK_TREAT': {
        satiety += 10; happiness += 8; health -= 8; energy -= 5;
        setMessage('Treats are okay sometimes, but too many can make pets sluggish.');
        apply();
        break;
      }
      case 'EXERCISE': {
        if (health < 25 || energy < 20) {
          setMessage("Your pet isn't fit for intense exercise. Try REST or HEALTHY FOOD first.");
          return;
        }
        strength += 10; happiness += 5; energy -= 15; satiety -= 10; health += 2;
        lastExerciseRef.current = Date.now();
        setMessage('Exercise builds strength and happiness! Remember to refuel.');
        apply();
        break;
      }
      case 'PLAY': {
        happiness += 12; energy -= 10; satiety -= 5;
        setMessage('Playtime strengthens your bond and lifts mood.');
        apply();
        break;
      }
      case 'REST': {
        energy += 20; health += 5; happiness += 2;
        setMessage('Rest helps recovery. Balance activity with downtime.');
        apply();
        break;
      }
    }
  };

  const resetGame = () => {
    setStarted(false);
    setPet(null);
    setMessage('');
    setPetName('Buddy');
    setPetType('Dog');
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl border">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 bg-white/95 backdrop-blur">
          <h3 className="text-xl font-semibold">Virtual Pet Care Game</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">✕</button>
        </div>

        {!started && (
          <div className="px-6 py-5 space-y-4">
            <p className="text-gray-700">Adopt a virtual pet and learn how healthy choices impact wellbeing.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pet name</label>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pet type</label>
                <div className="flex gap-2">
                  {(['Dog', 'Cat'] as const).map((t) => (
                    <button key={t} onClick={() => setPetType(t)} className={`px-3 py-2 rounded border ${petType === t ? 'bg-blue-600 text-white border-blue-600' : ''}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={startGame} className="px-4 py-2 rounded bg-blue-600 text-white">Start</button>
            </div>
          </div>
        )}

        {started && pet && (
          <div className="px-6 py-5 space-y-5">
            {/* Pet header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center text-4xl select-none" aria-hidden>
                {pet.type === 'Dog' ? '🐶' : '🐱'}
              </div>
              <div>
                <div className="text-lg font-semibold">{pet.name} the {pet.type}</div>
                <div className="text-sm text-gray-500">Keep stats balanced: Satiety, Energy, Happiness, Health, Strength</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <StatBar label="Satiety" value={pet.satiety} />
              <StatBar label="Energy" value={pet.energy} />
              <StatBar label="Happiness" value={pet.happiness} />
              <StatBar label="Health" value={pet.health} />
              <StatBar label="Strength" value={pet.strength} />
            </div>

            {/* Actions */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button onClick={() => doAction('HEALTHY_FOOD')} className="rounded border px-3 py-2 text-left hover:bg-emerald-50">
                <div className="font-medium">Healthy Food 🥦</div>
                <div className="text-xs text-gray-600">+Satiety, +Health, +Strength, +Happiness</div>
              </button>
              <button onClick={() => doAction('JUNK_TREAT')} className="rounded border px-3 py-2 text-left hover:bg-yellow-50">
                <div className="font-medium">Junk Treat 🍩</div>
                <div className="text-xs text-gray-600">Quick joy, but -Health and -Energy</div>
              </button>
              <button onClick={() => doAction('EXERCISE')} className="rounded border px-3 py-2 text-left hover:bg-blue-50">
                <div className="font-medium">Exercise 🏃</div>
                <div className="text-xs text-gray-600">+Strength, +Happiness, uses Energy & Satiety</div>
              </button>
              <button onClick={() => doAction('PLAY')} className="rounded border px-3 py-2 text-left hover:bg-pink-50">
                <div className="font-medium">Play 🎾</div>
                <div className="text-xs text-gray-600">Big mood boost; uses some Energy & Satiety</div>
              </button>
              <button onClick={() => doAction('REST')} className="rounded border px-3 py-2 text-left hover:bg-purple-50 sm:col-span-2">
                <div className="font-medium">Rest 😴</div>
                <div className="text-xs text-gray-600">Restore Energy and Health</div>
              </button>
              <button onClick={resetGame} className="rounded border px-3 py-2 text-left hover:bg-gray-50">
                <div className="font-medium">Reset</div>
                <div className="text-xs text-gray-600">Adopt again from scratch</div>
              </button>
            </div>

            {/* Messages */}
            {message && (
              <div className="rounded border bg-white px-3 py-2 text-sm">{message}</div>
            )}
            {warnings.length > 0 && (
              <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Educational tips */}
            <div className="rounded border">
              <button className="w-full flex justify-between items-center px-3 py-2 text-left text-sm" onClick={() => setTipsOpen((v) => !v)}>
                <span className="font-medium">Nutrition Tips</span>
                <span className="text-gray-500">{tipsOpen ? '–' : '+'}</span>
              </button>
              {tipsOpen && (
                <div className="px-3 pb-3 text-sm text-gray-700 space-y-1">
                  <p>• Balanced diets with quality protein support muscle and overall health.</p>
                  <p>• Occasional treats are fine, but too many can reduce energy and wellbeing.</p>
                  <p>• Regular exercise plus rest keeps pets fit, happy, and resilient.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default VirtualPetGameModal;