// ===== CHARACTERS =====
const CHARS = {
  boy: (c='#3498db') => `<svg viewBox="0 0 60 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="18" r="13" fill="#FDBCB4"/>
    <rect x="14" y="30" width="32" height="30" rx="4" fill="${c}"/>
    <rect x="10" y="34" width="10" height="22" rx="5" fill="${c}"/>
    <rect x="40" y="34" width="10" height="22" rx="5" fill="${c}"/>
    <rect x="18" y="59" width="10" height="20" rx="5" fill="#2c3e50"/>
    <rect x="32" y="59" width="10" height="20" rx="5" fill="#2c3e50"/>
    <circle cx="25" cy="17" r="2.2" fill="#2c3e50"/>
    <circle cx="35" cy="17" r="2.2" fill="#2c3e50"/>
    <path d="M25 24 Q30 28 35 24" stroke="#c0392b" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M20 8 Q30 2 40 8 Q38 3 30 2 Q22 3 20 8Z" fill="#2c3e50"/>
    <path d="M22 25 L18 26 M22 26.5 L17 27 M22 28 L18 29" stroke="#FDBCB4" stroke-width="0.8"/>
  </svg>`,

  girl: (c='#e74c3c') => `<svg viewBox="0 0 60 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="18" r="13" fill="#FDBCB4"/>
    <path d="M17 6 Q30 0 43 6 Q42 2 30 1 Q18 2 17 6Z" fill="#5D3317"/>
    <path d="M17 6 Q10 14 16 22 Q24 10 30 32 Q36 10 44 22 Q50 14 43 6 Q36 2 30 1 Q24 2 17 6Z" fill="#8B5E3C"/>
    <path d="M14 30 Q30 26 46 30 L50 64 Q30 70 10 64Z" fill="${c}"/>
    <path d="M10 36 Q5 40 8 52 Q14 57 18 52 Q14 44 10 36Z" fill="${c}"/>
    <path d="M50 36 Q55 40 52 52 Q46 57 42 52 Q46 44 50 36Z" fill="${c}"/>
    <rect x="18" y="62" width="10" height="22" rx="5" fill="#2c3e50"/>
    <rect x="32" y="62" width="10" height="22" rx="5" fill="#2c3e50"/>
    <circle cx="25" cy="17" r="2.2" fill="#2c3e50"/>
    <circle cx="35" cy="17" r="2.2" fill="#2c3e50"/>
    <path d="M25 24 Q30 28 35 24" stroke="#c0392b" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="22" cy="21" r="2.5" fill="#ffb3ba" opacity="0.6"/>
    <circle cx="38" cy="21" r="2.5" fill="#ffb3ba" opacity="0.6"/>
  </svg>`,

  teacher: (c='#2ecc71') => `<svg viewBox="0 0 60 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="16" r="12" fill="#FDBCB4"/>
    <rect x="13" y="28" width="34" height="34" rx="4" fill="${c}"/>
    <rect x="8" y="32" width="11" height="24" rx="5" fill="${c}"/>
    <rect x="41" y="32" width="11" height="24" rx="5" fill="${c}"/>
    <rect x="17" y="61" width="11" height="24" rx="5" fill="#34495e"/>
    <rect x="32" y="61" width="11" height="24" rx="5" fill="#34495e"/>
    <circle cx="25" cy="15" r="2" fill="#2c3e50"/>
    <circle cx="35" cy="15" r="2" fill="#2c3e50"/>
    <path d="M25 22 Q30 26 35 22" stroke="#2c3e50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M22 4 Q30 0 38 4 Q36 1 30 0 Q24 1 22 4Z" fill="#4a3728"/>
    <rect x="27" y="4" width="6" height="10" rx="3" fill="#f39c12"/>
    <circle cx="30" cy="4" r="3.5" fill="#f1c40f"/>
    <rect x="44" y="38" width="8" height="6" rx="1" fill="white" opacity="0.9"/>
    <line x1="45" y1="40" x2="51" y2="40" stroke="${c}" stroke-width="0.8"/>
    <line x1="45" y1="42" x2="49" y2="42" stroke="${c}" stroke-width="0.8"/>
    <path d="M42 44 L46 44" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  cat: () => `<svg viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="50" rx="18" ry="20" fill="#f39c12"/>
    <circle cx="30" cy="24" r="16" fill="#f39c12"/>
    <polygon points="16,12 8,0 24,9" fill="#e67e22"/>
    <polygon points="44,12 52,0 36,9" fill="#e67e22"/>
    <polygon points="16,12 8,0 24,9" fill="#f8c46a" opacity="0.5"/>
    <polygon points="44,12 52,0 36,9" fill="#f8c46a" opacity="0.5"/>
    <circle cx="24" cy="21" r="3.5" fill="#1a1a2e"/>
    <circle cx="36" cy="21" r="3.5" fill="#1a1a2e"/>
    <circle cx="25" cy="20" r="1.2" fill="white"/>
    <circle cx="37" cy="20" r="1.2" fill="white"/>
    <ellipse cx="30" cy="28" rx="4" ry="3" fill="#e8a090"/>
    <path d="M19 30 L13 28 M19 31.5 L12 31.5 M19 33 L13 34" stroke="#333" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M41 30 L47 28 M41 31.5 L48 31.5 M41 33 L47 34" stroke="#333" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M26 31 Q30 35 34 31" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M44 58 Q54 52 56 42" stroke="#f39c12" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <rect x="22" y="42" width="16" height="12" rx="2" fill="#e67e22" opacity="0.4"/>
  </svg>`,

  dog: () => `<svg viewBox="0 0 66 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="48" rx="18" ry="20" fill="#C68642"/>
    <circle cx="32" cy="24" r="15" fill="#C68642"/>
    <ellipse cx="18" cy="26" rx="7" ry="12" fill="#A0522D" transform="rotate(-12 18 26)"/>
    <ellipse cx="46" cy="26" rx="7" ry="12" fill="#A0522D" transform="rotate(12 46 26)"/>
    <circle cx="26" cy="20" r="3.2" fill="#1a1a2e"/>
    <circle cx="38" cy="20" r="3.2" fill="#1a1a2e"/>
    <circle cx="27" cy="19" r="1.1" fill="white"/>
    <circle cx="39" cy="19" r="1.1" fill="white"/>
    <ellipse cx="32" cy="30" rx="7" ry="5" fill="#A0522D"/>
    <circle cx="32" cy="31" r="3.5" fill="#c0392b"/>
    <path d="M20 32 L15 30 M20 33.5 L14 33.5" stroke="#333" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M44 32 L49 30 M44 33.5 L50 33.5" stroke="#333" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M50 56 Q60 48 58 38" stroke="#C68642" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  </svg>`,

  robot: () => `<svg viewBox="0 0 62 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="8" width="30" height="27" rx="5" fill="#7f8c8d"/>
    <rect x="21" y="16" width="9" height="7" rx="2" fill="#3498db"/>
    <rect x="32" y="16" width="9" height="7" rx="2" fill="#3498db"/>
    <circle cx="25.5" cy="19.5" r="2" fill="white" opacity="0.7"/>
    <circle cx="36.5" cy="19.5" r="2" fill="white" opacity="0.7"/>
    <rect x="24" y="28" width="14" height="3" rx="1.5" fill="#2c3e50"/>
    <rect x="27" y="4" width="8" height="7" rx="2" fill="#95a5a6"/>
    <circle cx="31" cy="4" r="3.5" fill="#e74c3c"/>
    <rect x="11" y="34" width="40" height="30" rx="5" fill="#95a5a6"/>
    <rect x="1" y="36" width="12" height="22" rx="5" fill="#7f8c8d"/>
    <rect x="49" y="36" width="12" height="22" rx="5" fill="#7f8c8d"/>
    <rect x="17" y="63" width="11" height="18" rx="4" fill="#7f8c8d"/>
    <rect x="34" y="63" width="11" height="18" rx="4" fill="#7f8c8d"/>
    <rect x="15" y="39" width="10" height="10" rx="2" fill="#e74c3c" opacity="0.85"/>
    <rect x="37" y="39" width="10" height="10" rx="2" fill="#2ecc71" opacity="0.85"/>
    <rect x="25" y="52" width="12" height="3.5" rx="1.5" fill="#2c3e50"/>
    <line x1="17" y1="55" x2="17" y2="62" stroke="#636e72" stroke-width="1.5"/>
    <line x1="45" y1="55" x2="45" y2="62" stroke="#636e72" stroke-width="1.5"/>
  </svg>`,

  bird: () => `<svg viewBox="0 0 56 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="28" cy="36" rx="16" ry="18" fill="#e74c3c"/>
    <circle cx="28" cy="18" r="13" fill="#e74c3c"/>
    <ellipse cx="18" cy="20" rx="9" ry="5" fill="#c0392b" transform="rotate(-30 18 20)"/>
    <ellipse cx="38" cy="20" rx="9" ry="5" fill="#c0392b" transform="rotate(30 38 20)"/>
    <circle cx="23" cy="15" r="3" fill="white"/>
    <circle cx="33" cy="15" r="3" fill="white"/>
    <circle cx="24" cy="15" r="1.5" fill="#1a1a2e"/>
    <circle cx="34" cy="15" r="1.5" fill="#1a1a2e"/>
    <path d="M22 20 L28 18 L34 20 L30 24 L28 22 L26 24Z" fill="#f39c12"/>
    <path d="M16 48 L12 56 M20 50 L18 57 M36 50 L38 57 M40 48 L44 56" stroke="#e74c3c" stroke-width="3" stroke-linecap="round"/>
  </svg>`
};

