
import React from 'react';

export const COLORS = {
  forest: '#064e3b',
  moss: '#3f6212',
  parchment: '#fefce8',
  stone: '#44403c',
};

export const BUDDHIST_SYMBOLS = {
  wheel: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  sun: (
    <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s-.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s-.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  ),
  lotus: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,22C12,22 17,18 17,12C17,9 15,7 12,7C9,7 7,9 7,12C7,18 12,22 12,22M12,5C10.5,5 9.1,5.5 8,6.3C8,4.5 9.8,3 12,3C14.2,3 16,4.5 16,6.3C14.9,5.5 13.5,5 12,5Z" />
    </svg>
  ),
  fullMoon: (
    <svg className="w-10 h-10 drop-shadow-sm opacity-80" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  ),
  newMoon: (
    <svg className="w-10 h-10 drop-shadow-sm opacity-80" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#d1fae5" /> {/* Very light emerald */}
    </svg>
  ),
  halfMoonRight: (
    <svg className="w-10 h-10 drop-shadow-sm opacity-80" viewBox="0 0 100 100">
      <path d="M50 5 A45 45 0 0 0 50 95 Z" fill="#d1fae5" /> {/* Left (Dark/Sukka Uposatha Color) */}
      <path d="M50 5 A45 45 0 0 1 50 95 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" /> {/* Right (Light) */}
    </svg>
  ),
  halfMoonLeft: (
    <svg className="w-10 h-10 drop-shadow-sm opacity-80" viewBox="0 0 100 100">
      <path d="M50 5 A45 45 0 0 0 50 95 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" /> {/* Left (Light) */}
      <path d="M50 5 A45 45 0 0 1 50 95 Z" fill="#d1fae5" /> {/* Right (Dark/Sukka Uposatha Color) */}
    </svg>
  )
};
