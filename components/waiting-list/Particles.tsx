// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// const Particles = () => {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particleCount = 1000;

//     const posArray = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 10;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.02,
//       color: new THREE.Color('#3b82f6'), // Tailwind blue-500
//       transparent: true,
//       opacity: 0.8,
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);

//     // Mouse interaction
//     const mouse = new THREE.Vector2();
//     window.addEventListener('mousemove', (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     });

//     // Camera position
//     camera.position.z = 3;

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);

//       particlesMesh.rotation.x += 0.001;
//       particlesMesh.rotation.y += 0.001;

//       // Mouse interaction effect
//       particlesMesh.position.x = mouse.x * 0.5;
//       particlesMesh.position.y = mouse.y * 0.5;

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
// };

// export default Particles;