const CHAR_LIST = [
  { key: 'boy', label: 'Boy', colors: ['#3498db','#e74c3c','#2ecc71','#9b59b6','#e67e22'] },
  { key: 'girl', label: 'Girl', colors: ['#e74c3c','#9b59b6','#3498db','#2ecc71','#f39c12'] },
  { key: 'teacher', label: 'Teacher', colors: ['#2ecc71','#3498db','#e74c3c','#34495e','#9b59b6'] },
  { key: 'cat', label: 'Cat', colors: [] },
  { key: 'dog', label: 'Dog', colors: [] },
  { key: 'robot', label: 'Robot', colors: [] },
  { key: 'bird', label: 'Bird', colors: [] }
];

// ===== BACKGROUNDS =====
const BGS = {
  classroom: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="140" fill="#e8f0e0"/>
    <rect x="0" y="0" width="200" height="32" fill="#6d4c1f"/>
    <rect x="8" y="4" width="82" height="25" rx="2" fill="white" opacity="0.95"/>
    <line x1="10" y1="14" x2="86" y2="14" stroke="#ccc" stroke-width="1"/>
    <line x1="10" y1="20" x2="70" y2="20" stroke="#ccc" stroke-width="1"/>
    <rect x="100" y="4" width="90" height="25" rx="2" fill="#fef9c3" opacity="0.95"/>
    <text x="108" y="18" font-size="8" fill="#555" font-family="serif">A B C D E F G</text>
    <rect x="0" y="98" width="200" height="42" fill="#8B6335"/>
    <rect x="8" y="86" width="32" height="22" rx="2" fill="#a0714a"/>
    <rect x="50" y="86" width="32" height="22" rx="2" fill="#a0714a"/>
    <rect x="92" y="86" width="32" height="22" rx="2" fill="#a0714a"/>
    <rect x="134" y="86" width="32" height="22" rx="2" fill="#a0714a"/>
    <rect x="0" y="32" width="200" height="66" fill="#f5ede2"/>
    <rect x="178" y="38" width="18" height="50" rx="2" fill="#4a90d9" opacity="0.5"/>
    <circle cx="178" cy="35" r="4" fill="#f1c40f"/>
  </svg>`,

  playground: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="140" fill="#87ceeb"/>
    <ellipse cx="35" cy="28" rx="28" ry="18" fill="white" opacity="0.75"/>
    <ellipse cx="90" cy="18" rx="34" ry="18" fill="white" opacity="0.65"/>
    <ellipse cx="160" cy="32" rx="20" ry="14" fill="white" opacity="0.7"/>
    <rect x="0" y="94" width="200" height="46" fill="#5ba83a"/>
    <rect x="0" y="88" width="200" height="10" fill="#4a9030"/>
    <rect x="20" y="54" width="8" height="44" fill="#8B5E3C"/>
    <rect x="62" y="54" width="8" height="44" fill="#8B5E3C"/>
    <line x1="24" y1="56" x2="66" y2="56" stroke="#8B5E3C" stroke-width="4"/>
    <rect x="28" y="70" width="32" height="5" rx="2" fill="#ff9800"/>
    <line x1="36" y1="75" x2="36" y2="56" stroke="#555" stroke-width="1.5"/>
    <line x1="52" y1="75" x2="52" y2="56" stroke="#555" stroke-width="1.5"/>
    <rect x="130" y="60" width="8" height="38" fill="#8B5E3C"/>
    <ellipse cx="134" cy="58" rx="16" ry="16" fill="none" stroke="#8B5E3C" stroke-width="3"/>
    <rect x="160" y="72" width="30" height="5" rx="2" fill="#3498db"/>
    <line x1="162" y1="77" x2="162" y2="60" stroke="#555" stroke-width="1.5"/>
    <line x1="188" y1="77" x2="188" y2="60" stroke="#555" stroke-width="1.5"/>
  </svg>`,

  home: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="140" fill="#c9e8fb"/>
    <rect x="0" y="90" width="200" height="50" fill="#7dba5c"/>
    <rect x="38" y="44" width="124" height="68" rx="2" fill="#ffe0b2"/>
    <polygon points="28,44 172,44 100,8" fill="#e57373"/>
    <polygon points="34,44 166,44 100,13" fill="#ef9a9a"/>
    <rect x="72" y="82" width="28" height="30" rx="2" fill="#8d6e52"/>
    <circle cx="98" cy="98" r="2.5" fill="#f1c40f"/>
    <rect x="48" y="58" width="32" height="24" rx="2" fill="#b3e5fc"/>
    <line x1="64" y1="58" x2="64" y2="82" stroke="#7ec8e3" stroke-width="1.5"/>
    <line x1="48" y1="70" x2="80" y2="70" stroke="#7ec8e3" stroke-width="1.5"/>
    <rect x="120" y="58" width="32" height="24" rx="2" fill="#b3e5fc"/>
    <line x1="136" y1="58" x2="136" y2="82" stroke="#7ec8e3" stroke-width="1.5"/>
    <line x1="120" y1="70" x2="152" y2="70" stroke="#7ec8e3" stroke-width="1.5"/>
    <rect x="0" y="106" width="38" height="34" fill="#7dba5c"/>
    <circle cx="18" cy="90" r="16" fill="#4caf50"/>
    <circle cx="12" cy="84" r="10" fill="#388e3c"/>
    <rect x="14" y="102" width="8" height="20" fill="#6d4c1f"/>
  </svg>`,

  forest: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="140" fill="#b5d5a0"/>
    <rect x="0" y="94" width="200" height="46" fill="#5ba83a"/>
    <polygon points="12,90 34,42 56,90" fill="#2e7d32"/>
    <polygon points="8,93 34,34 60,93" fill="#43a047"/>
    <polygon points="58,90 80,44 102,90" fill="#2e7d32"/>
    <polygon points="54,93 80,36 106,93" fill="#43a047"/>
    <polygon points="128,90 152,40 176,90" fill="#2e7d32"/>
    <polygon points="124,93 152,32 180,93" fill="#43a047"/>
    <rect x="26" y="86" width="16" height="20" fill="#6d4c1f"/>
    <rect x="72" y="86" width="16" height="20" fill="#6d4c1f"/>
    <rect x="144" y="86" width="16" height="20" fill="#6d4c1f"/>
    <circle cx="110" cy="32" r="22" fill="#fff9c4" opacity="0.85"/>
    <path d="M100 32 L110 24 L120 32" stroke="#f1c40f" stroke-width="2" fill="none"/>
    <ellipse cx="96" cy="110" rx="14" ry="4" fill="#8bc34a" opacity="0.6"/>
    <ellipse cx="158" cy="112" rx="10" ry="3" fill="#8bc34a" opacity="0.5"/>
  </svg>`,

  beach: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="105" fill="#87ceeb"/>
    <circle cx="165" cy="26" r="22" fill="#ffd54f"/>
    <rect x="0" y="96" width="200" height="44" fill="#f4d03f"/>
    <rect x="0" y="88" width="200" height="16" fill="#1e90ff" opacity="0.65"/>
    <ellipse cx="80" cy="94" rx="40" ry="6" fill="#5dade2" opacity="0.5"/>
    <rect x="18" y="52" width="8" height="52" fill="#8d6e52"/>
    <ellipse cx="18" cy="52" rx="22" ry="13" fill="#66bb6a"/>
    <ellipse cx="28" cy="46" rx="18" ry="11" fill="#4caf50"/>
    <ellipse cx="50" cy="110" rx="18" ry="4" fill="#f0c040" opacity="0.5"/>
    <ellipse cx="120" cy="108" rx="28" ry="5" fill="#f0c040" opacity="0.4"/>
    <path d="M60 88 Q80 78 100 88" stroke="white" stroke-width="2.5" fill="none" opacity="0.7"/>
    <path d="M100 84 Q120 74 140 84" stroke="white" stroke-width="2.5" fill="none" opacity="0.6"/>
  </svg>`,

  city: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="140" fill="#b0c4de"/>
    <rect x="0" y="102" width="200" height="38" fill="#888"/>
    <line x1="0" y1="102" x2="200" y2="102" stroke="#666" stroke-width="2.5"/>
    <rect x="4" y="50" width="32" height="56" fill="#607d8b"/>
    <rect x="44" y="34" width="36" height="72" fill="#78909c"/>
    <rect x="88" y="18" width="28" height="88" fill="#546e7a"/>
    <rect x="124" y="44" width="40" height="62" fill="#607d8b"/>
    <rect x="172" y="58" width="28" height="48" fill="#78909c"/>
    <rect x="92" y="12" width="20" height="10" rx="1" fill="#90a4ae"/>
    <rect x="9" y="58" width="7" height="9" fill="#b3e5fc" opacity="0.85"/>
    <rect x="20" y="58" width="7" height="9" fill="#b3e5fc" opacity="0.85"/>
    <rect x="9" y="72" width="7" height="9" fill="#b3e5fc" opacity="0.85"/>
    <rect x="49" y="44" width="7" height="9" fill="#b3e5fc" opacity="0.85"/>
    <rect x="62" y="44" width="7" height="9" fill="#b3e5fc" opacity="0.85"/>
    <rect x="92" y="28" width="6" height="8" fill="#b3e5fc" opacity="0.85"/>
    <rect x="92" y="44" width="6" height="8" fill="#b3e5fc" opacity="0.85"/>
    <rect x="103" y="36" width="6" height="8" fill="#b3e5fc" opacity="0.85"/>
    <rect x="128" y="54" width="8" height="10" fill="#b3e5fc" opacity="0.85"/>
    <rect x="146" y="54" width="8" height="10" fill="#b3e5fc" opacity="0.85"/>
    <rect x="0" y="96" width="200" height="8" fill="#9e9e9e"/>
    <rect x="20" y="96" width="16" height="8" fill="#ffeb3b" opacity="0.7"/>
    <rect x="100" y="96" width="16" height="8" fill="#ffeb3b" opacity="0.7"/>
    <rect x="170" y="96" width="16" height="8" fill="#ffeb3b" opacity="0.7"/>
  </svg>`
};

