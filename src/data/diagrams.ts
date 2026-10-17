export interface EducationalDiagram {
  id: string;
  title: string;
  category: 'Science' | 'Mathematics' | 'Technology' | 'Social Studies';
  subject: string;
  level: string;
  caption: string;
  svgContent: string;
}

export const curriculumDiagrams: EducationalDiagram[] = [
  {
    id: 'diag_plant_cell',
    title: 'Generalized Plant Cell Structure',
    category: 'Science',
    subject: 'Basic Science & Technology',
    level: 'jss-1',
    caption: 'Figure 1: Labeled schematic of a typical plant cell showing cell wall, chloroplast, and central vacuole.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Cell Wall -->
      <polygon points="60,40 440,40 460,260 40,260" fill="#dcfce7" stroke="#15803d" stroke-width="6"/>
      <!-- Cell Membrane -->
      <polygon points="70,50 430,50 448,250 52,250" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <!-- Large Central Vacuole -->
      <ellipse cx="270" cy="150" rx="130" ry="70" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <text x="270" y="155" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">Large Central Vacuole (Cell Sap)</text>
      <!-- Nucleus -->
      <circle cx="130" cy="110" r="38" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <circle cx="130" cy="110" r="16" fill="#be185d"/>
      <text x="130" y="114" font-size="10" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Nucleolus</text>
      <!-- Chloroplasts -->
      <ellipse cx="140" cy="200" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="380" cy="90" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="390" cy="210" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <!-- Labels -->
      <line x1="440" y1="40" x2="480" y2="40" stroke="#0f172a" stroke-width="1.5"/>
      <text x="485" y="44" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a">Cell Wall</text>
      <line x1="130" y1="72" x2="130" y2="30" stroke="#0f172a" stroke-width="1.5"/>
      <text x="130" y="24" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Nucleus</text>
      <line x1="380" y1="78" x2="380" y2="30" stroke="#0f172a" stroke-width="1.5"/>
      <text x="380" y="24" font-size="11" font-family="sans-serif" font-weight="bold" fill="#15803d" text-anchor="middle">Chloroplast</text>
      <line x1="140" y1="212" x2="140" y2="280" stroke="#0f172a" stroke-width="1.5"/>
      <text x="140" y="295" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Cytoplasm</text>
    </svg>`
  },
  {
    id: 'diag_pythagoras',
    title: 'Right-Angled Triangle & Pythagoras Theorem',
    category: 'Mathematics',
    subject: 'Mathematics',
    level: 'jss-2',
    caption: 'Figure 2: Geometric illustration of right-angled triangle showing Hypotenuse c² = a² + b².',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Triangle ABC -->
      <polygon points="120,250 400,250 120,70" fill="#ecfdf5" stroke="#059669" stroke-width="4"/>
      <!-- Right angle marker -->
      <rect x="120" y="230" width="20" height="20" fill="none" stroke="#059669" stroke-width="2"/>
      <!-- Vertex Labels -->
      <text x="105" y="265" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">A (90°)</text>
      <text x="410" y="265" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">B</text>
      <text x="110" y="60" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">C</text>
      <!-- Side Labels -->
      <text x="80" y="165" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0369a1">a (Height)</text>
      <text x="260" y="275" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">b (Base)</text>
      <text x="290" y="145" font-size="14" font-family="sans-serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">c (Hypotenuse)</text>
      <!-- Formula Box -->
      <rect x="260" y="40" width="210" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="365" y="65" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Pythagoras Formula:</text>
      <text x="365" y="86" font-size="15" font-family="monospace" font-weight="bold" fill="#059669" text-anchor="middle">c² = a² + b²</text>
    </svg>`
  },
  {
    id: 'diag_venn_diagram',
    title: 'Two-Set Venn Diagram (A ∩ B Intersection)',
    category: 'Mathematics',
    subject: 'General Mathematics',
    level: 'sss-1',
    caption: 'Figure 3: Universal set with sets A and B showing mutual intersection A ∩ B and union A ∪ B.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Universal set box -->
      <rect x="40" y="30" width="420" height="260" fill="#ffffff" stroke="#334155" stroke-width="3" rx="6"/>
      <text x="60" y="60" font-size="18" font-family="serif" font-weight="bold" fill="#334155">ξ (Universal Set)</text>
      <!-- Circle A -->
      <circle cx="200" cy="160" r="90" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="3"/>
      <!-- Circle B -->
      <circle cx="300" cy="160" r="90" fill="#fbbf24" fill-opacity="0.35" stroke="#d97706" stroke-width="3"/>
      <!-- Set Labels -->
      <text x="160" y="110" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0369a1">Set A</text>
      <text x="320" y="110" font-size="16" font-family="sans-serif" font-weight="bold" fill="#b45309">Set B</text>
      <!-- Intersection Label -->
      <text x="250" y="165" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">A ∩ B</text>
      <text x="250" y="240" font-size="11" font-family="sans-serif" font-weight="semibold" fill="#64748b" text-anchor="middle">Common Elements</text>
    </svg>`
  },
  {
    id: 'diag_electric_circuit',
    title: 'Simple Direct Current (DC) Electric Circuit',
    category: 'Technology',
    subject: 'Basic Science & Technology',
    level: 'jss-2',
    caption: 'Figure 4: Complete circuit schematic diagram showing DC cell, key switch, ammeter, and electric bulb.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Wire Rectangle -->
      <rect x="80" y="60" width="340" height="200" fill="none" stroke="#334155" stroke-width="4" rx="4"/>
      <!-- Battery Top -->
      <rect x="220" y="52" width="60" height="16" fill="#f8fafc"/>
      <line x1="235" y1="50" x2="235" y2="70" stroke="#0f172a" stroke-width="4"/>
      <line x1="245" y1="56" x2="245" y2="64" stroke="#0f172a" stroke-width="3"/>
      <text x="215" y="45" font-size="14" font-family="sans-serif" font-weight="bold" fill="#dc2626">+</text>
      <text x="255" y="45" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0284c7">−</text>
      <text x="240" y="35" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Battery Cell</text>
      <!-- Switch Right -->
      <rect x="412" y="130" width="16" height="60" fill="#f8fafc"/>
      <line x1="420" y1="130" x2="435" y2="155" stroke="#e11d48" stroke-width="3"/>
      <circle cx="420" cy="130" r="4" fill="#0f172a"/>
      <circle cx="420" cy="170" r="4" fill="#0f172a"/>
      <text x="465" y="155" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a">Switch (Open)</text>
      <!-- Bulb Bottom -->
      <rect x="220" y="252" width="60" height="16" fill="#f8fafc"/>
      <circle cx="250" cy="260" r="18" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
      <line x1="238" y1="248" x2="262" y2="272" stroke="#ca8a04" stroke-width="2"/>
      <line x1="238" y1="272" x2="262" y2="248" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="300" font-size="12" font-family="sans-serif" font-weight="bold" fill="#854d0e" text-anchor="middle">Electric Lamp (Bulb)</text>
      <!-- Current Arrow -->
      <polygon points="170,55 180,60 170,65" fill="#2563eb"/>
      <text x="175" y="45" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Current (I)</text>
    </svg>`
  },
  {
    id: 'diag_3_arms_govt',
    title: 'The Three Arms of Nigerian Government',
    category: 'Social Studies',
    subject: 'Civic Education',
    level: 'jss-3',
    caption: 'Figure 5: Separation of powers and constitutional checks and balances in the Federal Republic of Nigeria.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Top Title Box: Constitution -->
      <rect x="150" y="20" width="200" height="45" rx="8" fill="#14532d" stroke="#166534" stroke-width="2"/>
      <text x="250" y="47" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">1999 NIGERIAN CONSTITUTION</text>
      <!-- Connecting lines -->
      <line x1="250" y1="65" x2="250" y2="95" stroke="#334155" stroke-width="2"/>
      <line x1="90" y1="95" x2="410" y2="95" stroke="#334155" stroke-width="2"/>
      <line x1="90" y1="95" x2="90" y2="120" stroke="#334155" stroke-width="2"/>
      <line x1="250" y1="95" x2="250" y2="120" stroke="#334155" stroke-width="2"/>
      <line x1="410" y1="95" x2="410" y2="120" stroke="#334155" stroke-width="2"/>
      <!-- Arm 1: Legislature -->
      <rect x="20" y="120" width="140" height="150" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="90" y="145" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">LEGISLATURE</text>
      <text x="90" y="165" font-size="10" font-family="sans-serif" font-weight="bold" fill="#64748b" text-anchor="middle">(Law Making)</text>
      <text x="90" y="195" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• Senate</text>
      <text x="90" y="215" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• House of Reps</text>
      <text x="90" y="235" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• State Assemblies</text>
      <!-- Arm 2: Executive -->
      <rect x="180" y="120" width="140" height="150" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="250" y="145" font-size="13" font-family="sans-serif" font-weight="bold" fill="#15803d" text-anchor="middle">EXECUTIVE</text>
      <text x="250" y="165" font-size="10" font-family="sans-serif" font-weight="bold" fill="#64748b" text-anchor="middle">(Law Execution)</text>
      <text x="250" y="195" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• President</text>
      <text x="250" y="215" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• State Governors</text>
      <text x="250" y="235" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• Federal Ministers</text>
      <!-- Arm 3: Judiciary -->
      <rect x="340" y="120" width="140" height="150" rx="8" fill="#faf5ff" stroke="#a855f7" stroke-width="2"/>
      <text x="410" y="145" font-size="13" font-family="sans-serif" font-weight="bold" fill="#7e22ce" text-anchor="middle">JUDICIARY</text>
      <text x="410" y="165" font-size="10" font-family="sans-serif" font-weight="bold" fill="#64748b" text-anchor="middle">(Law Interpretation)</text>
      <text x="410" y="195" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• Supreme Court</text>
      <text x="410" y="215" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• Court of Appeal</text>
      <text x="410" y="235" font-size="10" font-family="sans-serif" fill="#0f172a" text-anchor="middle">• High Courts</text>
    </svg>`
  }
];
