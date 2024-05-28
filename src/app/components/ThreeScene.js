import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const canvasRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: mouseX, y: mouseY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      if (Math.abs(mousePosition.x) <= 1 && Math.abs(mousePosition.y) <= 1) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.x += mousePosition.y * 0.1;
        cube.rotation.y += mousePosition.x * 0.1;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, [mousePosition]);

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