const BG_LIST = [
  { key: 'classroom', label: 'Classroom' },
  { key: 'playground', label: 'Playground' },
  { key: 'home', label: 'Home' },
  { key: 'forest', label: 'Forest' },
  { key: 'beach', label: 'Beach' },
  { key: 'city', label: 'City' }
];

// ===== OBJECTS / PROPS =====
const OBJS = {
  book: `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="36" height="28" rx="3" fill="#e74c3c"/>
    <rect x="7" y="10" width="30" height="24" rx="2" fill="white"/>
    <line x1="22" y1="10" x2="22" y2="34" stroke="#e74c3c" stroke-width="1.5"/>
    <line x1="10" y1="16" x2="21" y2="16" stroke="#ccc" stroke-width="1.2"/>
    <line x1="10" y1="20" x2="21" y2="20" stroke="#ccc" stroke-width="1.2"/>
    <line x1="10" y1="24" x2="21" y2="24" stroke="#ccc" stroke-width="1.2"/>
    <line x1="10" y1="28" x2="18" y2="28" stroke="#ccc" stroke-width="1.2"/>
    <line x1="23" y1="16" x2="34" y2="16" stroke="#ccc" stroke-width="1.2"/>
    <line x1="23" y1="20" x2="34" y2="20" stroke="#ccc" stroke-width="1.2"/>
  </svg>`,

  apple: `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="26" rx="14" ry="14" fill="#e74c3c"/>
    <path d="M22 12 Q24 6 29 8" stroke="#4caf50" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M18 10 Q16 7 14 9" stroke="#4caf50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="15" cy="22" rx="4" ry="5.5" fill="rgba(255,255,255,0.28)" transform="rotate(-18 15 22)"/>
    <path d="M12 28 Q15 38 22 40 Q10 38 12 28Z" fill="#c0392b" opacity="0.3"/>
  </svg>`,

  star: `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="22,4 26,16 39,16 29,23 32,36 22,28 12,36 15,23 5,16 18,16" fill="#f1c40f" stroke="#e67e22" stroke-width="1.2"/>
    <polygon points="22,8 25.5,17.5 36,17.5 27.5,23 30.5,33 22,26.5 13.5,33 16.5,23 8,17.5 18.5,17.5" fill="#f9e44a" opacity="0.5"/>
  </svg>`,

  ball: `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="18" fill="#e74c3c"/>
    <path d="M10 14 Q22 10 34 14" stroke="white" stroke-width="2" fill="none"/>
    <path d="M8 22 Q22 17 36 22" stroke="white" stroke-width="2" fill="none"/>
    <path d="M10 30 Q22 26 34 30" stroke="white" stroke-width="2" fill="none"/>
    <circle cx="22" cy="22" r="18" fill="none" stroke="#c0392b" stroke-width="1.5" opacity="0.4"/>
  </svg>`,

  desk: `<svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="16" width="52" height="8" rx="2" fill="#a0714a"/>
    <rect x="8" y="24" width="6" height="24" rx="2" fill="#8B5E3C"/>
    <rect x="46" y="24" width="6" height="24" rx="2" fill="#8B5E3C"/>
    <rect x="8" y="10" width="36" height="8" rx="1" fill="#c9915e" opacity="0.6"/>
  </svg>`,

  trophy: `<svg viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6 Q10 28 22 32 Q34 28 34 6Z" fill="#f1c40f"/>
    <path d="M10 6 L4 6 Q4 20 10 24" stroke="#f1c40f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M34 6 L40 6 Q40 20 34 24" stroke="#f1c40f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="18" y="32" width="8" height="8" rx="1" fill="#e67e22"/>
    <rect x="12" y="40" width="20" height="6" rx="2" fill="#e67e22"/>
    <path d="M15 16 L22 10 L29 16 L27 24 L22 26 L17 24Z" fill="#fff9c4" opacity="0.5"/>
  </svg>`
};

const OBJ_LIST = [
  { key: 'book', label: 'Book' },
  { key: 'apple', label: 'Apple' },
  { key: 'star', label: 'Star' },
  { key: 'ball', label: 'Ball' },
  { key: 'desk', label: 'Desk' },
  { key: 'trophy', label: 'Trophy' }
];

const BUBBLE_COLORS = [
  '#ffffff', '#fff9c4', '#e8f4f8', '#fde8e8',
  '#e8fde8', '#f0e8fd', '#ffe8cc', '#e8e8e8'
];
