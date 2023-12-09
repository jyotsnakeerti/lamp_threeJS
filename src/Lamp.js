import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Lamp = ({ isOn, brightness, color }) => {
  const lampRef = useRef();
  const standRef = useRef(); 
  const { viewport } = useThree();


  const sphereSize = Math.min(viewport.width, viewport.height) * 0.07; 
  const standHeight = sphereSize * 9;
  const ceilingHeight = 7;
  const materialProps = {
    emissive: isOn ? color : 'gray', 
    emissiveIntensity: brightness,
    color: isOn ? new THREE.Color(color) : new THREE.Color('gray'),
  };


  useEffect(() => {
    lampRef.current.scale.set(sphereSize, sphereSize, sphereSize);
    standRef.current.position.y = ceilingHeight - standHeight / 2;
  }, [sphereSize]);

  useFrame(() => {
    if (lampRef.current) {
      lampRef.current.rotation.x += 0.01;
      lampRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>


      <mesh ref={standRef} position={[0, ceilingHeight - standHeight / 2, 0]}>
        <cylinderGeometry args={[0.080, 0.080, standHeight, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>


      <mesh ref={lampRef} position={[0, ceilingHeight - standHeight, 0]} castShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Lamp;
