"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function OrbitSpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Starfield Particle System
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Color variation between warm amber and cosmic cyan
      const isWarm = Math.random() > 0.4;
      if (isWarm) {
        starColors[i * 3] = 0.95; // r
        starColors[i * 3 + 1] = 0.72; // g
        starColors[i * 3 + 2] = 0.55; // b
      } else {
        starColors[i * 3] = 0.45; // r
        starColors[i * 3 + 1] = 0.65; // g
        starColors[i * 3 + 2] = 0.95; // b
      }
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── Planetary Orbit Rings ───────────────────────────
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringRadii = [8, 12, 16];
    const ringMeshes: THREE.Line[] = [];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: idx === 0 ? 0xe1aa8b : idx === 1 ? 0x60a5fa : 0xd4d4d8,
        transparent: true,
        opacity: 0.25 - idx * 0.05,
      });

      const line = new THREE.Line(ringGeo, ringMat);
      line.rotation.x = Math.PI / 3 + idx * 0.15;
      line.rotation.y = idx * 0.2;
      ringsGroup.add(line);
      ringMeshes.push(line);
    });

    // ── Orbiting Glowing Spatial Nodes (Representing AI, Code, Canvas) ──
    const nodes: { mesh: THREE.Mesh; radius: number; speed: number; angle: number; yOffset: number }[] = [];
    const nodePalette = [0xf59e0b, 0x60a5fa, 0x10b981, 0xe1aa8b, 0xa855f7];

    for (let i = 0; i < 5; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.35 + Math.random() * 0.2, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: nodePalette[i],
        wireframe: true,
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(mesh);

      nodes.push({
        mesh,
        radius: 7 + i * 2.2,
        speed: (0.008 + i * 0.003) * (i % 2 === 0 ? 1 : -1),
        angle: (i * Math.PI * 2) / 5,
        yOffset: (Math.random() - 0.5) * 4,
      });
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) * 0.0008;
      mouseY = (e.clientY - halfH) * 0.0008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth camera tilt towards mouse
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 10;
      camera.position.y = -targetY * 10;
      camera.lookAt(0, 0, 0);

      // Gentle starfield drift
      starField.rotation.y += 0.0004;
      starField.rotation.x += 0.0002;

      // Orbit rings rotation
      ringsGroup.rotation.z += 0.001;

      // Orbit nodes update
      nodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.radius;
        node.mesh.position.z = Math.sin(node.angle) * node.radius;
        node.mesh.position.y = Math.sin(node.angle * 2) * 1.5 + node.yOffset;
        node.mesh.rotation.x += 0.02;
        node.mesh.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
