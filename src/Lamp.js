import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Lamp = ({ isOn, brightness, color }) => {
  const lampRef = useRef();
  const standRef = useRef(); // Reference for the lamp stand
  const { viewport } = useThree();

  // Adjust sphere size based on viewport size
  const sphereSize = Math.min(viewport.width, viewport.height) * 0.07; // Reduced the overall size
  const standHeight = sphereSize * 9; // Adjusted the stand height based on the sphere size
  const ceilingHeight = 7;

  // Update material properties based on brightness and color
  const materialProps = {
    emissive: isOn ? color : 'gray', // Use gray when the lamp is off
    emissiveIntensity: brightness,
    color: isOn ? new THREE.Color(color) : new THREE.Color('gray'), // Set the color when the lamp is on
  };

  // Update sphere size and positions on window resize
  useEffect(() => {
    lampRef.current.scale.set(sphereSize, sphereSize, sphereSize);
    standRef.current.position.y = ceilingHeight - standHeight / 2;
  }, [sphereSize]);

  useFrame(() => {
    // Rotate the lamp slowly
    if (lampRef.current) {
      lampRef.current.rotation.x += 0.01;
      lampRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Circular Plate Ceiling */}

      {/* Lamp Stand */}
      <mesh ref={standRef} position={[0, ceilingHeight - standHeight / 2, 0]}>
        <cylinderGeometry args={[0.080, 0.080, standHeight, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>

      {/* Lamp Base */}
      <mesh ref={lampRef} position={[0, ceilingHeight - standHeight, 0]} castShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Lamp;
