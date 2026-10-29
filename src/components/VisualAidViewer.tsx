import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  Maximize2,
  Minimize2,
  RotateCw,
  Eye,
  Layers,
  Sparkles,
  Info,
  Compass,
  Tv,
  CheckCircle2,
  ZoomIn
} from 'lucide-react';

interface VisualAidViewerProps {
  modelType?: string; // "geometry_cube" | "solar_system" | "heart_model" | "dna_helix" | "atom_model" | "plant_cell"
  topicTitle?: string;
  onModelChange?: (type: string) => void;
}

// ---------------- 1. GEOMETRY CUBE MODEL ----------------
function GeometryCube({ wireframe }: { wireframe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.3;
      innerRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group>
      {/* Primary 3D Isometric Cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe={wireframe}
          metalness={0.2}
          roughness={0.3}
          transparent={!wireframe}
          opacity={wireframe ? 1 : 0.85}
        />
      </mesh>

      {/* Embedded Inscribed Octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.3]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe={wireframe}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Grid Floor */}
      <gridHelper args={[8, 8, '#047857', '#334155']} position={[0, -2, 0]} />
    </group>
  );
}

// ---------------- 2. SOLAR SYSTEM MODEL ----------------
function SolarSystem({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const earthRef = useRef<THREE.Mesh>(null!);
  const marsRef = useRef<THREE.Mesh>(null!);
  const jupiterRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
    if (earthRef.current) {
      earthRef.current.position.x = Math.cos(t * 0.8) * 2.2;
      earthRef.current.position.z = Math.sin(t * 0.8) * 2.2;
      earthRef.current.rotation.y += 0.02;
    }
    if (marsRef.current) {
      marsRef.current.position.x = Math.cos(t * 0.5 + 1) * 3.1;
      marsRef.current.position.z = Math.sin(t * 0.5 + 1) * 3.1;
    }
    if (jupiterRef.current) {
      jupiterRef.current.position.x = Math.cos(t * 0.3 + 2.5) * 4.2;
      jupiterRef.current.position.z = Math.sin(t * 0.3 + 2.5) * 4.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.6}
          wireframe={wireframe}
        />
      </mesh>

      {/* Earth Orbit Ring & Planet */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.18, 2.22, 64]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh ref={earthRef} position={[2.2, 0, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#0284c7" wireframe={wireframe} roughness={0.4} />
      </mesh>

      {/* Mars Orbit Ring & Planet */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.08, 3.12, 64]} />
        <meshBasicMaterial color="#f87171" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh ref={marsRef} position={[3.1, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#ef4444" wireframe={wireframe} roughness={0.5} />
      </mesh>

      {/* Jupiter Orbit Ring & Planet with Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.18, 4.22, 64]} />
        <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <group ref={jupiterRef} position={[4.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color="#ca8a04" wireframe={wireframe} roughness={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[0.7, 1.1, 32]} />
          <meshBasicMaterial color="#a16207" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 3. HUMAN HEART MODEL (PULSATING) ----------------
function HeartModel({ wireframe }: { wireframe: boolean }) {
  const heartGroupRef = useRef<THREE.Group>(null!);
  const aortaRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Systole/Diastole rhythmic heartbeat pulse (75 bpm approx)
    const beat = 1 + Math.pow(Math.sin(t * 4.5), 6) * 0.12;
    if (heartGroupRef.current) {
      heartGroupRef.current.scale.set(beat, beat, beat);
      heartGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group ref={heartGroupRef}>
      {/* Left Ventricle (Lower Body) */}
      <mesh position={[-0.3, -0.4, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.9, 1.6, 24]} />
        <meshStandardMaterial color="#b91c1c" wireframe={wireframe} roughness={0.3} />
      </mesh>

      {/* Right Ventricle */}
      <mesh position={[0.4, -0.4, 0]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.75, 1.4, 24]} />
        <meshStandardMaterial color="#dc2626" wireframe={wireframe} roughness={0.3} />
      </mesh>

      {/* Left Atrium (Upper Left) */}
      <mesh position={[-0.45, 0.5, 0]}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshStandardMaterial color="#991b1b" wireframe={wireframe} roughness={0.4} />
      </mesh>

      {/* Right Atrium (Upper Right) */}
      <mesh position={[0.45, 0.45, 0]}>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshStandardMaterial color="#ef4444" wireframe={wireframe} roughness={0.4} />
      </mesh>

      {/* Ascending Aorta (Arch) */}
      <mesh ref={aortaRef} position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#dc2626" wireframe={wireframe} roughness={0.2} />
      </mesh>

      {/* Superior Vena Cava (Deoxygenated Blood Tube) */}
      <mesh position={[0.6, 1.0, 0.1]}>
        <cylinderGeometry args={[0.18, 0.18, 0.8, 16]} />
        <meshStandardMaterial color="#1d4ed8" wireframe={wireframe} roughness={0.3} />
      </mesh>

      {/* Pulmonary Artery (Blue/Purple) */}
      <mesh position={[-0.3, 0.95, 0.15]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.16, 0.16, 0.7, 16]} />
        <meshStandardMaterial color="#2563eb" wireframe={wireframe} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ---------------- 4. DNA HELIX MODEL ----------------
function DnaHelix({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  const rungCount = 18;
  const rungs = Array.from({ length: rungCount });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {rungs.map((_, i) => {
        const y = (i / (rungCount - 1)) * 3.6;
        const angle = i * 0.45;
        const radius = 1.0;
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        return (
          <group key={i}>
            {/* Strand 1 Node (Sugar-Phosphate) */}
            <mesh position={[x1, y, z1]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color="#0284c7" wireframe={wireframe} />
            </mesh>

            {/* Strand 2 Node */}
            <mesh position={[x2, y, z2]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color="#10b981" wireframe={wireframe} />
            </mesh>

            {/* Base Pair Rung (A-T or G-C) */}
            <mesh position={[(x1 + x2) / 2, y, (z1 + z2) / 2]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[radius * 2, 0.06, 0.06]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#f59e0b' : '#ec4899'}
                wireframe={wireframe}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ---------------- 5. ATOM & ELECTRON ORBITS ----------------
function AtomModel({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const e1Ref = useRef<THREE.Mesh>(null!);
  const e2Ref = useRef<THREE.Mesh>(null!);
  const e3Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 3;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (e1Ref.current) {
      e1Ref.current.position.x = Math.cos(t) * 1.8;
      e1Ref.current.position.y = Math.sin(t) * 1.8;
    }
    if (e2Ref.current) {
      e2Ref.current.position.x = Math.cos(t + 2) * 1.8;
      e2Ref.current.position.z = Math.sin(t + 2) * 1.8;
    }
    if (e3Ref.current) {
      e3Ref.current.position.y = Math.cos(t + 4) * 1.8;
      e3Ref.current.position.z = Math.sin(t + 4) * 1.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dense Nucleus (Protons & Neutrons clustered) */}
      <group>
        <mesh position={[0.1, 0.1, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} wireframe={wireframe} />
        </mesh>
        <mesh position={[-0.12, 0, 0.1]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.3} wireframe={wireframe} />
        </mesh>
        <mesh position={[0, -0.15, -0.1]}>
          <sphereGeometry args={[0.29, 16, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} wireframe={wireframe} />
        </mesh>
      </group>

      {/* Orbit Ring 1 (XY plane tilted) */}
      <mesh rotation={[0.4, 0.4, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.5} />
      </mesh>
      <mesh ref={e1Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
      </mesh>

      {/* Orbit Ring 2 (XZ plane) */}
      <mesh rotation={[Math.PI / 2, 0.3, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.5} />
      </mesh>
      <mesh ref={e2Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>

      {/* Orbit Ring 3 (YZ plane) */}
      <mesh rotation={[0, Math.PI / 2, 0.5]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.5} />
      </mesh>
      <mesh ref={e3Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// ---------------- 6. PLANT CELL MODEL ----------------
function PlantCell({ wireframe }: { wireframe: boolean }) {
  const cellRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (cellRef.current) {
      cellRef.current.rotation.y += delta * 0.3;
      cellRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group ref={cellRef}>
      {/* Cellulose Cell Wall (Rigid Hexagonal Outer Layer) */}
      <mesh>
        <cylinderGeometry args={[1.8, 1.8, 1.2, 6]} />
        <meshStandardMaterial
          color="#15803d"
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 1 : 0.4}
        />
      </mesh>

      {/* Plasma Membrane & Cytoplasm */}
      <mesh>
        <cylinderGeometry args={[1.65, 1.65, 1.05, 6]} />
        <meshStandardMaterial color="#86efac" wireframe={wireframe} transparent opacity={0.35} />
      </mesh>

      {/* Large Central Vacuole */}
      <mesh position={[0.2, 0, 0]}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} wireframe={wireframe} />
      </mesh>

      {/* Nucleus with Nucleolus */}
      <mesh position={[-0.7, 0.15, -0.2]}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshStandardMaterial color="#7c3aed" wireframe={wireframe} />
      </mesh>

      {/* Chloroplasts (Photosynthetic Organelles) */}
      {[-0.8, -0.2, 0.7, 0.9].map((pos, idx) => (
        <mesh key={idx} position={[pos, (idx % 2 === 0 ? 0.25 : -0.25), 0.55]}>
          <capsuleGeometry args={[0.16, 0.25, 8, 16]} />
          <meshStandardMaterial color="#16a34a" wireframe={wireframe} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------- MODEL SWITCHER ----------------
function ProceduralScene({ modelType, wireframe }: { modelType: string; wireframe: boolean }) {
  switch (modelType) {
    case 'geometry_cube':
      return <GeometryCube wireframe={wireframe} />;
    case 'solar_system':
      return <SolarSystem wireframe={wireframe} />;
    case 'heart_model':
      return <HeartModel wireframe={wireframe} />;
    case 'dna_helix':
      return <DnaHelix wireframe={wireframe} />;
    case 'atom_model':
      return <AtomModel wireframe={wireframe} />;
    case 'plant_cell':
      return <PlantCell wireframe={wireframe} />;
    default:
      return <GeometryCube wireframe={wireframe} />;
  }
}

// ---------------- MAIN VISUAL AID VIEWER COMPONENT ----------------
export const VisualAidViewer: React.FC<VisualAidViewerProps> = ({
  modelType = 'geometry_cube',
  topicTitle = 'Classroom Visual Aid (3D Interactive Model)',
  onModelChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeModel, setActiveModel] = useState(modelType);

  // Synchronize when external prop changes
  React.useEffect(() => {
    if (modelType) setActiveModel(modelType);
  }, [modelType]);

  const handleModelSelect = (type: string) => {
    setActiveModel(type);
    if (onModelChange) onModelChange(type);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const modelDescriptions: Record<string, { label: string; subject: string; teachingPrompt: string }> = {
    geometry_cube: {
      label: '3D Geometry Cube & Inscribed Octahedron',
      subject: 'Mathematics / Technical Drawing',
      teachingPrompt: 'Rotate to show 6 faces, 12 edges, and 8 vertices. Point out the dual symmetry with the interior octahedron.'
    },
    solar_system: {
      label: 'Heliocentric Solar System & Planetary Orbits',
      subject: 'Basic Science / Geography',
      teachingPrompt: 'Demonstrate Keplerian orbits around the Sun. Have students identify terrestrial vs gas giant planets.'
    },
    heart_model: {
      label: '4-Chambered Pulsating Human Heart',
      subject: 'Biology / Basic Science',
      teachingPrompt: 'Observe the systolic contraction. Trace deoxygenated blood through vena cava vs oxygenated output through the aorta.'
    },
    dna_helix: {
      label: 'Double Helix & Nitrogenous Base Pairs',
      subject: 'Biology / Agricultural Science',
      teachingPrompt: 'Explain Watson-Crick base pairing (A-T & G-C) along the sugar-phosphate backbone ladder.'
    },
    atom_model: {
      label: 'Bohr-Rutherford Atomic Shell & Electron Orbitals',
      subject: 'Chemistry / Basic Science',
      teachingPrompt: 'Discuss protons/neutrons in the dense nucleus vs planetary electron probabilities across energy levels.'
    },
    plant_cell: {
      label: 'Eukaryotic Plant Cell with Vacuole & Chloroplasts',
      subject: 'Agricultural Science / Biology',
      teachingPrompt: 'Highlight the rigid cellulose cell wall and photosynthetic chloroplasts that distinguish plant from animal cells.'
    }
  };

  const currentInfo = modelDescriptions[activeModel] || modelDescriptions.geometry_cube;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'w-screen h-screen rounded-none z-50 p-6' : 'w-full'
      }`}
    >
      {/* Top Projector Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                3D STEM Realia Projector
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                WebGL 60FPS
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">{currentInfo.label}</h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotation"
            className={`px-2.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors ${
              autoRotate ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Rotate</span>
          </button>

          <button
            type="button"
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe & Internal Geometry"
            className={`px-2.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors ${
              wireframe ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Projector Fullscreen'}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className={`w-full bg-radial from-slate-900 to-slate-950 ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[380px] sm:h-[440px]'}`}>
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
              <p className="text-xs font-semibold">Synthesizing 3D Realia Visual Aid...</p>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 1.5, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 6, 4]} intensity={2.0} castShadow />
            <pointLight position={[-4, -3, -2]} intensity={1.2} color="#38bdf8" />
            <pointLight position={[3, -2, 4]} intensity={0.8} color="#10b981" />

            <ProceduralScene modelType={activeModel} wireframe={wireframe} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={1.5}
              maxDistance={12}
              minDistance={2}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Quick Model Selector Pills */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap pl-2 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preset Realia:</span>
        </span>
        {[
          { id: 'geometry_cube', label: 'Geometry Cube', icon: '📐' },
          { id: 'solar_system', label: 'Solar System', icon: '🪐' },
          { id: 'heart_model', label: 'Human Heart', icon: '🫀' },
          { id: 'dna_helix', label: 'DNA Helix', icon: '🧬' },
          { id: 'atom_model', label: 'Atom & Orbitals', icon: '⚛️' },
          { id: 'plant_cell', label: 'Plant Cell', icon: '🌿' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleModelSelect(item.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeModel === item.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Classroom Teaching Guidance Banner */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{currentInfo.subject}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Classroom Projection Guidance</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{currentInfo.teachingPrompt}</p>
          <p className="text-[11px] text-slate-500 pt-0.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" />
            <span>Interactive gesture: Click & drag to rotate • Scroll/pinch to zoom • Right-click to pan.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
