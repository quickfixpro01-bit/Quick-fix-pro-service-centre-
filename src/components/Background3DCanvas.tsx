import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const Background3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL vs hardware GPU
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.035); // Soft slate-50 fog transition

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x3b82f6, 2.5); // Vibrant Blue Key Light
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 1.2); // Cool sky / dark ground fill
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x10b981, 2, 20); // Emerald Rim Accent
    rimLight.position.set(-8, -5, -4);
    scene.add(rimLight);

    // 5. Procedural 3D Objects Group (Appliance Gears, Shield, Spanner, Crystals)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Material 1: Brushed Chrome / Blue Metallic
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    // Material 2: Emerald Gold Metallic
    const emeraldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.6,
    });

    // Material 3: Metallic Platinum Accent
    const platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.15,
    });

    // Helper: Create Procedural 3D Gear Mesh
    const createGearGeometry = (teeth = 12, innerRadius = 0.8, outerRadius = 1.2, thickness = 0.3) => {
      const shape = new THREE.Shape();
      const toothAngle = (Math.PI * 2) / teeth;

      for (let i = 0; i < teeth; i++) {
        const angle = i * toothAngle;
        const nextAngle = angle + toothAngle * 0.4;
        const tipAngle = angle + toothAngle * 0.6;
        const endAngle = (i + 1) * toothAngle;

        const r1 = innerRadius;
        const r2 = outerRadius;

        if (i === 0) {
          shape.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        } else {
          shape.lineTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        }

        shape.lineTo(Math.cos(nextAngle) * r2, Math.sin(nextAngle) * r2);
        shape.lineTo(Math.cos(tipAngle) * r2, Math.sin(tipAngle) * r2);
        shape.lineTo(Math.cos(endAngle) * r1, Math.sin(endAngle) * r1);
      }

      // Add center hole
      const holePath = new THREE.Path();
      const holeRadius = innerRadius * 0.5;
      holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      return new THREE.ExtrudeGeometry(shape, {
        depth: thickness,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05,
      });
    };

    // Mesh 1: Large Primary Blue Gear (Top Right)
    const gear1Geo = createGearGeometry(14, 1.2, 1.8, 0.4);
    const gear1 = new THREE.Mesh(gear1Geo, chromeMaterial);
    gear1.position.set(5.5, 3.5, -2);
    objectsGroup.add(gear1);

    // Mesh 2: Secondary Emerald Gear (Bottom Left)
    const gear2Geo = createGearGeometry(10, 0.8, 1.2, 0.3);
    const gear2 = new THREE.Mesh(gear2Geo, emeraldMaterial);
    gear2.position.set(-6, -4, -1);
    objectsGroup.add(gear2);

    // Mesh 3: 3D Shield Emblem (Center Floating)
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.2);
    shieldShape.quadraticCurveTo(1.0, 1.0, 1.0, -0.2);
    shieldShape.quadraticCurveTo(0.7, -1.0, 0, -1.5);
    shieldShape.quadraticCurveTo(-0.7, -1.0, -1.0, -0.2);
    shieldShape.quadraticCurveTo(-1.0, 1.0, 0, 1.2);

    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    const shield = new THREE.Mesh(shieldGeo, platinumMaterial);
    shield.position.set(-5, 4, -3);
    objectsGroup.add(shield);

    // Mesh 4: 3D Floating Torus Rings (Orbiting Tech Accents)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.08, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
    ring1.position.set(6, -3, -2);
    objectsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.06, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, emeraldMaterial);
    ring2.position.set(-4, -1, -4);
    objectsGroup.add(ring2);

    // Floating Particles Field
    const particlesCount = 80;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 25;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 6. Scroll & Mouse Tracking Logic
    let targetScrollY = 0;
    let currentScrollY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Exponential Damping
    const clock = new THREE.Clock();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScrollY = THREE.MathUtils.damp(currentScrollY, targetScrollY, 6, delta);
      const scrollProgress = currentScrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      // Rotate gears and objects continuously + scroll boost
      gear1.rotation.z = elapsed * 0.2 + scrollProgress * Math.PI * 2;
      gear1.rotation.x = Math.sin(elapsed * 0.5) * 0.1;

      gear2.rotation.z = -elapsed * 0.3 - scrollProgress * Math.PI * 3;
      gear2.rotation.y = Math.cos(elapsed * 0.4) * 0.15;

      shield.rotation.y = elapsed * 0.4 + scrollProgress * Math.PI * 1.5;
      shield.position.y = 4 + Math.sin(elapsed * 1.2) * 0.3;

      ring1.rotation.x = elapsed * 0.5;
      ring1.rotation.y = elapsed * 0.3;

      ring2.rotation.x = -elapsed * 0.4;
      ring2.rotation.z = elapsed * 0.2;

      particleSystem.rotation.y = elapsed * 0.05 + scrollProgress * 0.5;

      // Scroll-driven Camera Movement (glides downward and tilts scene)
      camera.position.y = -scrollProgress * 8;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseX * 0.8, 4, delta);
      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -mouseY * 0.05, 4, delta);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries, materials, and renderer
      gear1Geo.dispose();
      gear2Geo.dispose();
      shieldGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      particlesGeo.dispose();

      chromeMaterial.dispose();
      emeraldMaterial.dispose();
      platinumMaterial.dispose();
      particlesMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 sm:opacity-50 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
