import React, { useEffect, useMemo, useRef, useState } from 'react';

// Simple store type
export type Store = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
};

// Demo data — replace with real locations when available
const STORES: Store[] = [
  {
    id: 'mumbai-01',
    name: 'Tinku & Co. - Mumbai Pet Mart',
    address: '12 Marine Drive',
    city: 'Mumbai',
    state: 'MH',
    postalCode: '400001',
    phone: '+91 22 1234 5678',
    hours: 'Mon–Sat 10:00–20:00',
    lat: 18.9387711,
    lng: 72.8265238,
  },
  {
    id: 'pune-01',
    name: 'Tinku & Co. - Pune Pet Care',
    address: 'MG Road 28',
    city: 'Pune',
    state: 'MH',
    postalCode: '411001',
    phone: '+91 20 2345 6789',
    hours: 'Daily 10:00–21:00',
    lat: 18.516726,
    lng: 73.856255,
  },
  {
    id: 'bangalore-01',
    name: 'Tinku & Co. - Bangalore Pet Hub',
    address: 'Indiranagar 12th Main',
    city: 'Bengaluru',
    state: 'KA',
    postalCode: '560038',
    phone: '+91 80 9876 5432',
    hours: 'Mon–Sun 09:30–21:30',
    lat: 12.971599,
    lng: 77.594566,
  },
  {
    id: 'delhi-01',
    name: 'Tinku & Co. - Delhi Pet World',
    address: 'Connaught Place',
    city: 'New Delhi',
    state: 'DL',
    postalCode: '110001',
    lat: 28.613939,
    lng: 77.209023,
  },
  {
    id: 'hyderabad-01',
    name: 'Tinku & Co. - Hyderabad Pets',
    address: 'Banjara Hills Rd 2',
    city: 'Hyderabad',
    state: 'TS',
    postalCode: '500034',
    lat: 17.385044,
    lng: 78.486671,
  },
  {
    id: 'chennai-01',
    name: 'Tinku & Co. - Chennai Paws',
    address: 'T Nagar',
    city: 'Chennai',
    state: 'TN',
    postalCode: '600017',
    lat: 13.08268,
    lng: 80.270718,
  },
];

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export default function StoreLocator() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Accessibility tools
  const [fontScale, setFontScale] = useState<number>(1); // 1rem base
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Keyboard navigation state
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = STORES.filter((s) =>
      !q
        ? true
        : [s.name, s.address, s.city, s.state, s.postalCode]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
    );

    if (userPos) {
      items = items
        .map((s) => ({ s, d: distanceKm(userPos, { lat: s.lat, lng: s.lng }) }))
        .sort((a, b) => a.d - b.d)
        .map((x) => x.s);
    }

    return items;
  }, [query, userPos]);

  const selectedStore = useMemo(() => {
    return filtered.find((s) => s.id === selectedId) || filtered[0] || STORES[0];
  }, [filtered, selectedId]);

  // Keep activeIndex in range when list changes
  useEffect(() => {
    if (filtered.length === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((idx) => Math.min(idx, filtered.length - 1));
  }, [filtered.length]);

  useEffect(() => {
    // If filter changes and selected goes out of view, reset to top result
    if (!selectedStore) return;
    if (!filtered.some((s) => s.id === selectedStore.id)) {
      setSelectedId(filtered[0]?.id ?? null);
      setActiveIndex(0);
    }
  }, [filtered, selectedStore]);

  const requestLocation = () => {
    setGeoError(null);
    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setGeoError(err.message || 'Unable to get your location.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Build a Google Maps embed URL — no API key required
  const mapSrc = useMemo(() => {
    const center = selectedStore
      ? `${selectedStore.lat},${selectedStore.lng}`
      : userPos
      ? `${userPos.lat},${userPos.lng}`
      : '20.5937,78.9629'; // India center fallback
    // z = zoom (12–15 is city level)
    return `https://www.google.com/maps?q=${encodeURIComponent(center)}&z=13&output=embed`;
  }, [selectedStore, userPos]);

  // Keyboard navigation for listbox
  const handleListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (activeIndex + 1) % filtered.length;
      setActiveIndex(next);
      setSelectedId(filtered[next].id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (activeIndex - 1 + filtered.length) % filtered.length;
      setActiveIndex(prev);
      setSelectedId(filtered[prev].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      setSelectedId(filtered[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = filtered.length - 1;
      setActiveIndex(last);
      setSelectedId(filtered[last].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const cur = filtered[activeIndex];
      if (cur) setSelectedId(cur.id);
    }
  };

  const activeOptionId = filtered[activeIndex]?.id
    ? `store-option-${filtered[activeIndex].id}`
    : undefined;

  const increaseFont = () => setFontScale((v) => Math.min(1.5, parseFloat((v + 0.125).toFixed(3))));
  const decreaseFont = () => setFontScale((v) => Math.max(0.875, parseFloat((v - 0.125).toFixed(3))));
  const resetFont = () => setFontScale(1);

  // Helper to apply high-contrast variants
  const textPrimary = highContrast ? 'text-black' : 'text-gray-900';
  const textSecondary = highContrast ? 'text-black' : 'text-gray-700';
  const textMuted = highContrast ? 'text-black' : 'text-gray-600';
  const borderColor = highContrast ? 'border-black' : 'border-gray-300';
  const borderColorSoft = highContrast ? 'border-black' : 'border-gray-200';
  const listActiveBg = highContrast ? 'bg-yellow-200' : 'bg-blue-50';
  const primaryBtn = highContrast
    ? 'bg-black text-white border-black hover:bg-black'
    : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700';
  const secondaryBtn = highContrast
    ? 'bg-white text-black border-black hover:bg-gray-100'
    : 'bg-white text-blue-700 border-blue-600';

  return (
    <section
      id="store-locator"
      className="bg-white"
      style={{ fontSize: `${fontScale}rem` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Accessibility toolbar */}
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2" aria-label="Accessibility controls">
          <div className={`flex items-center gap-2 ${textSecondary}`}>
            <label htmlFor="hc-toggle" className="text-sm">High contrast</label>
            <input
              id="hc-toggle"
              type="checkbox"
              aria-label="Toggle high contrast mode"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
            />
          </div>
          <div className="flex items-center gap-1" aria-label="Font size controls">
            <button
              type="button"
              onClick={decreaseFont}
              className={`rounded-md px-2 py-1 text-sm font-medium border ${borderColor} ${textPrimary}`}
              aria-label="Decrease font size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={resetFont}
              className={`rounded-md px-2 py-1 text-sm font-medium border ${borderColor} ${textPrimary}`}
              aria-label="Reset font size"
            >
              A
            </button>
            <button
              type="button"
              onClick={increaseFont}
              className={`rounded-md px-2 py-1 text-sm font-medium border ${borderColor} ${textPrimary}`}
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${textPrimary}`}>
            Find a Store Near You
          </h2>
          <p className={`mt-2 ${textMuted}`}>
            Search by city, ZIP, or store name. Use your location to sort by distance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Map */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="w-full h-[360px] sm:h-[420px] overflow-hidden rounded-xl shadow">
              <iframe
                title="Store map"
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing selected store location"
              />
            </div>
            {selectedStore && (
              <div className={`mt-3 text-sm ${textMuted}`}>
                Viewing: <span className={`font-semibold ${textPrimary}`}>{selectedStore.name}</span>{' '}
                — {selectedStore.address}, {selectedStore.city}
                {selectedStore.postalCode ? ` ${selectedStore.postalCode}` : ''}
                <a
                  className={`ml-2 underline ${highContrast ? 'text-black' : 'text-blue-600'} hover:underline`}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${selectedStore.lat},${selectedStore.lng}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </div>
            )}
          </div>

          {/* Right: Search + List */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' && filtered.length > 0) {
                    e.preventDefault();
                    setActiveIndex(0);
                    setSelectedId(filtered[0].id);
                    listRef.current?.focus();
                  }
                }}
                placeholder="Search by city, ZIP, or store name"
                className={`flex-1 rounded-lg border ${borderColor} px-4 py-2 focus:outline-none focus:ring-2 ${
                  highContrast ? 'focus:ring-black' : 'focus:ring-blue-500'
                }`}
                aria-label="Search stores"
              />
              <button
                onClick={requestLocation}
                className={`shrink-0 rounded-lg px-4 py-2 font-semibold border ${primaryBtn}`}
                type="button"
              >
                Use my location
              </button>
            </div>
            {geoError && <p className={`mt-2 text-sm ${highContrast ? 'text-red-800' : 'text-red-600'}`}>{geoError}</p>}

            <ul
              className={`mt-4 divide-y ${borderColorSoft} rounded-lg border ${borderColorSoft} overflow-hidden bg-white`}
              role="listbox"
              aria-label="Stores list"
              aria-activedescendant={activeOptionId}
              tabIndex={0}
              onKeyDown={handleListKeyDown}
              ref={listRef}
            >
              {filtered.length === 0 && (
                <li className={`p-4 ${textMuted}`}>No stores found. Try a different search.</li>
              )}
              {filtered.map((s, idx) => {
                const dist = userPos ? distanceKm(userPos, { lat: s.lat, lng: s.lng }) : null;
                const isActive = s.id === selectedStore?.id;
                const isFocused = idx === activeIndex;
                const optionId = `store-option-${s.id}`;
                return (
                  <li
                    id={optionId}
                    key={s.id}
                    role="option"
                    aria-selected={isActive}
                    className={`p-4 outline-none ${isFocused ? listActiveBg : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className={`font-semibold ${textPrimary}`}>{s.name}</div>
                        <div className={`text-sm ${textSecondary}`}>
                          {s.address}, {s.city} {s.postalCode}
                        </div>
                        {s.phone && <div className={`text-sm ${textMuted}`}>{s.phone}</div>}
                        {s.hours && <div className={`text-sm ${textMuted}`}>Hours: {s.hours}</div>}
                        {dist !== null && (
                          <div className={`text-xs ${textMuted} mt-1`}>~{dist.toFixed(1)} km away</div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          className={`rounded-md px-3 py-2 text-sm font-medium border ${
                            isActive
                              ? primaryBtn
                              : `border ${borderColor} ${secondaryBtn}`
                          }`}
                          onClick={() => {
                            setSelectedId(s.id);
                            setActiveIndex(idx);
                          }}
                          type="button"
                        >
                          {isActive ? 'Selected' : 'View on map'}
                        </button>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            `${s.lat},${s.lng}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className={`rounded-md px-3 py-2 text-sm font-medium border ${borderColor} ${
                            highContrast ? 'text-black hover:bg-gray-100' : 'text-gray-700 hover:bg-gray-50'
                          } text-center`}
                        >
                          Directions
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className={`mt-3 text-xs ${textMuted}`}>
              Map provided via Google Maps embed. Location only requested when you press "Use my location".
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}