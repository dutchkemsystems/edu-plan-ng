export interface EducationalDiagram {
  id: string;
  title: string;
  category: 'Science' | 'Mathematics' | 'Technology' | 'Social Studies' | 'Commercial' | 'Humanities';
  subject: string;
  level: string;
  caption: string;
  svgContent: string;
}

export const curriculumDiagrams: EducationalDiagram[] = [
  // 1. BIOLOGY / BASIC SCIENCE: PLANT CELL
  {
    id: 'diag_plant_cell',
    title: 'Generalized Plant Cell Structure',
    category: 'Science',
    subject: 'Basic Science',
    level: 'jss-1',
    caption: 'Figure 1: Labeled schematic of a typical plant cell showing cell wall, chloroplast, and central vacuole.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <polygon points="60,40 440,40 460,260 40,260" fill="#dcfce7" stroke="#15803d" stroke-width="6"/>
      <polygon points="70,50 430,50 448,250 52,250" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <ellipse cx="270" cy="150" rx="130" ry="70" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <text x="270" y="155" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">Large Central Vacuole (Cell Sap)</text>
      <circle cx="130" cy="110" r="38" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <circle cx="130" cy="110" r="16" fill="#be185d"/>
      <text x="130" y="114" font-size="10" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Nucleolus</text>
      <ellipse cx="140" cy="200" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="380" cy="90" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="390" cy="210" rx="22" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
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

  // 2. BIOLOGY / BASIC SCIENCE: ANIMAL CELL
  {
    id: 'diag_animal_cell',
    title: 'Generalized Animal Cell Structure',
    category: 'Science',
    subject: 'Biology',
    level: 'sss-1',
    caption: 'Figure 2: Structure of an animal cell highlighting plasma membrane, nucleus, mitochondria, and lysosomes.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Cell Membrane irregular rounded -->
      <path d="M 120,60 C 250,30 400,60 440,150 C 470,230 380,290 260,280 C 140,290 60,230 70,140 C 75,90 90,70 120,60 Z" fill="#fff7ed" stroke="#ea580c" stroke-width="4"/>
      <!-- Nucleus -->
      <circle cx="250" cy="160" r="48" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
      <circle cx="250" cy="160" r="18" fill="#9d174d"/>
      <text x="250" y="164" font-size="10" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Nucleolus</text>
      <!-- Mitochondria -->
      <ellipse cx="140" cy="110" rx="26" ry="14" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <ellipse cx="370" cy="210" rx="26" ry="14" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <!-- Ribosomes/Lysosomes -->
      <circle cx="160" cy="220" r="10" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
      <circle cx="340" cy="100" r="10" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
      <!-- Labels -->
      <line x1="250" y1="112" x2="250" y2="40" stroke="#0f172a" stroke-width="1.5"/>
      <text x="250" y="32" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Nucleus</text>
      <line x1="140" y1="96" x2="140" y2="50" stroke="#c2410c" stroke-width="1.5"/>
      <text x="140" y="42" font-size="11" font-family="sans-serif" font-weight="bold" fill="#c2410c" text-anchor="middle">Mitochondrion</text>
      <line x1="440" y1="150" x2="480" y2="150" stroke="#ea580c" stroke-width="1.5"/>
      <text x="485" y="154" font-size="11" font-family="sans-serif" font-weight="bold" fill="#ea580c">Plasma Membrane</text>
    </svg>`
  },

  // 3. CHEMISTRY: BOHR ATOMIC STRUCTURE
  {
    id: 'diag_bohr_atom',
    title: 'Atomic Structure: Bohr Model of Carbon (C-12)',
    category: 'Science',
    subject: 'Chemistry',
    level: 'sss-1',
    caption: 'Figure 3: Bohr model of Carbon atom showing central nucleus (6 Protons, 6 Neutrons) and two electron shells (2, 4).',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Nucleus -->
      <circle cx="250" cy="160" r="32" fill="#fecdd3" stroke="#e11d48" stroke-width="2.5"/>
      <text x="250" y="155" font-size="10" font-family="sans-serif" font-weight="bold" fill="#9f1239" text-anchor="middle">6p⁺ (Protons)</text>
      <text x="250" y="170" font-size="10" font-family="sans-serif" font-weight="bold" fill="#475569" text-anchor="middle">6n⁰ (Neutrons)</text>
      <!-- K Shell (n=1) -->
      <circle cx="250" cy="160" r="65" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>
      <!-- Electrons K Shell (2) -->
      <circle cx="250" cy="95" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <circle cx="250" cy="225" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <!-- L Shell (n=2) -->
      <circle cx="250" cy="160" r="115" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 3"/>
      <!-- Electrons L Shell (4) -->
      <circle cx="135" cy="160" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <circle cx="365" cy="160" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <circle cx="250" cy="45" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <circle cx="250" cy="275" r="7" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
      <!-- Info callout -->
      <rect x="20" y="20" width="130" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="30" y="40" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a">Carbon-12 Atom</text>
      <text x="30" y="56" font-size="10" font-family="sans-serif" fill="#64748b">Atomic No. Z = 6</text>
      <text x="30" y="70" font-size="10" font-family="sans-serif" fill="#64748b">Config: 2, 4</text>
    </svg>`
  },

  // 4. CHEMISTRY / PRACTICALS: LAB HEATING APPARATUS
  {
    id: 'diag_lab_apparatus',
    title: 'Standard Laboratory Heating Setup (Bunsen Burner)',
    category: 'Science',
    subject: 'Chemistry',
    level: 'jss-2',
    caption: 'Figure 4: Standard school laboratory setup: Retort stand, tripod, wire gauze, beaker, and Bunsen burner.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Bench surface -->
      <line x1="40" y1="280" x2="460" y2="280" stroke="#334155" stroke-width="4"/>
      <!-- Bunsen Burner -->
      <rect x="225" y="270" width="50" height="10" fill="#475569" rx="2"/>
      <rect x="245" y="200" width="10" height="70" fill="#94a3b8"/>
      <!-- Flame -->
      <path d="M 245,200 Q 250,150 250,140 Q 250,150 255,200 Z" fill="#38bdf8"/>
      <path d="M 247,200 Q 250,170 250,165 Q 250,170 253,200 Z" fill="#fbbf24"/>
      <!-- Tripod Stand -->
      <line x1="180" y1="280" x2="210" y2="150" stroke="#1e293b" stroke-width="3"/>
      <line x1="320" y1="280" x2="290" y2="150" stroke="#1e293b" stroke-width="3"/>
      <!-- Wire Gauze -->
      <line x1="200" y1="150" x2="300" y2="150" stroke="#64748b" stroke-width="5"/>
      <!-- Beaker with liquid -->
      <rect x="215" y="70" width="70" height="80" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5" rx="3"/>
      <path d="M 216,110 Q 250,105 284,110 L 284,148 L 216,148 Z" fill="#38bdf8" fill-opacity="0.6"/>
      <!-- Retort Stand on right -->
      <rect x="360" y="270" width="80" height="10" fill="#1e293b"/>
      <line x1="400" y1="270" x2="400" y2="40" stroke="#1e293b" stroke-width="4"/>
      <line x1="400" y1="90" x2="285" y2="90" stroke="#475569" stroke-width="3"/>
      <!-- Text Labels -->
      <text x="140" y="110" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0369a1">Beaker & Solution</text>
      <text x="140" y="155" font-size="10" font-family="sans-serif" font-weight="bold" fill="#475569">Wire Gauze</text>
      <text x="140" y="240" font-size="11" font-family="sans-serif" font-weight="bold" fill="#b45309">Bunsen Burner</text>
    </svg>`
  },

  // 5. PHYSICS: DC ELECTRIC CIRCUIT
  {
    id: 'diag_electric_circuit',
    title: 'Simple Direct Current (DC) Electric Circuit',
    category: 'Technology',
    subject: 'Physics',
    level: 'jss-2',
    caption: 'Figure 5: Complete circuit schematic diagram showing DC cell, key switch, ammeter, and electric bulb.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
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
      <text x="465" y="155" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a">Switch</text>
      <!-- Bulb Bottom -->
      <rect x="220" y="252" width="60" height="16" fill="#f8fafc"/>
      <circle cx="250" cy="260" r="18" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
      <line x1="238" y1="248" x2="262" y2="272" stroke="#ca8a04" stroke-width="2"/>
      <line x1="238" y1="272" x2="262" y2="248" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="300" font-size="12" font-family="sans-serif" font-weight="bold" fill="#854d0e" text-anchor="middle">Electric Lamp (Bulb)</text>
      <polygon points="170,55 180,60 170,65" fill="#2563eb"/>
      <text x="175" y="45" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Current (I)</text>
    </svg>`
  },

  // 6. PHYSICS: LIGHT REFLECTION ON PLANE MIRROR
  {
    id: 'diag_light_reflection',
    title: 'Laws of Reflection of Light (Plane Mirror)',
    category: 'Science',
    subject: 'Physics',
    level: 'sss-1',
    caption: 'Figure 6: Law of Reflection showing Incident Ray, Normal Line, Reflected Ray, and Angle of Incidence i = Angle of Reflection r.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Mirror Surface -->
      <line x1="50" y1="240" x2="450" y2="240" stroke="#0f172a" stroke-width="4"/>
      <!-- Hatching on back of mirror -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <line x1="70" y1="240" x2="60" y2="255"/>
        <line x1="120" y1="240" x2="110" y2="255"/>
        <line x1="170" y1="240" x2="160" y2="255"/>
        <line x1="220" y1="240" x2="210" y2="255"/>
        <line x1="270" y1="240" x2="260" y2="255"/>
        <line x1="320" y1="240" x2="310" y2="255"/>
        <line x1="370" y1="240" x2="360" y2="255"/>
        <line x1="420" y1="240" x2="410" y2="255"/>
      </g>
      <!-- Normal Line -->
      <line x1="250" y1="40" x2="250" y2="240" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="250" y="30" font-size="12" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Normal Line (90°)</text>
      <!-- Incident Ray -->
      <line x1="100" y1="90" x2="250" y2="240" stroke="#0284c7" stroke-width="3"/>
      <polygon points="170,160 185,160 178,175" fill="#0284c7"/>
      <text x="90" y="80" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0284c7">Incident Ray</text>
      <!-- Reflected Ray -->
      <line x1="250" y1="240" x2="400" y2="90" stroke="#16a34a" stroke-width="3"/>
      <polygon points="320,165 330,150 338,165" fill="#16a34a"/>
      <text x="405" y="80" font-size="12" font-family="sans-serif" font-weight="bold" fill="#16a34a">Reflected Ray</text>
      <!-- Angles -->
      <text x="215" y="180" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0284c7">i</text>
      <text x="275" y="180" font-size="14" font-family="sans-serif" font-weight="bold" fill="#16a34a">r</text>
      <!-- Law rule -->
      <rect x="180" y="270" width="140" height="35" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="250" y="292" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Law: ∠i = ∠r</text>
    </svg>`
  },

  // 7. MATHEMATICS: PYTHAGORAS THEOREM
  {
    id: 'diag_pythagoras',
    title: 'Right-Angled Triangle & Pythagoras Theorem',
    category: 'Mathematics',
    subject: 'Mathematics',
    level: 'jss-2',
    caption: 'Figure 7: Geometric illustration of right-angled triangle showing Hypotenuse c² = a² + b².',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <polygon points="120,250 400,250 120,70" fill="#ecfdf5" stroke="#059669" stroke-width="4"/>
      <rect x="120" y="230" width="20" height="20" fill="none" stroke="#059669" stroke-width="2"/>
      <text x="105" y="265" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">A (90°)</text>
      <text x="410" y="265" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">B</text>
      <text x="110" y="60" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">C</text>
      <text x="80" y="165" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0369a1">a (Height)</text>
      <text x="260" y="275" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">b (Base)</text>
      <text x="290" y="145" font-size="14" font-family="sans-serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">c (Hypotenuse)</text>
      <rect x="260" y="40" width="210" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="365" y="65" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Pythagoras Formula:</text>
      <text x="365" y="86" font-size="15" font-family="monospace" font-weight="bold" fill="#059669" text-anchor="middle">c² = a² + b²</text>
    </svg>`
  },

  // 8. MATHEMATICS: VENN DIAGRAM
  {
    id: 'diag_venn_diagram',
    title: 'Two-Set Venn Diagram (A ∩ B Intersection)',
    category: 'Mathematics',
    subject: 'General Mathematics',
    level: 'sss-1',
    caption: 'Figure 8: Universal set with sets A and B showing mutual intersection A ∩ B and union A ∪ B.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <rect x="40" y="30" width="420" height="260" fill="#ffffff" stroke="#334155" stroke-width="3" rx="6"/>
      <text x="60" y="60" font-size="18" font-family="serif" font-weight="bold" fill="#334155">ξ (Universal Set)</text>
      <circle cx="200" cy="160" r="90" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="3"/>
      <circle cx="300" cy="160" r="90" fill="#fbbf24" fill-opacity="0.35" stroke="#d97706" stroke-width="3"/>
      <text x="160" y="110" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0369a1">Set A</text>
      <text x="320" y="110" font-size="16" font-family="sans-serif" font-weight="bold" fill="#b45309">Set B</text>
      <text x="250" y="165" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">A ∩ B</text>
      <text x="250" y="240" font-size="11" font-family="sans-serif" font-weight="semibold" fill="#64748b" text-anchor="middle">Common Elements</text>
    </svg>`
  },

  // 9. MATHEMATICS: CARTESIAN PLANE & LINEAR GRAPH
  {
    id: 'diag_coordinate_plane',
    title: 'Cartesian Coordinate Plane & Straight Line Graph (y = mx + c)',
    category: 'Mathematics',
    subject: 'Further Mathematics',
    level: 'sss-2',
    caption: 'Figure 9: Coordinate axes showing gradient (slope m = Δy/Δx) and y-intercept c.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Grid -->
      <g stroke="#e2e8f0" stroke-width="1">
        <line x1="50" y1="80" x2="450" y2="80"/><line x1="50" y1="120" x2="450" y2="120"/>
        <line x1="50" y1="200" x2="450" y2="200"/><line x1="50" y1="240" x2="450" y2="240"/>
        <line x1="130" y1="40" x2="130" y2="280"/><line x1="170" y1="40" x2="170" y2="280"/>
        <line x1="290" y1="40" x2="290" y2="280"/><line x1="330" y1="40" x2="330" y2="280"/>
      </g>
      <!-- Axes -->
      <line x1="50" y1="160" x2="450" y2="160" stroke="#0f172a" stroke-width="3"/>
      <line x1="210" y1="40" x2="210" y2="280" stroke="#0f172a" stroke-width="3"/>
      <text x="440" y="150" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">x</text>
      <text x="220" y="55" font-size="14" font-family="sans-serif" font-weight="bold" fill="#0f172a">y</text>
      <text x="195" y="175" font-size="11" font-family="sans-serif" fill="#64748b">O(0,0)</text>
      <!-- Line y = mx + c -->
      <line x1="110" y1="260" x2="380" y2="60" stroke="#2563eb" stroke-width="3.5"/>
      <!-- Intercept point -->
      <circle cx="210" cy="186" r="5" fill="#dc2626"/>
      <text x="225" y="195" font-size="11" font-family="sans-serif" font-weight="bold" fill="#dc2626">(0, c) Intercept</text>
      <!-- Equation Tag -->
      <rect x="270" y="70" width="160" height="40" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
      <text x="350" y="95" font-size="13" font-family="monospace" font-weight="bold" fill="#1d4ed8" text-anchor="middle">y = mx + c</text>
    </svg>`
  },

  // 10. AGRICULTURAL SCIENCE: SOIL PROFILE
  {
    id: 'diag_soil_profile',
    title: 'Typical Soil Profile Horizons (O, A, B, C, R)',
    category: 'Science',
    subject: 'Agricultural Science',
    level: 'jss-1',
    caption: 'Figure 10: Master vertical soil profile horizons: Organic layer (O), Topsoil (A), Subsoil (B), Weathered rock (C), and Bedrock (R).',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Horizon O: Humus/Organic -->
      <rect x="60" y="40" width="220" height="30" fill="#3f2e21" stroke="#261b13" stroke-width="1"/>
      <text x="300" y="60" font-size="12" font-family="sans-serif" font-weight="bold" fill="#3f2e21">O-Horizon: Organic Matter & Humus</text>
      <!-- Horizon A: Topsoil -->
      <rect x="60" y="70" width="220" height="55" fill="#654b38" stroke="#3f2e21" stroke-width="1"/>
      <text x="300" y="102" font-size="12" font-family="sans-serif" font-weight="bold" fill="#654b38">A-Horizon: Topsoil (Dark, Fertile)</text>
      <!-- Horizon B: Subsoil -->
      <rect x="60" y="125" width="220" height="70" fill="#a0714f" stroke="#654b38" stroke-width="1"/>
      <text x="300" y="165" font-size="12" font-family="sans-serif" font-weight="bold" fill="#a0714f">B-Horizon: Subsoil (Minerals, Clay)</text>
      <!-- Horizon C: Weathered Rock -->
      <rect x="60" y="195" width="220" height="55" fill="#c4a482" stroke="#a0714f" stroke-width="1"/>
      <text x="300" y="228" font-size="12" font-family="sans-serif" font-weight="bold" fill="#8c6d4e">C-Horizon: Parent Material / Regolith</text>
      <!-- Horizon R: Bedrock -->
      <rect x="60" y="250" width="220" height="40" fill="#64748b" stroke="#334155" stroke-width="1"/>
      <text x="300" y="275" font-size="12" font-family="sans-serif" font-weight="bold" fill="#334155">R-Horizon: Solid Bedrock</text>
    </svg>`
  },

  // 11. CIVIC EDUCATION / GOVERNMENT: 3 ARMS OF GOVERNMENT
  {
    id: 'diag_3_arms_govt',
    title: 'The Three Arms of Nigerian Government',
    category: 'Social Studies',
    subject: 'Civic Education',
    level: 'jss-3',
    caption: 'Figure 11: Separation of powers and constitutional checks and balances in the Federal Republic of Nigeria.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <rect x="150" y="20" width="200" height="45" rx="8" fill="#14532d" stroke="#166534" stroke-width="2"/>
      <text x="250" y="47" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">1999 NIGERIAN CONSTITUTION</text>
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
  },

  // 12. ECONOMICS / COMMERCE: DEMAND & SUPPLY EQUILIBRIUM
  {
    id: 'diag_demand_supply',
    title: 'Market Equilibrium: Demand and Supply Curves',
    category: 'Commercial',
    subject: 'Economics',
    level: 'sss-1',
    caption: 'Figure 12: Intersection of downward-sloping Demand Curve (D) and upward-sloping Supply Curve (S) at Equilibrium Price P* and Quantity Q*.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Axes -->
      <line x1="80" y1="40" x2="80" y2="260" stroke="#0f172a" stroke-width="3"/>
      <line x1="80" y1="260" x2="440" y2="260" stroke="#0f172a" stroke-width="3"/>
      <text x="65" y="50" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a">Price (₦)</text>
      <text x="390" y="285" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a">Quantity (Q)</text>
      <!-- Demand Curve D -->
      <line x1="110" y1="70" x2="390" y2="240" stroke="#dc2626" stroke-width="3.5"/>
      <text x="400" y="245" font-size="14" font-family="sans-serif" font-weight="bold" fill="#dc2626">D</text>
      <!-- Supply Curve S -->
      <line x1="110" y1="240" x2="390" y2="70" stroke="#16a34a" stroke-width="3.5"/>
      <text x="400" y="75" font-size="14" font-family="sans-serif" font-weight="bold" fill="#16a34a">S</text>
      <!-- Equilibrium Point E -->
      <circle cx="250" cy="155" r="6" fill="#0f172a"/>
      <text x="260" y="145" font-size="13" font-family="sans-serif" font-weight="bold" fill="#0f172a">E (Equilibrium)</text>
      <!-- Dashed lines to axes -->
      <line x1="80" y1="155" x2="250" y2="155" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4"/>
      <line x1="250" y1="155" x2="250" y2="260" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="50" y="160" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0369a1">P*</text>
      <text x="245" y="280" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0369a1">Q*</text>
    </svg>`
  },

  // 13. ENGLISH / LITERATURE: NARRATIVE PLOT PYRAMID
  {
    id: 'diag_plot_structure',
    title: 'Dramatic Narrative Arc (Freytag\'s Plot Pyramid)',
    category: 'Humanities',
    subject: 'English Studies',
    level: 'jss-3',
    caption: 'Figure 13: Classic literary narrative progression: Exposition, Inciting Incident, Rising Action, Climax, Falling Action, and Resolution.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Mountain Path -->
      <path d="M 60,250 L 150,250 L 250,70 L 350,250 L 440,250" fill="none" stroke="#4f46e5" stroke-width="4"/>
      <!-- Climax Point -->
      <circle cx="250" cy="70" r="7" fill="#dc2626"/>
      <rect x="180" y="30" width="140" height="30" rx="6" fill="#fee2e2" stroke="#ef4444"/>
      <text x="250" y="50" font-size="12" font-family="sans-serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">3. CLIMAX (Peak)</text>
      <!-- Stages -->
      <text x="70" y="275" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">1. Exposition</text>
      <text x="145" y="160" font-size="11" font-family="sans-serif" font-weight="bold" fill="#4338ca">2. Rising Action</text>
      <text x="325" y="160" font-size="11" font-family="sans-serif" font-weight="bold" fill="#4338ca">4. Falling Action</text>
      <text x="375" y="275" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">5. Resolution</text>
    </svg>`
  },

  // 14. TECHNICAL DRAWING: ORTHOGRAPHIC & ISOMETRIC PROJECTION
  {
    id: 'diag_orthographic',
    title: 'First-Angle Orthographic & Isometric Projection',
    category: 'Technology',
    subject: 'Technical Drawing',
    level: 'sss-2',
    caption: 'Figure 14: Standard engineering drafting projection showing Front Elevation, End Elevation, and Plan view.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <line x1="50" y1="160" x2="450" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="250" y1="30" x2="250" y2="290" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="90,70 190,70 190,140 140,140 140,110 90,110" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
      <text x="140" y="155" font-size="11" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">FRONT ELEVATION</text>
      <rect x="290" y="70" width="80" height="70" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <line x1="290" y1="110" x2="370" y2="110" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="330" y="155" font-size="11" font-family="sans-serif" font-weight="bold" fill="#92400e" text-anchor="middle">END ELEVATION</text>
      <rect x="90" y="180" width="100" height="80" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
      <line x1="140" y1="180" x2="140" y2="260" stroke="#15803d" stroke-width="2"/>
      <text x="140" y="280" font-size="11" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">PLAN VIEW (From Above)</text>
      <line x1="250" y1="160" x2="370" y2="280" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="330" y="240" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626">45° Miter Line</text>
    </svg>`
  },

  // 15. ÈDÈ YORÙBÁ: ÁBÍDÍ, FÁWẸ́LÌ ÀTI OHÙN ORÍ Ọ̀RỌ̀ (DÒ-RE-MÍ)
  {
    id: 'diag_yoruba_alphabet_tones',
    title: 'Ábídí Yorùbá àti Àwọn Ohùn Orí Ọ̀rọ̀ (Dò-Re-Mí)',
    category: 'Humanities',
    subject: 'Èdè Yorùbá',
    level: 'jss-1',
    caption: 'Figure 15: Àkọsílẹ̀ Ábídí Yorùbá (Fáwẹ́lì Àìránmú 7, Àránmú 5) àti Àmì Ohùn mẹ́tẹ̀ẹ̀ta: Òkè (/) Àárín (-) àti Ìsàlẹ̀ (\\).',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#fefce8" rx="8"/>
      <!-- Header -->
      <rect x="20" y="15" width="460" height="32" rx="6" fill="#854d0e"/>
      <text x="250" y="36" font-size="13" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">ÈDÈ YORÙBÁ — ÁBÍDÍ ÀTI ÀMÌ OHÙN</text>
      
      <!-- Fáwẹ́lì Section -->
      <rect x="25" y="60" width="215" height="110" rx="6" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="35" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#854d0e">Fáwẹ́lì Àìránmú (Oral Vowels - 7):</text>
      <text x="35" y="105" font-size="16" font-family="sans-serif" font-weight="bold" fill="#15803d">a,  e,  ẹ,  i,  o,  ọ,  u</text>
      <line x1="35" y1="118" x2="230" y2="118" stroke="#fef08a"/>
      <text x="35" y="136" font-size="11" font-family="sans-serif" font-weight="bold" fill="#854d0e">Fáwẹ́lì Àránmú (Nasal Vowels - 5):</text>
      <text x="35" y="158" font-size="15" font-family="sans-serif" font-weight="bold" fill="#0369a1">an,  ẹn,  in,  ọn,  un</text>

      <!-- Àmì Ohùn Section -->
      <rect x="255" y="60" width="225" height="110" rx="6" fill="#ffffff" stroke="#15803d" stroke-width="1.5"/>
      <text x="265" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#166534">Àmì Ohùn Mẹ́tẹ̀ẹ̀ta (Tone Marks):</text>
      <g transform="translate(265, 95)">
        <!-- High tone -->
        <rect x="0" y="0" width="65" height="60" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="32" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">Á (/)</text>
        <text x="32" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">Ókè (Mí)</text>
        <text x="32" y="54" font-size="9" font-family="sans-serif" fill="#7f1d1d" text-anchor="middle">wá, rí</text>
        <!-- Mid tone -->
        <rect x="75" y="0" width="65" height="60" rx="4" fill="#fef9c3" stroke="#ca8a04"/>
        <text x="107" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#a16207" text-anchor="middle">A (-)</text>
        <text x="107" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#854d0e" text-anchor="middle">Àárín (Re)</text>
        <text x="107" y="54" font-size="9" font-family="sans-serif" fill="#713f12" text-anchor="middle">lo, wa</text>
        <!-- Low tone -->
        <rect x="150" y="0" width="65" height="60" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="182" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">À (\)</text>
        <text x="182" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">Ìsàlẹ̀ (Dò)</text>
        <text x="182" y="54" font-size="9" font-family="sans-serif" fill="#172554" text-anchor="middle">wọ̀, rọ̀</text>
      </g>

      <!-- Cultural Illustration (Ìlù Gángan / Talking Drum) -->
      <rect x="25" y="180" width="455" height="125" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(45, 190)">
        <!-- Hourglass drum body -->
        <path d="M 15,10 C 35,40 35,60 15,90 L 75,90 C 55,60 55,40 75,10 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
        <ellipse cx="45" cy="10" rx="30" ry="6" fill="#fde68a" stroke="#78350f" stroke-width="1.5"/>
        <ellipse cx="45" cy="90" rx="30" ry="6" fill="#fde68a" stroke="#78350f" stroke-width="1.5"/>
        <!-- Tension strings (Ọsán) -->
        <line x1="20" y1="12" x2="20" y2="88" stroke="#78350f" stroke-width="1.2"/>
        <line x1="30" y1="14" x2="30" y2="86" stroke="#78350f" stroke-width="1.2"/>
        <line x1="45" y1="16" x2="45" y2="84" stroke="#78350f" stroke-width="1.2"/>
        <line x1="60" y1="14" x2="60" y2="86" stroke="#78350f" stroke-width="1.2"/>
        <line x1="70" y1="12" x2="70" y2="88" stroke="#78350f" stroke-width="1.2"/>
        <!-- Curved beater (Kọ́ngọ́) -->
        <path d="M 90,85 Q 115,45 105,25 Q 100,15 90,20" fill="none" stroke="#92400e" stroke-width="3"/>
        <circle cx="88" cy="22" r="5" fill="#78350f"/>
        <text x="45" y="110" font-size="10" font-family="sans-serif" font-weight="bold" fill="#78350f" text-anchor="middle">Ìlù Gángan</text>
      </g>
      <text x="180" y="215" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0f172a">Àpẹẹrẹ Ọ̀rọ̀ pẹ̀lú Ìyàtọ̀ Àmì Ohùn:</text>
      <text x="180" y="240" font-size="12" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#b91c1c">Ọkọ́</tspan> (Mí-Mí) = Hoe (ohun èlò iṣẹ́ àgbẹ̀)</text>
      <text x="180" y="262" font-size="12" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#a16207">Ọkọ</tspan> (Re-Re) = Husband (ọkùnrin tí ó gbéyàwó)</text>
      <text x="180" y="284" font-size="12" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#1d4ed8">Ọkọ̀</tspan> (Re-Dò) = Vehicle / Ship (ohun ìrìnnà)</text>
    </svg>`
  },

  // 16. ASỤSỤ IGBO: MKPỤRỤ EDEMEDE IGBO (36) NA AKARA UDAOLU
  {
    id: 'diag_igbo_alphabet_symbols',
    title: 'Mkpụrụ Edemede Igbo (Abịịdị 36) na Akara Udaolu',
    category: 'Humanities',
    subject: 'Asụsụ Igbo',
    level: 'jss-1',
    caption: 'Figure 16: Nhazi Abịịdị Igbo 36 (Udaume 8, Mgbochiume 28) na Akara Udaolu atọ: Elu (/), Ala (\\), na Nsụda (-).',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="8"/>
      <!-- Header -->
      <rect x="20" y="15" width="460" height="32" rx="6" fill="#15803d"/>
      <text x="250" y="36" font-size="13" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">ASỤSỤ IGBO — ABỊỊDỊ IGBO (36) NA AKARA UDAOLU</text>

      <!-- Udaume Section -->
      <rect x="25" y="60" width="215" height="110" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <text x="35" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#15803d">Udaume Asatọ (8 Vowels):</text>
      <text x="35" y="105" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0f766e">Udafe (Light): a, e, ị, ọ</text>
      <line x1="35" y1="118" x2="230" y2="118" stroke="#dcfce7"/>
      <text x="35" y="136" font-size="11" font-family="sans-serif" font-weight="bold" fill="#15803d">Udara (Heavy):</text>
      <text x="35" y="158" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0369a1">i, o, ụ, u</text>

      <!-- Akara Udaolu -->
      <rect x="255" y="60" width="225" height="110" rx="6" fill="#ffffff" stroke="#047857" stroke-width="1.5"/>
      <text x="265" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#065f46">Akara Udaolu Atọ (Tone Marks):</text>
      <g transform="translate(265, 95)">
        <rect x="0" y="0" width="65" height="60" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="32" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">Á (/)</text>
        <text x="32" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">Udaelu</text>
        <text x="32" y="54" font-size="9" font-family="sans-serif" fill="#7f1d1d" text-anchor="middle">ákwá (egg)</text>

        <rect x="75" y="0" width="65" height="60" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="107" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">À (\)</text>
        <text x="107" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">Udaala</text>
        <text x="107" y="54" font-size="9" font-family="sans-serif" fill="#172554" text-anchor="middle">àkwà (bed)</text>

        <rect x="150" y="0" width="65" height="60" rx="4" fill="#fef9c3" stroke="#ca8a04"/>
        <text x="182" y="24" font-size="18" font-family="sans-serif" font-weight="bold" fill="#a16207" text-anchor="middle">Ā (-)</text>
        <text x="182" y="42" font-size="10" font-family="sans-serif" font-weight="bold" fill="#854d0e" text-anchor="middle">Udansụda</text>
        <text x="182" y="54" font-size="9" font-family="sans-serif" fill="#713f12" text-anchor="middle">akwā (cloth)</text>
      </g>

      <!-- Cultural Presentation: Ọjị Igbo (Kola Nut) & Ofo -->
      <rect x="25" y="180" width="455" height="125" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(45, 195)">
        <!-- Wood Okwa Oji bowl -->
        <ellipse cx="50" cy="55" rx="45" ry="25" fill="#a16207" stroke="#78350f" stroke-width="2"/>
        <ellipse cx="50" cy="50" rx="40" ry="20" fill="#fde68a" stroke="#a16207" stroke-width="1.5"/>
        <!-- Kola lobes (Ọjị) -->
        <circle cx="40" cy="48" r="10" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1"/>
        <circle cx="58" cy="46" r="10" fill="#dc2626" stroke="#7f1d1d" stroke-width="1"/>
        <circle cx="50" cy="56" r="9" fill="#991b1b" stroke="#7f1d1d" stroke-width="1"/>
        <text x="50" y="90" font-size="10" font-family="sans-serif" font-weight="bold" fill="#78350f" text-anchor="middle">Ọjị Igbo na Ọkwa</text>
      </g>
      <text x="160" y="210" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0f172a">Ilu na Nkọwa Akara Udaolu n'Asụsụ Igbo:</text>
      <text x="160" y="235" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#b91c1c">Ákwá</tspan> (Udaelu + Udaelu) = Egg (Àkwá ọkụkọ)</text>
      <text x="160" y="255" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#1d4ed8">Àkwà</tspan> (Udaala + Udaala) = Bed / Bridge (Ebe a na-arahụ ụra)</text>
      <text x="160" y="275" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#a16207">Akwà</tspan> (Ndị ọzọ) = Cloth / Crying (Akwakwa / Uwe)</text>
      <text x="160" y="295" font-size="10" font-family="sans-serif" font-style="italic" fill="#15803d">"Onye wetara ọjị, wetara ndụ" — Ilu Igbo</text>
    </svg>`
  },

  // 17. HARSHEN HAUSA: BAKIN HAUSA DA WASULA
  {
    id: 'diag_hausa_alphabet_symbols',
    title: 'Haruffan Hausa da Wasula (Bakin Hausa & Wasula Biyar)',
    category: 'Humanities',
    subject: 'Harshen Hausa',
    level: 'jss-1',
    caption: "Figure 17: Tsarin Haruffan Hausa: Wasula 5 (a, e, i, o, u), Tagwan Wasula (ai, au), Haruffa Masu Lankwasa (ɓ, ɗ, ƙ, 'y) da Tambarin Arewa.",
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#fef2f2" rx="8"/>
      <!-- Header -->
      <rect x="20" y="15" width="460" height="32" rx="6" fill="#991b1b"/>
      <text x="250" y="36" font-size="13" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">HARSHEN HAUSA — TSARIN HARUFFA DA WASULA</text>

      <!-- Wasula Section -->
      <rect x="25" y="60" width="215" height="110" rx="6" fill="#ffffff" stroke="#b91c1c" stroke-width="1.5"/>
      <text x="35" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#991b1b">Wasula Guda Biyar (5 Vowels):</text>
      <text x="35" y="105" font-size="18" font-family="sans-serif" font-weight="bold" fill="#15803d">a,   e,   i,   o,   u</text>
      <line x1="35" y1="118" x2="230" y2="118" stroke="#fee2e2"/>
      <text x="35" y="136" font-size="11" font-family="sans-serif" font-weight="bold" fill="#991b1b">Tagwan Wasula (Diphthongs):</text>
      <text x="35" y="158" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0369a1">ai,   au   (misali: mai, kauye)</text>

      <!-- Haruffa Masu Ƙugiya -->
      <rect x="255" y="60" width="225" height="110" rx="6" fill="#ffffff" stroke="#991b1b" stroke-width="1.5"/>
      <text x="265" y="80" font-size="11" font-family="sans-serif" font-weight="bold" fill="#7f1d1d">Haruffa Masu Ƙugiya (Hooked Letters):</text>
      <g transform="translate(265, 95)">
        <rect x="0" y="0" width="50" height="55" rx="4" fill="#fee2e2" stroke="#b91c1c"/>
        <text x="25" y="35" font-size="22" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">ɓ</text>
        <rect x="55" y="0" width="50" height="55" rx="4" fill="#fee2e2" stroke="#b91c1c"/>
        <text x="80" y="35" font-size="22" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">ɗ</text>
        <rect x="110" y="0" width="50" height="55" rx="4" fill="#fee2e2" stroke="#b91c1c"/>
        <text x="135" y="35" font-size="22" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">ƙ</text>
        <rect x="165" y="0" width="55" height="55" rx="4" fill="#fee2e2" stroke="#b91c1c"/>
        <text x="192" y="35" font-size="20" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">'y</text>
      </g>

      <!-- Cultural Symbol: Dagin Arewa (Northern Knot) -->
      <rect x="25" y="180" width="455" height="125" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(50, 192)">
        <!-- Knot polygon/path -->
        <rect x="10" y="10" width="65" height="65" fill="#fef3c7" stroke="#b45309" stroke-width="3" rx="8"/>
        <circle cx="20" cy="20" r="10" fill="#dc2626"/>
        <circle cx="65" cy="20" r="10" fill="#dc2626"/>
        <circle cx="20" cy="65" r="10" fill="#dc2626"/>
        <circle cx="65" cy="65" r="10" fill="#dc2626"/>
        <circle cx="42.5" cy="42.5" r="8" fill="#15803d"/>
        <text x="42.5" y="95" font-size="10" font-family="sans-serif" font-weight="bold" fill="#78350f" text-anchor="middle">Dagin Arewa</text>
      </g>
      <text x="160" y="210" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0f172a">Misalan Kalmomi da Haruffan Ƙugiya:</text>
      <text x="160" y="235" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#991b1b">ɓ</tspan> — ɓarawo (thief), ɓauna (buffalo)</text>
      <text x="160" y="255" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#991b1b">ɗ</tspan> — ɗalibi (student), ɗaki (room)</text>
      <text x="160" y="275" font-size="11" font-family="sans-serif" fill="#334155"><tspan font-weight="bold" fill="#991b1b">ƙ</tspan> — ƙofa (door), ƙasa (earth/country)</text>
      <text x="160" y="295" font-size="10" font-family="sans-serif" font-style="italic" fill="#047857">Karin Magana: "Kowace ƙwarya tana da murfinta"</text>
    </svg>`
  },

  // 18. GEOGRAPHY: THE GLOBAL WATER CYCLE
  {
    id: 'diag_water_cycle',
    title: 'The Global Hydrological Water Cycle',
    category: 'Social Studies',
    subject: 'Geography',
    level: 'jss-1',
    caption: 'Figure 18: Complete hydrological cycle illustrating Evaporation, Transpiration, Cloud Condensation, Rain Precipitation, Surface Runoff, and Groundwater Infiltration.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f0fdfa" rx="8"/>
      <!-- Sun -->
      <circle cx="60" cy="50" r="28" fill="#facc15" stroke="#eab308" stroke-width="2"/>
      <g stroke="#facc15" stroke-width="2">
        <line x1="60" y1="12" x2="60" y2="2"/>
        <line x1="60" y1="88" x2="60" y2="98"/>
        <line x1="22" y1="50" x2="12" y2="50"/>
        <line x1="98" y1="50" x2="108" y2="50"/>
      </g>
      <text x="60" y="54" font-size="10" font-family="sans-serif" font-weight="bold" fill="#713f12" text-anchor="middle">Solar Energy</text>

      <!-- Mountains and Land Landscape -->
      <polygon points="180,260 270,120 360,260" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
      <polygon points="310,260 390,150 470,260" fill="#64748b" stroke="#475569" stroke-width="2"/>
      <!-- Green Vegetation & Ground -->
      <rect x="0" y="240" width="500" height="80" fill="#86efac"/>
      <polygon points="0,240 180,240 220,270 0,270" fill="#22c55e"/>
      <!-- Ocean Reservoir (Left) -->
      <rect x="0" y="250" width="160" height="70" fill="#38bdf8"/>
      <text x="80" y="285" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">Ocean / Atlantic</text>

      <!-- Clouds (Condensation) -->
      <g fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5">
        <ellipse cx="230" cy="65" rx="35" ry="18"/>
        <ellipse cx="255" cy="55" rx="30" ry="20"/>
        <ellipse cx="280" cy="65" rx="35" ry="18"/>
      </g>
      <text x="255" y="68" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Condensation (Clouds)</text>

      <!-- Precipitation (Rain) -->
      <g stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 4">
        <line x1="230" y1="90" x2="220" y2="140"/>
        <line x1="255" y1="90" x2="245" y2="140"/>
        <line x1="280" y1="90" x2="270" y2="140"/>
      </g>
      <text x="320" y="115" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0284c7">Precipitation (Rainfall)</text>

      <!-- Evaporation Arrows -->
      <g stroke="#0284c7" stroke-width="2">
        <line x1="70" y1="235" x2="70" y2="130"/>
        <polygon points="65,135 70,120 75,135" fill="#0284c7"/>
        <line x1="120" y1="235" x2="120" y2="140"/>
        <polygon points="115,145 120,130 125,145" fill="#0284c7"/>
      </g>
      <text x="95" y="180" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0284c7" text-anchor="middle">Evaporation</text>

      <!-- River Runoff & Infiltration -->
      <path d="M 330,220 Q 250,230 160,260" fill="none" stroke="#0284c7" stroke-width="4"/>
      <text x="260" y="245" font-size="10" font-family="sans-serif" font-weight="bold" fill="#0369a1">River Surface Runoff</text>
      <!-- Groundwater -->
      <rect x="160" y="295" width="340" height="25" fill="#ca8a04" fill-opacity="0.3"/>
      <text x="330" y="312" font-size="10" font-family="sans-serif" font-weight="bold" fill="#713f12" text-anchor="middle">Groundwater Infiltration & Aquifer</text>
    </svg>`
  },

  // 19. FINANCIAL ACCOUNTING / COMMERCE: DOUBLE-ENTRY T-ACCOUNT
  {
    id: 'diag_double_entry_ledger',
    title: 'Double-Entry Bookkeeping Ledger (T-Account & Balance Sheet Equation)',
    category: 'Commercial',
    subject: 'Financial Accounting',
    level: 'sss-1',
    caption: 'Figure 19: The Double-Entry Bookkeeping System: Debit (Dr.) on Left, Credit (Cr.) on Right, governed by Assets = Capital + Liabilities.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Header Banner -->
      <rect x="25" y="15" width="450" height="34" rx="6" fill="#1e293b"/>
      <text x="250" y="37" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">GENERAL LEDGER: CASH ACCOUNT (T-ACCOUNT)</text>

      <!-- Giant T-Account Structure -->
      <line x1="50" y1="70" x2="450" y2="70" stroke="#0f172a" stroke-width="3"/>
      <line x1="250" y1="70" x2="250" y2="225" stroke="#0f172a" stroke-width="3"/>

      <!-- Dr. Left Side -->
      <text x="70" y="65" font-size="13" font-family="sans-serif" font-weight="bold" fill="#15803d">Dr. (DEBIT - RECEIVER / ASSETS IN)</text>
      <text x="60" y="95" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">Date | Details | ₦ Amount</text>
      <text x="60" y="120" font-size="10" font-family="sans-serif" fill="#475569">Jan 02 | Capital Introduced | ₦500,000</text>
      <text x="60" y="140" font-size="10" font-family="sans-serif" fill="#475569">Jan 08 | Sales (Cash)       | ₦180,000</text>
      <text x="60" y="160" font-size="10" font-family="sans-serif" fill="#475569">Jan 15 | Debtor (Emeka Ltd) | ₦75,000</text>
      <line x1="50" y1="190" x2="240" y2="190" stroke="#cbd5e1"/>
      <text x="60" y="210" font-size="11" font-family="sans-serif" font-weight="bold" fill="#15803d">Total Debits: ₦755,000</text>

      <!-- Cr. Right Side -->
      <text x="270" y="65" font-size="13" font-family="sans-serif" font-weight="bold" fill="#b91c1c">Cr. (CREDIT - GIVER / OUTFLOWS)</text>
      <text x="260" y="95" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">Date | Details | ₦ Amount</text>
      <text x="260" y="120" font-size="10" font-family="sans-serif" fill="#475569">Jan 05 | Purchases (Stock)  | ₦220,000</text>
      <text x="260" y="140" font-size="10" font-family="sans-serif" fill="#475569">Jan 12 | Office Rent        | ₦90,000</text>
      <text x="260" y="160" font-size="10" font-family="sans-serif" fill="#475569">Jan 28 | Balance c/d        | ₦445,000</text>
      <line x1="260" y1="190" x2="450" y2="190" stroke="#cbd5e1"/>
      <text x="260" y="210" font-size="11" font-family="sans-serif" font-weight="bold" fill="#b91c1c">Total Credits: ₦755,000</text>

      <!-- Fundamental Accounting Rule Box -->
      <rect x="25" y="235" width="450" height="70" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
      <text x="250" y="255" font-size="12" font-family="sans-serif" font-weight="bold" fill="#065f46" text-anchor="middle">
        THE GOLDEN RULES & ACCOUNTING EQUATION
      </text>
      <text x="250" y="275" font-size="11" font-family="sans-serif" font-weight="bold" fill="#047857" text-anchor="middle">
        ASSETS = CAPITAL + LIABILITIES  (Balance Sheet Equilibrium)
      </text>
      <text x="250" y="293" font-size="10" font-family="sans-serif" fill="#065f46" text-anchor="middle">
        "Debit what comes in, Credit what goes out. Debit the receiver, Credit the giver."
      </text>
    </svg>`
  },

  // 20. CIVIC EDUCATION / GOVERNMENT: 3 ARMS OF GOVERNMENT & CHECKS
  {
    id: 'diag_nigerian_arms_checks',
    title: 'Separation of Powers & Constitutional Checks in Nigeria',
    category: 'Humanities',
    subject: 'Government',
    level: 'sss-1',
    caption: 'Figure 20: The tripartite separation of powers under the 1999 Constitution: Executive, Legislature, and Judiciary with constitutional checks and balances.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Constitution Apex -->
      <rect x="160" y="15" width="180" height="35" rx="6" fill="#15803d"/>
      <text x="250" y="37" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">1999 CONSTITUTION OF NIGERIA</text>

      <!-- Three Pillars -->
      <!-- 1. Executive -->
      <rect x="20" y="80" width="135" height="150" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
      <text x="87" y="105" font-size="12" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">EXECUTIVE</text>
      <text x="87" y="125" font-size="9" font-family="sans-serif" font-weight="bold" fill="#15803d" text-anchor="middle">President & Governors</text>
      <text x="87" y="150" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Enforces Laws</text>
      <text x="87" y="170" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Command Armed Forces</text>
      <text x="87" y="190" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Prepares Annual Budget</text>
      <rect x="35" y="205" width="105" height="18" rx="4" fill="#16a34a"/>
      <text x="87" y="218" font-size="8" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Veto / Assent Power</text>

      <!-- 2. Legislature -->
      <rect x="180" y="80" width="140" height="150" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="250" y="105" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">LEGISLATURE</text>
      <text x="250" y="125" font-size="9" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">National Assembly</text>
      <text x="250" y="150" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Enacts Statutory Laws</text>
      <text x="250" y="170" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Passes Federal Budget</text>
      <text x="250" y="190" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Ministerial Screening</text>
      <rect x="195" y="205" width="110" height="18" rx="4" fill="#2563eb"/>
      <text x="250" y="218" font-size="8" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Power of Impeachment</text>

      <!-- 3. Judiciary -->
      <rect x="345" y="80" width="135" height="150" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="412" y="105" font-size="12" font-family="sans-serif" font-weight="bold" fill="#92400e" text-anchor="middle">JUDICIARY</text>
      <text x="412" y="125" font-size="9" font-family="sans-serif" font-weight="bold" fill="#b45309" text-anchor="middle">Supreme Court of Nig.</text>
      <text x="412" y="150" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Interprets the Law</text>
      <text x="412" y="170" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Judicial Review</text>
      <text x="412" y="190" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">• Protects Fundamental Rights</text>
      <rect x="360" y="205" width="105" height="18" rx="4" fill="#d97706"/>
      <text x="412" y="218" font-size="8" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">Declares Acts Ultra Vires</text>

      <!-- Checks & Balances arrows / footer -->
      <rect x="20" y="245" width="460" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="250" y="265" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">
        DOCTRINE OF CHECKS AND BALANCES (BARON DE MONTESQUIEU)
      </text>
      <text x="250" y="285" font-size="10" font-family="sans-serif" fill="#475569" text-anchor="middle">
        No single arm possesses absolute authority; each branch restrains the others to prevent tyranny.
      </text>
    </svg>`
  },

  // 21. CHRISTIAN RELIGIOUS STUDIES (CRS): THE FRUIT OF THE SPIRIT TREE
  {
    id: 'diag_fruit_of_spirit_tree',
    title: 'The Fruit of the Holy Spirit (Galatians 5:22–23)',
    category: 'Humanities',
    subject: 'Christian Religious Studies',
    level: 'jss-2',
    caption: 'Figure 21: Biblical pedagogical tree rooted in Christ and the Holy Spirit, bearing the 9 virtues of Christian character.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#fefce8" rx="8"/>
      <!-- Header -->
      <rect x="25" y="15" width="450" height="32" rx="6" fill="#78350f"/>
      <text x="250" y="36" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">CRS — THE FRUIT OF THE SPIRIT (GALATIANS 5:22-23)</text>

      <!-- Tree Canopy & Trunk -->
      <path d="M 230,280 L 230,170 C 190,160 110,130 110,80 C 110,40 170,40 200,60 C 230,30 290,30 320,60 C 360,40 400,60 390,110 C 390,150 310,160 270,170 L 270,280 Z" fill="#dcfce7" stroke="#15803d" stroke-width="2.5"/>
      <rect x="225" y="170" width="50" height="110" fill="#a16207" stroke="#78350f" stroke-width="2"/>
      
      <!-- Roots -->
      <line x1="230" y1="280" x2="190" y2="305" stroke="#78350f" stroke-width="4"/>
      <line x1="250" y1="280" x2="250" y2="310" stroke="#78350f" stroke-width="4"/>
      <line x1="270" y1="280" x2="310" y2="305" stroke="#78350f" stroke-width="4"/>
      <text x="250" y="318" font-size="10" font-family="sans-serif" font-weight="bold" fill="#78350f" text-anchor="middle">Rooted in Faith & Prayer</text>

      <!-- 9 Fruits (Golden Apples) with labels -->
      <!-- Row 1 -->
      <circle cx="150" cy="80" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
      <text x="150" y="84" font-size="10" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">Love</text>

      <circle cx="210" cy="65" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <text x="210" y="69" font-size="10" font-family="sans-serif" font-weight="bold" fill="#92400e" text-anchor="middle">Joy</text>

      <circle cx="270" cy="65" r="18" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
      <text x="270" y="69" font-size="10" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">Peace</text>

      <circle cx="335" cy="80" r="20" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.5"/>
      <text x="335" y="84" font-size="9" font-family="sans-serif" font-weight="bold" fill="#6b21a8" text-anchor="middle">Patience</text>

      <!-- Row 2 -->
      <circle cx="160" cy="125" r="20" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
      <text x="160" y="129" font-size="9" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">Kindness</text>

      <circle cx="225" cy="115" r="20" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
      <text x="225" y="119" font-size="9" font-family="sans-serif" font-weight="bold" fill="#9a3412" text-anchor="middle">Goodness</text>

      <circle cx="290" cy="115" r="22" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5"/>
      <text x="290" y="119" font-size="8" font-family="sans-serif" font-weight="bold" fill="#3730a3" text-anchor="middle">Faithfulness</text>

      <circle cx="350" cy="130" r="20" fill="#fce7f3" stroke="#db2777" stroke-width="1.5"/>
      <text x="350" y="134" font-size="8" font-family="sans-serif" font-weight="bold" fill="#9d174d" text-anchor="middle">Gentleness</text>

      <!-- Central Fruit -->
      <circle cx="250" cy="155" r="22" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="159" font-size="8" font-family="sans-serif" font-weight="bold" fill="#854d0e" text-anchor="middle">Self-Control</text>

      <!-- Scriptural Footer -->
      <rect x="25" y="240" width="180" height="35" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="115" y="255" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Galatians 5:23</text>
      <text x="115" y="268" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">"Against such there is no law."</text>
    </svg>`
  },

  // 22. ISLAMIC RELIGIOUS STUDIES (IRS): THE FIVE PILLARS OF ISLAM
  {
    id: 'diag_five_pillars_islam',
    title: 'The Five Pillars of Islam (Arkan al-Islam)',
    category: 'Humanities',
    subject: 'Islamic Religious Studies',
    level: 'jss-1',
    caption: 'Figure 22: Architectural schematic of the Five Pillars of Islam: Shahadah, Salah, Zakat, Sawm, and Hajj supporting Islamic Faith.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="8"/>
      <!-- Arch Pediment (Top Roof) -->
      <path d="M 30,70 Q 250,15 470,70 L 470,90 L 30,90 Z" fill="#15803d" stroke="#166534" stroke-width="2"/>
      <text x="250" y="55" font-size="14" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">ARKAN AL-ISLAM (THE FIVE PILLARS)</text>
      <text x="250" y="75" font-size="10" font-family="sans-serif" font-weight="bold" fill="#bbf7d0" text-anchor="middle">Foundation of Muslim Faith & Moral Character</text>

      <!-- 5 Pillars -->
      <!-- 1. Shahadah -->
      <rect x="35" y="95" width="75" height="165" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <rect x="35" y="95" width="75" height="25" fill="#dcfce7"/>
      <text x="72" y="112" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">1. SHAHADAH</text>
      <text x="72" y="140" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Declaration</text>
      <text x="72" y="155" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">of Faith</text>
      <text x="72" y="185" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Tawheed</text>
      <text x="72" y="200" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">(One God,</text>
      <text x="72" y="215" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Prophet SAW)</text>

      <!-- 2. Salah -->
      <rect x="125" y="95" width="75" height="165" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <rect x="125" y="95" width="75" height="25" fill="#dcfce7"/>
      <text x="162" y="112" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">2. SALAH</text>
      <text x="162" y="140" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Daily</text>
      <text x="162" y="155" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Prayers</text>
      <text x="162" y="185" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">5 Obligatory</text>
      <text x="162" y="200" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Prayers</text>
      <text x="162" y="215" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">(Facing Qiblah)</text>

      <!-- 3. Zakat -->
      <rect x="215" y="95" width="75" height="165" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <rect x="215" y="95" width="75" height="25" fill="#dcfce7"/>
      <text x="252" y="112" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">3. ZAKAT</text>
      <text x="252" y="140" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Almsgiving /</text>
      <text x="252" y="155" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Charity</text>
      <text x="252" y="185" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">2.5% Wealth</text>
      <text x="252" y="200" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">to the Needy</text>
      <text x="252" y="215" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">&amp; Poor</text>

      <!-- 4. Sawm -->
      <rect x="305" y="95" width="75" height="165" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <rect x="305" y="95" width="75" height="25" fill="#dcfce7"/>
      <text x="342" y="112" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">4. SAWM</text>
      <text x="342" y="140" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Fasting in</text>
      <text x="342" y="155" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Ramadan</text>
      <text x="342" y="185" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Dawn to Sunset</text>
      <text x="342" y="200" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Self-Discipline</text>
      <text x="342" y="215" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">&amp; Spiritual Focus</text>

      <!-- 5. Hajj -->
      <rect x="395" y="95" width="75" height="165" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <rect x="395" y="95" width="75" height="25" fill="#dcfce7"/>
      <text x="432" y="112" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">5. HAJJ</text>
      <text x="432" y="140" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Pilgrimage to</text>
      <text x="432" y="155" font-size="9" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">Makkah</text>
      <text x="432" y="185" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">Once in Lifetime</text>
      <text x="432" y="200" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">(if able and</text>
      <text x="432" y="215" font-size="8" font-family="sans-serif" fill="#475569" text-anchor="middle">affording)</text>

      <!-- Base Plinth -->
      <rect x="20" y="265" width="465" height="35" rx="4" fill="#15803d"/>
      <text x="250" y="287" font-size="11" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">IMAN &amp; AMAL (FAITH AND RIGHTEOUS DEEDS)</text>
    </svg>`
  },

  // 23. BASIC TECHNOLOGY: THREE CLASSES OF LEVERS
  {
    id: 'diag_three_classes_levers',
    title: 'The Three Classes of Levers & Mechanical Advantage',
    category: 'Technology',
    subject: 'Basic Technology',
    level: 'jss-2',
    caption: 'Figure 23: Engineering schematic comparing Class 1 (Fulcrum in middle), Class 2 (Load in middle), and Class 3 (Effort in middle) Levers using the FLE mnemonic.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f8fafc" rx="8"/>
      <!-- Header -->
      <rect x="25" y="15" width="450" height="32" rx="6" fill="#0f172a"/>
      <text x="250" y="36" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">BASIC TECHNOLOGY — 3 CLASSES OF LEVERS (FLE RULE)</text>

      <!-- Class 1 Lever (Fulcrum in Middle) -->
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="440" height="65" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="15" y="22" font-size="11" font-family="sans-serif" font-weight="bold" fill="#15803d">CLASS 1: FULCRUM IN MIDDLE (e.g., Crowbar, Scissors, See-Saw)</text>
        <line x1="30" y1="42" x2="380" y2="42" stroke="#334155" stroke-width="4"/>
        <polygon points="190,42 205,60 175,60" fill="#dc2626"/>
        <text x="190" y="36" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Fulcrum (F)</text>
        <line x1="50" y1="25" x2="50" y2="42" stroke="#2563eb" stroke-width="3"/>
        <text x="50" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Load (L)</text>
        <line x1="360" y1="42" x2="360" y2="60" stroke="#16a34a" stroke-width="3"/>
        <text x="360" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#16a34a" text-anchor="middle">Effort (E) ↓</text>
      </g>

      <!-- Class 2 Lever (Load in Middle) -->
      <g transform="translate(30, 140)">
        <rect x="0" y="0" width="440" height="65" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="15" y="22" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0284c7">CLASS 2: LOAD IN MIDDLE (e.g., Wheelbarrow, Nutcracker)</text>
        <line x1="30" y1="42" x2="380" y2="42" stroke="#334155" stroke-width="4"/>
        <polygon points="40,42 55,60 25,60" fill="#dc2626"/>
        <text x="40" y="36" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Fulcrum (F)</text>
        <line x1="200" y1="25" x2="200" y2="42" stroke="#2563eb" stroke-width="3"/>
        <text x="200" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Load (L) ↓</text>
        <line x1="360" y1="58" x2="360" y2="42" stroke="#16a34a" stroke-width="3"/>
        <text x="360" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#16a34a" text-anchor="middle">Effort (E) ↑</text>
      </g>

      <!-- Class 3 Lever (Effort in Middle) -->
      <g transform="translate(30, 220)">
        <rect x="0" y="0" width="440" height="65" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="15" y="22" font-size="11" font-family="sans-serif" font-weight="bold" fill="#d97706">CLASS 3: EFFORT IN MIDDLE (e.g., Sugar Tongs, Fishing Rod, Forearm)</text>
        <line x1="30" y1="42" x2="380" y2="42" stroke="#334155" stroke-width="4"/>
        <polygon points="40,42 55,60 25,60" fill="#dc2626"/>
        <text x="40" y="36" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Fulcrum (F)</text>
        <line x1="200" y1="58" x2="200" y2="42" stroke="#16a34a" stroke-width="3"/>
        <text x="200" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#16a34a" text-anchor="middle">Effort (E) ↑</text>
        <line x1="360" y1="25" x2="360" y2="42" stroke="#2563eb" stroke-width="3"/>
        <text x="360" y="20" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Load (L) ↓</text>
      </g>
      <text x="250" y="305" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">
        Mnemonic: 1-2-3 = F-L-E (Fulcrum in center = 1st, Load in center = 2nd, Effort in center = 3rd)
      </text>
    </svg>`
  },

  // 24. HOME ECONOMICS / FOOD & NUTRITION: BALANCED DIET PLATE
  {
    id: 'diag_balanced_diet_plate',
    title: 'The Balanced Diet Plate & 6 Nigerian Nutrient Groups',
    category: 'Science',
    subject: 'Home Economics',
    level: 'jss-1',
    caption: 'Figure 24: Nutritional plate model showing the 6 dietary classes for Nigerian secondary schools: Carbohydrates, Proteins, Fats/Oils, Vitamins, Minerals, and Water.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#fffbeb" rx="8"/>
      <!-- Header -->
      <rect x="25" y="15" width="450" height="32" rx="6" fill="#b45309"/>
      <text x="250" y="36" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">NUTRITIONAL GUIDE: THE HEALTHY BALANCED DIET PLATE</text>

      <!-- Plate Outer Rim -->
      <circle cx="160" cy="175" r="110" fill="#ffffff" stroke="#cbd5e1" stroke-width="6"/>
      <circle cx="160" cy="175" r="95" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>

      <!-- Plate Sectors -->
      <!-- Carbohydrates (Yam, Cassava, Rice) - 35% -->
      <path d="M 160,175 L 160,80 A 95,95 0 0,1 255,175 Z" fill="#fde68a" stroke="#d97706"/>
      <text x="205" y="130" font-size="10" font-family="sans-serif" font-weight="bold" fill="#92400e">Carbohydrates</text>
      <text x="205" y="145" font-size="9" font-family="sans-serif" fill="#b45309">Yam, Rice, Garri</text>

      <!-- Vegetables & Fruits (Vitamins/Minerals) - 35% -->
      <path d="M 160,175 L 255,175 A 95,95 0 0,1 110,255 Z" fill="#bbf7d0" stroke="#16a34a"/>
      <text x="180" y="215" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534">Vitamins &amp; Fibers</text>
      <text x="180" y="230" font-size="9" font-family="sans-serif" fill="#15803d">Efo, Ugwu, Oranges</text>

      <!-- Proteins (Beans, Fish, Eggs) - 20% -->
      <path d="M 160,175 L 110,255 A 95,95 0 0,1 75,130 Z" fill="#fed7aa" stroke="#ea580c"/>
      <text x="100" y="185" font-size="10" font-family="sans-serif" font-weight="bold" fill="#9a3412">Proteins</text>
      <text x="100" y="198" font-size="8" font-family="sans-serif" fill="#c2410c">Beans, Fish, Egg</text>

      <!-- Fats & Oils (Palm oil, Butter) - 10% -->
      <path d="M 160,175 L 75,130 A 95,95 0 0,1 160,80 Z" fill="#fee2e2" stroke="#dc2626"/>
      <text x="120" y="110" font-size="9" font-family="sans-serif" font-weight="bold" fill="#991b1b">Fats &amp; Oils</text>

      <!-- Water Glass on top right -->
      <rect x="300" y="65" width="45" height="60" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <rect x="302" y="85" width="41" height="38" fill="#38bdf8" fill-opacity="0.6"/>
      <text x="322" y="140" font-size="10" font-family="sans-serif" font-weight="bold" fill="#0369a1" text-anchor="middle">Clean Water</text>

      <!-- Nutritive Breakdown List -->
      <rect x="300" y="150" width="175" height="145" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="310" y="170" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a">6 Classes of Nutrients:</text>
      <text x="310" y="190" font-size="9.5" font-family="sans-serif" fill="#334155">1. Carbohydrates (Energy)</text>
      <text x="310" y="210" font-size="9.5" font-family="sans-serif" fill="#334155">2. Proteins (Growth/Repair)</text>
      <text x="310" y="230" font-size="9.5" font-family="sans-serif" fill="#334155">3. Fats &amp; Oils (Warmth)</text>
      <text x="310" y="250" font-size="9.5" font-family="sans-serif" fill="#334155">4. Vitamins (Immunity)</text>
      <text x="310" y="270" font-size="9.5" font-family="sans-serif" fill="#334155">5. Minerals (Bone/Blood)</text>
      <text x="310" y="288" font-size="9.5" font-family="sans-serif" fill="#334155">6. Water (Digestion/Temp)</text>
    </svg>`
  },

  // 25. COMPUTER STUDIES / ICT: VON NEUMANN ARCHITECTURE
  {
    id: 'diag_computer_hardware_architecture',
    title: 'Computer Hardware Architecture & Central Processing Unit (CPU)',
    category: 'Technology',
    subject: 'Computer Studies',
    level: 'jss-2',
    caption: 'Figure 25: Computer Hardware Architecture block diagram: Input, Central Processing Unit (ALU + Control Unit), Primary Memory, Secondary Storage, and Output.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#f1f5f9" rx="8"/>
      <!-- Header -->
      <rect x="25" y="15" width="450" height="32" rx="6" fill="#0f172a"/>
      <text x="250" y="36" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">COMPUTER HARDWARE &amp; VON NEUMANN ARCHITECTURE</text>

      <!-- Input Unit (Left) -->
      <rect x="20" y="105" width="90" height="90" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="65" y="135" font-size="11" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">INPUT UNIT</text>
      <text x="65" y="155" font-size="9" font-family="sans-serif" fill="#3b82f6" text-anchor="middle">Keyboard,</text>
      <text x="65" y="170" font-size="9" font-family="sans-serif" fill="#3b82f6" text-anchor="middle">Mouse, Scanner</text>

      <!-- CPU Center Big Container -->
      <rect x="145" y="65" width="210" height="175" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="250" y="85" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">CENTRAL PROCESSING UNIT (CPU)</text>

      <!-- Inside CPU: Control Unit (CU) -->
      <rect x="160" y="98" width="180" height="40" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
      <text x="250" y="118" font-size="10" font-family="sans-serif" font-weight="bold" fill="#991b1b" text-anchor="middle">Control Unit (CU)</text>
      <text x="250" y="130" font-size="8" font-family="sans-serif" fill="#7f1d1d" text-anchor="middle">Directs instructions &amp; timing</text>

      <!-- Inside CPU: Arithmetic Logic Unit (ALU) -->
      <rect x="160" y="145" width="180" height="40" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <text x="250" y="165" font-size="10" font-family="sans-serif" font-weight="bold" fill="#92400e" text-anchor="middle">Arithmetic Logic Unit (ALU)</text>
      <text x="250" y="177" font-size="8" font-family="sans-serif" fill="#78350f" text-anchor="middle">Calculations (+,-,*,/) &amp; Logic (&lt;,&gt;,=)</text>

      <!-- Inside CPU: Registers / Cache -->
      <rect x="160" y="192" width="180" height="35" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
      <text x="250" y="212" font-size="10" font-family="sans-serif" font-weight="bold" fill="#334155" text-anchor="middle">Internal Registers &amp; Cache</text>

      <!-- Output Unit (Right) -->
      <rect x="390" y="105" width="90" height="90" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
      <text x="435" y="135" font-size="11" font-family="sans-serif" font-weight="bold" fill="#166534" text-anchor="middle">OUTPUT UNIT</text>
      <text x="435" y="155" font-size="9" font-family="sans-serif" fill="#15803d" text-anchor="middle">Monitor,</text>
      <text x="435" y="170" font-size="9" font-family="sans-serif" fill="#15803d" text-anchor="middle">Printer, Audio</text>

      <!-- Data Flow Arrows -->
      <line x1="110" y1="150" x2="145" y2="150" stroke="#0f172a" stroke-width="3"/>
      <polygon points="140,145 145,150 140,155" fill="#0f172a"/>

      <line x1="355" y1="150" x2="390" y2="150" stroke="#0f172a" stroke-width="3"/>
      <polygon points="385,145 390,150 385,155" fill="#0f172a"/>

      <!-- Main Memory & Storage (Bottom) -->
      <rect x="70" y="255" width="160" height="50" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="150" y="275" font-size="10" font-family="sans-serif" font-weight="bold" fill="#312e81" text-anchor="middle">PRIMARY MEMORY</text>
      <text x="150" y="292" font-size="9" font-family="sans-serif" fill="#4338ca" text-anchor="middle">RAM (Volatile) &amp; ROM</text>

      <rect x="270" y="255" width="160" height="50" rx="6" fill="#fae8ff" stroke="#a21caf" stroke-width="2"/>
      <text x="350" y="275" font-size="10" font-family="sans-serif" font-weight="bold" fill="#701a75" text-anchor="middle">SECONDARY STORAGE</text>
      <text x="350" y="292" font-size="9" font-family="sans-serif" fill="#86198f" text-anchor="middle">Hard Drive, SSD, Flash USB</text>

      <line x1="200" y1="240" x2="200" y2="255" stroke="#4338ca" stroke-width="2"/>
      <line x1="300" y1="240" x2="300" y2="255" stroke="#a21caf" stroke-width="2"/>
    </svg>`
  },

  // 26. PHYSICAL & HEALTH EDUCATION (PHE): HUMAN CIRCULATORY & PULSE SYSTEM
  {
    id: 'diag_circulatory_pulse_system',
    title: 'Cardiovascular Circulatory System & Pulse Measurement Sites',
    category: 'Science',
    subject: 'Physical and Health Education',
    level: 'jss-2',
    caption: 'Figure 26: Human circulatory system showing 4-chambered heart pump, Oxygenated (Arterial Red) and Deoxygenated (Venous Blue) blood flow, and Radial/Carotid pulse check sites.',
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-72">
      <rect width="100%" height="100%" fill="#fef2f2" rx="8"/>
      <!-- Header -->
      <rect x="25" y="15" width="450" height="32" rx="6" fill="#991b1b"/>
      <text x="250" y="36" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">PHE — CARDIOVASCULAR CIRCULATION &amp; TARGET HEART RATE</text>

      <!-- Central Heart Block -->
      <g transform="translate(180, 75)">
        <rect x="0" y="0" width="140" height="130" rx="12" fill="#ffffff" stroke="#b91c1c" stroke-width="3"/>
        <line x1="70" y1="0" x2="70" y2="130" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="0" y1="65" x2="140" y2="65" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Chambers -->
        <text x="35" y="35" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Right</text>
        <text x="35" y="48" font-size="9" font-family="sans-serif" fill="#1d4ed8" text-anchor="middle">Atrium</text>

        <text x="105" y="35" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Left</text>
        <text x="105" y="48" font-size="9" font-family="sans-serif" fill="#b91c1c" text-anchor="middle">Atrium</text>

        <text x="35" y="95" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb" text-anchor="middle">Right</text>
        <text x="35" y="108" font-size="9" font-family="sans-serif" fill="#1d4ed8" text-anchor="middle">Ventricle</text>

        <text x="105" y="95" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626" text-anchor="middle">Left</text>
        <text x="105" y="108" font-size="9" font-family="sans-serif" fill="#b91c1c" text-anchor="middle">Ventricle</text>
        <text x="70" y="145" font-size="11" font-family="sans-serif" font-weight="bold" fill="#7f1d1d" text-anchor="middle">4-Chamber Heart</text>
      </g>

      <!-- Pulmonary Circulation (Lungs Top) -->
      <ellipse cx="250" cy="55" rx="50" ry="12" fill="#dbeafe" stroke="#3b82f6"/>
      <text x="250" y="58" font-size="9" font-family="sans-serif" font-weight="bold" fill="#1e40af" text-anchor="middle">Lungs (Oxygenation)</text>

      <!-- Blood vessel pathways -->
      <!-- Arteries (Red Left Loop) -->
      <path d="M 320,140 C 400,140 400,240 320,240" fill="none" stroke="#dc2626" stroke-width="4"/>
      <text x="420" y="180" font-size="10" font-family="sans-serif" font-weight="bold" fill="#dc2626">Aorta &amp; Arteries</text>
      <text x="420" y="195" font-size="8" font-family="sans-serif" fill="#b91c1c">(Oxygen-Rich Red Blood)</text>

      <!-- Veins (Blue Right Loop) -->
      <path d="M 180,240 C 100,240 100,140 180,140" fill="none" stroke="#2563eb" stroke-width="4"/>
      <text x="30" y="180" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563eb">Vena Cava &amp; Veins</text>
      <text x="30" y="195" font-size="8" font-family="sans-serif" fill="#1d4ed8">(Deoxygenated Blue Blood)</text>

      <!-- Pulse Points & Exercise Rate Footer -->
      <rect x="25" y="245" width="450" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="250" y="265" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0f172a" text-anchor="middle">
        PULSE SITES: RADIAL (WRIST) &amp; CAROTID (NECK)
      </text>
      <text x="250" y="282" font-size="10" font-family="sans-serif" fill="#334155" text-anchor="middle">
        Normal Resting Heart Rate: 60–80 BPM | Target Athletic Cardio Zone: 120–160 BPM
      </text>
      <text x="250" y="297" font-size="9" font-family="sans-serif" font-style="italic" fill="#64748b" text-anchor="middle">
        Calculation: Max Heart Rate = 220 − Age (Years)
      </text>
    </svg>`
  }
];

/**
 * Smart diagram matching: returns the most pedagogically appropriate self-explanatory
 * illustration based on subject and topic keywords.
 */
export function getBestDiagramForSubject(subject: string, topic?: string): EducationalDiagram {
  const sub = (subject || '').toLowerCase();
  const top = (topic || '').toLowerCase();

  // 1. Topic-level precise matching:
  if (top.includes('yorùbá') || top.includes('yoruba') || top.includes('ábídí') || top.includes('abidi') || top.includes('fáwẹ́lì') || top.includes('faweli') || top.includes('ohùn') || top.includes('ilu') || top.includes('gangan')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_yoruba_alphabet_tones');
    if (d) return d;
  }
  if (top.includes('igbo') || top.includes('asụsụ') || top.includes('abịịdị') || top.includes('udaume') || top.includes('mgbochiume') || top.includes('ọjị') || top.includes('oji') || top.includes('akara udaolu')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_igbo_alphabet_symbols');
    if (d) return d;
  }
  if (top.includes('hausa') || top.includes('bakin hausa') || top.includes('wasula') || top.includes('kugiya') || top.includes('arewa') || top.includes('tambari')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_hausa_alphabet_symbols');
    if (d) return d;
  }
  if (top.includes('water cycle') || top.includes('hydrolog') || top.includes('rainfall') || top.includes('evaporation') || top.includes('condensation') || top.includes('river') || top.includes('drainage')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_water_cycle');
    if (d) return d;
  }
  if (top.includes('double entry') || top.includes('ledger') || top.includes('t-account') || top.includes('debit') || top.includes('credit') || top.includes('balance sheet') || top.includes('cash book') || top.includes('journal')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_double_entry_ledger');
    if (d) return d;
  }
  if (top.includes('lever') || top.includes('pulley') || top.includes('fulcrum') || top.includes('effort') || top.includes('mechanical advantage') || top.includes('machine')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_three_classes_levers');
    if (d) return d;
  }
  if (top.includes('diet') || top.includes('food') || top.includes('nutrient') || top.includes('nutrition') || top.includes('vitamin') || top.includes('carbohydrate') || top.includes('protein') || top.includes('meal')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_balanced_diet_plate');
    if (d) return d;
  }
  if (top.includes('cpu') || top.includes('hardware') || top.includes('von neumann') || top.includes('alu') || top.includes('memory') || top.includes('storage') || top.includes('computer')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_computer_hardware_architecture');
    if (d) return d;
  }
  if (top.includes('heart') || top.includes('circulat') || top.includes('pulse') || top.includes('blood') || top.includes('artery') || top.includes('vein') || top.includes('cardio') || top.includes('fitness')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_circulatory_pulse_system');
    if (d) return d;
  }
  if (top.includes('spirit') || top.includes('fruit') || top.includes('faith') || top.includes('christian') || top.includes('jesus') || top.includes('galatians') || top.includes('bible')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_fruit_of_spirit_tree');
    if (d) return d;
  }
  if (top.includes('pillar') || top.includes('islam') || top.includes('salah') || top.includes('zakat') || top.includes('ramadan') || top.includes('sawm') || top.includes('hajj') || top.includes('shahadah')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_five_pillars_islam');
    if (d) return d;
  }
  if (top.includes('arms of government') || top.includes('executive') || top.includes('judiciary') || top.includes('legislature') || top.includes('checks and balance') || top.includes('constitution') || top.includes('separation of power')) {
    const d = curriculumDiagrams.find(x => x.id === 'diag_nigerian_arms_checks');
    if (d) return d;
  }

  if (top.includes('cell') || top.includes('tissue') || top.includes('microscope')) {
    return top.includes('animal') ? curriculumDiagrams[1] : curriculumDiagrams[0];
  }
  if (top.includes('atom') || top.includes('element') || top.includes('electron') || top.includes('periodic')) {
    return curriculumDiagrams[2]; // Bohr model
  }
  if (top.includes('circuit') || top.includes('current') || top.includes('electricity') || top.includes('voltage')) {
    return curriculumDiagrams[4]; // DC Circuit
  }
  if (top.includes('light') || top.includes('reflection') || top.includes('refraction') || top.includes('mirror') || top.includes('optics')) {
    return curriculumDiagrams[5]; // Light reflection
  }
  if (top.includes('triangle') || top.includes('pythagor') || top.includes('geometry') || top.includes('trigono')) {
    return curriculumDiagrams[6]; // Pythagoras
  }
  if (top.includes('set') || top.includes('venn') || top.includes('intersection') || top.includes('union')) {
    return curriculumDiagrams[7]; // Venn diagram
  }
  if (top.includes('graph') || top.includes('linear equation') || top.includes('coordinate') || top.includes('intercept')) {
    return curriculumDiagrams[8]; // Cartesian plane
  }
  if (top.includes('soil') || top.includes('rock') || top.includes('erosion') || top.includes('land')) {
    return curriculumDiagrams[9]; // Soil profile
  }
  if (top.includes('demand') || top.includes('supply') || top.includes('market') || top.includes('equilibrium') || top.includes('price')) {
    return curriculumDiagrams[11]; // Demand & Supply
  }
  if (top.includes('plot') || top.includes('story') || top.includes('novel') || top.includes('literature') || top.includes('drama') || top.includes('essay')) {
    return curriculumDiagrams[12]; // Narrative pyramid
  }
  if (top.includes('drawing') || top.includes('isometric') || top.includes('orthographic') || top.includes('projection')) {
    return curriculumDiagrams[13]; // Orthographic projection
  }

  // 2. Subject-domain fallbacks:
  if (sub.includes('yorùbá') || sub.includes('yoruba')) {
    return curriculumDiagrams.find(x => x.id === 'diag_yoruba_alphabet_tones') || curriculumDiagrams[12];
  }
  if (sub.includes('igbo')) {
    return curriculumDiagrams.find(x => x.id === 'diag_igbo_alphabet_symbols') || curriculumDiagrams[12];
  }
  if (sub.includes('hausa')) {
    return curriculumDiagrams.find(x => x.id === 'diag_hausa_alphabet_symbols') || curriculumDiagrams[12];
  }
  if (sub.includes('geograph')) {
    return curriculumDiagrams.find(x => x.id === 'diag_water_cycle') || curriculumDiagrams[9];
  }
  if (sub.includes('account') || sub.includes('bookkeeping') || sub.includes('commerce') || sub.includes('business')) {
    return curriculumDiagrams.find(x => x.id === 'diag_double_entry_ledger') || curriculumDiagrams[11];
  }
  if (sub.includes('tech') && (sub.includes('basic') || sub.includes('drawing') || sub.includes('applied'))) {
    return curriculumDiagrams.find(x => x.id === 'diag_three_classes_levers') || curriculumDiagrams[13];
  }
  if (sub.includes('home') || sub.includes('food') || sub.includes('catering')) {
    return curriculumDiagrams.find(x => x.id === 'diag_balanced_diet_plate') || curriculumDiagrams[0];
  }
  if (sub.includes('computer') || sub.includes('ict') || sub.includes('data')) {
    return curriculumDiagrams.find(x => x.id === 'diag_computer_hardware_architecture') || curriculumDiagrams[4];
  }
  if (sub.includes('physical') || sub.includes('health') || sub.includes('phe')) {
    return curriculumDiagrams.find(x => x.id === 'diag_circulatory_pulse_system') || curriculumDiagrams[1];
  }
  if (sub.includes('christian') || sub.includes('crs') || sub.includes('crk')) {
    return curriculumDiagrams.find(x => x.id === 'diag_fruit_of_spirit_tree') || curriculumDiagrams[10];
  }
  if (sub.includes('islam') || sub.includes('irs') || sub.includes('irk')) {
    return curriculumDiagrams.find(x => x.id === 'diag_five_pillars_islam') || curriculumDiagrams[10];
  }
  if (sub.includes('civic') || sub.includes('govern') || sub.includes('social') || sub.includes('security')) {
    return curriculumDiagrams.find(x => x.id === 'diag_nigerian_arms_checks') || curriculumDiagrams[10];
  }
  if (sub.includes('math') || sub.includes('algebra') || sub.includes('calculus')) {
    return curriculumDiagrams[6];
  }
  if (sub.includes('chem')) {
    return curriculumDiagrams[2];
  }
  if (sub.includes('phys')) {
    return curriculumDiagrams[5];
  }
  if (sub.includes('bio')) {
    return curriculumDiagrams[0];
  }
  if (sub.includes('agric') || sub.includes('farm')) {
    return curriculumDiagrams[9];
  }
  if (sub.includes('econ')) {
    return curriculumDiagrams[11];
  }
  if (sub.includes('eng') || sub.includes('lit') || sub.includes('french')) {
    return curriculumDiagrams[12];
  }

  return curriculumDiagrams[0];
}

