import React, { useRef, useState, useEffect, Suspense } from 'react';
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
  RefreshCw,
  BookOpen,
  X,
  Search,
  Filter,
  Layers3,
  MousePointerClick,
  AlertTriangle,
  Flame,
  Zap,
  Globe,
  Landmark,
  Scale,
  Music,
  Palette,
  FileCode,
  Sprout,
  Activity
} from 'lucide-react';
import {
  ASSET_REGISTRY,
  CurriculumAsset,
  getAllAssets,
  searchAssets,
  getBestModelForSubject,
  getBestAssetForSubject
} from '../data/asset-registry.ts';
import { resolveTierConfig } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';
import { UpgradeModal } from './UpgradeModal.tsx';

interface VisualAidViewerProps {
  modelType?: string;
  topicTitle?: string;
  subject?: string;
  level?: string;
  userTier?: string;
  onModelChange?: (type: string) => void;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
}

/**
 * Robust WebGL feature detection for sandboxes, headless runtimes, and restricted iframes
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
    console.warn('[VisualAidViewer] WebGL canvas caught error. Falling back to 2D vector schematic:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMsg);
    }
    return this.props.children;
  }
}

// ---------------- 1. GEOMETRY CUBE MODEL ----------------
function GeometryCube({ wireframe, rotationSpeed = 0.4 }: { wireframe: boolean; rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * (rotationSpeed * 1.5);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * (rotationSpeed * 0.7);
      innerRef.current.rotation.y -= delta * (rotationSpeed * 1.2);
    }
  });

  return (
    <group>
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
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.3]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe={wireframe}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
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
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.6}
          wireframe={wireframe}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.18, 2.22, 64]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh ref={earthRef} position={[2.2, 0, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#0284c7" wireframe={wireframe} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.08, 3.12, 64]} />
        <meshBasicMaterial color="#f87171" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh ref={marsRef} position={[3.1, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#ef4444" wireframe={wireframe} roughness={0.5} />
      </mesh>
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const beat = 1 + Math.pow(Math.sin(t * 4.5), 6) * 0.12;
    if (heartGroupRef.current) {
      heartGroupRef.current.scale.set(beat, beat * 1.05, beat);
      heartGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={heartGroupRef} position={[0, -0.2, 0]}>
      {/* Left Ventricle Bulb */}
      <mesh position={[-0.45, -0.4, 0]} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#e11d48" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Right Ventricle Bulb */}
      <mesh position={[0.45, -0.3, 0]} rotation={[0, 0, -0.2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#be123c" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Aorta Arch */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.6, 0.25, 16, 32, Math.PI * 0.9]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Pulmonary Trunk */}
      <mesh position={[0.3, 0.4, 0.3]} rotation={[0.4, 0, -0.2]}>
        <cylinderGeometry args={[0.2, 0.22, 0.9, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Superior Vena Cava */}
      <mesh position={[-0.6, 0.6, -0.1]} rotation={[0.1, 0, 0.2]}>
        <cylinderGeometry args={[0.18, 0.2, 0.9, 16]} />
        <meshStandardMaterial color="#0369a1" roughness={0.3} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// ---------------- 4. DNA DOUBLE HELIX MODEL ----------------
function DnaHelix({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const basePairs = Array.from({ length: 16 }).map((_, i) => {
    const y = (i - 8) * 0.28;
    const angle = i * 0.45;
    const x1 = Math.cos(angle) * 1.0;
    const z1 = Math.sin(angle) * 1.0;
    const x2 = -x1;
    const z2 = -z1;
    const isAtPair = i % 2 === 0;

    return { y, x1, z1, x2, z2, angle, isAtPair };
  });

  return (
    <group ref={groupRef}>
      {basePairs.map((bp, idx) => (
        <group key={idx} position={[0, bp.y, 0]}>
          <mesh position={[bp.x1, 0, bp.z1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" wireframe={wireframe} />
          </mesh>
          <mesh position={[bp.x2, 0, bp.z2]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#818cf8" wireframe={wireframe} />
          </mesh>
          <mesh rotation={[0, -bp.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 2.0, 8]} />
            <meshStandardMaterial
              color={bp.isAtPair ? '#f59e0b' : '#10b981'}
              roughness={0.2}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------------- 5. ATOM & ELECTRON ORBITALS MODEL ----------------
function AtomModel({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const orbit1Ref = useRef<THREE.Group>(null!);
  const orbit2Ref = useRef<THREE.Group>(null!);
  const orbit3Ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbit1Ref.current) orbit1Ref.current.rotation.z = t * 1.8;
    if (orbit2Ref.current) orbit2Ref.current.rotation.x = t * 1.5;
    if (orbit3Ref.current) orbit3Ref.current.rotation.y = t * 2.1;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={0.5} wireframe={wireframe} />
      </mesh>
      <group ref={orbit1Ref} rotation={[0.4, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
        <mesh position={[1.8, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#67e8f9" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group ref={orbit2Ref} rotation={[-0.6, 0.5, 0.8]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>
        <mesh position={[1.8, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group ref={orbit3Ref} rotation={[0.8, -0.6, -0.4]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>
        <mesh position={[1.8, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 6. PLANT CELL MODEL ----------------
function PlantCell({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[3.0, 2.2, 1.8]} />
        <meshStandardMaterial color="#15803d" wireframe={wireframe} transparent opacity={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.0]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} wireframe={wireframe} />
      </mesh>
      <mesh position={[-0.8, 0.3, 0]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#db2777" roughness={0.2} wireframe={wireframe} />
      </mesh>
      {[-0.8, 0.9].map((x, i) => (
        <mesh key={i} position={[x, -0.5, 0.4]} rotation={[0.2, 0.3, 0]}>
          <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.4} wireframe={wireframe} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------- 7. DC ELECTRIC MOTOR & ARMATURE (PHYSICS / TECH) ----------------
function ElectricMotor({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const armatureRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (armatureRef.current) {
      armatureRef.current.rotation.y += delta * 3.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Permanent Stator Magnet North (Red) */}
      <mesh position={[-1.7, 0, 0]}>
        <boxGeometry args={[0.7, 1.8, 1.8]} />
        <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Permanent Stator Magnet South (Blue) */}
      <mesh position={[1.7, 0, 0]}>
        <boxGeometry args={[0.7, 1.8, 1.8]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Central Rotating Armature Assembly */}
      <group ref={armatureRef}>
        {/* Steel Transmission Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 3.2, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Rectangular Copper Wire Coil */}
        <mesh>
          <torusGeometry args={[0.9, 0.08, 16, 4]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Armature Core */}
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 1.2, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Split-Ring Commutator */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.35, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      <gridHelper args={[6, 6, '#2563eb', '#334155']} position={[0, -1.6, 0]} />
    </group>
  );
}

// ---------------- 8. 3D TERRESTRIAL GLOBE & NIGERIA PIN (GEOGRAPHY / SOCIAL STUDIES) ----------------
function EarthGlobe({ wireframe }: { wireframe: boolean }) {
  const globeRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 36, 36]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Equator Ring (0° Lat) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.52, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {/* Greenwich Meridian Ring (0° Long) */}
      <mesh>
        <torusGeometry args={[1.52, 0.015, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      {/* Nigeria Location Marker Pin (~9° N, 8° E) */}
      <group position={[0.4, 0.6, 1.35]}>
        <mesh rotation={[0.8, 0, -0.3]}>
          <coneGeometry args={[0.09, 0.28, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#047857" />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 9. 3D MARKET EQUILIBRIUM & BALOGUN TRADE (ECONOMICS / COMMERCE) ----------------
function MarketEquilibrium({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Downward Sloping Demand Curve (Blue) */}
      <mesh position={[-0.8, 0.8, 0]} rotation={[0, 0, -0.7]}>
        <cylinderGeometry args={[0.07, 0.07, 2.6, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Upward Sloping Supply Curve (Red) */}
      <mesh position={[0.8, 0.8, 0]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.07, 0.07, 2.6, 16]} />
        <meshStandardMaterial color="#ef4444" metalness={0.3} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Equilibrium Intersection Point Coordinate (P*, Q*) */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.8} />
      </mesh>
      {/* Commercial Balogun Trade Vault Base & Naira Coin Stacks */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.4, 0.4, 2.0]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.4, 0.4]}>
          <cylinderGeometry args={[0.25, 0.25, 0.4, 16]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <gridHelper args={[6, 6, '#10b981', '#334155']} position={[0, -1.2, 0]} />
    </group>
  );
}

// ---------------- 10. CIVIC MACE & SCALES OF JUSTICE (CIVIC / GOVERNMENT) ----------------
function CivicMace({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central National Assembly Fluted Mace Shaft */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 3.2, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Crowning Head & Eagle Finial */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Crossbeam for Scales of Justice */}
      <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.2, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Left Balance Pan */}
      <group position={[-1.0, 0.1, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.35, 0.15, 24]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      {/* Right Balance Pan */}
      <group position={[1.0, 0.1, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.35, 0.15, 24]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      <gridHelper args={[5, 5, '#f59e0b', '#334155']} position={[0, -1.7, 0]} />
    </group>
  );
}

// ---------------- 11. NIGERIAN TALKING DRUM 'GÁNGAN' (LANGUAGES / MUSIC) ----------------
function TalkingDrum({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Upper Resonating Cavity */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.8, 0.35, 1.0, 24]} />
        <meshStandardMaterial color="#78350f" roughness={0.5} metalness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Lower Resonating Cavity */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.8, 1.0, 24]} />
        <meshStandardMaterial color="#78350f" roughness={0.5} metalness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Top Untanned Goat-Skin Drumhead */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.06, 24]} />
        <meshStandardMaterial color="#fde68a" roughness={0.8} />
      </mesh>
      {/* Bottom Drumhead */}
      <mesh position={[0, -1.12, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.06, 24]} />
        <meshStandardMaterial color="#fde68a" roughness={0.8} />
      </mesh>
      {/* Leather Tension Chords */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx * Math.PI) / 4;
        const x = Math.cos(angle) * 0.6;
        const z = Math.sin(angle) * 0.6;
        return (
          <mesh key={idx} position={[x, 0, z]}>
            <cylinderGeometry args={[0.02, 0.02, 2.1, 8]} />
            <meshStandardMaterial color="#d97706" roughness={0.4} />
          </mesh>
        );
      })}
      {/* Curved Striker Mallet */}
      <group position={[1.1, 0, 0]} rotation={[0.4, 0.2, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 12]} />
          <meshStandardMaterial color="#92400e" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 12. BENIN ROYAL BRONZE HEAD (ARTS / HISTORY) ----------------
function BeninBronze({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sculpted Royal Bronze Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial color="#b45309" metalness={0.75} roughness={0.25} wireframe={wireframe} />
      </mesh>
      {/* Coral Beaded Crown Headdress (Ode) */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.7, 0.85, 0.5, 24]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} wireframe={wireframe} />
      </mesh>
      {/* Tiered Coral Beaded Neck Collar Rings (Ike) */}
      {[-0.35, -0.55, -0.75].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.65 - i * 0.05, 0.09, 16, 32]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
      <gridHelper args={[5, 5, '#b45309', '#334155']} position={[0, -1.2, 0]} />
    </group>
  );
}

// ---------------- 13. PRINTING PRESS & ILLUMINATED CODEX (ENGLISH / LITERATURE) ----------------
function PrintingPress({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Heavy Oak Timber Frame Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.0, 0.4, 2.0]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} wireframe={wireframe} />
      </mesh>
      {/* Dual Upright Heavy Stanchions */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]}>
          <boxGeometry args={[0.25, 2.2, 0.3]} />
          <meshStandardMaterial color="#451a03" roughness={0.7} />
        </mesh>
      ))}
      {/* Central Platen Screw & Lever Bar */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 1.2, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Open Illuminated Manuscript Pages */}
      <group position={[0, -0.2, 0.2]}>
        {/* Left Page */}
        <mesh position={[-0.45, 0, 0]} rotation={[-0.2, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.04, 1.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Right Page */}
        <mesh position={[0.45, 0, 0]} rotation={[-0.2, -0.3, 0]}>
          <boxGeometry args={[0.8, 0.04, 1.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 14. SOIL PROFILE MONOLITH & CROPS (AGRICULTURAL SCIENCE) ----------------
function SoilProfile({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Horizon O: Humus Top Layer */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.6, 0.3, 1.6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} wireframe={wireframe} />
      </mesh>
      {/* Horizon A: Dark Fertile Topsoil */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.6, 0.6, 1.6]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} wireframe={wireframe} />
      </mesh>
      {/* Horizon B: Subsoil Clay & Minerals */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.6, 0.7, 1.6]} />
        <meshStandardMaterial color="#d97706" roughness={0.7} wireframe={wireframe} />
      </mesh>
      {/* Horizon C/R: Weathered Rock & Bedrock */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[1.6, 0.8, 1.6]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} wireframe={wireframe} />
      </mesh>
      {/* Green Agricultural Crop Seedling on Top */}
      <group position={[0, 1.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        <mesh position={[-0.1, 0.2, 0]} rotation={[0, 0, 0.6]}>
          <coneGeometry args={[0.08, 0.25, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0.1, 0.2, 0]} rotation={[0, 0, -0.6]}>
          <coneGeometry args={[0.08, 0.25, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      </group>
    </group>
  );
}

// ---------------- 15. OPTICAL GLASS PRISM & SPECTRAL DISPERSION (PHYSICS) ----------------
function OpticsPrism({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Triangular Prism */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 1.8, 3]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Incident White Light Beam */}
      <mesh position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Dispersed Visible Spectral Rays (ROYGBIV) */}
      {[
        { color: '#ef4444', angle: 0.2 },
        { color: '#f97316', angle: 0.15 },
        { color: '#eab308', angle: 0.1 },
        { color: '#22c55e', angle: 0.05 },
        { color: '#3b82f6', angle: 0.0 },
        { color: '#a855f7', angle: -0.05 },
      ].map((ray, i) => (
        <mesh key={i} position={[1.4, ray.angle * 2, 0]} rotation={[0, 0, Math.PI / 2 + ray.angle]}>
          <cylinderGeometry args={[0.025, 0.025, 1.6, 8]} />
          <meshBasicMaterial color={ray.color} />
        </mesh>
      ))}
      <gridHelper args={[6, 6, '#38bdf8', '#334155']} position={[0, -1.4, 0]} />
    </group>
  );
}

// ---------------- 16. ISOMETRIC GEARS & TRANSMISSION (TECH DRAWING / BASIC TECH) ----------------
function IsometricGears({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const gear1Ref = useRef<THREE.Group>(null!);
  const gear2Ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 2.0;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 1.0;
  });

  return (
    <group ref={groupRef}>
      {/* Isometric Reference Datum Block */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[3.0, 0.3, 1.5]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Driving Pinion Gear (Small Blue) */}
      <group ref={gear1Ref} position={[-0.7, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 18]} />
          <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.2} wireframe={wireframe} />
        </mesh>
      </group>
      {/* Driven Bull Gear (Large Green) */}
      <group ref={gear2Ref} position={[0.7, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.3, 24]} />
          <meshStandardMaterial color="#10b981" metalness={0.7} roughness={0.2} wireframe={wireframe} />
        </mesh>
      </group>
      {/* Transmission Shafts */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------- 17. SANCTUARY ARK & SCRIPTURE LECTERN (CRS / IRS) ----------------
function SanctuaryArk({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Gilded Golden Chest / Ark */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.2, 1.1, 1.3]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Gold Mercy Seat Lid */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[2.3, 0.15, 1.4]} />
        <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Cherubim Wings Extending Inward */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.85, 0]} rotation={[0, 0, i === 0 ? -0.4 : 0.4]}>
          <boxGeometry args={[0.15, 0.8, 0.9]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Carrying Poles */}
      {[-0.8, 0.8].map((z, i) => (
        <mesh key={i} position={[0, -0.2, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.4, 16]} />
          <meshStandardMaterial color="#b45309" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------- 18. ARTICULATED BIOMECHANICAL JOINT (PHE / BIOLOGY) ----------------
function HumanSkeleton({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const jointRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.0;
    if (jointRef.current) {
      jointRef.current.rotation.z = Math.sin(t) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Proximal Bone (Femur Shaft) */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 1.5, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} wireframe={wireframe} />
      </mesh>
      {/* Synovial Ball-and-Socket Joint Capsule */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Articulated Distal Bone (Tibia) */}
      <group ref={jointRef} position={[0, 0, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.18, 0.15, 1.5, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Agonist Flexor Muscular Cable */}
        <mesh position={[-0.3, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.9, 12]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} />
        </mesh>
        {/* Tendon Insertion Attachment */}
        <mesh position={[-0.25, -0.85, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>
      <gridHelper args={[5, 5, '#dc2626', '#334155']} position={[0, -1.8, 0]} />
    </group>
  );
}

// ---------------- PROCEDURAL SCENE SWITCHER (COVERS 100% OF SUBJECTS) ----------------
function ProceduralScene({ modelType, wireframe }: { modelType: string; wireframe: boolean }) {
  const norm = (modelType || '').toLowerCase().trim();
  switch (norm) {
    case 'geometry_cube':
    case 'cube':
    case 'polyhedron':
    case 'generic':
      return <GeometryCube wireframe={wireframe} />;
    case 'solar_system':
    case 'solar':
    case 'planets':
      return <SolarSystem wireframe={wireframe} />;
    case 'heart_model':
    case 'heart':
      return <HeartModel wireframe={wireframe} />;
    case 'dna_helix':
    case 'dna':
      return <DnaHelix wireframe={wireframe} />;
    case 'atom_model':
    case 'atom':
      return <AtomModel wireframe={wireframe} />;
    case 'plant_cell':
    case 'cell':
      return <PlantCell wireframe={wireframe} />;
    case 'electric_motor':
    case 'motor':
      return <ElectricMotor wireframe={wireframe} />;
    case 'earth_globe':
    case 'globe':
      return <EarthGlobe wireframe={wireframe} />;
    case 'market_equilibrium':
    case 'market':
    case 'supply_demand_3d':
      return <MarketEquilibrium wireframe={wireframe} />;
    case 'civic_mace':
    case 'mace':
    case 'justice_scales':
      return <CivicMace wireframe={wireframe} />;
    case 'talking_drum':
    case 'drum':
    case 'gangan':
      return <TalkingDrum wireframe={wireframe} />;
    case 'benin_bronze':
    case 'bronze':
    case 'sculpture':
      return <BeninBronze wireframe={wireframe} />;
    case 'printing_press':
    case 'press':
    case 'codex':
      return <PrintingPress wireframe={wireframe} />;
    case 'soil_profile':
    case 'soil':
      return <SoilProfile wireframe={wireframe} />;
    case 'optics_prism':
    case 'prism':
      return <OpticsPrism wireframe={wireframe} />;
    case 'isometric_gears':
    case 'gears':
      return <IsometricGears wireframe={wireframe} />;
    case 'sanctuary_ark':
    case 'ark':
      return <SanctuaryArk wireframe={wireframe} />;
    case 'human_skeleton':
    case 'skeleton':
    case 'joint':
      return <HumanSkeleton wireframe={wireframe} />;
    default:
      return <GeometryCube wireframe={wireframe} />;
  }
}

const PERSPECTIVES = [
  'Sagittal / Longitudinal Cross-Section Cutaway',
  'Exploded Structural Assembly & Internal Components',
  'Microscopic Cellular & Molecular Architecture',
  'Isometric 3D Projection with Vector Normal Coordinates',
  'High-Yield WAEC Practical Examination Schematic'
];

// ---------------- MAIN VISUAL AID VIEWER COMPONENT ----------------
export const VisualAidViewer: React.FC<VisualAidViewerProps> = ({
  modelType = 'geometry_cube',
  topicTitle = 'Classroom Visual Aid (3D Interactive Model)',
  subject = 'Science',
  level = 'jss-1',
  userTier,
  onModelChange,
  onOpenUpgrade
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tierCfg = resolveTierConfig(userTier);
  const isGoldEligible = tierCfg.has3DAccess;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeModel, setActiveModel] = useState(modelType);
  const [displayMode, setDisplayMode] = useState<'3d' | '2d'>(isGoldEligible ? '3d' : '2d');
  const [perspectiveIndex, setPerspectiveIndex] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratedNotice, setRegeneratedNotice] = useState<string | null>(null);

  // Phase 5 Paywall Gate Modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState('This feature is available on the Gold Tier. Upgrade now.');

  // Dynamic schematic data from AI generator or statutory registry
  const [currentPerspective, setCurrentPerspective] = useState<string>(PERSPECTIVES[0]);
  const [activeLabels, setActiveLabels] = useState<{ name: string; x: number; y: number; description?: string }[]>([
    { name: 'Anterior Superior Axis', x: 25, y: 30, description: 'Upper dorsal structural boundary' },
    { name: 'Central Functional Zone', x: 50, y: 50, description: 'Core operational mechanism' },
    { name: 'Posterior Ventral Margin', x: 75, y: 70, description: 'Lower structural termination' }
  ]);
  const [activeSvg, setActiveSvg] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<{ name: string; x: number; y: number; description?: string } | null>(null);

  // Asset Library Browser Modal
  const [showAssetBrowser, setShowAssetBrowser] = useState(false);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');

  // Synchronize when external props change or subject updates
  useEffect(() => {
    const bestModel = getBestModelForSubject(subject, topicTitle);
    const targetModel = modelType || bestModel;
    setActiveModel(targetModel);

    // Also populate statutory 2D vector schematic if activeSvg is null
    const bestAsset = getBestAssetForSubject(subject, topicTitle);
    if (bestAsset) {
      if (!activeSvg) setActiveSvg(bestAsset.svgContent);
      if (bestAsset.labels && bestAsset.labels.length > 0) {
        setActiveLabels(bestAsset.labels);
      }
    }
  }, [subject, topicTitle, modelType]);

  // Fallback to 2D mode if client environment has no WebGL capabilities
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setDisplayMode('2d');
    }
  }, []);

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

  const handleSwitchTo3D = () => {
    const tierCfg = resolveTierConfig(userTier);
    if (!tierCfg.has3DAccess) {
      const msg = 'Interactive 3D Visual Aids are reserved exclusively for Gold School (₦250,000/term) and State Ministry Platinum tiers.';
      if (onOpenUpgrade) {
        onOpenUpgrade(msg, 'b2b_gold', '3D Visual Lab Locked');
      } else {
        setUpgradeMessage(msg);
        setShowUpgradeModal(true);
      }
      return;
    }
    setDisplayMode('3d');
  };

  /**
   * Phase 3 & 5 Mandate: "Regenerate triggers fresh AI call with
   * 'generate a different perspective or schematic of this topic' — with strict tier gating"
   */
  const handleRegeneratePerspective = async () => {
    const tierCfg = resolveTierConfig(userTier);
    if (displayMode === '3d' && !tierCfg.has3DAccess) {
      const msg = 'Interactive 3D Visual Aid generation is available on the Gold School Tier (₦250,000/term) and State Platinum Tier.';
      if (onOpenUpgrade) {
        onOpenUpgrade(msg, 'b2b_gold', '3D Visual Lab Locked');
      } else {
        setUpgradeMessage(msg);
        setShowUpgradeModal(true);
      }
      return;
    }

    setIsRegenerating(true);
    setRegeneratedNotice(null);

    const nextIndex = (perspectiveIndex + 1) % PERSPECTIVES.length;
    setPerspectiveIndex(nextIndex);
    const targetPerspective = PERSPECTIVES[nextIndex];

    try {
      const response = await fetch('/api/ai/generate-diagram', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          topic: topicTitle || currentInfo.label,
          subject,
          level,
          perspective: targetPerspective,
          prompt: 'generate a different perspective or schematic of this topic',
          type: displayMode,
          tier: userTier,
        })
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          const errData = await response.json().catch(() => ({}));
          const msg = errData.message || errData.error || 'This feature is available on the Gold Tier. Upgrade now.';
          if (onOpenUpgrade) {
            onOpenUpgrade(msg, errData.requiredTier || 'b2b_gold', 'Upgrade Required');
          } else {
            setUpgradeMessage(msg);
            setShowUpgradeModal(true);
          }
          setIsRegenerating(false);
          return;
        }
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.diagram) {
        const d = resData.diagram;
        setCurrentPerspective(d.perspective || targetPerspective);
        if (d.labels && Array.isArray(d.labels)) {
          setActiveLabels(d.labels);
        }
        if (d.svgContent) {
          setActiveSvg(d.svgContent);
        }
        if (d.model3D) {
          handleModelSelect(d.model3D);
        }
        setRegeneratedNotice(`Perspective Regenerated: ${d.perspective || targetPerspective}`);
      }
    } catch (err) {
      console.warn('AI diagram generation fallback to local statutory perspective shift', err);
      // Seamless statutory fallback: rotate coordinates and shift perspective
      setCurrentPerspective(targetPerspective);
      setActiveLabels([
        { name: `${targetPerspective} Axis 1`, x: 30 + ((nextIndex * 7) % 30), y: 35, description: 'Anterior perspective view' },
        { name: `${targetPerspective} Core Area`, x: 50, y: 55, description: 'High-yield practical focus' },
        { name: `${targetPerspective} Transverse Boundary`, x: 70 - ((nextIndex * 5) % 20), y: 75, description: 'Lateral structural boundary' }
      ]);
      setRegeneratedNotice(`Switched Perspective: ${targetPerspective}`);
    } finally {
      setIsRegenerating(false);
      setTimeout(() => setRegeneratedNotice(null), 4000);
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
      subject: 'Basic Science / Geography / Physics',
      teachingPrompt: 'Demonstrate Keplerian orbits around the Sun. Have students identify terrestrial vs gas giant planets.'
    },
    heart_model: {
      label: '4-Chambered Pulsating Human Heart',
      subject: 'Biology / Health Science',
      teachingPrompt: 'Observe the systolic contraction. Trace deoxygenated blood through vena cava vs oxygenated output through the aorta.'
    },
    dna_helix: {
      label: 'Double Helix & Nitrogenous Base Pairs',
      subject: 'Biology / Agricultural Science / Genetics',
      teachingPrompt: 'Explain Watson-Crick base pairing (A-T & G-C) along the sugar-phosphate backbone ladder.'
    },
    atom_model: {
      label: 'Bohr-Rutherford Atomic Shell & Electron Orbitals',
      subject: 'Chemistry / Physical Science',
      teachingPrompt: 'Discuss protons/neutrons in the dense nucleus vs quantized electron probabilities across energy levels (K, L, M).'
    },
    plant_cell: {
      label: 'Eukaryotic Plant Cell with Vacuole & Chloroplasts',
      subject: 'Agricultural Science / Biology',
      teachingPrompt: 'Highlight the rigid cellulose cell wall and photosynthetic chloroplasts that distinguish plant from animal cells.'
    },
    electric_motor: {
      label: 'DC Electric Motor, Stator Magnets & Rotating Armature',
      subject: 'Physics / Basic Technology',
      teachingPrompt: 'Illustrate Fleming’s Left-Hand Rule: how magnetic flux interacting with armature current produces continuous rotational torque.'
    },
    earth_globe: {
      label: '3D Rotating Terrestrial Globe with Nigerian Coordinates',
      subject: 'Geography / Social Studies',
      teachingPrompt: 'Trace the Equator, Prime Meridian, and point out Nigeria (9° N, 8° E) to discuss tropical West African climate zones.'
    },
    market_equilibrium: {
      label: '3D Supply-Demand Equilibrium & Balogun Trade Model',
      subject: 'Economics / Commerce / Financial Accounting',
      teachingPrompt: 'Explain how intersection of downward demand and upward supply clears the market without surplus or shortage.'
    },
    civic_mace: {
      label: 'National Assembly Mace & Scales of Constitutional Justice',
      subject: 'Civic Education / Government / Social Studies',
      teachingPrompt: 'Demonstrate that the legislative mace symbolizes democratic sovereignty, paired with impartial Rule of Law.'
    },
    talking_drum: {
      label: 'Nigerian Talking Drum (Gángan / Igba / Kalangu)',
      subject: 'Èdè Yorùbá / Asụsụ Igbo / Harshen Hausa / Music',
      teachingPrompt: 'Show how modulating tension strings replicates the phonemic high (á), mid (a), and low (à) tones in Nigerian speech.'
    },
    benin_bronze: {
      label: 'Benin Royal Bronze Head & Cultural Heritage Sculpture',
      subject: 'Cultural & Creative Arts / History',
      teachingPrompt: 'Discuss the 16th-century cire perdue (lost-wax) metallurgical casting technique developed in ancient Benin.'
    },
    printing_press: {
      label: 'Literary Printing Press & Illuminated Lexical Codex',
      subject: 'English Studies / Literature in English',
      teachingPrompt: 'Connect the mechanization of movable type to the democratization of orthography, grammar rules, and Shakespearean drama.'
    },
    soil_profile: {
      label: '3D Soil Profile Horizon Monolith (O, A, B, C/R Layers)',
      subject: 'Agricultural Science',
      teachingPrompt: 'Point out organic humus (O), topsoil root zone (A), mineral subsoil (B), and bedrock (C/R) to explain soil fertility conservation.'
    },
    optics_prism: {
      label: 'Triangular Glass Prism & Visible Spectral Dispersion',
      subject: 'Physics / Basic Science',
      teachingPrompt: 'Demonstrate Snell’s law: higher-frequency violet light experiences greater refractive deviation than lower-frequency red light.'
    },
    isometric_gears: {
      label: 'Interlocking Engineering Spur Gears & Isometric Datum',
      subject: 'Technical Drawing / Basic Technology',
      teachingPrompt: 'Calculate velocity ratios and demonstrate how involute tooth profiles transmit mechanical torque without slip.'
    },
    sanctuary_ark: {
      label: 'Sacred Sanctuary Ark & Scripture Lectern Realia',
      subject: 'Christian / Islamic Religious Studies (CRS / IRS)',
      teachingPrompt: 'Examine sacred moral covenants as the ethical foundation for civil integrity and anti-corruption in Nigerian society.'
    },
    human_skeleton: {
      label: 'Articulated Biomechanical Joint & Skeletal Fulcrum',
      subject: 'Physical & Health Education (PHE) / Biology',
      teachingPrompt: 'Identify the 3 classes of skeletal levers (fulcrum, effort, load) in athletic locomotion and joint posture.'
    }
  };

  const currentInfo = modelDescriptions[activeModel] || modelDescriptions.geometry_cube;
  const filteredAssets = searchAssets(assetSearchQuery);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'w-screen h-screen rounded-none z-50 p-6' : 'w-full'
      }`}
    >
      {/* Top Projector Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Phase 3 Schematic & 3D Lab
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                {displayMode === '3d' ? 'WebGL 60FPS' : '2D Coordinate Schematic'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>{currentInfo.label}</span>
              <span className="text-[11px] font-medium text-emerald-300/80 italic">({currentPerspective})</span>
            </h3>
          </div>
        </div>

        {/* Action Controls & Mode Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800">
          {/* 3D vs 2D Mode Switcher */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl mr-1 text-xs">
            <button
              type="button"
              onClick={handleSwitchTo3D}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                displayMode === '3d' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Realia
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('2d')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                displayMode === '2d' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              2D Schematic
            </button>
          </div>

          {/* Phase 3 Mandate: Fresh AI Perspective Regenerator Button */}
          <button
            type="button"
            disabled={isRegenerating}
            onClick={handleRegeneratePerspective}
            title="Generate a different perspective or schematic of this topic"
            className="px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-900/30 transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating Perspective...' : '⚡ Regenerate Perspective'}</span>
          </button>

          {/* Asset Library Browser Button */}
          <button
            type="button"
            onClick={() => setShowAssetBrowser(true)}
            title="Browse 50+ Statutory Curriculum Assets"
            className="px-2.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Asset Registry</span>
          </button>

          {displayMode === '3d' && (
            <>
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle Auto Rotation"
                className={`px-2 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1 transition-colors ${
                  autoRotate ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">Rotate</span>
              </button>

              <button
                type="button"
                onClick={() => setWireframe(!wireframe)}
                title="Toggle Wireframe & Internal Geometry"
                className={`px-2 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1 transition-colors ${
                  wireframe ? 'bg-indigo-600/40 text-indigo-200 border border-indigo-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Wireframe</span>
              </button>
            </>
          )}

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

      {/* Regenerated Perspective Success Toast */}
      {regeneratedNotice && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-2xl bg-emerald-900/90 text-emerald-100 border border-emerald-500/50 shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{regeneratedNotice}</span>
        </div>
      )}

      {/* Main Canvas / Visual Aid Area */}
      <div className={`relative w-full bg-radial from-slate-900 to-slate-950 ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[380px] sm:h-[450px]'}`}>
        {displayMode === '3d' ? (
          /* 3D WebGL Canvas via react-three-fiber with CanvasErrorBoundary fallback */
          <CanvasErrorBoundary
            fallback={(errorMsg) => (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="text-sm font-bold text-white">Hardware 2D Pedagogical Mode Active</h4>
                  <p className="text-xs text-slate-300">
                    WebGL context is restricted in this client environment. Displaying statutory high-resolution 2D coordinate schematic for {subject}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDisplayMode('2d')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  View Interactive 2D Schematic
                </button>
              </div>
            )}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <p className="text-xs font-semibold">Synthesizing 3D Realia Visual Aid for {subject}...</p>
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 1.5, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
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

            {/* Interactive Coordinate Label Pins Overlay in 3D Mode */}
            <div className="absolute inset-0 pointer-events-none">
              {activeLabels.map((lbl, idx) => (
                <div
                  key={idx}
                  style={{ left: `${lbl.x}%`, top: `${lbl.y}%` }}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => setSelectedLabel(lbl)}
                >
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-emerald-500/60 shadow-lg text-[10px] font-bold text-emerald-300 hover:bg-emerald-900 hover:border-emerald-400 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{lbl.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CanvasErrorBoundary>
        ) : (
          /* 2D Coordinate Schematic Viewer */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
            <div className="relative max-w-2xl w-full h-full flex items-center justify-center">
              {activeSvg || getBestAssetForSubject(subject, topicTitle)?.svgContent ? (
                <div
                  className="w-full h-full flex items-center justify-center max-h-[360px]"
                  dangerouslySetInnerHTML={{ __html: activeSvg || getBestAssetForSubject(subject, topicTitle)?.svgContent || '' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center max-h-[360px]">
                  {/* Default fallback SVG based on model */}
                  <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[340px]">
                    <rect width="100%" height="100%" fill="#0f172a" rx="16"/>
                    <circle cx="250" cy="160" r="100" fill="#064e3b" stroke="#10b981" strokeWidth="3"/>
                    <ellipse cx="250" cy="160" rx="120" ry="60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4"/>
                    <text x="250" y="165" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                      {topicTitle || currentInfo.label}
                    </text>
                  </svg>
                </div>
              )}

              {/* Pinpoint Clickable Labels Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {activeLabels.map((lbl, idx) => (
                  <div
                    key={idx}
                    style={{ left: `${lbl.x}%`, top: `${lbl.y}%` }}
                    className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    onClick={() => setSelectedLabel(lbl)}
                  >
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400 shadow-xl text-xs font-bold text-emerald-200 hover:scale-105 hover:bg-emerald-900 transition-all">
                      <MousePointerClick className="w-3 h-3 text-emerald-400" />
                      <span>{lbl.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Label Pedagogical Explainer Popover */}
        {selectedLabel && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 p-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md text-xs text-white z-30 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2">
              <strong className="text-emerald-300 font-extrabold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{selectedLabel.name}</span>
              </strong>
              <button
                type="button"
                onClick={() => setSelectedLabel(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-300 mt-1 leading-relaxed">
              {selectedLabel.description || 'Key statutory curriculum feature examined in WAEC and BECE practical examinations.'}
            </p>
            <span className="block text-[10px] text-emerald-400/80 mt-1.5 font-semibold">
              Coordinates: X: {selectedLabel.x}%, Y: {selectedLabel.y}%
            </span>
          </div>
        )}
      </div>

      {/* Quick Model Selector Pills Across All Subjects */}
      <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap pl-2 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preset Realia:</span>
        </span>
        {[
          { id: 'geometry_cube', label: 'Geometry Cube', icon: '📐', sub: 'Mathematics' },
          { id: 'heart_model', label: 'Human Heart', icon: '🫀', sub: 'Biology' },
          { id: 'dna_helix', label: 'DNA Helix', icon: '🧬', sub: 'Biology/Agric' },
          { id: 'plant_cell', label: 'Plant Cell', icon: '🌿', sub: 'Biology/Agric' },
          { id: 'atom_model', label: 'Atom & Orbitals', icon: '⚛️', sub: 'Chemistry' },
          { id: 'electric_motor', label: 'DC Electric Motor', icon: '⚡', sub: 'Physics/Tech' },
          { id: 'optics_prism', label: 'Optical Prism', icon: '🌈', sub: 'Physics' },
          { id: 'solar_system', label: 'Solar System', icon: '🪐', sub: 'Basic Science' },
          { id: 'earth_globe', label: 'Earth Globe (9°N, 8°E)', icon: '🌍', sub: 'Geography' },
          { id: 'market_equilibrium', label: 'Balogun Trade Equilibrium', icon: '📊', sub: 'Economics/Commerce' },
          { id: 'civic_mace', label: 'National Assembly Mace', icon: '⚖️', sub: 'Civic/Government' },
          { id: 'talking_drum', label: 'Talking Drum (Gàngan)', icon: '🪘', sub: 'Yorùbá/Igbo/Hausa' },
          { id: 'benin_bronze', label: 'Benin Royal Bronze', icon: '🗿', sub: 'Cultural Arts' },
          { id: 'printing_press', label: 'Printing Press & Codex', icon: '📜', sub: 'English/Literature' },
          { id: 'soil_profile', label: 'Soil Profile Horizon', icon: '🌾', sub: 'Agricultural Science' },
          { id: 'isometric_gears', label: 'Isometric Spur Gears', icon: '⚙️', sub: 'Technical Drawing' },
          { id: 'sanctuary_ark', label: 'Sanctuary Ark Lectern', icon: '🕊️', sub: 'CRS / IRS' },
          { id: 'human_skeleton', label: 'Biomechanical Joint', icon: '🦴', sub: 'PHE / Anatomy' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleModelSelect(item.id)}
            title={`Subject: ${item.sub}`}
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
            <span className="text-slate-400">Classroom Projection Guidance ({currentPerspective})</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{currentInfo.teachingPrompt}</p>
          <p className="text-[11px] text-slate-500 pt-0.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" />
            <span>Interactive gesture: Click & drag to rotate • Scroll/pinch to zoom • Click labeled pins to inspect details.</span>
          </p>
        </div>
      </div>

      {/* Phase 3 Asset Registry Library Modal */}
      {showAssetBrowser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Curriculum Asset Registry (50+ Labeled Schematics)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select any statutory 2D/3D schematic across all Nigerian secondary subjects.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAssetBrowser(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={assetSearchQuery}
                  onChange={(e) => setAssetSearchQuery(e.target.value)}
                  placeholder="Search schematics by topic, subject, or keyword (e.g. Heart, Circuit, Pythagoras, Yoruba)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-800 text-xs text-white rounded-xl border border-slate-700 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Assets List */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      const tierCfg = resolveTierConfig(userTier);
                      if (asset.model3DKey && tierCfg.has3DAccess) {
                        handleModelSelect(asset.model3DKey);
                        setDisplayMode('3d');
                      } else {
                        setDisplayMode('2d');
                      }
                      setActiveSvg(asset.svgContent);
                      setActiveLabels(asset.labels);
                      setCurrentPerspective(asset.perspective || 'Standard View');
                      setShowAssetBrowser(false);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 uppercase">
                        {asset.subject}
                      </span>
                      <span className="text-slate-400 font-semibold">{asset.type.toUpperCase()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {asset.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {asset.description}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400/80 pt-1 font-semibold">
                      <span>{asset.labels.length} labeled features</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 5 Paywall Upgrade Modal for 3D Visual Aids */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        message={upgradeMessage}
        requiredTier="b2b_gold"
      />
    </div>
  );
};
