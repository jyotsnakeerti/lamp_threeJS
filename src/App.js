// App.js
import React, { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import Lamp from './Lamp';
import './App.css';

const App = () => {
  const [isLampOn, setIsLampOn] = useState(false);
  const [brightness, setBrightness] = useState(0.5);
  const [color, setColor] = useState('#ffcc00'); // Initial color

  const toggleLamp = () => {
    setIsLampOn((prev) => !prev);
  };

  return (
    <div className="app-container">
      <button className='light-button' onClick={toggleLamp}>
        {isLampOn ? 'Turn Off' : 'Turn On'}
      </button>

      {isLampOn && (
        <div className='controls-container'>
          <div>
            <label>
              <span style={{ color: 'white' }}>Brightness: </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <br />
        </div>
      )}

      <Canvas camera={{ position: [0, 5, 5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
        <Suspense fallback={null}>
          <Lamp isOn={isLampOn} brightness={brightness} color={color} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default App;
