/**
 * EduPlan NG - Massive Curriculum Asset & Schematic Registry (Phase 3)
 *
 * Statutory 2D Labeled Schematics & 3D Interactive Assets across all subjects:
 * Mathematics, English Studies, Biology, Chemistry, Physics, Basic Science,
 * Basic Technology, Technical Drawing, Social Studies, Civic Education, Economics,
 * Geography, Government, Commerce, Financial Accounting, Agricultural Science,
 * Computer Studies / Data Processing, Èdè Yorùbá, Asụsụ Igbo, Harshen Hausa,
 * Christian Religious Studies, Islamic Religious Studies, Cultural & Creative Arts,
 * Music, Physical & Health Education.
 */

export interface AssetLabel {
  name: string;
  x: number; // Coordinate percentage (0 to 100)
  y: number; // Coordinate percentage (0 to 100)
  description?: string;
}

export interface CurriculumAsset {
  id: string;
  title: string;
  subject: string;
  classLevel: string; // 'jss-1' | 'jss-2' | 'jss-3' | 'sss-1' | 'sss-2' | 'sss-3' | 'all'
  category: 'Sciences' | 'Mathematics' | 'Technology' | 'Social Sciences' | 'Commercial' | 'Languages' | 'Humanities' | 'Vocational & Arts';
  description: string;
  type: '2d' | '3d';
  model3DKey?: string;
  labels: AssetLabel[];
  svgContent: string;
  perspective?: string;
}

