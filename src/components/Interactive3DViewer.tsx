import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Float,
  Center,
  Html,
  Sphere,
  Cylinder,
  Box,
  Torus,
  Cone,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  Maximize2,
  Minimize2,
  RotateCw,
  Eye,
  Layers,
  Sparkles,
  Info,
  HelpCircle,
  RefreshCw,
  AlertCircle,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import type { Visual3DConceptSpec } from '../lib/ai/curriculum-types.ts';
import { useLowDataMode } from '../lib/LowDataContext.tsx';

interface Interactive3DViewerProps {
  spec?: Visual3DConceptSpec;
  topic?: string;
  subject?: string;
  className?: string;
  isCompact?: boolean;
}

// ----------------------------------------------------------------------------
// 1. PROCEDURAL PBR MODELS BY EDUCATIONAL DOMAIN
// ----------------------------------------------------------------------------

/**
 * 1. BIOLOGY: Anatomical Pumping Human Heart
 */
function HeartModel({ wireframe, exploded }: { wireframe: boolean; exploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Rhythmic cardiac contraction (lub-dub cycle ~72 bpm)
    const t = clock.getElapsedTime() * 3.5;
    const pulse = 1 + Math.sin(t) * 0.05 + Math.sin(t * 2) * 0.03;
    groupRef.current.scale.set(pulse, pulse, pulse);
  });

  const explodeOffset = exploded ? 0.35 : 0;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Left Ventricle (Muscular Red Apex) */}
      <mesh
        position={[-0.25 - explodeOffset, -0.4, 0]}
        rotation={[0, 0, -0.2]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('Left Ventricle'); }}
        onPointerOut={() => setHoveredPart(null)}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={hoveredPart === 'Left Ventricle' ? '#ff4d4f' : '#b91c1c'}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Right Ventricle */}
      <mesh
        position={[0.25 + explodeOffset, -0.3, 0.1]}
        rotation={[0, 0, 0.2]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('Right Ventricle'); }}
        onPointerOut={() => setHoveredPart(null)}
      >
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshPhysicalMaterial
          color={hoveredPart === 'Right Ventricle' ? '#f87171' : '#991b1b'}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.5}
          wireframe={wireframe}
        />
      </mesh>

      {/* Aorta Arch (High Pressure Oxygenated Output) */}
      <mesh
        position={[0, 0.45 + explodeOffset, 0]}
        rotation={[0, 0, Math.PI / 1.1]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('Aorta Arch'); }}
        onPointerOut={() => setHoveredPart(null)}
      >
        <torusGeometry args={[0.4, 0.14, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={hoveredPart === 'Aorta Arch' ? '#ef4444' : '#dc2626'}
          roughness={0.3}
          metalness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Pulmonary Artery (Blue/Cyan Branch) */}
      <mesh
        position={[0.3 + explodeOffset, 0.25, 0.15]}
        rotation={[0.4, 0.2, 0.5]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('Pulmonary Artery'); }}
        onPointerOut={() => setHoveredPart(null)}
      >
        <cylinderGeometry args={[0.13, 0.14, 0.65, 24]} />
        <meshStandardMaterial
          color={hoveredPart === 'Pulmonary Artery' ? '#60a5fa' : '#2563eb'}
          roughness={0.35}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Vena Cava (Deoxygenated Return) */}
      <mesh
        position={[-0.38 - explodeOffset, 0.2, -0.1]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('Superior Vena Cava'); }}
        onPointerOut={() => setHoveredPart(null)}
      >
        <cylinderGeometry args={[0.12, 0.13, 0.7, 24]} />
        <meshStandardMaterial
          color={hoveredPart === 'Superior Vena Cava' ? '#93c5fd' : '#1d4ed8'}
          roughness={0.3}
          wireframe={wireframe}
        />
      </mesh>

      {/* Anatomical Tooltip Tag */}
      {hoveredPart && (
        <Html position={[0, 0.9, 0]} center distanceFactor={6}>
          <div className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg pointer-events-none whitespace-nowrap">
            {hoveredPart}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * 2. MATHEMATICS: 3D Polyhedron & Geometric Solid (Cylinder, Dodecahedron & Cone)
 */
function PolyhedronModel({ wireframe, exploded }: { wireframe: boolean; exploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [shapeIndex, setShapeIndex] = useState<number>(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Inspectable Solid */}
      <mesh
        onClick={() => setShapeIndex((prev) => (prev + 1) % 3)}
        scale={exploded ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        {shapeIndex === 0 && <cylinderGeometry args={[0.8, 0.8, 1.6, 32]} />}
        {shapeIndex === 1 && <dodecahedronGeometry args={[1.05, 0]} />}
        {shapeIndex === 2 && <coneGeometry args={[1, 1.8, 32]} />}

        <meshPhysicalMaterial
          color="#059669"
          roughness={0.15}
          metalness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Coordinate Framing Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * 3. CHEMISTRY: Rutherford-Bohr Quantized Atomic Model
 */
function AtomModel({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const shell1Ref = useRef<THREE.Group>(null);
  const shell2Ref = useRef<THREE.Group>(null);
  const shell3Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shell1Ref.current) shell1Ref.current.rotation.z = t * 1.8;
    if (shell2Ref.current) shell2Ref.current.rotation.x = t * 1.2;
    if (shell3Ref.current) shell3Ref.current.rotation.y = t * 1.5;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus: Cluster of Protons (Red) & Neutrons (Grey/Gold) */}
      <group>
        <Sphere args={[0.22, 24, 24]} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#dc2626" roughness={0.2} metalness={0.3} wireframe={wireframe} />
        </Sphere>
        <Sphere args={[0.18, 24, 24]} position={[0.16, 0.12, 0.08]}>
          <meshPhysicalMaterial color="#f59e0b" roughness={0.25} metalness={0.5} wireframe={wireframe} />
        </Sphere>
        <Sphere args={[0.19, 24, 24]} position={[-0.14, -0.1, 0.12]}>
          <meshPhysicalMaterial color="#b91c1c" roughness={0.2} metalness={0.3} wireframe={wireframe} />
        </Sphere>
        <Sphere args={[0.17, 24, 24]} position={[0.08, -0.15, -0.1]}>
          <meshPhysicalMaterial color="#d97706" roughness={0.3} metalness={0.5} wireframe={wireframe} />
        </Sphere>
      </group>

      {/* Orbital K-Shell (Radius 0.9) */}
      <group ref={shell1Ref} rotation={[0.4, 0.6, 0]}>
        <mesh>
          <torusGeometry args={[0.9, 0.015, 16, 64]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
        </mesh>
        <Sphere args={[0.07, 16, 16]} position={[0.9, 0, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
        </Sphere>
        <Sphere args={[0.07, 16, 16]} position={[-0.9, 0, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
        </Sphere>
      </group>

      {/* Orbital L-Shell (Radius 1.4) */}
      <group ref={shell2Ref} rotation={[-0.8, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.4, 0.015, 16, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
        <Sphere args={[0.07, 16, 16]} position={[0, 1.4, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.8} />
        </Sphere>
        <Sphere args={[0.07, 16, 16]} position={[0, -1.4, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.8} />
        </Sphere>
      </group>

      {/* Orbital M-Shell (Radius 1.8) */}
      <group ref={shell3Ref} rotation={[0.2, -0.9, 0.5]}>
        <mesh>
          <torusGeometry args={[1.8, 0.015, 16, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>
        <Sphere args={[0.07, 16, 16]} position={[1.8 * Math.cos(0.8), 1.8 * Math.sin(0.8), 0]}>
          <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.8} />
        </Sphere>
      </group>
    </group>
  );
}

/**
 * 4. PHYSICS & TECH: DC Electric Motor & Stator Electromagnet
 */
function ElectricMotorModel({ wireframe }: { wireframe: boolean }) {
  const rotorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.z += delta * 2.8;
    }
  });

  return (
    <group rotation={[0.3, 0.5, 0]}>
      {/* North Stator Magnet (Red) */}
      <Box args={[0.4, 1.2, 1.4]} position={[-1.2, 0, 0]}>
        <meshPhysicalMaterial color="#dc2626" metalness={0.7} roughness={0.3} wireframe={wireframe} />
        <Html position={[0, 0, 0.8]} center distanceFactor={5}>
          <div className="bg-red-950 text-red-200 px-1.5 py-0.5 rounded text-[10px] font-black border border-red-500/40">
            N
          </div>
        </Html>
      </Box>

      {/* South Stator Magnet (Blue) */}
      <Box args={[0.4, 1.2, 1.4]} position={[1.2, 0, 0]}>
        <meshPhysicalMaterial color="#2563eb" metalness={0.7} roughness={0.3} wireframe={wireframe} />
        <Html position={[0, 0, 0.8]} center distanceFactor={5}>
          <div className="bg-blue-950 text-blue-200 px-1.5 py-0.5 rounded text-[10px] font-black border border-blue-500/40">
            S
          </div>
        </Html>
      </Box>

      {/* Spinning Armature & Copper Coil */}
      <group ref={rotorRef}>
        {/* Central Steel Shaft */}
        <Cylinder args={[0.08, 0.08, 2.2, 24]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
        </Cylinder>

        {/* Copper Armature Coils (Lustrous Orange) */}
        <Box args={[1.1, 0.7, 0.35]}>
          <meshPhysicalMaterial
            color="#d97706"
            metalness={0.85}
            roughness={0.2}
            clearcoat={0.6}
            wireframe={wireframe}
          />
        </Box>

        {/* Commutator Rings */}
        <Cylinder args={[0.18, 0.18, 0.3, 24]} position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </Cylinder>
      </group>
    </group>
  );
}

/**
 * 5. GEOGRAPHY: 3D Earth Globe with Nigeria Geodetic Marker
 */
function EarthGlobeModel({ wireframe }: { wireframe: boolean }) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Earth Sphere (Oceans & Continents Palette) */}
      <Sphere args={[1.2, 48, 48]}>
        <meshPhysicalMaterial
          color="#1e3a8a"
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.4}
          wireframe={wireframe}
        />
      </Sphere>

      {/* Equator Guide Ring (0° Lat) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.21, 0.015, 16, 64]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Greenwich Meridian (0° Long) */}
      <mesh>
        <torusGeometry args={[1.21, 0.012, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Nigeria Location Marker Pin (~9° N, 8° E on sphere) */}
      <group position={[0.35, 0.5, 1.05]}>
        <Cone args={[0.07, 0.22, 16]} rotation={[0.8, 0, -0.3]}>
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} />
        </Cone>
        <Sphere args={[0.09, 16, 16]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#047857" />
        </Sphere>
        <Html position={[0.1, 0.25, 0]} distanceFactor={6}>
          <div className="bg-emerald-950/90 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded text-[10px] font-black shadow-md whitespace-nowrap">
            🇳🇬 Nigeria (6°–14° N)
          </div>
        </Html>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------
// 2. SCENE ROUTER COMPONENT
// ----------------------------------------------------------------------------

function SceneContent({
  modelType,
  wireframe,
  exploded,
}: {
  modelType: string;
  wireframe: boolean;
  exploded: boolean;
}) {
  const norm = (modelType || '').toLowerCase().trim();
  const isHeart = norm.includes('heart');
  const isAtom = norm.includes('atom');
  const isMotor = norm.includes('motor') || norm.includes('electric') || norm.includes('gear') || norm.includes('prism');
  const isGlobe = norm.includes('globe') || norm.includes('earth') || norm.includes('geog') || norm.includes('solar');

  return (
    <Center>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {isHeart && <HeartModel wireframe={wireframe} exploded={exploded} />}
        {isAtom && <AtomModel wireframe={wireframe} />}
        {isMotor && <ElectricMotorModel wireframe={wireframe} />}
        {isGlobe && <EarthGlobeModel wireframe={wireframe} />}
        {!isHeart && !isAtom && !isMotor && !isGlobe && (
          <PolyhedronModel wireframe={wireframe} exploded={exploded} />
        )}
      </Float>
    </Center>
  );
}

// ----------------------------------------------------------------------------
// 3. HARDWARE & WEBGL CONTEXT RESILIENCY HELPERS
// ----------------------------------------------------------------------------

/**
 * Checks whether WebGL context creation is allowed by the host browser/sandbox.
 */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

interface CanvasErrorBoundaryProps {
  children: React.ReactNode;
  fallback: (errorMsg: string) => React.ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
  errorMsg: string;
}

class CanvasErrorBoundary extends React.Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  constructor(props: CanvasErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: any): CanvasErrorBoundaryState {
    return {
      hasError: true,
      errorMsg: error?.message || 'WebGL context could not be created in this browser or container.',
    };
  }

  componentDidCatch(error: any) {
    console.warn('[Interactive3DViewer] WebGL initialization was rejected by browser environment. Switching to interactive 2D pedagogical vector diagram:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMsg);
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------------
// 4. INTERACTIVE 2D PEDAGOGICAL CONCEPT SCHEMATIC (Zero-Occlusion Fallback)
// ----------------------------------------------------------------------------

interface Pedagogical2DConceptFallbackProps {
  modelType: string;
  topic: string;
  subject: string;
  wireframe: boolean;
  exploded: boolean;
  autoRotate: boolean;
  onRetryWebGL?: () => void;
  errorMsg?: string;
}

function Pedagogical2DConceptFallback({
  modelType,
  topic,
  subject,
  wireframe,
  exploded,
  autoRotate,
  onRetryWebGL,
  errorMsg,
}: Pedagogical2DConceptFallbackProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // Dynamic pedagogical data based on active model domain
  const domainInfo = useMemo(() => {
    switch (modelType) {
      case 'heart':
      case 'heart_model':
        return {
          title: 'Human Circulatory & Heart Mechanics (Anatomy)',
          curriculum: 'NERDC Senior Secondary Biology (SS1-SS3)',
          parts: [
            { id: 'lv', name: 'Left Ventricle', color: '#dc2626', desc: 'Thick muscular myocardium pumping oxygenated blood to the body via systemic circulation.' },
            { id: 'rv', name: 'Right Ventricle', color: '#b91c1c', desc: 'Pumps deoxygenated blood through the pulmonary semilunar valve into the pulmonary trunk.' },
            { id: 'aorta', name: 'Aortic Arch', color: '#ef4444', desc: 'Primary arterial trunk distributing high-pressure oxygenated blood (120 mmHg).' },
            { id: 'vc', name: 'Vena Cava', color: '#2563eb', desc: 'Superior & Inferior vena cava returning deoxygenated venous blood into right atrium.' },
            { id: 'septum', name: 'Interventricular Septum', color: '#991b1b', desc: 'Muscular divider preventing mixing of oxygenated and deoxygenated blood.' },
          ],
        };
      case 'atom':
        return {
          title: 'Bohr-Rutherford Atomic Shells & Orbitals',
          curriculum: 'NERDC Chemistry & Basic Science (JSS3-SS2)',
          parts: [
            { id: 'nucleus', name: 'Atomic Nucleus', color: '#e11d48', desc: 'Protons (+1 charge) and Neutrons (neutral) bound by the strong nuclear force.' },
            { id: 'kshell', name: 'K Shell (n=1)', color: '#38bdf8', desc: 'Innermost ground-state orbital holding a maximum of 2 electrons (2n² rule).' },
            { id: 'lshell', name: 'L Shell (n=2)', color: '#818cf8', desc: 'Second quantum principal shell holding up to 8 valence electrons.' },
            { id: 'electrons', name: 'Electrons', color: '#fbbf24', desc: 'Negatively charged subatomic leptons participating in chemical bonding.' },
          ],
        };
      case 'motor':
        return {
          title: 'Electromagnetic DC Motor & Armature Torque',
          curriculum: 'NERDC Physics (SS2-SS3)',
          parts: [
            { id: 'magnets', name: 'Permanent Stator Magnets', color: '#3b82f6', desc: 'North & South pole magnets generating uniform magnetic flux (B-field).' },
            { id: 'armature', name: 'Armature Rotor Coil', color: '#f59e0b', desc: 'Rectangular copper loop conducting current I to produce rotational torque.' },
            { id: 'commutator', name: 'Split-Ring Commutator', color: '#10b981', desc: 'Reverses current direction every half-turn to maintain continuous unidirectional torque.' },
            { id: 'brushes', name: 'Carbon Brushes', color: '#64748b', desc: 'Graphite contacts transmitting DC electric current from battery to spinning ring.' },
          ],
        };
      case 'globe':
        return {
          title: 'Geographic Earth Coordinates & Nigerian Geodesy',
          curriculum: 'NERDC Senior Secondary Geography (SS1-SS3)',
          parts: [
            { id: 'nigeria', name: 'Federal Republic of Nigeria', color: '#16a34a', desc: 'Located in West Africa at 9.0820° N, 8.6753° E within West Africa Time (WAT / UTC+1).' },
            { id: 'equator', name: 'The Equator (0° Latitude)', color: '#f59e0b', desc: 'Great circle dividing the Earth into Northern and Southern hemispheres.' },
            { id: 'meridian', name: 'Prime Meridian (0° Longitude)', color: '#38bdf8', desc: 'Greenwich meridian measuring East and West longitudinal time arcs.' },
          ],
        };
      default:
        return {
          title: 'Solid Geometry & Polyhedra Euler Law',
          curriculum: 'NERDC General Mathematics (JSS1-SS3)',
          parts: [
            { id: 'faces', name: 'Polygonal Faces (F)', color: '#6366f1', desc: 'Flat 2D surfaces bounding the solid regular polyhedron.' },
            { id: 'edges', name: 'Vertices & Edges (V & E)', color: '#ec4899', desc: 'Governed strictly by Euler characteristic formula: V - E + F = 2.' },
            { id: 'net', name: 'Geometric Net', color: '#14b8a6', desc: '2D unfolding pattern used in classroom construction and surface area derivation.' },
          ],
        };
    }
  }, [modelType]);

  const activePartObj = domainInfo.parts.find((p) => p.name === selectedPart) || domainInfo.parts[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden select-none">
      {/* Notice Banner */}
      <div className="absolute top-14 inset-x-4 z-10 flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-slate-200">
            Interactive Pedagogical Schematic
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            (WebGL sandboxed • 2D vector mode active)
          </span>
        </div>
        {onRetryWebGL && (
          <button
            onClick={onRetryWebGL}
            className="px-2 py-0.5 rounded-md bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>Check 3D</span>
          </button>
        )}
      </div>

      {/* Interactive Vector Canvas */}
      <div className="w-full max-w-[360px] h-[260px] flex items-center justify-center relative mt-6">
        {/* Heart Schematic */}
        {(modelType === 'heart' || modelType === 'heart_model') && (
          <svg
            viewBox="0 0 300 240"
            className={`w-full h-full transition-transform duration-500 ${
              autoRotate ? 'animate-pulse' : ''
            }`}
          >
            {/* Aorta Arch */}
            <path
              d="M 120 75 C 120 20, 180 20, 180 70 C 180 85, 170 95, 160 100"
              fill="none"
              stroke="#ef4444"
              strokeWidth={wireframe ? 6 : 14}
              strokeDasharray={wireframe ? '4 2' : 'none'}
              className="cursor-pointer hover:stroke-rose-400 transition-colors"
              onClick={() => setSelectedPart('Aortic Arch')}
            />
            {/* Aortic Branches */}
            <line x1="140" y1="35" x2="140" y2="15" stroke="#ef4444" strokeWidth="6" />
            <line x1="155" y1="35" x2="155" y2="15" stroke="#ef4444" strokeWidth="6" />
            <line x1="170" y1="40" x2="175" y2="20" stroke="#ef4444" strokeWidth="6" />

            {/* Vena Cava */}
            <path
              d="M 90 20 L 90 120"
              stroke="#2563eb"
              strokeWidth="12"
              className="cursor-pointer hover:stroke-blue-400 transition-colors"
              onClick={() => setSelectedPart('Vena Cava')}
            />

            {/* Right Ventricle */}
            <path
              d={exploded ? "M 75 110 C 65 160, 95 210, 130 220 L 130 110 Z" : "M 90 100 C 80 150, 110 200, 140 210 L 140 100 Z"}
              fill={selectedPart === 'Right Ventricle' ? '#b91c1c' : '#991b1b'}
              stroke="#fca5a5"
              strokeWidth={wireframe ? 2 : 1}
              strokeDasharray={wireframe ? '3 3' : 'none'}
              className="cursor-pointer hover:fill-red-600 transition-all"
              onClick={() => setSelectedPart('Right Ventricle')}
            />

            {/* Left Ventricle (Thick Myocardium Apex) */}
            <path
              d={exploded ? "M 175 110 L 175 220 C 215 210, 245 160, 225 110 Z" : "M 150 100 L 150 210 C 190 200, 220 150, 200 100 Z"}
              fill={selectedPart === 'Left Ventricle' ? '#ef4444' : '#dc2626'}
              stroke="#f87171"
              strokeWidth={wireframe ? 2 : 1}
              strokeDasharray={wireframe ? '3 3' : 'none'}
              className="cursor-pointer hover:fill-rose-500 transition-all"
              onClick={() => setSelectedPart('Left Ventricle')}
            />

            {/* Septum Divider */}
            <line
              x1={exploded ? "152" : "145"}
              y1="100"
              x2={exploded ? "152" : "145"}
              y2="210"
              stroke="#450a0a"
              strokeWidth="4"
              strokeDasharray="2 2"
              className="cursor-pointer"
              onClick={() => setSelectedPart('Interventricular Septum')}
            />

            {/* Labels */}
            <text x="100" y="160" fill="#ffffff" fontSize="9" fontWeight="bold">RV</text>
            <text x="175" y="160" fill="#ffffff" fontSize="9" fontWeight="bold">LV (Apex)</text>
            <text x="145" y="55" fill="#fef2f2" fontSize="9" fontWeight="bold">Aorta</text>
          </svg>
        )}

        {/* Atom Schematic */}
        {modelType === 'atom' && (
          <svg viewBox="0 0 260 220" className="w-full h-full">
            {/* K Shell */}
            <ellipse
              cx="130"
              cy="110"
              rx="40"
              ry="25"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray={wireframe ? '3 3' : 'none'}
              className="cursor-pointer hover:stroke-cyan-300"
              onClick={() => setSelectedPart('K Shell (n=1)')}
            />
            {/* L Shell (Rotated 60deg) */}
            <g transform="rotate(60 130 110)">
              <ellipse
                cx="130"
                cy="110"
                rx="85"
                ry="35"
                fill="none"
                stroke="#818cf8"
                strokeWidth="1.5"
                strokeDasharray={wireframe ? '3 3' : 'none'}
                className="cursor-pointer hover:stroke-indigo-300"
                onClick={() => setSelectedPart('L Shell (n=2)')}
              />
              <circle cx="215" cy="110" r="4.5" fill="#fbbf24" className={autoRotate ? 'animate-bounce' : ''} />
              <circle cx="45" cy="110" r="4.5" fill="#fbbf24" />
            </g>
            {/* M Shell (Rotated -60deg) */}
            <g transform="rotate(-60 130 110)">
              <ellipse
                cx="130"
                cy="110"
                rx="85"
                ry="35"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray={wireframe ? '3 3' : 'none'}
                className="cursor-pointer hover:stroke-purple-300"
                onClick={() => setSelectedPart('L Shell (n=2)')}
              />
              <circle cx="215" cy="110" r="4.5" fill="#fbbf24" />
              <circle cx="45" cy="110" r="4.5" fill="#fbbf24" />
            </g>

            {/* Nucleus Cluster */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('Atomic Nucleus')}>
              <circle cx="127" cy="107" r="9" fill="#ef4444" />
              <circle cx="134" cy="112" r="8" fill="#3b82f6" />
              <circle cx="128" cy="116" r="8" fill="#ef4444" />
              <circle cx="135" cy="106" r="7.5" fill="#10b981" />
              <text x="124" y="113" fill="#ffffff" fontSize="8" fontWeight="black">+</text>
            </g>
          </svg>
        )}

        {/* Electric Motor Schematic */}
        {modelType === 'motor' && (
          <svg viewBox="0 0 280 220" className="w-full h-full">
            {/* North Stator Magnet */}
            <rect
              x="20"
              y="60"
              width="50"
              height="90"
              rx="6"
              fill="#2563eb"
              stroke="#60a5fa"
              strokeWidth="2"
              className="cursor-pointer"
              onClick={() => setSelectedPart('Permanent Stator Magnets')}
            />
            <text x="38" y="112" fill="#ffffff" fontSize="18" fontWeight="black">N</text>

            {/* South Stator Magnet */}
            <rect
              x="210"
              y="60"
              width="50"
              height="90"
              rx="6"
              fill="#dc2626"
              stroke="#f87171"
              strokeWidth="2"
              className="cursor-pointer"
              onClick={() => setSelectedPart('Permanent Stator Magnets')}
            />
            <text x="228" y="112" fill="#ffffff" fontSize="18" fontWeight="black">S</text>

            {/* Magnetic Field Flux Lines (B ->) */}
            <path d="M 75 80 L 205 80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 75 105 L 205 105" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 75 130 L 205 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Armature Rotor Loop */}
            <polygon
              points="110,65 170,75 170,145 110,135"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={wireframe ? 2 : 4}
              strokeDasharray={wireframe ? '4 2' : 'none'}
              className="cursor-pointer hover:stroke-amber-300"
              onClick={() => setSelectedPart('Armature Rotor Coil')}
            />

            {/* Split-Ring Commutator */}
            <circle
              cx="140"
              cy="165"
              r="14"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="18 4"
              className="cursor-pointer"
              onClick={() => setSelectedPart('Split-Ring Commutator')}
            />

            {/* Carbon Brushes */}
            <rect x="118" y="160" width="6" height="10" fill="#64748b" onClick={() => setSelectedPart('Carbon Brushes')} />
            <rect x="156" y="160" width="6" height="10" fill="#64748b" onClick={() => setSelectedPart('Carbon Brushes')} />

            {/* Labels */}
            <text x="126" y="198" fill="#10b981" fontSize="9" fontWeight="bold">Commutator</text>
            <text x="122" y="55" fill="#f59e0b" fontSize="9" fontWeight="bold">Armature (I)</text>
          </svg>
        )}

        {/* Polyhedron / Solid Geometry */}
        {(modelType === 'polyhedron' || modelType === 'generic') && (
          <svg viewBox="0 0 260 220" className="w-full h-full">
            {exploded ? (
              /* Exploded Net View */
              <g className="cursor-pointer" onClick={() => setSelectedPart('Geometric Net')}>
                <rect x="100" y="40" width="45" height="45" fill="#4338ca" stroke="#a5b4fc" strokeWidth="1.5" />
                <rect x="55" y="85" width="45" height="45" fill="#4f46e5" stroke="#a5b4fc" strokeWidth="1.5" />
                <rect x="100" y="85" width="45" height="45" fill="#6366f1" stroke="#a5b4fc" strokeWidth="1.5" />
                <rect x="145" y="85" width="45" height="45" fill="#4f46e5" stroke="#a5b4fc" strokeWidth="1.5" />
                <rect x="190" y="85" width="45" height="45" fill="#4338ca" stroke="#a5b4fc" strokeWidth="1.5" />
                <rect x="100" y="130" width="45" height="45" fill="#4338ca" stroke="#a5b4fc" strokeWidth="1.5" />
                <text x="106" y="195" fill="#a5b4fc" fontSize="10" fontWeight="bold">Cube 2D Net</text>
              </g>
            ) : (
              /* Isometric Solid View */
              <g className="cursor-pointer" onClick={() => setSelectedPart('Polygonal Faces (F)')}>
                {/* Top Face */}
                <polygon points="130,40 185,65 130,90 75,65" fill="#6366f1" stroke="#c7d2fe" strokeWidth={wireframe ? 2 : 1} strokeDasharray={wireframe ? '4 2' : 'none'} />
                {/* Left Face */}
                <polygon points="75,65 130,90 130,165 75,140" fill="#4338ca" stroke="#c7d2fe" strokeWidth={wireframe ? 2 : 1} strokeDasharray={wireframe ? '4 2' : 'none'} />
                {/* Right Face */}
                <polygon points="185,65 130,90 130,165 185,140" fill="#4f46e5" stroke="#c7d2fe" strokeWidth={wireframe ? 2 : 1} strokeDasharray={wireframe ? '4 2' : 'none'} />

                {/* Euler Formula Badge */}
                <text x="60" y="198" fill="#e0e7ff" fontSize="10" fontWeight="bold">Euler: V(8) - E(12) + F(6) = 2</text>
              </g>
            )}
          </svg>
        )}

        {/* Earth Globe */}
        {modelType === 'globe' && (
          <svg viewBox="0 0 240 220" className="w-full h-full">
            <circle cx="120" cy="110" r="75" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            {/* Latitude Parallels */}
            <ellipse cx="120" cy="110" rx="75" ry="20" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" className="cursor-pointer" onClick={() => setSelectedPart('The Equator (0° Latitude)')} />
            <ellipse cx="120" cy="80" rx="68" ry="15" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <ellipse cx="120" cy="140" rx="68" ry="15" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />

            {/* Longitude Meridians */}
            <ellipse cx="120" cy="110" rx="35" ry="75" fill="none" stroke="#38bdf8" strokeWidth="1" className="cursor-pointer" onClick={() => setSelectedPart('Prime Meridian (0° Longitude)')} />
            <line x1="120" y1="35" x2="120" y2="185" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Nigeria Pin Marker */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('Federal Republic of Nigeria')}>
              <circle cx="125" cy="98" r="6" fill="#16a34a" className="animate-ping opacity-75" />
              <circle cx="125" cy="98" r="5" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
              <text x="135" y="102" fill="#86efac" fontSize="9" fontWeight="black">Nigeria (9°N, 8°E)</text>
            </g>
          </svg>
        )}
      </div>

      {/* Selected Anatomical / Concept Part Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 mt-2 text-left space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: activePartObj.color }}
            />
            <span className="text-xs font-bold text-white">{activePartObj.name}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Click parts to inspect</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-tight">
          {activePartObj.desc}
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 5. MAIN EXPORTED COMPONENT: Interactive3DViewer (Zero-Occlusion)
// ----------------------------------------------------------------------------

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  spec,
  topic = 'Cell Biology & Cellular Organization',
  subject = 'Biology',
  className = '',
  isCompact = false,
}) => {
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeModel, setActiveModel] = useState<string>(spec?.modelType || 'heart');
  const [webglSupported, setWebglSupported] = useState<boolean>(() => isWebGLAvailable());
  const { isLowDataMode } = useLowDataMode();

  // Derive initial model type if spec is absent
  const effectiveModel = useMemo(() => {
    if (activeModel) return activeModel;
    if (spec?.modelType) return spec.modelType;
    const s = subject.toLowerCase();
    if (s.includes('bio')) return 'heart';
    if (s.includes('chem')) return 'atom';
    if (s.includes('phys')) return 'motor';
    if (s.includes('geog')) return 'globe';
    return 'polyhedron';
  }, [activeModel, spec, subject]);

  const handleRetryWebGL = () => {
    const isAvail = isWebGLAvailable();
    setWebglSupported(isAvail);
  };

  return (
    <div
      className={`relative flex flex-col bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl'
          : isCompact
          ? 'h-[360px] w-full'
          : 'h-[480px] w-full'
      } ${className}`}
    >
      {/* Top Header Bar with Model Selector & Fullscreen Toggle */}
      <div className="absolute top-0 inset-x-0 z-20 p-3.5 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-wide">
                {spec?.title || `${subject}: 3D Pedagogical Lab`}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                {webglSupported && !isLowDataMode ? 'NERDC / OEQA PBR' : isLowDataMode ? '2G Low-Data SVG' : '2D Schematic'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              {spec?.curriculumStandard || `Standard Interactive Visual Model for ${topic}`}
            </p>
          </div>
        </div>

        {/* Header Right Action Badges */}
        <div className="flex items-center gap-1.5">
          {/* Quick Preset Model Switcher */}
          <select
            value={effectiveModel}
            onChange={(e) => setActiveModel(e.target.value)}
            className="text-[11px] font-bold bg-slate-900/90 text-slate-200 border border-slate-700/80 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="heart">🫀 Human Heart (Biology)</option>
            <option value="polyhedron">📐 Polyhedra & Solids (Math)</option>
            <option value="atom">⚛️ Atomic Shells (Chemistry)</option>
            <option value="motor">⚡ Electric Motor (Physics)</option>
            <option value="globe">🌍 Earth Globe (Geography)</option>
          </select>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Classroom Projection'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Viewport: WebGL 3D Canvas if available with bulletproof ErrorBoundary fallback to 2D Concept Schematic */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <CanvasErrorBoundary
          fallback={(err) => (
            <Pedagogical2DConceptFallback
              modelType={effectiveModel}
              topic={topic}
              subject={subject}
              wireframe={wireframe}
              exploded={exploded}
              autoRotate={autoRotate}
              onRetryWebGL={handleRetryWebGL}
              errorMsg={err}
            />
          )}
        >
          {webglSupported && !isLowDataMode ? (
            <Canvas
              camera={{ position: [0, 0.4, 3.2], fov: 45 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('[Interactive3DViewer] WebGL context lost.');
                  setWebglSupported(false);
                });
              }}
            >
              {/* Studio PBR Lighting Rig */}
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
              <directionalLight position={[-5, -4, -4]} intensity={0.5} color="#38bdf8" />
              <directionalLight position={[0, 4, -5]} intensity={0.8} color="#f59e0b" />

              {/* Realistic Environment Lighting */}
              <Environment preset="city" />

              {/* Interactive OrbitControls */}
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={1.4}
                maxDistance={6.0}
                autoRotate={autoRotate}
                autoRotateSpeed={1.0}
              />

              {/* Render Active Scene */}
              <Suspense fallback={null}>
                <SceneContent
                  modelType={effectiveModel}
                  wireframe={wireframe}
                  exploded={exploded}
                />
              </Suspense>
            </Canvas>
          ) : (
            <Pedagogical2DConceptFallback
              modelType={effectiveModel}
              topic={topic}
              subject={subject}
              wireframe={wireframe}
              exploded={exploded}
              autoRotate={autoRotate}
              onRetryWebGL={handleRetryWebGL}
            />
          )}
        </CanvasErrorBoundary>
      </div>

      {/* Bottom Floating Control Strip (Zero-Occlusion, Semi-Transparent) */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-xs text-slate-300 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
              autoRotate
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>Auto-Rotate</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
              wireframe
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Wireframe</span>
          </button>

          {(effectiveModel === 'heart' || effectiveModel === 'polyhedron') && (
            <button
              onClick={() => setExploded(!exploded)}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                exploded
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{exploded ? 'Assembled' : 'Explode Parts'}</span>
            </button>
          )}
        </div>

        {/* Touch & Navigation Tips */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 pr-1">
          <Info className="w-3 h-3 text-slate-500" />
          <span>Click & Drag to Rotate • Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
};
