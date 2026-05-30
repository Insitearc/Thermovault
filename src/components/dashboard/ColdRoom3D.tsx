"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ColdRoom3DProps {
  doorOpen: boolean;
  compressorActive: boolean;
  temperature: number;
}

export default function ColdRoom3D({
  doorOpen,
  compressorActive,
  temperature,
}: ColdRoom3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // References to track state changes without rebuilding the Three.js scene
  const doorOpenRef = useRef(doorOpen);
  const compressorActiveRef = useRef(compressorActive);
  const temperatureRef = useRef(temperature);

  useEffect(() => {
    doorOpenRef.current = doorOpen;
  }, [doorOpen]);

  useEffect(() => {
    compressorActiveRef.current = compressorActive;
  }, [compressorActive]);

  useEffect(() => {
    temperatureRef.current = temperature;
  }, [temperature]);

  // References to animate in the loop
  const doorHingeRef = useRef<THREE.Group | null>(null);
  const fanRef = useRef<THREE.Mesh | null>(null);
  const statusLightRef = useRef<THREE.Mesh | null>(null);
  const sensorGlowRef = useRef<THREE.Mesh | null>(null);
  const panelMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c, 0x23, 0x40); // Matches --color-navy

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x0c2340, 0.05);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 5, 8);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear container and append canvas
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below floor
    controls.minDistance = 4;
    controls.maxDistance = 15;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(10, 15, 10);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.camera.near = 0.5;
    dirLight1.shadow.camera.far = 25;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x1d9e75, 0.3); // Teal light reflection
    dirLight2.position.set(-10, 5, -10);
    scene.add(dirLight2);

    // Blue light from inside the cold room (simulates cooling)
    const interiorLight = new THREE.PointLight(0x00aaff, 1, 4);
    interiorLight.position.set(0, 0, 0);
    scene.add(interiorLight);

    // 6. Ground Helper / Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x1d9e75, 0x185fa5);
    gridHelper.position.y = -1.5;
    // @ts-ignore
    gridHelper.material.opacity = 0.15;
    // @ts-ignore
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 7. Render Cold Room Assembly (Group)
    const coldRoomGroup = new THREE.Group();

    // 7.1 PUF Panels (Main Room Box)
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x22334e,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.95,
    });
    panelMaterialRef.current = panelMaterial;

    const roomGeometry = new THREE.BoxGeometry(4, 2.5, 3);
    const roomMesh = new THREE.Mesh(roomGeometry, panelMaterial);
    roomMesh.castShadow = true;
    roomMesh.receiveShadow = true;
    coldRoomGroup.add(roomMesh);

    // Outline / joints overlay (Subtle wireframe model for engineered look)
    const edges = new THREE.EdgesGeometry(roomGeometry);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1d9e75, linewidth: 2 });
    const lineSegments = new THREE.LineSegments(edges, lineMat);
    coldRoomGroup.add(lineSegments);

    // 7.2 The Insulated Hinge Door
    const doorHinge = new THREE.Group();
    // Position the hinge group at the front-right edge of the room (Pivot point)
    doorHinge.position.set(2, -1.25, 1.5); 
    doorHingeRef.current = doorHinge;

    // Door Panel Mesh (offset relative to pivot so it swings realistically)
    const doorWidth = 1.2;
    const doorHeight = 2.2;
    const doorDepth = 0.15;
    const doorGeom = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
    // Shift door mesh so its right edge aligns with hinge, and sits slightly in front of the wall to prevent clipping
    doorGeom.translate(-doorWidth / 2, doorHeight / 2, doorDepth / 2 + 0.01);

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x185fa5, // Medium Navy
      roughness: 0.3,
      metalness: 0.7,
    });
    const doorMesh = new THREE.Mesh(doorGeom, doorMaterial);
    doorMesh.castShadow = true;
    doorMesh.receiveShadow = true;
    doorHinge.add(doorMesh);

    // Add a modern handle to the door
    const handleGeom = new THREE.BoxGeometry(0.04, 0.6, 0.04);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const handleMesh = new THREE.Mesh(handleGeom, handleMat);
    // Position handle on the left side of the door (opposite of the right-edge hinge)
    handleMesh.position.set(-doorWidth + 0.1, doorHeight / 2, doorDepth + 0.02);
    doorHinge.add(handleMesh);

    coldRoomGroup.add(doorHinge);

    // 7.3 Outdoor Compressor / Condensing Unit (Mounted on top)
    const compressorGroup = new THREE.Group();
    compressorGroup.position.set(-1.0, 1.45, 0);

    // Base housing
    const compBoxGeom = new THREE.BoxGeometry(1.2, 0.6, 0.8);
    const compBoxMat = new THREE.MeshStandardMaterial({ color: 0x9ea8b3, metalness: 0.9, roughness: 0.2 });
    const compBox = new THREE.Mesh(compBoxGeom, compBoxMat);
    compBox.castShadow = true;
    compressorGroup.add(compBox);

    // Fan Grill / Cutout
    const grillGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 16);
    grillGeom.rotateX(Math.PI / 2);
    const grillMat = new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.5 });
    const grill = new THREE.Mesh(grillGeom, grillMat);
    grill.position.set(0.3, 0, 0.4);
    compressorGroup.add(grill);

    // Fan Blades (inside grill)
    const fanGroup = new THREE.Group();
    const bladeGeom = new THREE.BoxGeometry(0.4, 0.04, 0.02);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
    const blade1 = new THREE.Mesh(bladeGeom, bladeMat);
    const blade2 = blade1.clone();
    blade2.rotation.z = Math.PI / 2;
    fanGroup.add(blade1);
    fanGroup.add(blade2);
    fanGroup.position.set(0.3, 0, 0.41);
    // @ts-ignore
    fanRef.current = fanGroup;
    compressorGroup.add(fanGroup);

    // Status indicator LED light on compressor
    const ledGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const led = new THREE.Mesh(ledGeom, ledMat);
    led.position.set(-0.4, 0.15, 0.41);
    statusLightRef.current = led;
    compressorGroup.add(led);

    coldRoomGroup.add(compressorGroup);

    // 7.4 Floating Temperature Sensor Beacon Inside
    const sensorGroup = new THREE.Group();
    sensorGroup.position.set(0, 0, 0);

    const sensorGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      emissive: 0x0044aa,
      roughness: 0.1,
    });
    const sensorNode = new THREE.Mesh(sensorGeom, sensorMat);
    sensorGroup.add(sensorNode);

    // Pulsing halo outer ring
    const haloGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const haloNode = new THREE.Mesh(haloGeom, haloMat);
    sensorGlowRef.current = haloNode;
    sensorGroup.add(haloNode);

    coldRoomGroup.add(sensorGroup);

    scene.add(coldRoomGroup);

    // Adjust global group height off ground
    coldRoomGroup.position.y = 0.25;

    // 8. Animation & Render Loop
    let lastTime = 0;
    const animate = (time: number) => {
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // 8.1 Door swinging interpolation (lerp)
      if (doorHingeRef.current) {
        // Swing outward (positive rotation angle around Y axis) when doorOpen is true
        const targetRotation = doorOpenRef.current ? Math.PI / 1.8 : 0;
        doorHingeRef.current.rotation.y +=
          (targetRotation - doorHingeRef.current.rotation.y) * 5 * delta;
      }

      // 8.2 Compressor Fan rotation & pulsing status light
      if (fanRef.current) {
        if (compressorActiveRef.current) {
          fanRef.current.rotation.z += 15 * delta; // Spin fast
          if (statusLightRef.current) {
            // @ts-ignore
            statusLightRef.current.material.color.setHex(0x1d9e75); // Vibrant Teal active
          }
        } else {
          // Slowly bring fan to stop
          fanRef.current.rotation.z += (0 - fanRef.current.rotation.z) * 2 * delta;
          if (statusLightRef.current) {
            // @ts-ignore
            statusLightRef.current.material.color.setHex(0xff3344); // Red inactive
          }
        }
      }

      // 8.3 Pulse the sensor light and scale based on time
      if (sensorGlowRef.current) {
        const pulse = 1 + Math.sin(time * 0.005) * 0.2;
        sensorGlowRef.current.scale.set(pulse, pulse, pulse);

        // Adjust sensor color based on actual temperature
        const mat = sensorNode.material as THREE.MeshStandardMaterial;
        const glowMat = sensorGlowRef.current.material as THREE.MeshBasicMaterial;

        if (temperatureRef.current < -10) {
          mat.color.setHex(0x0055ff);
          mat.emissive.setHex(0x002288);
          glowMat.color.setHex(0x0055ff);
        } else if (temperatureRef.current < 5) {
          mat.color.setHex(0x00eeff);
          mat.emissive.setHex(0x0055aa);
          glowMat.color.setHex(0x00eeff);
        } else {
          mat.color.setHex(0xffaa00);
          mat.emissive.setHex(0xaa4400);
          glowMat.color.setHex(0xffaa00);
        }
      }

      // 8.4 Color the outer walls slightly based on temperature
      if (panelMaterialRef.current) {
        if (temperatureRef.current > 5) {
          panelMaterialRef.current.color.lerp(new THREE.Color(0x3e222d), 0.02); // Red tint
        } else {
          panelMaterialRef.current.color.lerp(new THREE.Color(0x22334e), 0.02); // Standard Navy steel
        }
      }

      // 8.5 Rotate the whole room assembly slowly in a float-like hover
      coldRoomGroup.position.y = 0.25 + Math.sin(time * 0.001) * 0.08;

      controls.update();
      renderer.render(scene, camera);

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // 9. Window Resizing Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []); // Only setup the scene once on mount!

  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-white/5 bg-[#0C2340]">
      {/* 3D Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Orbit Helper overlay */}
      <div className="absolute bottom-4 left-4 pointer-events-none rounded-lg bg-black/40 px-3 py-1.5 text-[10px] font-medium text-silver backdrop-blur-sm border border-white/5 font-mono">
         Drag to rotate | Scroll to zoom
      </div>

      {/* Overlay Status badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
        <div className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold border flex items-center gap-1.5 backdrop-blur-sm ${
          doorOpen 
            ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
            : "bg-teal-accent/10 text-teal-light border-teal-accent/20"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${doorOpen ? "bg-amber-400 animate-ping" : "bg-teal-light"}`} />
          {doorOpen ? "Door Open" : "Door Sealed"}
        </div>

        <div className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold border flex items-center gap-1.5 backdrop-blur-sm ${
          compressorActive 
            ? "bg-teal-accent/10 text-teal-light border-teal-accent/20" 
            : "bg-red-500/10 text-red-400 border-red-500/20"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${compressorActive ? "bg-teal-light animate-pulse" : "bg-red-400"}`} />
          {compressorActive ? "Compressor Running" : "Compressor Idle"}
        </div>
      </div>
    </div>
  );
}