export const ASSET_REGISTRY: CurriculumAsset[] = [
  // =========================================================================
  // 1. MATHEMATICS (Geometry, Trigonometry, Circles, Coordinates, Graphs)
  // =========================================================================
  {
    id: 'ast_mth_pythagoras',
    title: 'Right-Angled Triangle & Pythagoras Theorem',
    subject: 'Mathematics',
    classLevel: 'jss-2',
    category: 'Mathematics',
    description: 'Pythagorean relationship a² + b² = c² with labeled hypotenuse, opposite, and adjacent legs.',
    type: '2d',
    labels: [
      { name: 'Hypotenuse (c)', x: 55, y: 35, description: 'Longest side opposite the right angle' },
      { name: 'Opposite Leg (a)', x: 82, y: 60, description: 'Vertical perpendicular side' },
      { name: 'Adjacent Leg (b)', x: 45, y: 92, description: 'Horizontal base side' },
      { name: 'Right Angle (90°)', x: 74, y: 82, description: 'Square indicator marking 90 degrees' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <polygon points="100,260 380,260 380,60" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
      <rect x="355" y="235" width="25" height="25" fill="none" stroke="#0369a1" stroke-width="2"/>
      <text x="240" y="285" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">Base (b)</text>
      <text x="410" y="165" font-size="14" font-weight="bold" fill="#0369a1">Altitude (a)</text>
      <text x="210" y="140" font-size="14" font-weight="bold" fill="#0284c7" transform="rotate(-35 210,140)">Hypotenuse (c) [a² + b² = c²]</text>
    </svg>`
  },
  {
    id: 'ast_mth_circle_theorems',
    title: 'Circle Theorems: Angle at Center vs Circumference',
    subject: 'Mathematics',
    classLevel: 'sss-1',
    category: 'Mathematics',
    description: 'Statutory WAEC circle theorem showing angle subtended at center is twice the angle at circumference.',
    type: '2d',
    labels: [
      { name: 'Subtended Arc AB', x: 50, y: 90, description: 'Arc defining subtended angle' },
      { name: 'Center Angle (2θ)', x: 50, y: 52, description: 'Angle at circle origin' },
      { name: 'Circumference Angle (θ)', x: 50, y: 16, description: 'Angle subtended at boundary' },
      { name: 'Radius r', x: 35, y: 60, description: 'Distance from center to perimeter' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <circle cx="250" cy="160" r="110" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>
      <circle cx="250" cy="160" r="4" fill="#15803d"/>
      <line x1="160" y1="225" x2="250" y2="160" stroke="#047857" stroke-width="2"/>
      <line x1="340" y1="225" x2="250" y2="160" stroke="#047857" stroke-width="2"/>
      <line x1="160" y1="225" x2="250" y2="50" stroke="#0284c7" stroke-width="2"/>
      <line x1="340" y1="225" x2="250" y2="50" stroke="#0284c7" stroke-width="2"/>
      <text x="250" y="145" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">2θ (Center)</text>
      <text x="250" y="70" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">θ (Circumference)</text>
      <text x="145" y="240" font-size="12" font-weight="bold" fill="#0f172a">A</text>
      <text x="350" y="240" font-size="12" font-weight="bold" fill="#0f172a">B</text>
    </svg>`
  },
  {
    id: 'ast_mth_trig_bearings',
    title: 'Three-Figure Bearings & Cardinal Directions',
    subject: 'Mathematics',
    classLevel: 'sss-1',
    category: 'Mathematics',
    description: 'Cartesian navigational compass with three-figure bearing clockwise from True North (065°).',
    type: '2d',
    labels: [
      { name: 'True North (000°)', x: 50, y: 15, description: 'Reference origin' },
      { name: 'Bearing Ray 065°', x: 70, y: 35, description: 'Clockwise direction angle' },
      { name: 'East (090°)', x: 88, y: 50, description: 'East axis' },
      { name: 'South (180°)', x: 50, y: 88, description: 'South axis' },
      { name: 'West (270°)', x: 12, y: 50, description: 'West axis' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <line x1="250" y1="40" x2="250" y2="280" stroke="#64748b" stroke-width="2"/>
      <line x1="110" y1="160" x2="390" y2="160" stroke="#64748b" stroke-width="2"/>
      <line x1="250" y1="160" x2="355" y2="85" stroke="#dc2626" stroke-width="3"/>
      <path d="M 250,110 A 50,50 0 0,1 285,135" fill="none" stroke="#ea580c" stroke-width="2"/>
      <text x="250" y="30" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">N (000°)</text>
      <text x="405" y="165" font-size="14" font-weight="bold" fill="#0f172a">E (090°)</text>
      <text x="250" y="305" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">S (180°)</text>
      <text x="85" y="165" font-size="14" font-weight="bold" fill="#0f172a">W (270°)</text>
      <text x="295" y="115" font-size="12" font-weight="bold" fill="#ea580c">065°</text>
    </svg>`
  },
  {
    id: 'ast_mth_cuboid_3d',
    title: 'Solid Geometry: Isometric Cuboid & Volume',
    subject: 'Mathematics',
    classLevel: 'jss-1',
    category: 'Mathematics',
    description: 'Interactive 3D geometry cuboid exploring face count, edges, vertices, and volume = L × W × H.',
    type: '3d',
    model3DKey: 'geometry_cube',
    labels: [
      { name: 'Length (L)', x: 45, y: 75, description: 'Base measurement' },
      { name: 'Width / Breadth (B)', x: 75, y: 65, description: 'Depth measurement' },
      { name: 'Height (H)', x: 25, y: 40, description: 'Vertical altitude' },
      { name: 'Vertex (8 Total)', x: 30, y: 25, description: 'Intersection of three edges' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0f172a" rx="12"/>
      <polygon points="160,110 320,110 320,230 160,230" fill="#059669" stroke="#34d399" stroke-width="2" opacity="0.85"/>
      <polygon points="160,110 230,60 390,60 320,110" fill="#10b981" stroke="#34d399" stroke-width="2" opacity="0.95"/>
      <polygon points="320,110 390,60 390,180 320,230" fill="#047857" stroke="#34d399" stroke-width="2"/>
      <text x="240" y="255" font-size="13" font-weight="bold" fill="#a7f3d0" text-anchor="middle">Length (L)</text>
      <text x="135" y="175" font-size="13" font-weight="bold" fill="#a7f3d0">Height (H)</text>
      <text x="375" y="125" font-size="13" font-weight="bold" fill="#a7f3d0">Width (W)</text>
    </svg>`
  },

  // =========================================================================
  // 2. BIOLOGY & BASIC SCIENCE (Cells, Organs, Systems, Genetics)
  // =========================================================================
  {
    id: 'ast_bio_plant_cell',
    title: 'Generalized Plant Cell Schematic',
    subject: 'Biology',
    classLevel: 'jss-1',
    category: 'Sciences',
    description: 'Detailed microscopic cross-section of a plant cell with chloroplast, cell wall, and central vacuole.',
    type: '3d',
    model3DKey: 'plant_cell',
    labels: [
      { name: 'Cellulose Cell Wall', x: 88, y: 20, description: 'Rigid outer layer providing turgidity' },
      { name: 'Chloroplast (Thylakoids)', x: 75, y: 70, description: 'Organelle containing chlorophyll' },
      { name: 'Large Central Vacuole', x: 55, y: 48, description: 'Stores cell sap and regulates osmotic pressure' },
      { name: 'Nucleus & Chromatin', x: 28, y: 35, description: 'Repository of genetic material' },
      { name: 'Mitochondria', x: 30, y: 68, description: 'Powerhouse of cellular respiration' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <polygon points="60,40 440,40 460,260 40,260" fill="#dcfce7" stroke="#15803d" stroke-width="5"/>
      <polygon points="70,50 430,50 448,250 52,250" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <ellipse cx="270" cy="150" rx="120" ry="65" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <text x="270" y="155" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">Large Central Vacuole</text>
      <circle cx="130" cy="110" r="36" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <circle cx="130" cy="110" r="14" fill="#be185d"/>
      <text x="130" y="114" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Nucleus</text>
      <ellipse cx="380" cy="90" rx="20" ry="11" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="380" cy="205" rx="20" ry="11" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <text x="440" y="32" font-size="11" font-weight="bold" fill="#15803d">Cell Wall</text>
    </svg>`
  },
  {
    id: 'ast_bio_human_heart',
    title: 'Internal Anatomy of Human Heart (Four Chambers)',
    subject: 'Biology',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Double circulatory cardiovascular system showing atria, ventricles, bicuspid, and tricuspid valves.',
    type: '3d',
    model3DKey: 'heart_model',
    labels: [
      { name: 'Superior Vena Cava', x: 25, y: 15, description: 'Deoxygenated blood from upper body' },
      { name: 'Right Atrium', x: 30, y: 40, description: 'Receives venous deoxygenated blood' },
      { name: 'Tricuspid Valve', x: 35, y: 60, description: 'Prevents backflow into right atrium' },
      { name: 'Right Ventricle', x: 35, y: 80, description: 'Pumps blood to pulmonary artery' },
      { name: 'Aorta (Arch)', x: 50, y: 10, description: 'Primary systemic high-pressure conduit' },
      { name: 'Left Atrium', x: 70, y: 40, description: 'Receives oxygenated blood from lungs' },
      { name: 'Bicuspid (Mitral) Valve', x: 65, y: 60, description: 'Two-cusp atrioventricular valve' },
      { name: 'Left Ventricle (Thick Myocardium)', x: 65, y: 82, description: 'Heavy muscle wall for systemic pressure' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdf2f8" rx="12"/>
      <path d="M 180,90 Q 250,50 320,90 C 370,140 330,240 250,290 C 170,240 130,140 180,90 Z" fill="#f43f5e" stroke="#9f1239" stroke-width="3"/>
      <line x1="250" y1="90" x2="250" y2="280" stroke="#881337" stroke-width="3"/>
      <line x1="160" y1="170" x2="340" y2="170" stroke="#881337" stroke-width="2"/>
      <text x="200" y="140" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Right Atrium</text>
      <text x="300" y="140" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Left Atrium</text>
      <text x="200" y="230" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Right Ventricle</text>
      <text x="300" y="230" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Left Ventricle</text>
      <text x="250" y="30" font-size="13" font-weight="bold" fill="#9f1239" text-anchor="middle">Systemic Aorta Arc</text>
    </svg>`
  },
  {
    id: 'ast_bio_dna_helix',
    title: 'DNA Double Helix & Complementary Base Pairs',
    subject: 'Biology',
    classLevel: 'sss-3',
    category: 'Sciences',
    description: 'Watson-Crick antiparallel double helix showing Adenine-Thymine (A-T) and Guanine-Cytosine (G-C) bonds.',
    type: '3d',
    model3DKey: 'dna_helix',
    labels: [
      { name: 'Sugar-Phosphate Backbone', x: 25, y: 30, description: 'Deoxyribose and phosphodiester link' },
      { name: 'Adenine = Thymine (2 H-Bonds)', x: 50, y: 40, description: 'Purine-pyrimidine double hydrogen bond' },
      { name: 'Guanine ≡ Cytosine (3 H-Bonds)', x: 50, y: 65, description: 'Purine-pyrimidine triple hydrogen bond' },
      { name: 'Major & Minor Grooves', x: 75, y: 50, description: 'Binding sites for transcription factors' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0f172a" rx="12"/>
      <path d="M 120,40 Q 250,90 380,40 Q 250,160 120,280" fill="none" stroke="#38bdf8" stroke-width="4"/>
      <path d="M 380,40 Q 250,90 120,160 Q 250,230 380,280" fill="none" stroke="#a855f7" stroke-width="4"/>
      <line x1="200" y1="90" x2="300" y2="90" stroke="#facc15" stroke-width="3"/>
      <line x1="170" y1="130" x2="330" y2="130" stroke="#4ade80" stroke-width="3"/>
      <line x1="170" y1="190" x2="330" y2="190" stroke="#facc15" stroke-width="3"/>
      <text x="250" y="80" font-size="11" font-weight="bold" fill="#facc15" text-anchor="middle">A = T</text>
      <text x="250" y="125" font-size="11" font-weight="bold" fill="#4ade80" text-anchor="middle">G ≡ C</text>
      <text x="250" y="305" font-size="12" font-weight="bold" fill="#e2e8f0" text-anchor="middle">Antiparallel 5' to 3' Strands</text>
    </svg>`
  },

  // =========================================================================
  // 3. CHEMISTRY (Atoms, Bonding, Laboratory Apparatus, Distillation)
  // =========================================================================
  {
    id: 'ast_chm_bohr_atom',
    title: 'Bohr Atomic Model & Electron Shell Configuration',
    subject: 'Chemistry',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Bohr planetary model with dense nucleus (protons + neutrons) and K, L, M electron shells.',
    type: '3d',
    model3DKey: 'atom_model',
    labels: [
      { name: 'Nucleus (Protons + Neutrons)', x: 50, y: 50, description: 'Dense core where atomic mass concentrates' },
      { name: 'K Shell (n=1, max 2 e⁻)', x: 50, y: 35, description: 'Innermost lowest energy principal shell' },
      { name: 'L Shell (n=2, max 8 e⁻)', x: 50, y: 22, description: 'Second valence energy orbital' },
      { name: 'Valence Electron', x: 78, y: 50, description: 'Electron involved in chemical bond formation' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0b132b" rx="12"/>
      <circle cx="250" cy="160" r="115" fill="none" stroke="#3a506b" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="250" cy="160" r="75" fill="none" stroke="#48cae4" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="250" cy="160" r="40" fill="none" stroke="#00b4d8" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="250" cy="160" r="22" fill="#ef4444" stroke="#f87171" stroke-width="2"/>
      <text x="250" y="164" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">6P + 6N</text>
      <circle cx="250" cy="120" r="6" fill="#38bdf8"/>
      <circle cx="250" cy="200" r="6" fill="#38bdf8"/>
      <circle cx="175" cy="160" r="6" fill="#38bdf8"/>
      <circle cx="325" cy="160" r="6" fill="#38bdf8"/>
      <text x="250" y="295" font-size="12" font-weight="bold" fill="#90e0ef" text-anchor="middle">Carbon (C-12) Electron Configuration 2, 4</text>
    </svg>`
  },
  {
    id: 'ast_chm_distillation_apparatus',
    title: 'Fractional Distillation of Crude Oil & Petroleum',
    subject: 'Chemistry',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Fractionating column demonstrating boiling point separation from refinery gas down to bitumen.',
    type: '2d',
    labels: [
      { name: 'Refinery Petroleum Gas (20°C)', x: 75, y: 15, description: 'Bottled domestic cooking gas' },
      { name: 'Petrol / Gasoline (40°-100°C)', x: 75, y: 30, description: 'Motor vehicle fuel' },
      { name: 'Kerosene / Jet Fuel (150°-240°C)', x: 75, y: 48, description: 'Aviation and stove fuel' },
      { name: 'Diesel Gas Oil (250°-320°C)', x: 75, y: 65, description: 'Heavy diesel engines' },
      { name: 'Bitumen / Asphalt Residue (>400°C)', x: 75, y: 88, description: 'Road surfacing tar' },
      { name: 'Crude Oil Inflow Furnace', x: 25, y: 82, description: 'Heated crude enters base' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <rect x="180" y="30" width="100" height="250" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
      <line x1="180" y1="70" x2="280" y2="70" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="120" x2="280" y2="120" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="170" x2="280" y2="170" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="220" x2="280" y2="220" stroke="#94a3b8" stroke-width="2"/>
      <line x1="100" y1="260" x2="180" y2="260" stroke="#dc2626" stroke-width="4"/>
      <text x="135" y="250" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">Hot Crude</text>
      <text x="320" y="55" font-size="11" font-weight="bold" fill="#0284c7">Petroleum Gas</text>
      <text x="320" y="105" font-size="11" font-weight="bold" fill="#0284c7">Petrol (PMS)</text>
      <text x="320" y="155" font-size="11" font-weight="bold" fill="#0284c7">Kerosene (DPK)</text>
      <text x="320" y="205" font-size="11" font-weight="bold" fill="#0284c7">Diesel (AGO)</text>
      <text x="320" y="255" font-size="11" font-weight="bold" fill="#0284c7">Bitumen Residue</text>
    </svg>`
  },

  // =========================================================================
  // 4. PHYSICS (Optics, Electricity, Mechanics, Waves)
  // =========================================================================
  {
    id: 'ast_phy_concave_mirror_rays',
    title: 'Concave Mirror: Real Inverted Image Ray Diagram',
    subject: 'Physics',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Geometric optics ray construction with Principal Axis, Center of Curvature C, and Focal point F.',
    type: '2d',
    labels: [
      { name: 'Principal Axis', x: 50, y: 55, description: 'Horizontal center line perpendicular to mirror' },
      { name: 'Center of Curvature (C)', x: 30, y: 60, description: 'Radius R = 2F' },
      { name: 'Principal Focus (F)', x: 45, y: 60, description: 'Point where parallel rays converge' },
      { name: 'Object (Beyond C)', x: 20, y: 40, description: 'Source emitting light rays' },
      { name: 'Real Inverted Image', x: 38, y: 70, description: 'Formed between C and F' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <line x1="50" y1="160" x2="450" y2="160" stroke="#475569" stroke-width="2"/>
      <path d="M 400,60 Q 370,160 400,260" fill="none" stroke="#0284c7" stroke-width="4"/>
      <!-- Object Arrow -->
      <line x1="120" y1="160" x2="120" y2="90" stroke="#16a34a" stroke-width="3"/>
      <polygon points="120,85 115,95 125,95" fill="#16a34a"/>
      <!-- Ray parallel then focus -->
      <line x1="120" y1="90" x2="380" y2="90" stroke="#dc2626" stroke-width="1.5"/>
      <line x1="380" y1="90" x2="160" y2="240" stroke="#dc2626" stroke-width="1.5"/>
      <circle cx="230" cy="160" r="4" fill="#0f172a"/>
      <text x="230" y="180" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">C</text>
      <circle cx="305" cy="160" r="4" fill="#0f172a"/>
      <text x="305" y="180" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">F</text>
      <text x="120" y="75" font-size="11" font-weight="bold" fill="#16a34a" text-anchor="middle">Object</text>
    </svg>`
  },
  {
    id: 'ast_phy_series_parallel_circuit',
    title: 'Electric Circuit: Ohm\'s Law & Resistor Networks',
    subject: 'Physics',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Schematic wiring showing DC cell battery, ammeter, key switch, and parallel resistors R1 and R2.',
    type: '2d',
    labels: [
      { name: 'DC Voltage Source (E)', x: 25, y: 15, description: 'Electromotive force battery' },
      { name: 'Switch / Key (K)', x: 50, y: 15, description: 'Circuit interrupter' },
      { name: 'Ammeter (A)', x: 75, y: 15, description: 'Measures total current in series' },
      { name: 'Resistor R1', x: 50, y: 65, description: 'Upper parallel branch' },
      { name: 'Resistor R2', x: 50, y: 85, description: 'Lower parallel branch' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <rect x="80" y="50" width="340" height="220" fill="none" stroke="#334155" stroke-width="3"/>
      <!-- Battery -->
      <line x1="160" y1="40" x2="160" y2="60" stroke="#0f172a" stroke-width="3"/>
      <line x1="170" y1="45" x2="170" y2="55" stroke="#0f172a" stroke-width="2"/>
      <!-- Ammeter -->
      <circle cx="340" cy="50" r="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
      <text x="340" y="55" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">A</text>
      <!-- Resistors -->
      <rect x="220" y="160" width="60" height="20" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="175" font-size="11" font-weight="bold" fill="#854d0e" text-anchor="middle">R1</text>
      <rect x="220" y="210" width="60" height="20" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="225" font-size="11" font-weight="bold" fill="#854d0e" text-anchor="middle">R2</text>
      <text x="250" y="300" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">1/R_total = 1/R1 + 1/R2</text>
    </svg>`
  },

  // =========================================================================
  // 5. BASIC TECHNOLOGY & TECHNICAL DRAWING
  // =========================================================================
  {
    id: 'ast_tec_orthographic_projection',
    title: 'First-Angle Orthographic Projection (Front, Plan, End)',
    subject: 'Technical Drawing',
    classLevel: 'sss-1',
    category: 'Technology',
    description: 'Standard Nigerian technical drawing showing 2D multi-view orthographic projections.',
    type: '2d',
    labels: [
      { name: 'Front Elevation (Vertical Plane)', x: 30, y: 30, description: 'Primary face looking forward' },
      { name: 'End Elevation (Side Profile)', x: 70, y: 30, description: 'Side view looking right' },
      { name: 'Plan View (Horizontal Plane)', x: 30, y: 75, description: 'View looking directly downwards' },
      { name: '45° Miter Projector Line', x: 70, y: 75, description: 'Construction line linking plan and end' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f1f5f9" rx="12"/>
      <line x1="250" y1="20" x2="250" y2="300" stroke="#94a3b8" stroke-width="2"/>
      <line x1="20" y1="160" x2="480" y2="160" stroke="#94a3b8" stroke-width="2"/>
      <!-- Front Elevation -->
      <polygon points="100,60 180,60 180,130 100,130" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <!-- End Elevation -->
      <polygon points="300,60 360,60 360,130 300,130" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
      <!-- Plan View -->
      <polygon points="100,190 180,190 180,260 100,260" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <!-- 45 deg line -->
      <line x1="250" y1="160" x2="380" y2="290" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="140" y="45" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Front Elevation</text>
      <text x="330" y="45" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">End Elevation</text>
      <text x="140" y="280" font-size="11" font-weight="bold" fill="#c2410c" text-anchor="middle">Plan View</text>
    </svg>`
  },
  {
    id: 'ast_tec_four_stroke_engine',
    title: 'Four-Stroke Internal Combustion Engine Cycle',
    subject: 'Basic Technology',
    classLevel: 'jss-3',
    category: 'Technology',
    description: 'Mechanical cycle: 1. Intake, 2. Compression, 3. Power (Combustion), 4. Exhaust.',
    type: '2d',
    labels: [
      { name: 'Intake Stroke (Air-Fuel in)', x: 18, y: 50, description: 'Intake valve open, piston moving down' },
      { name: 'Compression Stroke', x: 38, y: 50, description: 'Both valves closed, piston moving up' },
      { name: 'Power Stroke (Spark Ignition)', x: 62, y: 50, description: 'Spark plug fires, driving piston down' },
      { name: 'Exhaust Stroke', x: 85, y: 50, description: 'Exhaust valve open, burnt gases exit' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <!-- 4 Cylinders -->
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="70" height="130" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="50" width="50" height="35" fill="#3b82f6" rx="4"/>
        <text x="35" y="150" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">1. Intake</text>
      </g>
      <g transform="translate(150, 60)">
        <rect x="0" y="0" width="70" height="130" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="20" width="50" height="35" fill="#3b82f6" rx="4"/>
        <text x="35" y="150" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">2. Compress</text>
      </g>
      <g transform="translate(270, 60)">
        <rect x="0" y="0" width="70" height="130" fill="#fee2e2" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="45" width="50" height="35" fill="#ef4444" rx="4"/>
        <circle cx="35" cy="10" r="6" fill="#facc15"/>
        <text x="35" y="150" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">3. Power ⚡</text>
      </g>
      <g transform="translate(390, 60)">
        <rect x="0" y="0" width="70" height="130" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="20" width="50" height="35" fill="#3b82f6" rx="4"/>
        <text x="35" y="150" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">4. Exhaust</text>
      </g>
      <text x="250" y="260" font-size="13" font-weight="bold" fill="#334155" text-anchor="middle">Crankshaft 720° (Two Complete Revolutions per Cycle)</text>
    </svg>`
  },

  // =========================================================================
  // 6. SOCIAL SCIENCES & NIGERIAN CIVIC STRUCTURE
  // =========================================================================
  {
    id: 'ast_civ_nigerian_government_tiers',
    title: 'Three Arms & Three Tiers of Nigerian Government',
    subject: 'Civic Education',
    classLevel: 'jss-1',
    category: 'Social Sciences',
    description: 'Separation of powers: Executive (President/Gov), Legislature (NASS), and Judiciary (Supreme Court).',
    type: '2d',
    labels: [
      { name: 'Executive Arm', x: 25, y: 35, description: 'President, Federal Executive Council, Ministries' },
      { name: 'Legislative Arm (NASS)', x: 50, y: 35, description: 'Senate & House of Representatives' },
      { name: 'Judiciary Arm', x: 75, y: 35, description: 'Chief Justice of Nigeria, Supreme & Appeal Courts' },
      { name: 'Checks & Balances', x: 50, y: 70, description: 'Constitutional oversight mechanisms' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="12"/>
      <rect x="150" y="25" width="200" height="40" rx="8" fill="#15803d"/>
      <text x="250" y="50" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Constitution of Nigeria (1999)</text>
      <g transform="translate(40, 110)">
        <rect x="0" y="0" width="115" height="110" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
        <text x="57" y="30" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">EXECUTIVE</text>
        <text x="57" y="55" font-size="10" fill="#475569" text-anchor="middle">• President</text>
        <text x="57" y="75" font-size="10" fill="#475569" text-anchor="middle">• State Governors</text>
        <text x="57" y="95" font-size="10" fill="#475569" text-anchor="middle">• LGA Chairmen</text>
      </g>
      <g transform="translate(190, 110)">
        <rect x="0" y="0" width="120" height="110" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
        <text x="60" y="30" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">LEGISLATURE</text>
        <text x="60" y="55" font-size="10" fill="#475569" text-anchor="middle">• Senate (109)</text>
        <text x="60" y="75" font-size="10" fill="#475569" text-anchor="middle">• House of Reps (360)</text>
        <text x="60" y="95" font-size="10" fill="#475569" text-anchor="middle">• State Assemblies</text>
      </g>
      <g transform="translate(345, 110)">
        <rect x="0" y="0" width="115" height="110" rx="10" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
        <text x="57" y="30" font-size="12" font-weight="bold" fill="#6d28d9" text-anchor="middle">JUDICIARY</text>
        <text x="57" y="55" font-size="10" fill="#475569" text-anchor="middle">• Supreme Court</text>
        <text x="57" y="75" font-size="10" fill="#475569" text-anchor="middle">• Appeal Court</text>
        <text x="57" y="95" font-size="10" fill="#475569" text-anchor="middle">• Federal High Court</text>
      </g>
      <text x="250" y="260" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Tier Hierarchy: Federal ➔ 36 States ➔ 774 Local Government Areas</text>
    </svg>`
  },
  {
    id: 'ast_eco_supply_demand_equilibrium',
    title: 'Market Equilibrium: Supply, Demand & Price Mechanism',
    subject: 'Economics',
    classLevel: 'sss-1',
    category: 'Social Sciences',
    description: 'Equilibrium price (P*) and quantity (Q*) where downward-sloping Demand intersects upward-sloping Supply.',
    type: '2d',
    labels: [
      { name: 'Equilibrium Point E (P*, Q*)', x: 50, y: 50, description: 'Market clearing point with zero excess' },
      { name: 'Demand Curve (D)', x: 75, y: 80, description: 'Downward sloping consumer demand' },
      { name: 'Supply Curve (S)', x: 75, y: 20, description: 'Upward sloping producer supply' },
      { name: 'Excess Supply (Surplus)', x: 50, y: 28, description: 'Price above equilibrium creates unsold inventory' },
      { name: 'Excess Demand (Shortage)', x: 50, y: 72, description: 'Price below equilibrium creates scarcity' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <line x1="80" y1="260" x2="420" y2="260" stroke="#334155" stroke-width="3"/>
      <line x1="80" y1="40" x2="80" y2="260" stroke="#334155" stroke-width="3"/>
      <!-- Demand Line -->
      <line x1="120" y1="70" x2="380" y2="230" stroke="#dc2626" stroke-width="3"/>
      <text x="390" y="235" font-size="14" font-weight="bold" fill="#dc2626">D</text>
      <!-- Supply Line -->
      <line x1="120" y1="230" x2="380" y2="70" stroke="#16a34a" stroke-width="3"/>
      <text x="390" y="75" font-size="14" font-weight="bold" fill="#16a34a">S</text>
      <!-- Equilibrium Intersect -->
      <circle cx="250" cy="150" r="6" fill="#0284c7"/>
      <line x1="80" y1="150" x2="250" y2="150" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,4"/>
      <line x1="250" y1="150" x2="250" y2="260" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="250" y="140" font-size="12" font-weight="bold" fill="#0284c7">E (P*, Q*)</text>
      <text x="60" y="155" font-size="12" font-weight="bold" fill="#0f172a">P*</text>
      <text x="250" y="280" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Q*</text>
      <text x="50" y="45" font-size="12" font-weight="bold" fill="#0f172a">Price (₦)</text>
      <text x="430" y="280" font-size="12" font-weight="bold" fill="#0f172a">Quantity</text>
    </svg>`
  },
  {
    id: 'ast_geo_hydrological_cycle',
    title: 'Hydrological Water Cycle & Precipitation',
    subject: 'Geography',
    classLevel: 'sss-1',
    category: 'Social Sciences',
    description: 'Evaporation, transpiration from vegetation, condensation, precipitation (rain), and surface percolation runoff.',
    type: '2d',
    labels: [
      { name: 'Solar Heat Radiation', x: 20, y: 15, description: 'Sun driving evaporation' },
      { name: 'Evaporation (Ocean/River)', x: 75, y: 70, description: 'Liquid water turned into vapor' },
      { name: 'Transpiration (Canopy Trees)', x: 25, y: 65, description: 'Moisture release from leaves' },
      { name: 'Condensation (Cumulus Clouds)', x: 50, y: 25, description: 'Vapor cooling to form clouds' },
      { name: 'Precipitation (Rainfall)', x: 35, y: 45, description: 'Water droplets falling to earth' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#eff6ff" rx="12"/>
      <circle cx="80" cy="50" r="30" fill="#facc15" stroke="#eab308" stroke-width="2"/>
      <!-- Cloud -->
      <path d="M 200,60 Q 230,30 270,50 Q 310,30 330,60 Q 360,70 340,90 Q 200,100 200,60 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      <!-- Mountain and Lake -->
      <polygon points="40,280 180,140 280,280" fill="#64748b"/>
      <rect x="250" y="240" width="230" height="50" fill="#38bdf8"/>
      <!-- Arrows -->
      <text x="360" y="210" font-size="11" font-weight="bold" fill="#0369a1">▲ Evaporation</text>
      <text x="140" y="210" font-size="11" font-weight="bold" fill="#15803d">▲ Transpiration</text>
      <text x="210" y="125" font-size="11" font-weight="bold" fill="#1d4ed8">▼ Precipitation (Rain)</text>
      <text x="360" y="270" font-size="12" font-weight="bold" fill="#ffffff">Atlantic Ocean</text>
    </svg>`
  },

  // =========================================================================
  // 7. COMMERCIAL STUDIES & FINANCIAL ACCOUNTING
  // =========================================================================
  {
    id: 'ast_com_channel_of_distribution',
    title: 'Commercial Channels of Distribution (Trade Flow)',
    subject: 'Commerce',
    classLevel: 'sss-1',
    category: 'Commercial',
    description: 'Chain of distribution from Manufacturer/Producer to Wholesaler, Retailer, and Ultimate Consumer.',
    type: '2d',
    labels: [
      { name: '1. Producer / Factory', x: 15, y: 50, description: 'Origin of manufactured goods' },
      { name: '2. Wholesaler (Bulk Purchases)', x: 40, y: 50, description: 'Breaks bulk and provides credit' },
      { name: '3. Retailer (Small Units)', x: 65, y: 50, description: 'Local kiosks and supermarkets' },
      { name: '4. Final Consumer', x: 88, y: 50, description: 'End-user of goods and services' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <g transform="translate(20, 110)">
        <rect x="0" y="0" width="90" height="70" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
        <text x="45" y="32" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">PRODUCER</text>
        <text x="45" y="52" font-size="9" fill="#4338ca" text-anchor="middle">Factory</text>
      </g>
      <text x="125" y="150" font-size="18" fill="#4338ca">➔</text>
      <g transform="translate(145, 110)">
        <rect x="0" y="0" width="95" height="70" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="47" y="32" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">WHOLESALER</text>
        <text x="47" y="52" font-size="9" fill="#d97706" text-anchor="middle">Bulk Storage</text>
      </g>
      <text x="255" y="150" font-size="18" fill="#d97706">➔</text>
      <g transform="translate(275, 110)">
        <rect x="0" y="0" width="90" height="70" rx="8" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
        <text x="45" y="32" font-size="11" font-weight="bold" fill="#14532d" text-anchor="middle">RETAILER</text>
        <text x="45" y="52" font-size="9" fill="#15803d" text-anchor="middle">Shops & Stalls</text>
      </g>
      <text x="380" y="150" font-size="18" fill="#15803d">➔</text>
      <g transform="translate(400, 110)">
        <rect x="0" y="0" width="85" height="70" rx="8" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
        <text x="42" y="32" font-size="11" font-weight="bold" fill="#831843" text-anchor="middle">CONSUMER</text>
        <text x="42" y="52" font-size="9" fill="#be185d" text-anchor="middle">End User</text>
      </g>
      <text x="250" y="240" font-size="12" font-weight="bold" fill="#475569" text-anchor="middle">Aids to Trade: Banking • Transport • Insurance • Warehousing • Advertising</text>
    </svg>`
  },

  // =========================================================================
  // 8. ICT & COMPUTER STUDIES (Architecture, Networks, Flowcharts)
  // =========================================================================
  {
    id: 'ast_ict_von_neumann_architecture',
    title: 'Von Neumann Computer Architecture & Bus System',
    subject: 'Computer Studies',
    classLevel: 'jss-1',
    category: 'Technology',
    description: 'CPU components: Arithmetic Logic Unit (ALU), Control Unit (CU), Registers, RAM, and I/O devices.',
    type: '2d',
    labels: [
      { name: 'Central Processing Unit (CPU)', x: 50, y: 35, description: 'Brain of computer system' },
      { name: 'Arithmetic Logic Unit (ALU)', x: 40, y: 45, description: 'Calculates mathematical and logic operations' },
      { name: 'Control Unit (CU)', x: 60, y: 45, description: 'Directs flow of instructions and data' },
      { name: 'Primary Memory (RAM)', x: 80, y: 75, description: 'Volatile high-speed working storage' },
      { name: 'Input Devices (Keyboard/Mouse)', x: 15, y: 75, description: 'Transfers user instructions to system' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0f172a" rx="12"/>
      <!-- CPU Box -->
      <rect x="150" y="40" width="200" height="130" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="250" y="65" font-size="13" font-weight="bold" fill="#38bdf8" text-anchor="middle">CENTRAL PROCESSING UNIT</text>
      <rect x="165" y="80" width="80" height="70" rx="6" fill="#334155"/>
      <text x="205" y="110" font-size="11" font-weight="bold" fill="#e2e8f0" text-anchor="middle">A.L.U.</text>
      <rect x="255" y="80" width="80" height="70" rx="6" fill="#334155"/>
      <text x="295" y="110" font-size="11" font-weight="bold" fill="#e2e8f0" text-anchor="middle">C.U.</text>
      <!-- Input and Output -->
      <rect x="40" y="210" width="100" height="60" rx="8" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
      <text x="90" y="245" font-size="11" font-weight="bold" fill="#4ade80" text-anchor="middle">INPUT UNITS</text>
      <rect x="190" y="210" width="120" height="60" rx="8" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
      <text x="250" y="245" font-size="11" font-weight="bold" fill="#fbbf24" text-anchor="middle">MAIN MEMORY (RAM)</text>
      <rect x="360" y="210" width="100" height="60" rx="8" fill="#1e293b" stroke="#f472b6" stroke-width="2"/>
      <text x="410" y="245" font-size="11" font-weight="bold" fill="#f472b6" text-anchor="middle">OUTPUT UNITS</text>
    </svg>`
  },

  // =========================================================================
  // 9. NIGERIAN LANGUAGES (Èdè Yorùbá, Asụsụ Igbo, Harshen Hausa)
  // =========================================================================
  {
    id: 'ast_yor_ate_konsonanti',
    title: 'Àtẹ Kọ́nsónáǹtì Èdè Yorùbá (Phonetic Consonants Chart)',
    subject: 'Èdè Yorùbá',
    classLevel: 'jss-1',
    category: 'Languages',
    description: 'Statutory Yoruba phonetic grid: Àfipè (ọ̀rọ̀ àbùdá) bíi Àfipè èbè (b, m), Afipè eyín-fárígá (f).',
    type: '2d',
    labels: [
      { name: 'Kọ́nsónáǹtì Afipè Èbè (b, m)', x: 25, y: 35, description: 'Bilabial consonants' },
      { name: 'Kọ́nsónáǹtì Eyín-Fárígá (f)', x: 25, y: 55, description: 'Labiodental consonant' },
      { name: 'Kọ́nsónáǹtì Eyín (t, d, s, n, l)', x: 65, y: 35, description: 'Alveolar consonants' },
      { name: 'Kọ́nsónáǹtì Àfàsé (k, g, gb, w)', x: 65, y: 55, description: 'Velar and Labial-velar' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fefce8" rx="12"/>
      <text x="250" y="35" font-size="14" font-weight="bold" fill="#854d0e" text-anchor="middle">ÀTẸ KỌ́NSÓNÁǸTÌ ÈDÈ YORÙBÁ (18)</text>
      <rect x="40" y="60" width="420" height="220" rx="8" fill="#ffffff" stroke="#ca8a04" stroke-width="2"/>
      <line x1="40" y1="110" x2="460" y2="110" stroke="#e2e8f0" stroke-width="1.5"/>
      <line x1="40" y1="160" x2="460" y2="160" stroke="#e2e8f0" stroke-width="1.5"/>
      <line x1="40" y1="210" x2="460" y2="210" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="80" y="90" font-size="12" font-weight="bold" fill="#0f172a">Èbè (Bilabial):</text>
      <text x="260" y="90" font-size="13" font-weight="bold" fill="#b45309">b, m</text>
      <text x="80" y="140" font-size="12" font-weight="bold" fill="#0f172a">Eyín (Alveolar):</text>
      <text x="260" y="140" font-size="13" font-weight="bold" fill="#b45309">t, d, s, n, l, r</text>
      <text x="80" y="190" font-size="12" font-weight="bold" fill="#0f172a">Àfàsé (Velar):</text>
      <text x="260" y="190" font-size="13" font-weight="bold" fill="#b45309">k, g, w, y</text>
      <text x="80" y="245" font-size="12" font-weight="bold" fill="#0f172a">Àfàsé-Èbè (Labial-Velar):</text>
      <text x="260" y="245" font-size="13" font-weight="bold" fill="#b45309">p (kp), gb</text>
    </svg>`
  },
  {
    id: 'ast_igb_mkpuruedemede',
    title: 'Mkpụrụedemede Igbo na Udaume / Mgbochiume',
    subject: 'Asụsụ Igbo',
    classLevel: 'jss-1',
    category: 'Languages',
    description: 'Mkpụrụedemede 36: Udaume asatọ (Udaume dị nro na Udaume siri ike) na Mgbochiume 28.',
    type: '2d',
    labels: [
      { name: 'Udaume Siri Ike (a, e, i, o, u)', x: 30, y: 40, description: 'Light vowels' },
      { name: 'Udaume Dị Nro (ị, ọ, ụ)', x: 70, y: 40, description: 'Heavy dotted vowels' },
      { name: 'Mgbochiume Okpukpu (ch, gb, gh, gw, kp, kw, nw, ny, sh)', x: 50, y: 75, description: 'Compound consonants' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="12"/>
      <text x="250" y="35" font-size="14" font-weight="bold" fill="#14532d" text-anchor="middle">MKPỤRỤEDEMEDE IGBO (36)</text>
      <rect x="40" y="60" width="420" height="220" rx="8" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <text x="60" y="95" font-size="12" font-weight="bold" fill="#15803d">Udaume (8 Vowels):</text>
      <text x="220" y="95" font-size="13" font-weight="bold" fill="#0f172a">a, e, i, ị, o, ọ, u, ụ</text>
      <line x1="40" y1="120" x2="460" y2="120" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="60" y="155" font-size="12" font-weight="bold" fill="#0369a1">Mgbochiume Ndị Otu:</text>
      <text x="220" y="155" font-size="12" fill="#0f172a">b, d, f, g, h, j, k, l, m, n, p, r, s, t, v, w, y, z</text>
      <line x1="40" y1="185" x2="460" y2="185" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="60" y="225" font-size="12" font-weight="bold" fill="#b91c1c">Mgbochiume Okpukpu (9):</text>
      <text x="220" y="225" font-size="13" font-weight="bold" fill="#991b1b">ch, gb, gh, gw, kp, kw, nw, ny, sh</text>
    </svg>`
  },

  // =========================================================================
  // 10. AGRICULTURAL SCIENCE (Ruminant Anatomy, Soil Horizon, Nitrogen Cycle)
  // =========================================================================
  {
    id: 'ast_agr_ruminant_stomach',
    title: 'Compound Stomach of Ruminant Farm Animal (Cattle/Sheep)',
    subject: 'Agricultural Science',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Four-chamber digestive system: Rumen (paunch), Reticulum (honeycomb), Omasum (manyplies), Abomasum (true stomach).',
    type: '2d',
    labels: [
      { name: '1. Rumen (Paunch - Fermentation)', x: 30, y: 40, description: 'Largest compartment with microbial digestion' },
      { name: '2. Reticulum (Honeycomb - Regurgitation)', x: 60, y: 30, description: 'Traps foreign objects and forms cud' },
      { name: '3. Omasum (Manyplies - Water Reabsorption)', x: 75, y: 55, description: 'Folds that reabsorb moisture' },
      { name: '4. Abomasum (True Stomach - Enzymes)', x: 50, y: 80, description: 'Secretes gastric juices and enzymes' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fefce8" rx="12"/>
      <ellipse cx="180" cy="140" rx="90" ry="60" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
      <text x="180" y="145" font-size="13" font-weight="bold" fill="#854d0e" text-anchor="middle">RUMEN (Paunch)</text>
      <ellipse cx="320" cy="100" rx="45" ry="35" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="320" y="105" font-size="11" font-weight="bold" fill="#9a3412" text-anchor="middle">RETICULUM</text>
      <ellipse cx="370" cy="180" rx="40" ry="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
      <text x="370" y="185" font-size="11" font-weight="bold" fill="#166534" text-anchor="middle">OMASUM</text>
      <ellipse cx="280" cy="230" rx="60" ry="40" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
      <text x="280" y="235" font-size="11" font-weight="bold" fill="#9d174d" text-anchor="middle">ABOMASUM (True)</text>
    </svg>`
  },

  // =========================================================================
  // 11. PHYSICAL & HEALTH EDUCATION (PHE) & FINE ARTS
  // =========================================================================
  {
    id: 'ast_phe_track_and_field_layout',
    title: 'Standard 400m Running Track & Field Events Layout',
    subject: 'Physical and Health Education',
    classLevel: 'jss-2',
    category: 'Vocational & Arts',
    description: 'Statutory 400m oval track layout with lanes, 100m straight, shot put circle, and high jump arena.',
    type: '2d',
    labels: [
      { name: '100m Straight Finish', x: 80, y: 80, description: 'Sprint sprint straightaway' },
      { name: '400m Staggered Start Line', x: 25, y: 25, description: 'Compensates for curve radius' },
      { name: 'Shot Put & Discus Circle', x: 50, y: 40, description: 'Field throwing sector' },
      { name: 'Football / Infield Pitch', x: 50, y: 50, description: 'Multi-purpose central grass field' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f1f5f9" rx="12"/>
      <!-- Track Ring -->
      <rect x="70" y="50" width="360" height="220" rx="110" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <rect x="110" y="80" width="280" height="160" rx="80" fill="#15803d" stroke="#ffffff" stroke-width="2"/>
      <rect x="180" y="110" width="140" height="100" fill="none" stroke="#ffffff" stroke-width="2"/>
      <circle cx="250" cy="160" r="25" fill="none" stroke="#ffffff" stroke-width="2"/>
      <text x="250" y="295" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Standard 8-Lane 400m Synthetic Oval Track</text>
    </svg>`
  },
  {
    id: 'ast_art_color_wheel',
    title: 'Color Wheel: Primary, Secondary & Tertiary Harmonies',
    subject: 'Cultural and Creative Arts',
    classLevel: 'jss-1',
    category: 'Vocational & Arts',
    description: 'Primary pigments (Red, Yellow, Blue), Secondary mixtures (Orange, Green, Purple), and complementary pairs.',
    type: '2d',
    labels: [
      { name: 'Primary: Red', x: 50, y: 15, description: 'Pure pigment cannot be mixed' },
      { name: 'Primary: Yellow', x: 85, y: 65, description: 'Warm vibrant base pigment' },
      { name: 'Primary: Blue', x: 15, y: 65, description: 'Cool primary hue' },
      { name: 'Secondary: Green (Blue + Yellow)', x: 50, y: 85, description: 'Formed by equal primary mix' },
      { name: 'Secondary: Orange (Red + Yellow)', x: 75, y: 35, description: 'Warm intermediate color' },
      { name: 'Secondary: Purple / Violet (Red + Blue)', x: 25, y: 35, description: 'Cool secondary color' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <!-- Circle sectors -->
      <circle cx="250" cy="160" r="100" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
      <circle cx="250" cy="80" r="25" fill="#ef4444"/>
      <text x="250" y="85" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Red</text>
      <circle cx="320" cy="120" r="22" fill="#f97316"/>
      <text x="320" y="125" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Orange</text>
      <circle cx="330" cy="190" r="25" fill="#eab308"/>
      <text x="330" y="195" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Yellow</text>
      <circle cx="250" cy="240" r="22" fill="#22c55e"/>
      <text x="250" y="245" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Green</text>
      <circle cx="170" cy="190" r="25" fill="#3b82f6"/>
      <text x="170" y="195" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Blue</text>
      <circle cx="180" cy="120" r="22" fill="#a855f7"/>
      <text x="180" y="125" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Purple</text>
      <text x="250" y="165" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">Harmonies</text>
    </svg>`
  },

  // =========================================================================
  // 12. ADVANCED MATHEMATICS & GEOMETRY (Extended)
  // =========================================================================
  {
    id: 'ast_mth_cyclic_quad',
    title: 'Cyclic Quadrilateral: Opposite Angles Sum to 180°',
    subject: 'Mathematics',
    classLevel: 'sss-2',
    category: 'Mathematics',
    description: 'Four vertices touch circumference; theorem: ∠A + ∠C = 180° and ∠B + ∠D = 180°.',
    type: '2d',
    labels: [
      { name: 'Angle A (θ₁)', x: 30, y: 30, description: 'Interior angle subtended at top-left' },
      { name: 'Angle C (180° - θ₁)', x: 70, y: 75, description: 'Opposite interior angle' },
      { name: 'Circumscribed Circle', x: 50, y: 50, description: 'Circle passing through all 4 vertices' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <circle cx="250" cy="160" r="110" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5"/>
      <polygon points="180,75 325,85 340,240 160,210" fill="#dcfce7" stroke="#15803d" stroke-width="2.5"/>
      <text x="185" y="100" font-size="12" font-weight="bold" fill="#15803d">A</text>
      <text x="315" y="105" font-size="12" font-weight="bold" fill="#15803d">B</text>
      <text x="325" y="230" font-size="12" font-weight="bold" fill="#15803d">C</text>
      <text x="175" y="205" font-size="12" font-weight="bold" fill="#15803d">D</text>
      <text x="250" y="285" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">∠A + ∠C = 180°  |  ∠B + ∠D = 180°</text>
    </svg>`
  },
  {
    id: 'ast_mth_venn_diagram',
    title: 'Venn Diagram: Set Theory Intersection & Union',
    subject: 'Mathematics',
    classLevel: 'jss-2',
    category: 'Mathematics',
    description: 'Universal Set ξ containing intersecting sets A and B with intersection A ∩ B and complement.',
    type: '2d',
    labels: [
      { name: 'Universal Set (ξ)', x: 15, y: 20, description: 'Enclosing universal boundary box' },
      { name: 'Set A Only [A \\ B]', x: 30, y: 50, description: 'Elements exclusively in Set A' },
      { name: 'Intersection [A ∩ B]', x: 50, y: 50, description: 'Common shared elements' },
      { name: 'Set B Only [B \\ A]', x: 70, y: 50, description: 'Elements exclusively in Set B' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <rect x="50" y="30" width="400" height="250" fill="none" stroke="#334155" stroke-width="2.5"/>
      <circle cx="205" cy="155" r="85" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" opacity="0.8"/>
      <circle cx="295" cy="155" r="85" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" opacity="0.8"/>
      <text x="80" y="60" font-size="16" font-weight="bold" fill="#334155">ξ</text>
      <text x="170" y="160" font-size="14" font-weight="bold" fill="#0369a1">Set A</text>
      <text x="250" y="160" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">A ∩ B</text>
      <text x="330" y="160" font-size="14" font-weight="bold" fill="#b45309">Set B</text>
    </svg>`
  },

  // =========================================================================
  // 13. ENGLISH STUDIES & LITERATURE
  // =========================================================================
  {
    id: 'ast_eng_syntax_tree',
    title: 'Sentence Syntactic Hierarchy (Noun Phrase & Verb Phrase)',
    subject: 'English Language',
    classLevel: 'sss-1',
    category: 'Languages',
    description: 'Chomskyan generative syntax tree: S ➔ NP (Determiner + Noun) + VP (Verb + Direct Object NP).',
    type: '2d',
    labels: [
      { name: 'Sentence Node (S)', x: 50, y: 15, description: 'Root syntactic clause' },
      { name: 'Noun Phrase (NP Subject)', x: 30, y: 35, description: 'Subject nominal constituent' },
      { name: 'Verb Phrase (VP Predicate)', x: 70, y: 35, description: 'Action predicate constituent' },
      { name: 'Lexical Terminal Words', x: 50, y: 85, description: '"The teacher inspired the students"' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <text x="250" y="45" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">S (Sentence)</text>
      <line x1="250" y1="55" x2="160" y2="100" stroke="#475569" stroke-width="2"/>
      <line x1="250" y1="55" x2="340" y2="100" stroke="#475569" stroke-width="2"/>
      <text x="160" y="120" font-size="14" font-weight="bold" fill="#0284c7" text-anchor="middle">NP (Subject)</text>
      <text x="340" y="120" font-size="14" font-weight="bold" fill="#16a34a" text-anchor="middle">VP (Predicate)</text>
      <line x1="160" y1="130" x2="110" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="160" y1="130" x2="200" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="110" y="195" font-size="12" fill="#334155" text-anchor="middle">Det (The)</text>
      <text x="200" y="195" font-size="12" fill="#334155" text-anchor="middle">N (Teacher)</text>
      <line x1="340" y1="130" x2="290" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="340" y1="130" x2="390" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="290" y="195" font-size="12" fill="#334155" text-anchor="middle">V (Inspired)</text>
      <text x="390" y="195" font-size="12" fill="#334155" text-anchor="middle">NP (Students)</text>
      <text x="250" y="275" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">"The teacher inspired the students."</text>
    </svg>`
  },
  {
    id: 'ast_lit_freytag_pyramid',
    title: 'Dramatic Arc & Narrative Plot Structure (Freytag\'s Pyramid)',
    subject: 'Literature-in-English',
    classLevel: 'sss-2',
    category: 'Humanities',
    description: 'Classical dramatic plot structure: Exposition, Inciting Incident, Rising Action, Climax, Falling Action, Denouement.',
    type: '2d',
    labels: [
      { name: '1. Exposition / Status Quo', x: 15, y: 75, description: 'Setting, character introduction, and mood' },
      { name: '2. Rising Action & Complications', x: 35, y: 45, description: 'Conflict escalates through crises' },
      { name: '3. Climax (Turning Point)', x: 50, y: 20, description: 'Moment of highest tension and irreversible decision' },
      { name: '4. Falling Action', x: 68, y: 45, description: 'Consequences unfold following the climax' },
      { name: '5. Resolution / Denouement', x: 88, y: 75, description: 'Equilibrium restored or tragic catharsis' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <polyline points="60,240 160,210 250,70 340,200 440,240" fill="none" stroke="#7c3aed" stroke-width="3"/>
      <circle cx="250" cy="70" r="7" fill="#ef4444"/>
      <text x="250" y="50" font-size="13" font-weight="bold" fill="#dc2626" text-anchor="middle">CLIMAX (Peak Tension)</text>
      <text x="80" y="260" font-size="11" font-weight="bold" fill="#475569">Exposition</text>
      <text x="175" y="140" font-size="11" font-weight="bold" fill="#6d28d9">Rising Action ▲</text>
      <text x="350" y="140" font-size="11" font-weight="bold" fill="#6d28d9">Falling Action ▼</text>
      <text x="400" y="260" font-size="11" font-weight="bold" fill="#475569">Resolution</text>
    </svg>`
  },

  // =========================================================================
  // 14. ADVANCED BIOLOGICAL SYSTEMS
  // =========================================================================
  {
    id: 'ast_bio_human_eye',
    title: 'Anatomy of the Mammalian Eye (Refraction & Retina)',
    subject: 'Biology',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Optical cross-section: Cornea, aqueous humor, biconvex lens, vitreous body, fovea, and optic nerve.',
    type: '2d',
    labels: [
      { name: 'Cornea (Primary Refraction)', x: 18, y: 50, description: 'Clear outer window focusing 70% of light' },
      { name: 'Biconvex Crystalline Lens', x: 28, y: 50, description: 'Accommodates focal length via ciliary muscles' },
      { name: 'Retina (Photoreceptors)', x: 80, y: 50, description: 'Rods and cones converting photons to impulses' },
      { name: 'Optic Nerve (Cranial Nerve II)', x: 92, y: 65, description: 'Transmits action potentials to visual cortex' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <!-- Sclera / Eyeball -->
      <path d="M 120,110 C 120,60 380,50 380,160 C 380,270 120,260 120,210 Q 90,160 120,110 Z" fill="#ffffff" stroke="#334155" stroke-width="3"/>
      <!-- Lens -->
      <ellipse cx="145" cy="160" rx="12" ry="35" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <!-- Retina Layer -->
      <path d="M 220,70 C 360,70 370,160 370,160 C 370,160 360,250 220,250" fill="none" stroke="#ea580c" stroke-width="3"/>
      <!-- Optic Nerve Exit -->
      <rect x="375" y="170" width="60" height="25" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
      <text x="80" y="165" font-size="11" font-weight="bold" fill="#0284c7">Cornea</text>
      <text x="145" y="115" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">Lens</text>
      <text x="330" y="140" font-size="11" font-weight="bold" fill="#ea580c">Retina</text>
      <text x="405" y="215" font-size="11" font-weight="bold" fill="#334155">Optic Nerve</text>
    </svg>`
  },
  {
    id: 'ast_bio_nephron_kidney',
    title: 'Structure of the Kidney Nephron (Ultrafiltration)',
    subject: 'Biology',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Renal corpuscle: Bowman\'s capsule, glomerulus, proximal convoluted tubule, loop of Henle, collecting duct.',
    type: '2d',
    labels: [
      { name: 'Bowman\'s Capsule & Glomerulus', x: 25, y: 30, description: 'High-pressure capillary bed for ultrafiltration' },
      { name: 'Proximal Convoluted Tubule (PCT)', x: 45, y: 25, description: '100% glucose and amino acid reabsorption' },
      { name: 'Loop of Henle (Counter-Current)', x: 50, y: 80, description: 'Concentrates medullary salinity gradient' },
      { name: 'Collecting Duct (ADH Action)', x: 80, y: 50, description: 'Regulates final urine osmolality' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fef2f2" rx="12"/>
      <circle cx="110" cy="90" r="30" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
      <circle cx="110" cy="90" r="14" fill="#b91c1c"/>
      <path d="M 140,90 Q 200,60 220,110 Q 240,160 240,250 Q 255,270 270,250 Q 270,140 310,100 L 370,100 L 370,270" fill="none" stroke="#ea580c" stroke-width="4"/>
      <text x="110" y="50" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Bowman's Capsule</text>
      <text x="210" y="45" font-size="11" font-weight="bold" fill="#c2410c">PCT</text>
      <text x="255" y="285" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Loop of Henle</text>
      <text x="400" y="180" font-size="11" font-weight="bold" fill="#0f172a">Collecting Duct</text>
    </svg>`
  },

  // =========================================================================
  // 15. CHEMISTRY & LABORATORY EXPERIMENTS
  // =========================================================================
  {
    id: 'ast_chm_electrolytic_cell',
    title: 'Electrolysis of Acidified Water (Hoffman Voltameter)',
    subject: 'Chemistry',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Electrolytic decomposition: Anode (+, Oxygen evolution 1 vol) and Cathode (-, Hydrogen evolution 2 vols).',
    type: '2d',
    labels: [
      { name: 'Anode (+ Platinum Electrode)', x: 35, y: 70, description: 'Oxidation: 4OH⁻ ➔ 2H₂O + O₂ + 4e⁻' },
      { name: 'Cathode (- Platinum Electrode)', x: 65, y: 70, description: 'Reduction: 4H⁺ + 4e⁻ ➔ 2H₂' },
      { name: 'Hydrogen Gas Column (2 Vols)', x: 65, y: 25, description: 'Twice the stoichiometric volume of oxygen' },
      { name: 'Oxygen Gas Column (1 Vol)', x: 35, y: 35, description: 'Anodic gas tested with glowing splint' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <rect x="150" y="50" width="50" height="190" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <rect x="300" y="50" width="50" height="190" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <rect x="200" y="190" width="100" height="50" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <rect x="165" y="160" width="20" height="70" fill="#475569"/>
      <rect x="315" y="160" width="20" height="70" fill="#475569"/>
      <text x="175" y="35" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">O₂ (1 vol)</text>
      <text x="325" y="35" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">H₂ (2 vols)</text>
      <text x="175" y="270" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">Anode (+)</text>
      <text x="325" y="270" font-size="11" font-weight="bold" fill="#16a34a" text-anchor="middle">Cathode (-)</text>
    </svg>`
  },
  {
    id: 'ast_chm_blast_furnace',
    title: 'Extraction of Iron: Blast Furnace Architecture',
    subject: 'Chemistry',
    classLevel: 'sss-3',
    category: 'Sciences',
    description: 'Reduction of iron ore (hematite Fe₂O₃) with coke and limestone: zones of combustion, reduction, and slag.',
    type: '2d',
    labels: [
      { name: 'Charge Feed (Ore, Coke, Limestone)', x: 50, y: 15, description: 'Raw materials fed through double-bell cone' },
      { name: 'Reduction Zone (Fe₂O₃ ➔ Fe)', x: 50, y: 40, description: 'CO reduces iron ore at 400°-700°C' },
      { name: 'Tuyeres (Hot Blast Inlets)', x: 20, y: 75, description: 'Preheated oxygen blast at 1000°C' },
      { name: 'Molten Iron & Slag Outlets', x: 50, y: 92, description: 'Molten pig iron and calcium silicate slag' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fef2f2" rx="12"/>
      <polygon points="210,40 290,40 330,170 310,250 190,250 170,170" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
      <rect x="180" y="240" width="140" height="25" fill="#f97316"/>
      <rect x="180" y="260" width="140" height="20" fill="#dc2626"/>
      <text x="250" y="25" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Charge: Hematite + Coke + Limestone</text>
      <text x="250" y="110" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Reduction Zone (~600°C)</text>
      <text x="250" y="180" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Fusion Zone (~1200°C)</text>
      <text x="350" y="250" font-size="10" font-weight="bold" fill="#c2410c">Molten Slag</text>
      <text x="350" y="275" font-size="10" font-weight="bold" fill="#b91c1c">Molten Iron (Pig Iron)</text>
    </svg>`
  },

  // =========================================================================
  // 16. PHYSICS & MECHANICS
  // =========================================================================
  {
    id: 'ast_phy_convex_lens',
    title: 'Convex Lens: Real Inverted & Magnified Ray Diagram',
    subject: 'Physics',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Converging lens with Object placed between F and 2F producing a real, inverted, and magnified image.',
    type: '2d',
    labels: [
      { name: 'Optical Center (O)', x: 50, y: 50, description: 'Geometric center of the lens' },
      { name: 'Principal Focus (F)', x: 65, y: 50, description: 'Convergence point for parallel incident rays' },
      { name: 'Object between F & 2F', x: 28, y: 35, description: 'Upright object emitting rays' },
      { name: 'Real Inverted Magnified Image', x: 85, y: 75, description: 'Formed beyond 2F on opposite side' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <line x1="40" y1="160" x2="460" y2="160" stroke="#475569" stroke-width="2"/>
      <!-- Biconvex Lens -->
      <path d="M 250,50 Q 275,160 250,270 Q 225,160 250,50 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2" opacity="0.85"/>
      <!-- Object -->
      <line x1="140" y1="160" x2="140" y2="100" stroke="#16a34a" stroke-width="3"/>
      <polygon points="140,95 135,105 145,105" fill="#16a34a"/>
      <!-- Ray parallel then F -->
      <line x1="140" y1="100" x2="250" y2="100" stroke="#dc2626" stroke-width="1.5"/>
      <line x1="250" y1="100" x2="420" y2="245" stroke="#dc2626" stroke-width="1.5"/>
      <!-- Ray through Optical Center -->
      <line x1="140" y1="100" x2="420" y2="245" stroke="#0284c7" stroke-width="1.5"/>
      <!-- Inverted Image -->
      <line x1="420" y1="160" x2="420" y2="245" stroke="#9333ea" stroke-width="3"/>
      <polygon points="420,250 415,240 425,240" fill="#9333ea"/>
      <text x="140" y="85" font-size="11" font-weight="bold" fill="#16a34a" text-anchor="middle">Object</text>
      <text x="420" y="270" font-size="11" font-weight="bold" fill="#9333ea" text-anchor="middle">Magnified Image</text>
    </svg>`
  },
  {
    id: 'ast_phy_simple_pendulum',
    title: 'Simple Pendulum: Simple Harmonic Motion (SHM)',
    subject: 'Physics',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Inextensible string of length L with mass bob m; period of oscillation T = 2π√(L/g).',
    type: '2d',
    labels: [
      { name: 'Rigid Fixed Support', x: 50, y: 15, description: 'Zero friction pivot anchor' },
      { name: 'Length of String (L)', x: 55, y: 40, description: 'Effective distance to center of gravity' },
      { name: 'Mean / Equilibrium Position', x: 50, y: 75, description: 'Maximum kinetic energy point' },
      { name: 'Extreme Displacement (θ)', x: 70, y: 65, description: 'Maximum potential energy amplitude' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <line x1="180" y1="40" x2="320" y2="40" stroke="#334155" stroke-width="4"/>
      <line x1="250" y1="40" x2="250" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
      <line x1="250" y1="40" x2="330" y2="200" stroke="#0f172a" stroke-width="2.5"/>
      <circle cx="330" cy="200" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="250" cy="220" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
      <path d="M 250,90 A 50,50 0 0,1 270,85" fill="none" stroke="#ea580c" stroke-width="2"/>
      <text x="278" y="80" font-size="12" font-weight="bold" fill="#ea580c">θ</text>
      <text x="250" y="275" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Period T = 2π√(L/g)</text>
    </svg>`
  },

  // =========================================================================
  // 17. GEOGRAPHY & EARTH SCIENCES
  // =========================================================================
  {
    id: 'ast_geo_earth_interior',
    title: 'Concentric Layers of the Earth (Crust, Mantle, Core)',
    subject: 'Geography',
    classLevel: 'jss-1',
    category: 'Social Sciences',
    description: 'Internal geosphere: Solid silicate Crust, Asthenosphere/Mantle, Liquid Outer Core, Solid Inner Core.',
    type: '2d',
    labels: [
      { name: 'Lithosphere / Continental Crust', x: 25, y: 15, description: 'Thin outer solid rock shell (0-70 km)' },
      { name: 'Silicate Mantle (Mesosphere)', x: 40, y: 35, description: 'Semi-fluid convective magma layer' },
      { name: 'Liquid Outer Core (Iron-Nickel)', x: 60, y: 55, description: 'Generates planetary magnetic field' },
      { name: 'Solid Inner Core (Ni-Fe 6000°C)', x: 75, y: 75, description: 'Tremendous gravitational pressure solidifies core' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0b132b" rx="12"/>
      <!-- Quarter slice -->
      <path d="M 120,240 L 400,240 A 280,280 0 0,0 120,50 Z" fill="#15803d" stroke="#22c55e" stroke-width="3"/>
      <path d="M 120,240 L 340,240 A 220,220 0 0,0 120,90 Z" fill="#ea580c" stroke="#f97316" stroke-width="2"/>
      <path d="M 120,240 L 260,240 A 140,140 0 0,0 120,135 Z" fill="#facc15" stroke="#fde047" stroke-width="2"/>
      <path d="M 120,240 L 190,240 A 70,70 0 0,0 120,185 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="290" y="80" font-size="11" font-weight="bold" fill="#86efac">Crust (SIAL / SIMA)</text>
      <text x="240" y="125" font-size="11" font-weight="bold" fill="#ffedd5">Mantle (2,900 km)</text>
      <text x="180" y="170" font-size="11" font-weight="bold" fill="#78350f">Outer Core (Liquid)</text>
      <text x="135" y="215" font-size="10" font-weight="bold" fill="#0f172a">Inner Core</text>
    </svg>`
  },

  // =========================================================================
  // 18. AGRICULTURAL SCIENCE & SOIL HORIZONS
  // =========================================================================
  {
    id: 'ast_agr_soil_profile',
    title: 'Soil Profile Horizons (O, A, B, C, R Bedrock)',
    subject: 'Agricultural Science',
    classLevel: 'jss-2',
    category: 'Sciences',
    description: 'Vertical cross-section of soil layers showing humus, topsoil, subsoil, weathered parent rock, and bedrock.',
    type: '2d',
    labels: [
      { name: 'O Horizon (Organic Humus)', x: 75, y: 15, description: 'Decomposed plant and animal litter' },
      { name: 'A Horizon (Topsoil)', x: 75, y: 35, description: 'Fertile zone with high biological activity' },
      { name: 'B Horizon (Subsoil)', x: 75, y: 55, description: 'Zone of accumulation with minerals and clay' },
      { name: 'C Horizon (Parent Material)', x: 75, y: 75, description: 'Partially weathered rock fragments' },
      { name: 'R Horizon (Solid Bedrock)', x: 75, y: 92, description: 'Impermeable unweathered bedrock base' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <!-- Layers -->
      <rect x="80" y="30" width="220" height="30" fill="#3f2e18"/>
      <rect x="80" y="60" width="220" height="60" fill="#654321"/>
      <rect x="80" y="120" width="220" height="70" fill="#9c6644"/>
      <rect x="80" y="190" width="220" height="60" fill="#b08968"/>
      <rect x="80" y="250" width="220" height="40" fill="#7f7f7f"/>
      <text x="320" y="50" font-size="12" font-weight="bold" fill="#3f2e18">O Horizon: Organic Matter</text>
      <text x="320" y="95" font-size="12" font-weight="bold" fill="#654321">A Horizon: Topsoil (Humus)</text>
      <text x="320" y="160" font-size="12" font-weight="bold" fill="#9c6644">B Horizon: Subsoil (Minerals)</text>
      <text x="320" y="225" font-size="12" font-weight="bold" fill="#b08968">C Horizon: Weathered Parent</text>
      <text x="320" y="275" font-size="12" font-weight="bold" fill="#4b5563">R Horizon: Solid Bedrock</text>
    </svg>`
  },

  // =========================================================================
  // 19. COMPUTER NETWORKS & DATA PROCESSING
  // =========================================================================
  {
    id: 'ast_ict_network_topologies',
    title: 'Local Area Network (LAN) Topologies: Star & Bus',
    subject: 'Data Processing',
    classLevel: 'sss-1',
    category: 'Technology',
    description: 'Star topology connected to centralized switch/hub vs linear Bus topology with terminal terminators.',
    type: '2d',
    labels: [
      { name: 'Central Switch / Hub', x: 30, y: 40, description: 'Central controller in Star network' },
      { name: 'Star Workstations', x: 15, y: 25, description: 'Nodes connected with dedicated cables' },
      { name: 'Linear Bus Backbone Cable', x: 75, y: 40, description: 'Single shared transmission coaxial cable' },
      { name: 'Bus Terminators (50Ω)', x: 90, y: 40, description: 'Absorbs signal reflections at cable ends' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0f172a" rx="12"/>
      <!-- Star Topology Left -->
      <circle cx="140" cy="150" r="24" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <text x="140" y="154" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">SWITCH</text>
      <line x1="140" y1="126" x2="140" y2="70" stroke="#38bdf8" stroke-width="2"/>
      <rect x="120" y="50" width="40" height="25" rx="4" fill="#334155" stroke="#94a3b8"/>
      <line x1="116" y1="150" x2="60" y2="150" stroke="#38bdf8" stroke-width="2"/>
      <rect x="35" y="137" width="40" height="25" rx="4" fill="#334155" stroke="#94a3b8"/>
      <line x1="140" y1="174" x2="140" y2="230" stroke="#38bdf8" stroke-width="2"/>
      <rect x="120" y="225" width="40" height="25" rx="4" fill="#334155" stroke="#94a3b8"/>
      <text x="140" y="280" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">STAR TOPOLOGY</text>
      <!-- Bus Topology Right -->
      <line x1="280" y1="150" x2="460" y2="150" stroke="#f59e0b" stroke-width="4"/>
      <circle cx="280" cy="150" r="6" fill="#ef4444"/>
      <circle cx="460" cy="150" r="6" fill="#ef4444"/>
      <line x1="320" y1="150" x2="320" y2="90" stroke="#f59e0b" stroke-width="2"/>
      <rect x="300" y="65" width="40" height="25" rx="4" fill="#334155" stroke="#94a3b8"/>
      <line x1="400" y1="150" x2="400" y2="210" stroke="#f59e0b" stroke-width="2"/>
      <rect x="380" y="210" width="40" height="25" rx="4" fill="#334155" stroke="#94a3b8"/>
      <text x="370" y="280" font-size="12" font-weight="bold" fill="#f59e0b" text-anchor="middle">BUS TOPOLOGY</text>
    </svg>`
  },

  // =========================================================================
  // 20. RELIGIOUS STUDIES (Christianity & Islam)
  // =========================================================================
  {
    id: 'ast_crs_ark_tabernacle',
    title: 'The Ark of the Covenant & Holy of Holies Layout',
    subject: 'Christian Religious Studies',
    classLevel: 'jss-2',
    category: 'Humanities',
    description: 'Gold-plated acacia wood chest with Mercy Seat (Cherubim wings) housing the Ten Commandments.',
    type: '2d',
    labels: [
      { name: 'Mercy Seat (Pure Gold)', x: 50, y: 35, description: 'Lid where the Shekinah glory rested' },
      { name: 'Two Golden Cherubim', x: 25, y: 25, description: 'Facing wings overshadowing the mercy seat' },
      { name: 'Acacia Wood Chest with Gold Overlay', x: 50, y: 65, description: 'Housed Tablets of Law, Aaron\'s Rod, and Manna' },
      { name: 'Poles for Transport', x: 80, y: 70, description: 'Carried exclusively by the Kohathite Levites' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fefce8" rx="12"/>
      <!-- Chest -->
      <rect x="150" y="130" width="200" height="100" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <!-- Carrying Poles -->
      <line x1="80" y1="180" x2="420" y2="180" stroke="#eab308" stroke-width="6"/>
      <!-- Cherubim Wings -->
      <path d="M 160,130 C 180,60 230,80 240,110" fill="none" stroke="#ca8a04" stroke-width="4"/>
      <path d="M 340,130 C 320,60 270,80 260,110" fill="none" stroke="#ca8a04" stroke-width="4"/>
      <text x="250" y="270" font-size="13" font-weight="bold" fill="#854d0e" text-anchor="middle">Ark of the Covenant (Exodus 25:10-22)</text>
    </svg>`
  },
  {
    id: 'ast_irs_five_pillars',
    title: 'Arkan al-Islam: The Five Pillars of Islam',
    subject: 'Islamic Religious Studies',
    classLevel: 'jss-1',
    category: 'Humanities',
    description: 'Foundational statutory obligations: Shahadah, Salah, Zakat, Sawm (Ramadan), and Hajj.',
    type: '2d',
    labels: [
      { name: '1. Shahadah (Declaration of Faith)', x: 15, y: 50, description: 'Tawheed: Faith in One God and Muhammad as His Messenger' },
      { name: '2. Salah (Five Daily Prayers)', x: 32, y: 50, description: 'Fajr, Dhuhr, Asr, Maghrib, and Isha' },
      { name: '3. Zakat (Obligatory Almsgiving)', x: 50, y: 50, description: '2.5% wealth redistribution to the needy' },
      { name: '4. Sawm (Fasting during Ramadan)', x: 68, y: 50, description: 'Spiritual discipline from dawn to sunset' },
      { name: '5. Hajj (Pilgrimage to Makkah)', x: 85, y: 50, description: 'Annual pilgrimage for those physically and financially able' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="12"/>
      <text x="250" y="35" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">ARKAN AL-ISLAM (THE FIVE PILLARS)</text>
      <!-- Five Pillars -->
      <g transform="translate(40, 60)">
        <rect x="0" y="0" width="65" height="180" rx="8" fill="#15803d"/>
        <text x="32" y="100" font-size="11" font-weight="bold" fill="#ffffff" transform="rotate(-90 32,100)" text-anchor="middle">1. SHAHADAH</text>
      </g>
      <g transform="translate(125, 60)">
        <rect x="0" y="0" width="65" height="180" rx="8" fill="#15803d"/>
        <text x="32" y="100" font-size="11" font-weight="bold" fill="#ffffff" transform="rotate(-90 32,100)" text-anchor="middle">2. SALAH</text>
      </g>
      <g transform="translate(210, 60)">
        <rect x="0" y="0" width="65" height="180" rx="8" fill="#15803d"/>
        <text x="32" y="100" font-size="11" font-weight="bold" fill="#ffffff" transform="rotate(-90 32,100)" text-anchor="middle">3. ZAKAT</text>
      </g>
      <g transform="translate(295, 60)">
        <rect x="0" y="0" width="65" height="180" rx="8" fill="#15803d"/>
        <text x="32" y="100" font-size="11" font-weight="bold" fill="#ffffff" transform="rotate(-90 32,100)" text-anchor="middle">4. SAWM</text>
      </g>
      <g transform="translate(380, 60)">
        <rect x="0" y="0" width="65" height="180" rx="8" fill="#15803d"/>
        <text x="32" y="100" font-size="11" font-weight="bold" fill="#ffffff" transform="rotate(-90 32,100)" text-anchor="middle">5. HAJJ</text>
      </g>
      <text x="250" y="280" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">Compulsory Spiritual Foundations of Islamic Faith</text>
    </svg>`
  },

  // =========================================================================
  // 21. MUSIC & MUSICAL NOTATION
  // =========================================================================
  {
    id: 'ast_mus_staff_notation',
    title: 'Musical Staff: Treble Clef & Note Durations',
    subject: 'Music',
    classLevel: 'jss-1',
    category: 'Vocational & Arts',
    description: 'Five-line staff with Treble Clef (G-Clef), Semibreve (Whole note), Minim (Half), and Crotchet (Quarter).',
    type: '2d',
    labels: [
      { name: 'Treble G-Clef', x: 15, y: 50, description: 'Identifies the second line from bottom as G4' },
      { name: 'Five Lines & Four Spaces (EGBDF / FACE)', x: 45, y: 50, description: 'Pitches for treble instruments and female voices' },
      { name: 'Semibreve (Whole Note = 4 Beats)', x: 40, y: 50, description: 'Open oval note head' },
      { name: 'Minim (Half Note = 2 Beats)', x: 60, y: 40, description: 'Open note head with stem' },
      { name: 'Crotchet (Quarter Note = 1 Beat)', x: 80, y: 40, description: 'Filled note head with stem' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdfbf7" rx="12"/>
      <!-- 5 Staff Lines -->
      <line x1="50" y1="100" x2="450" y2="100" stroke="#334155" stroke-width="2"/>
      <line x1="50" y1="125" x2="450" y2="125" stroke="#334155" stroke-width="2"/>
      <line x1="50" y1="150" x2="450" y2="150" stroke="#334155" stroke-width="2"/>
      <line x1="50" y1="175" x2="450" y2="175" stroke="#334155" stroke-width="2"/>
      <line x1="50" y1="200" x2="450" y2="200" stroke="#334155" stroke-width="2"/>
      <!-- Semibreve -->
      <ellipse cx="190" cy="150" rx="12" ry="9" fill="none" stroke="#0f172a" stroke-width="3"/>
      <text x="190" y="235" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Semibreve (4)</text>
      <!-- Minim -->
      <ellipse cx="280" cy="150" rx="11" ry="8" fill="none" stroke="#0f172a" stroke-width="3"/>
      <line x1="291" y1="150" x2="291" y2="90" stroke="#0f172a" stroke-width="2.5"/>
      <text x="280" y="235" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Minim (2)</text>
      <!-- Crotchet -->
      <ellipse cx="370" cy="150" rx="11" ry="8" fill="#0f172a"/>
      <line x1="381" y1="150" x2="381" y2="90" stroke="#0f172a" stroke-width="2.5"/>
      <text x="370" y="235" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Crotchet (1)</text>
      <text x="250" y="65" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Five-Line Staff & Western Musical Time Values</text>
    </svg>`
  },
  // =========================================================================
  // 14. MATHEMATICS - ADVANCED (Circle Theorems)
  // =========================================================================
  {
    id: 'ast_mth_circle_theorem',
    title: 'Circle Theorem: Angle at the Centre is Twice the Angle at Circumference',
    subject: 'Mathematics',
    classLevel: 'sss-2',
    category: 'Mathematics',
    description: 'Subtended angle 2θ at circle center O and θ at circumference point P.',
    type: '2d',
    labels: [
      { name: 'Center Angle (2θ)', x: 50, y: 52, description: 'Angle subtended at center O is twice angle at circumference' },
      { name: 'Circumference Angle (θ)', x: 50, y: 15, description: 'Angle subtended at circle perimeter' },
      { name: 'Chord Subtending Arc (AB)', x: 50, y: 88, description: 'Base chord forming the subtended arc' },
      { name: 'Circle Radius (r)', x: 34, y: 68, description: 'Radius connecting center to circumference' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <circle cx="250" cy="160" r="110" fill="none" stroke="#0284c7" stroke-width="3"/>
      <circle cx="250" cy="160" r="4" fill="#0369a1"/>
      <polygon points="170,230 250,50 330,230" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2"/>
      <line x1="170" y1="230" x2="250" y2="160" stroke="#0284c7" stroke-width="2.5"/>
      <line x1="330" y1="230" x2="250" y2="160" stroke="#0284c7" stroke-width="2.5"/>
      <text x="250" y="40" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">θ (at circumference)</text>
      <text x="250" y="180" font-size="13" font-weight="bold" fill="#0284c7" text-anchor="middle">2θ (at centre O)</text>
      <text x="160" y="250" font-size="12" font-weight="bold" fill="#475569">A</text>
      <text x="340" y="250" font-size="12" font-weight="bold" fill="#475569">B</text>
      <text x="250" y="305" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">WAEC Standard: Angle at Center = 2 × Angle at Circumference</text>
    </svg>`
  },
  // =========================================================================
  // 15. ENGLISH STUDIES - SYNTACTIC TREE & GRAMMAR
  // =========================================================================
  {
    id: 'ast_eng_syntax_tree',
    title: 'Sentence Structure & Syntactic Constituent Tree (NP + VP)',
    subject: 'English Studies',
    classLevel: 'sss-1',
    category: 'Languages',
    description: 'Hierarchical constituent phrase marker dissecting Subject Noun Phrase and Predicate Verb Phrase.',
    type: '2d',
    labels: [
      { name: 'Sentence Node (S)', x: 50, y: 15, description: 'Root syntactic clause node' },
      { name: 'Noun Phrase (NP - Subject)', x: 28, y: 40, description: 'Subject nominal phrase constituent' },
      { name: 'Verb Phrase (VP - Predicate)', x: 72, y: 40, description: 'Predicate constituent containing verb and complement' },
      { name: 'Lexical Terminals (Tokens)', x: 50, y: 85, description: 'Terminal lexical items: Det, N, V, NP' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fdf4ff" rx="12"/>
      <text x="250" y="35" font-size="16" font-weight="bold" fill="#701a75" text-anchor="middle">S (Sentence)</text>
      <line x1="240" y1="45" x2="150" y2="90" stroke="#a21caf" stroke-width="2"/>
      <line x1="260" y1="45" x2="350" y2="90" stroke="#a21caf" stroke-width="2"/>
      <text x="150" y="105" font-size="14" font-weight="bold" fill="#86198f" text-anchor="middle">NP (Subject)</text>
      <text x="350" y="105" font-size="14" font-weight="bold" fill="#86198f" text-anchor="middle">VP (Predicate)</text>
      <line x1="130" y1="115" x2="90" y2="160" stroke="#c026d3" stroke-width="1.5"/>
      <line x1="170" y1="115" x2="200" y2="160" stroke="#c026d3" stroke-width="1.5"/>
      <line x1="330" y1="115" x2="300" y2="160" stroke="#c026d3" stroke-width="1.5"/>
      <line x1="370" y1="115" x2="410" y2="160" stroke="#c026d3" stroke-width="1.5"/>
      <text x="90" y="175" font-size="12" fill="#64748b" text-anchor="middle">Det (The)</text>
      <text x="200" y="175" font-size="12" fill="#64748b" text-anchor="middle">N (Teacher)</text>
      <text x="300" y="175" font-size="12" fill="#64748b" text-anchor="middle">V (Wrote)</text>
      <text x="410" y="175" font-size="12" fill="#64748b" text-anchor="middle">NP (The Plan)</text>
      <rect x="50" y="235" width="400" height="50" fill="#fae8ff" rx="8" stroke="#d946ef" stroke-width="1.5"/>
      <text x="250" y="265" font-size="13" font-weight="bold" fill="#701a75" text-anchor="middle">Example: "The diligent teacher wrote the approved lesson plan."</text>
    </svg>`
  },
  // =========================================================================
  // 16. BIOLOGY - REFLEX ARC & SYNAPSE
  // =========================================================================
  {
    id: 'ast_bio_reflex_arc',
    title: 'Reflex Arc & Synaptic Neurotransmission Pathway',
    subject: 'Biology',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Involuntary stimulus-response reflex pathway through spinal cord grey matter, sensory, relay, and motor neurons.',
    type: '2d',
    labels: [
      { name: 'Sensory Receptor (Skin)', x: 18, y: 70, description: 'Detects stimulus such as pinprick or heat' },
      { name: 'Sensory (Afferent) Neuron', x: 35, y: 35, description: 'Carries impulse from receptor to dorsal root of spinal cord' },
      { name: 'Relay (Interneuron) in Spinal Cord', x: 62, y: 38, description: 'Synapses within spinal cord grey matter' },
      { name: 'Motor (Efferent) Neuron', x: 68, y: 75, description: 'Transmits response impulse to muscular effector' },
      { name: 'Effector (Bicep Muscle)', x: 85, y: 82, description: 'Contracts to pull limb away from danger' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fff7ed" rx="12"/>
      <path d="M240,60 C320,50 360,110 330,170 C300,210 240,190 220,150 Z" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
      <!-- Butterfly grey matter -->
      <path d="M260,95 Q280,120 260,145 Q285,120 300,100" fill="#fdba74" stroke="#c2410c" stroke-width="2"/>
      <!-- Sensory path -->
      <path d="M80,220 Q120,90 265,115" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="6,3"/>
      <!-- Motor path -->
      <path d="M275,135 Q220,200 380,240" fill="none" stroke="#dc2626" stroke-width="3"/>
      <circle cx="80" cy="220" r="10" fill="#38bdf8"/>
      <rect x="370" y="225" width="50" height="30" fill="#f87171" rx="6"/>
      <text x="80" y="250" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Pain Receptor</text>
      <text x="395" y="245" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">Muscle</text>
      <text x="250" y="30" font-size="13" font-weight="bold" fill="#9a3412" text-anchor="middle">Spinal Reflex Arc: Receptor → Sensory → Relay → Motor → Effector</text>
    </svg>`
  },
  // =========================================================================
  // 17. CHEMISTRY - ELECTROLYSIS OF WATER
  // =========================================================================
  {
    id: 'ast_chm_electrolysis',
    title: 'Hoffman Voltameter: Electrolysis of Acidified Water (2H₂ + O₂)',
    subject: 'Chemistry',
    classLevel: 'sss-2',
    category: 'Sciences',
    description: 'Decomposition of water into hydrogen and oxygen gases at 2:1 volume ratio using platinum electrodes.',
    type: '2d',
    labels: [
      { name: 'Cathode Tube (Hydrogen 2 vols)', x: 35, y: 25, description: 'Reduction produces H₂ gas: 2H⁺ + 2e⁻ → H₂ (g)' },
      { name: 'Anode Tube (Oxygen 1 vol)', x: 65, y: 35, description: 'Oxidation produces O₂ gas: 4OH⁻ → 2H₂O + O₂ + 4e⁻' },
      { name: 'Platinum Electrodes (Pt)', x: 50, y: 78, description: 'Inert electrodes connected to DC voltage supply' },
      { name: 'Acidified Electrolyte (dil. H₂SO₄)', x: 50, y: 60, description: 'Dilute sulfuric acid added to increase conductivity' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0fdfa" rx="12"/>
      <!-- Voltameter tubes -->
      <rect x="170" y="60" width="35" height="180" fill="#ccfbf1" stroke="#0f766e" stroke-width="2" rx="4"/>
      <rect x="295" y="60" width="35" height="180" fill="#ccfbf1" stroke="#0f766e" stroke-width="2" rx="4"/>
      <line x1="205" y1="180" x2="295" y2="180" stroke="#0f766e" stroke-width="4"/>
      <!-- Gas volumes -->
      <rect x="172" y="62" width="31" height="60" fill="#fff" opacity="0.9"/>
      <rect x="297" y="62" width="31" height="30" fill="#fff" opacity="0.9"/>
      <text x="187" y="95" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">2H₂</text>
      <text x="312" y="80" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">O₂</text>
      <rect x="180" y="210" width="15" height="25" fill="#334155"/>
      <rect x="305" y="210" width="15" height="25" fill="#334155"/>
      <text x="187" y="255" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">(-) Cathode</text>
      <text x="312" y="255" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">(+) Anode</text>
      <text x="250" y="295" font-size="12" font-weight="bold" fill="#134e4a" text-anchor="middle">Volume Ratio: 2 Volumes H₂ to 1 Volume O₂</text>
    </svg>`
  },
  // =========================================================================
  // 18. PHYSICS - PRISM DISPERSION & ELECTROMAGNETIC SPECTRUM
  // =========================================================================
  {
    id: 'ast_phy_dispersion_prism',
    title: 'Triangular Glass Prism & Visible Light Dispersion (ROYGBIV)',
    subject: 'Physics',
    classLevel: 'sss-1',
    category: 'Sciences',
    description: 'Refraction and separation of polychromatic white light into spectral constituents based on refractive indices.',
    type: '2d',
    labels: [
      { name: 'Incident White Light Beam', x: 18, y: 55, description: 'Unseparated composite light ray' },
      { name: 'Triangular Glass Prism', x: 50, y: 50, description: 'Dispersive optical medium with refracting angle A' },
      { name: 'Red Ray (Least Deviated)', x: 80, y: 38, description: 'Longest visible wavelength (λ ≈ 700nm), least refracted' },
      { name: 'Violet Ray (Most Deviated)', x: 82, y: 65, description: 'Shortest visible wavelength (λ ≈ 400nm), most refracted' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#0f172a" rx="12"/>
      <polygon points="250,60 170,220 330,220" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
      <line x1="60" y1="160" x2="200" y2="150" stroke="#ffffff" stroke-width="4"/>
      <!-- Spectrum fans -->
      <line x1="200" y1="150" x2="430" y2="110" stroke="#ef4444" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="125" stroke="#f97316" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="140" stroke="#eab308" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="155" stroke="#22c55e" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="170" stroke="#06b6d4" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="185" stroke="#3b82f6" stroke-width="2.5"/>
      <line x1="200" y1="150" x2="430" y2="200" stroke="#a855f7" stroke-width="2.5"/>
      <text x="100" y="140" font-size="12" font-weight="bold" fill="#ffffff">White Light</text>
      <text x="440" y="115" font-size="11" font-weight="bold" fill="#ef4444">Red (700nm)</text>
      <text x="440" y="205" font-size="11" font-weight="bold" fill="#c084fc">Violet (400nm)</text>
      <text x="250" y="280" font-size="13" font-weight="bold" fill="#94a3b8" text-anchor="middle">Snell's Law: n = sin[(A + D)/2] / sin(A/2)</text>
    </svg>`
  },
  // =========================================================================
  // 19. BASIC SCIENCE - PHASE CHANGES OF MATTER
  // =========================================================================
  {
    id: 'ast_bsc_states_matter',
    title: 'States of Matter & Thermodynamic Phase Transitions',
    subject: 'Basic Science',
    classLevel: 'jss-1',
    category: 'Sciences',
    description: 'Kinetic particle arrangements in Solid, Liquid, Gas and transitions: melting, freezing, vaporisation, condensation, sublimation.',
    type: '2d',
    labels: [
      { name: 'Solid Phase (Lattice)', x: 20, y: 40, description: 'Closely packed particles vibrating about fixed positions' },
      { name: 'Liquid Phase (Fluid)', x: 50, y: 78, description: 'Particles slide past each other, definite volume no definite shape' },
      { name: 'Gaseous Phase (Disordered)', x: 80, y: 40, description: 'Rapid random kinetic motion with negligible intermolecular forces' },
      { name: 'Sublimation / Deposition', x: 50, y: 22, description: 'Direct transition between solid and gas without liquid phase' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f1f5f9" rx="12"/>
      <circle cx="100" cy="130" r="45" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <circle cx="250" cy="220" r="45" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
      <circle cx="400" cy="130" r="45" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="100" y="135" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">SOLID</text>
      <text x="250" y="225" font-size="13" font-weight="bold" fill="#15803d" text-anchor="middle">LIQUID</text>
      <text x="400" y="135" font-size="13" font-weight="bold" fill="#b45309" text-anchor="middle">GAS</text>
      <path d="M145,110 Q250,70 355,110" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="250" y="85" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">Sublimation (Solid → Gas)</text>
      <text x="170" y="195" font-size="10" font-weight="bold" fill="#0284c7">Melting →</text>
      <text x="330" y="195" font-size="10" font-weight="bold" fill="#d97706">← Boiling</text>
      <text x="250" y="290" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Kinetic Theory of Matter (NERDC Basic Science JSS 1)</text>
    </svg>`
  },
  // =========================================================================
  // 20. BASIC TECHNOLOGY - WOODWORKING JOINTS
  // =========================================================================
  {
    id: 'ast_bth_wood_joints',
    title: 'Standard Carpentry & Joinery Joints (Mortise & Tenon, Dovetail)',
    subject: 'Basic Technology',
    classLevel: 'jss-2',
    category: 'Technology',
    description: 'Structural timber joinery techniques essential for building construction and furniture fabrication.',
    type: '2d',
    labels: [
      { name: 'Tenon Member', x: 30, y: 35, description: 'Projecting peg shaped to fit exactly inside mortise' },
      { name: 'Mortise Recess', x: 30, y: 70, description: 'Chiseled cavity engineered to receive tenon' },
      { name: 'Dovetail Interlock', x: 75, y: 45, description: 'Tensile-resistant trapezoidal interlocking joint' },
      { name: 'Shoulder Seating', x: 45, y: 55, description: 'Square shoulder preventing joint displacement' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fefce8" rx="12"/>
      <!-- Mortise and Tenon -->
      <g transform="translate(60, 60)">
        <rect x="20" y="20" width="70" height="40" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <rect x="45" y="60" width="20" height="30" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
        <rect x="15" y="105" width="80" height="50" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <rect x="45" y="105" width="20" height="25" fill="#ca8a04"/>
        <text x="55" y="180" font-size="11" font-weight="bold" fill="#854d0e" text-anchor="middle">Mortise & Tenon</text>
      </g>
      <!-- Dovetail -->
      <g transform="translate(270, 70)">
        <polygon points="30,30 90,30 80,70 40,70" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
        <polygon points="20,70 100,70 90,110 30,110" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
        <text x="60" y="170" font-size="11" font-weight="bold" fill="#9a3412" text-anchor="middle">Dovetail Joint</text>
      </g>
      <text x="250" y="290" font-size="12" font-weight="bold" fill="#713f12" text-anchor="middle">NERDC Basic Technology Practical Joinery Standard</text>
    </svg>`
  },
  // =========================================================================
  // 21. TECHNICAL DRAWING - ORTHOGRAPHIC PROJECTION
  // =========================================================================
  {
    id: 'ast_tdr_orthographic',
    title: 'First Angle Orthographic Projection (Front, End & Plan Views)',
    subject: 'Technical Drawing',
    classLevel: 'sss-1',
    category: 'Technology',
    description: 'ISO standard multi-view projection displaying elevations and plan aligned with projection lines.',
    type: '2d',
    labels: [
      { name: 'Front Elevation View', x: 28, y: 35, description: 'Principal perpendicular view showing height and length' },
      { name: 'End (Side) Elevation View', x: 72, y: 35, description: 'Side view projected horizontally from front elevation' },
      { name: 'Plan (Top) View', x: 28, y: 75, description: 'Top view positioned directly below front elevation' },
      { name: '45-Degree Mitre Projection Line', x: 72, y: 75, description: 'Reflects width dimensions between plan and end elevation' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <!-- Quadrant grid -->
      <line x1="250" y1="30" x2="250" y2="280" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="40" y1="160" x2="460" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Front Elevation (Top Left) -->
      <polygon points="100,70 180,70 180,130 140,130 140,100 100,100" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
      <text x="140" y="55" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Front Elevation</text>
      <!-- End Elevation (Top Right) -->
      <rect x="290" y="70" width="70" height="60" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="290" y1="100" x2="360" y2="100" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="325" y="55" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">End Elevation</text>
      <!-- Plan View (Bottom Left) -->
      <rect x="100" y="190" width="80" height="60" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
      <line x1="140" y1="190" x2="140" y2="250" stroke="#15803d" stroke-width="1.5"/>
      <text x="140" y="275" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Plan View</text>
      <!-- Mitre line (Bottom Right) -->
      <line x1="250" y1="160" x2="370" y2="280" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,2"/>
      <text x="330" y="235" font-size="10" fill="#e11d48">45° Mitre Line</text>
    </svg>`
  },
  // =========================================================================
  // 22. SOCIAL STUDIES - SEPARATION OF POWERS
  // =========================================================================
  {
    id: 'ast_soc_arms_government',
    title: 'Three Arms of Government & Checks and Balances System',
    subject: 'Social Studies',
    classLevel: 'jss-3',
    category: 'Social Sciences',
    description: 'Montesquieu constitutional framework: Legislature makes laws, Executive executes, Judiciary interprets.',
    type: '2d',
    labels: [
      { name: 'Legislature (National Assembly)', x: 22, y: 40, description: 'Senate & House of Representatives pass bills and hold oversight' },
      { name: 'Executive (Presidency & Cabinet)', x: 50, y: 25, description: 'President and ministries enforce statutory laws and policies' },
      { name: 'Judiciary (Supreme Court)', x: 78, y: 40, description: 'Courts adjudicate disputes and interpret the 1999 Constitution' },
      { name: 'Constitutional Checks & Balances', x: 50, y: 68, description: 'Veto powers, judicial review, and impeachment mechanisms' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0fdf4" rx="12"/>
      <rect x="40" y="80" width="115" height="90" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="8"/>
      <text x="97" y="115" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">LEGISLATURE</text>
      <text x="97" y="140" font-size="10" fill="#166534" text-anchor="middle">(Law Making)</text>
      <rect x="190" y="40" width="120" height="90" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="8"/>
      <text x="250" y="75" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">EXECUTIVE</text>
      <text x="250" y="100" font-size="10" fill="#075985" text-anchor="middle">(Law Enforcing)</text>
      <rect x="345" y="80" width="115" height="90" fill="#fef3c7" stroke="#d97706" stroke-width="2" rx="8"/>
      <text x="402" y="115" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">JUDICIARY</text>
      <text x="402" y="140" font-size="10" fill="#92400e" text-anchor="middle">(Law Interpreting)</text>
      <path d="M155,120 L190,90" stroke="#64748b" stroke-width="2"/>
      <path d="M310,90 L345,120" stroke="#64748b" stroke-width="2"/>
      <path d="M155,145 L345,145" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="250" y="240" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Democratic Tripartite Balance of Power (Section 4, 5, 6 CFRN 1999)</text>
    </svg>`
  },
  // =========================================================================
  // 23. CIVIC EDUCATION - NIGERIAN COAT OF ARMS
  // =========================================================================
  {
    id: 'ast_civ_coat_of_arms',
    title: 'Nigerian Coat of Arms & National Heraldic Emblems',
    subject: 'Civic Education',
    classLevel: 'jss-1',
    category: 'Social Sciences',
    description: 'Statutory national symbol: Red Eagle (strength), Two White Horses (dignity), Y-Pall (Niger & Benue rivers), Costus Spectabilis flowers.',
    type: '2d',
    labels: [
      { name: 'Red Eagle (Crest)', x: 50, y: 22, description: 'Represents national strength and pride' },
      { name: 'Black Shield with Silver Pall (Y)', x: 50, y: 55, description: 'Black soil for fertile agriculture; silver Y represents confluence of Niger and Benue rivers' },
      { name: 'Two White Chargers (Supporters)', x: 22, y: 55, description: 'Two noble stallions representing national dignity and honor' },
      { name: 'Costus Spectabilis (Base Wreath)', x: 50, y: 82, description: 'Yellow/red wild flowers representing Nigerian flora' },
      { name: 'National Motto Scroll', x: 50, y: 92, description: '"Unity and Faith, Peace and Progress"' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <!-- Eagle -->
      <polygon points="250,30 235,55 265,55" fill="#dc2626"/>
      <circle cx="250" cy="40" r="10" fill="#b91c1c"/>
      <!-- Shield -->
      <polygon points="210,80 290,80 280,180 250,210 220,180" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Silver Y -->
      <path d="M220,85 L250,135 L280,85 M250,135 L250,205" stroke="#f8fafc" stroke-width="7" fill="none"/>
      <!-- Supporters -->
      <rect x="145" y="90" width="45" height="90" fill="#e2e8f0" stroke="#94a3b8" rx="6"/>
      <text x="167" y="140" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">Horse</text>
      <rect x="310" y="90" width="45" height="90" fill="#e2e8f0" stroke="#94a3b8" rx="6"/>
      <text x="332" y="140" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">Horse</text>
      <!-- Base Flowers -->
      <ellipse cx="250" cy="230" rx="90" ry="12" fill="#fef08a" stroke="#ca8a04"/>
      <rect x="160" y="250" width="180" height="25" fill="#15803d" rx="4"/>
      <text x="250" y="267" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">UNITY AND FAITH, PEACE AND PROGRESS</text>
    </svg>`
  },
  // =========================================================================
  // 24. ECONOMICS - DEMAND & SUPPLY EQUILIBRIUM
  // =========================================================================
  {
    id: 'ast_eco_market_equilibrium',
    title: 'Market Equilibrium: Demand & Supply Curve Intersection (P* & Q*)',
    subject: 'Economics',
    classLevel: 'sss-1',
    category: 'Social Sciences',
    description: 'Marshallian price determination where quantity demanded equals quantity supplied at equilibrium.',
    type: '2d',
    labels: [
      { name: 'Equilibrium Point E (P*, Q*)', x: 50, y: 50, description: 'Market clearing point where Qd = Qs' },
      { name: 'Downward Sloping Demand (D-D)', x: 25, y: 30, description: 'Inverse relationship between price and quantity demanded' },
      { name: 'Upward Sloping Supply (S-S)', x: 75, y: 30, description: 'Direct relationship between price and quantity supplied' },
      { name: 'Excess Supply (Surplus Zone)', x: 50, y: 28, description: 'Market price above equilibrium induces producer glut' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fafaf9" rx="12"/>
      <line x1="80" y1="260" x2="420" y2="260" stroke="#334155" stroke-width="2.5"/>
      <line x1="80" y1="260" x2="80" y2="40" stroke="#334155" stroke-width="2.5"/>
      <text x="65" y="50" font-size="12" font-weight="bold" fill="#334155">Price (P)</text>
      <text x="400" y="285" font-size="12" font-weight="bold" fill="#334155">Quantity (Q)</text>
      <!-- Demand curve -->
      <line x1="110" y1="70" x2="380" y2="240" stroke="#dc2626" stroke-width="3"/>
      <text x="390" y="245" font-size="13" font-weight="bold" fill="#dc2626">D</text>
      <!-- Supply curve -->
      <line x1="110" y1="240" x2="380" y2="70" stroke="#0284c7" stroke-width="3"/>
      <text x="390" y="75" font-size="13" font-weight="bold" fill="#0284c7">S</text>
      <!-- Equilibrium dashed lines -->
      <line x1="80" y1="155" x2="245" y2="155" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="245" y1="155" x2="245" y2="260" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <circle cx="245" cy="155" r="6" fill="#16a34a"/>
      <text x="260" y="150" font-size="12" font-weight="bold" fill="#15803d">E (P*, Q*)</text>
      <text x="50" y="160" font-size="11" font-weight="bold" fill="#475569">P*</text>
      <text x="245" y="280" font-size="11" font-weight="bold" fill="#475569">Q*</text>
    </svg>`
  },
  // =========================================================================
  // 25. GEOGRAPHY - HYDROLOGICAL CYCLE
  // =========================================================================
  {
    id: 'ast_geo_water_cycle',
    title: 'Hydrological Cycle: Evaporation, Condensation, Precipitation & Runoff',
    subject: 'Geography',
    classLevel: 'sss-1',
    category: 'Social Sciences',
    description: 'Continuous global circulation of water between atmosphere, hydrosphere, biosphere and lithosphere.',
    type: '2d',
    labels: [
      { name: 'Solar Energy & Evaporation', x: 20, y: 45, description: 'Solar radiation vaporizes surface oceanic and freshwater' },
      { name: 'Condensation & Cloud Formation', x: 50, y: 20, description: 'Adiabatic cooling produces stratocumulus moisture droplets' },
      { name: 'Precipitation (Rainfall)', x: 75, y: 40, description: 'Gravity pulls atmospheric moisture back to land surfaces' },
      { name: 'Surface Runoff & Infiltration', x: 60, y: 78, description: 'Percolation replenishes water table aquifers draining into ocean' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f0f9ff" rx="12"/>
      <!-- Sun -->
      <circle cx="80" cy="60" r="30" fill="#facc15" stroke="#eab308" stroke-width="3"/>
      <!-- Mountains -->
      <polygon points="320,260 410,120 480,260" fill="#94a3b8"/>
      <polygon points="390,120 410,120 430,150 380,150" fill="#ffffff"/>
      <!-- Cloud -->
      <ellipse cx="260" cy="80" rx="55" ry="25" fill="#ffffff" stroke="#93c5fd" stroke-width="2"/>
      <!-- Ocean -->
      <rect x="0" y="240" width="220" height="80" fill="#38bdf8"/>
      <!-- Evaporation arrows -->
      <path d="M120,230 L120,130" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="5,3"/>
      <text x="140" y="170" font-size="11" font-weight="bold" fill="#0369a1">Evaporation ↑</text>
      <!-- Rain drops -->
      <line x1="330" y1="120" x2="310" y2="170" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,3"/>
      <line x1="360" y1="120" x2="340" y2="170" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,3"/>
      <text x="365" y="150" font-size="11" font-weight="bold" fill="#0284c7">Precipitation ↓</text>
      <text x="250" y="300" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">WAEC Geography Standard: Closed Global Hydrological System</text>
    </svg>`
  },
  // =========================================================================
  // 26. FINANCIAL ACCOUNTING - ACCOUNTING EQUATION
  // =========================================================================
  {
    id: 'ast_acc_equation',
    title: 'Fundamental Accounting Equation: Assets = Capital + Liabilities',
    subject: 'Financial Accounting',
    classLevel: 'sss-1',
    category: 'Social Sciences',
    description: 'Double entry balance sheet equivalence governing debit and credit adjustments across accounting ledgers.',
    type: '2d',
    labels: [
      { name: 'Total Assets (Resources Owned)', x: 28, y: 45, description: 'Non-current (land, machinery) and current assets (inventory, cash)' },
      { name: 'Owner Equity (Capital)', x: 72, y: 35, description: 'Proprietor initial investment plus retained earnings less drawings' },
      { name: 'External Liabilities (Debts)', x: 72, y: 65, description: 'Current creditors and long-term bank loans' },
      { name: 'Dual Aspect Balance Pivot', x: 50, y: 82, description: 'Equal weight balance confirming Debit = Credit' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f1f5f9" rx="12"/>
      <!-- Balance Beam Scale -->
      <polygon points="250,150 230,250 270,250" fill="#475569"/>
      <line x1="120" y1="150" x2="380" y2="150" stroke="#1e293b" stroke-width="6"/>
      <!-- Left Pan (Assets) -->
      <line x1="140" y1="150" x2="140" y2="200" stroke="#64748b" stroke-width="2"/>
      <rect x="70" y="200" width="140" height="50" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="6"/>
      <text x="140" y="230" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">ASSETS (Dr)</text>
      <!-- Right Pan (Liabilities + Capital) -->
      <line x1="360" y1="150" x2="360" y2="200" stroke="#64748b" stroke-width="2"/>
      <rect x="290" y="200" width="140" height="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="6"/>
      <text x="360" y="230" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">CAPITAL + LIABILITIES (Cr)</text>
      <text x="250" y="70" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">ASSETS = CAPITAL + LIABILITIES</text>
      <text x="250" y="100" font-size="12" fill="#64748b" text-anchor="middle">The Foundation of Every Trial Balance & Financial Statement</text>
    </svg>`
  },
  // =========================================================================
  // 27. AGRICULTURAL SCIENCE - DISC PLOUGH
  // =========================================================================
  {
    id: 'ast_agr_disc_plough',
    title: 'Tractor-Coupled 3-Bottom Disc Plough (Primary Tillage Implement)',
    subject: 'Agricultural Science',
    classLevel: 'sss-2',
    category: 'Technology',
    description: 'Concave rotating steel discs mounted on beam used for inverting virgin soils, chopping roots and burying weeds.',
    type: '2d',
    labels: [
      { name: 'Concave Steel Discs (3 Bottoms)', x: 60, y: 55, description: 'Rotating circular blades cutting and inverting furrows' },
      { name: 'Plough Beam & Standard Frame', x: 50, y: 35, description: 'Heavy cast iron framework supporting disc standards' },
      { name: 'Rear Furrow Wheel', x: 82, y: 70, description: 'Stabilizes lateral thrust and regulates ploughing depth' },
      { name: '3-Point Hitch Mounting Mast', x: 25, y: 30, description: 'Connects to tractor hydraulic upper and lower lift arms' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#fefce8" rx="12"/>
      <!-- Main Beam -->
      <line x1="120" y1="120" x2="380" y2="120" stroke="#334155" stroke-width="8"/>
      <!-- Hitch Mast -->
      <polygon points="120,120 150,60 170,120" fill="none" stroke="#dc2626" stroke-width="3"/>
      <!-- 3 Discs -->
      <ellipse cx="220" cy="190" rx="16" ry="45" fill="#94a3b8" stroke="#334155" stroke-width="3" transform="rotate(-20 220,190)"/>
      <ellipse cx="290" cy="190" rx="16" ry="45" fill="#94a3b8" stroke="#334155" stroke-width="3" transform="rotate(-20 290,190)"/>
      <ellipse cx="360" cy="190" rx="16" ry="45" fill="#94a3b8" stroke="#334155" stroke-width="3" transform="rotate(-20 360,190)"/>
      <!-- Soil groundline -->
      <line x1="40" y1="230" x2="460" y2="230" stroke="#78350f" stroke-width="3"/>
      <text x="250" y="280" font-size="12" font-weight="bold" fill="#78350f" text-anchor="middle">WAEC Practical Standard: Three-Bottom Disc Plough for Tropical Soils</text>
    </svg>`
  },
  // =========================================================================
  // 28. COMPUTER STUDIES - VON NEUMANN ARCHITECTURE
  // =========================================================================
  {
    id: 'ast_cpt_von_neumann',
    title: 'Von Neumann Computer Architecture (CPU, ALU, Control Unit & Memory)',
    subject: 'Computer Studies',
    classLevel: 'sss-1',
    category: 'Technology',
    description: 'Fundamental stored-program architecture consisting of CPU (ALU, CU, Registers), Memory, and System Buses.',
    type: '2d',
    labels: [
      { name: 'Central Processing Unit (CPU)', x: 40, y: 35, description: 'Contains Arithmetic Logic Unit and Control Unit' },
      { name: 'Arithmetic & Logic Unit (ALU)', x: 30, y: 40, description: 'Executes mathematical calculations and boolean logic' },
      { name: 'Control Unit (CU)', x: 50, y: 40, description: 'Fetches, decodes, and sequences instructions via clock signals' },
      { name: 'Main Memory Unit (RAM)', x: 75, y: 35, description: 'Stores instructions and operands sequentially addressable' },
      { name: 'System Buses (Address, Data, Control)', x: 55, y: 70, description: 'High-speed communication pathways connecting CPU and Memory' }
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      <!-- CPU Enclosure -->
      <rect x="60" y="60" width="220" height="140" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" rx="8"/>
      <text x="170" y="85" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">CENTRAL PROCESSING UNIT</text>
      <!-- ALU & CU -->
      <rect x="80" y="105" width="85" height="75" fill="#bae6fd" stroke="#0284c7" rx="4"/>
      <text x="122" y="145" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">ALU</text>
      <rect x="180" y="105" width="85" height="75" fill="#bae6fd" stroke="#0284c7" rx="4"/>
      <text x="222" y="145" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">CU</text>
      <!-- Memory Unit -->
      <rect x="330" y="60" width="110" height="140" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" rx="8"/>
      <text x="385" y="115" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">MAIN MEMORY</text>
      <text x="385" y="135" font-size="11" fill="#92400e" text-anchor="middle">(RAM / ROM)</text>
      <!-- Buses -->
      <line x1="280" y1="120" x2="330" y2="120" stroke="#0f172a" stroke-width="4"/>
      <rect x="80" y="235" width="340" height="30" fill="#e2e8f0" stroke="#64748b" rx="4"/>
      <text x="250" y="255" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">SYSTEM BUS (Data Bus, Address Bus, Control Bus)</text>
      <text x="250" y="295" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Stored-Program Architecture Standard (NERDC SSS Computer Studies)</text>
    </svg>`
  }
];

/**
 * Normalizes subject string for flexible matching
 */
function normalizeSub(sub: string): string {
  return sub.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Normalizes class level
 */
function normalizeLvl(lvl: string): string {
  return lvl.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Retrieves all registered assets
 */
export function getAllAssets(): CurriculumAsset[] {
  return ASSET_REGISTRY;
}

/**
 * Finds assets by subject with fallback across related domains
 */
export function getAssetsBySubject(subject: string, classLevel?: string): CurriculumAsset[] {
  const normSub = normalizeSub(subject);
  const normLevel = classLevel ? normalizeLvl(classLevel) : undefined;

  let matches = ASSET_REGISTRY.filter((a) => {
    const aSub = normalizeSub(a.subject);
    const subMatch = aSub === normSub || aSub.includes(normSub) || normSub.includes(aSub);
    if (!subMatch) return false;
    if (normLevel && a.classLevel !== 'all') {
      return normalizeLvl(a.classLevel) === normLevel;
    }
    return true;
  });

  // If no exact match, return by category or general sciences
  if (matches.length === 0) {
    if (normSub.includes('bio') || normSub.includes('life')) {
      matches = ASSET_REGISTRY.filter((a) => a.subject === 'Biology');
    } else if (normSub.includes('chem')) {
      matches = ASSET_REGISTRY.filter((a) => a.subject === 'Chemistry');
    } else if (normSub.includes('phy')) {
      matches = ASSET_REGISTRY.filter((a) => a.subject === 'Physics');
    } else if (normSub.includes('math') || normSub.includes('arith')) {
      matches = ASSET_REGISTRY.filter((a) => a.subject === 'Mathematics');
    } else if (normSub.includes('civic') || normSub.includes('gov') || normSub.includes('soc')) {
      matches = ASSET_REGISTRY.filter((a) => a.subject === 'Civic Education' || a.subject === 'Economics');
    } else {
      matches = ASSET_REGISTRY.slice(0, 4);
    }
  }

  return matches;
}

/**
 * Finds a specific asset by ID
 */
export function getAssetById(id: string): CurriculumAsset | undefined {
  return ASSET_REGISTRY.find((a) => a.id === id);
}

/**
 * Searches assets by keyword across title, subject, description, and labels
 */
export function searchAssets(keyword: string): CurriculumAsset[] {
  const q = keyword.toLowerCase().trim();
  if (!q) return ASSET_REGISTRY;

  return ASSET_REGISTRY.filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.subject.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.labels.some((l) => l.name.toLowerCase().includes(q) || l.description?.toLowerCase().includes(q))
    );
  });
}

/**
 * Maps any Nigerian secondary curriculum subject and topic to the optimal 3D procedural model
 */
export function getBestModelForSubject(subject?: string, topic?: string): string {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();

  // 1. Biology & Life Sciences
  if (s.includes('bio') || s.includes('health') || t.includes('heart') || t.includes('circulat') || t.includes('blood')) {
    if (t.includes('dna') || t.includes('gene') || t.includes('heredity') || t.includes('chromosom')) return 'dna_helix';
    if (t.includes('cell') || t.includes('plant') || t.includes('leaf') || t.includes('root') || t.includes('photosynth')) return 'plant_cell';
    if (t.includes('skelet') || t.includes('bone') || t.includes('joint') || t.includes('muscle')) return 'human_skeleton';
    return 'heart_model';
  }

  // 2. Chemistry & Atomic Sciences
  if (s.includes('chem') || t.includes('atom') || t.includes('electron') || t.includes('element') || t.includes('matter') || t.includes('bond')) {
    return 'atom_model';
  }

  // 3. Physics & Physical Sciences
  if (s.includes('physic')) {
    if (t.includes('light') || t.includes('optic') || t.includes('prism') || t.includes('refract') || t.includes('wave') || t.includes('lens')) return 'optics_prism';
    if (t.includes('solar') || t.includes('planet') || t.includes('gravit') || t.includes('space') || t.includes('astron')) return 'solar_system';
    return 'electric_motor';
  }

  // 4. Basic Science & Basic Technology
  if (s.includes('basic scien') || s.includes('integrated scien')) {
    if (t.includes('atom') || t.includes('matter')) return 'atom_model';
    if (t.includes('cell') || t.includes('living')) return 'plant_cell';
    if (t.includes('heart') || t.includes('body')) return 'heart_model';
    return 'solar_system';
  }

  if (s.includes('basic tech') || s.includes('technical draw') || s.includes('woodwork') || s.includes('metalwork') || s.includes('mechanic')) {
    return 'isometric_gears';
  }

  // 5. Agricultural Science
  if (s.includes('agric') || s.includes('farm') || t.includes('soil') || t.includes('crop') || t.includes('agronomy') || t.includes('fertil')) {
    if (t.includes('cell') || t.includes('botany') || t.includes('photosynth')) return 'plant_cell';
    return 'soil_profile';
  }

  // 6. Geography & Environmental Studies
  if (s.includes('geog') || t.includes('globe') || t.includes('earth') || t.includes('map') || t.includes('latitude') || t.includes('longitude') || t.includes('weather') || t.includes('climate')) {
    return 'earth_globe';
  }

  // 7. Economics, Commerce, Financial Accounting, Business Studies
  if (s.includes('econ') || s.includes('comm') || s.includes('account') || s.includes('bus') || s.includes('market') || t.includes('trade') || t.includes('money') || t.includes('supply') || t.includes('demand') || t.includes('price') || t.includes('balance') || t.includes('ledger')) {
    return 'market_equilibrium';
  }

  // 8. Civic Education, Government & Social Studies
  if (s.includes('civic') || s.includes('gov') || s.includes('social stud') || s.includes('polit') || t.includes('law') || t.includes('right') || t.includes('democ') || t.includes('court') || t.includes('mace') || t.includes('constitut')) {
    return 'civic_mace';
  }

  // 9. Nigerian Indigenous Languages (Yorùbá, Igbo, Hausa) & Music
  if (s.includes('yor') || s.includes('igb') || s.includes('hau') || s.includes('music') || t.includes('drum') || t.includes('tonal') || t.includes('sound')) {
    return 'talking_drum';
  }

  // 10. Cultural & Creative Arts / History
  if (s.includes('creat') || s.includes('art') || s.includes('histor') || t.includes('sculpt') || t.includes('benin') || t.includes('bronze') || t.includes('craft') || t.includes('culture')) {
    return 'benin_bronze';
  }

  // 11. English Studies & Literature in English
  if (s.includes('eng') || s.includes('lit') || t.includes('read') || t.includes('gramm') || t.includes('drama') || t.includes('prose') || t.includes('poet') || t.includes('press') || t.includes('novel')) {
    return 'printing_press';
  }

  // 12. Religious Studies (CRS / IRS)
  if (s.includes('relig') || s.includes('crs') || s.includes('irs') || s.includes('crk') || s.includes('irk') || s.includes('christ') || s.includes('islam') || t.includes('bible') || t.includes('quran')) {
    return 'sanctuary_ark';
  }

  // 13. Physical & Health Education (PHE)
  if ((s.includes('physic') && s.includes('health')) || s.includes('phe') || s.includes('sport') || t.includes('skelet') || t.includes('joint') || t.includes('posture')) {
    return 'human_skeleton';
  }

  // 14. Mathematics
  return 'geometry_cube';
}

/**
 * Returns the best matching statutory curriculum schematic asset for a subject & topic
 */
export function getBestAssetForSubject(subject?: string, topic?: string): CurriculumAsset {
  const assets = getAssetsBySubject(subject || 'Mathematics');
  if (!assets || assets.length === 0) return ASSET_REGISTRY[0];

  if (!topic) return assets[0];

  const t = topic.toLowerCase();
  const matched = assets.find((a) =>
    a.title.toLowerCase().includes(t) ||
    t.includes(a.title.toLowerCase()) ||
    a.description.toLowerCase().includes(t)
  );

  return matched || assets[0];
}

/**
 * Visual Aid Synchronization Manager (Phase 2):
 * Automatically generates or sources new 2D/3D schematics when a new curriculum topic is introduced.
 */
export function registerOrSyncVisualAidForTopic(params: {
  subject: string;
  classLevel: string;
  topic: string;
  subtopics?: string[];
}): { asset: CurriculumAsset; isNewlyCreated: boolean } {
  const { subject, classLevel, topic, subtopics } = params;
  const existing = ASSET_REGISTRY.find(
    (a) =>
      a.subject.toLowerCase() === subject.toLowerCase() &&
      (a.title.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(a.title.toLowerCase()))
  );

  if (existing) {
    return { asset: existing, isNewlyCreated: false };
  }

  const slug = topic.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
  const assetId = `ast_dyn_${subject.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4)}_${slug}_${Date.now()}`;
  const modelKey = getBestModelForSubject(subject, topic);

  const subtopic1 = subtopics?.[0] || 'Primary Structural Concept';
  const subtopic2 = subtopics?.[1] || 'Secondary Interactive Mechanism';
  const subtopic3 = subtopics?.[2] || 'Systemic Application in Nigerian Environment';

  const newAsset: CurriculumAsset = {
    id: assetId,
    title: topic,
    subject,
    classLevel: classLevel || 'jss-1',
    category:
      subject.toLowerCase().includes('math')
        ? 'Mathematics'
        : subject.toLowerCase().includes('scien') || subject.toLowerCase().includes('bio') || subject.toLowerCase().includes('chem') || subject.toLowerCase().includes('phys')
        ? 'Sciences'
        : subject.toLowerCase().includes('tech')
        ? 'Technology'
        : 'Humanities',
    description: `Statutory Lagos Unified & NERDC 2D/3D schematic generated for: ${topic}`,
    type: '3d',
    model3DKey: modelKey,
    perspective: 'Front Isometric 45° with Chalkboard Highlighting',
    labels: [
      { name: subtopic1.slice(0, 32), x: 30, y: 35, description: `Key focal component: ${subtopic1}` },
      { name: subtopic2.slice(0, 32), x: 70, y: 45, description: `Dynamic interactive element: ${subtopic2}` },
      { name: subtopic3.slice(0, 32), x: 50, y: 80, description: `Operational contextual principle: ${subtopic3}` },
    ],
    svgContent: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <defs>
        <linearGradient id="dyn_grad_${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#065f46" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#dyn_grad_${slug})" rx="14"/>
      <circle cx="250" cy="150" r="85" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4"/>
      <rect x="200" y="100" width="100" height="100" fill="#047857" rx="10" stroke="#34d399" stroke-width="2"/>
      <circle cx="250" cy="150" r="18" fill="#fbbf24"/>
      <text x="250" y="155" font-size="11" font-weight="black" fill="#0f172a" text-anchor="middle">CORE</text>
      <line x1="200" y1="100" x2="140" y2="60" stroke="#fbbf24" stroke-width="2"/>
      <circle cx="140" cy="60" r="5" fill="#fbbf24"/>
      <text x="135" y="48" font-size="11" font-weight="bold" fill="#fef08a" text-anchor="end">${subtopic1.slice(0, 24)}</text>
      <line x1="300" y1="100" x2="360" y2="60" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="360" cy="60" r="5" fill="#38bdf8"/>
      <text x="365" y="48" font-size="11" font-weight="bold" fill="#bae6fd">${subtopic2.slice(0, 24)}</text>
      <line x1="250" y1="200" x2="250" y2="250" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="250" cy="250" r="5" fill="#a78bfa"/>
      <text x="250" y="275" font-size="11" font-weight="bold" fill="#ddd6fe" text-anchor="middle">${subtopic3.slice(0, 28)}</text>
      <text x="250" y="305" font-size="10" font-weight="bold" fill="#94a3b8" text-anchor="middle">Lagos Unified Scheme &amp; NERDC Visual Realia Spec</text>
    </svg>`,
  };

  ASSET_REGISTRY.unshift(newAsset);
  return { asset: newAsset, isNewlyCreated: true };
}
