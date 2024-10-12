import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useState, useRef, Suspense, useEffect } from 'react';
import * as random from 'maath/random';
import Cyl from './Cyl';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './style.css'; 
import Typed from 'typed.js';

// Star background component
const StarBackground = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(37000), { radius: 10 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#fff" size={0.007} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};


const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[0]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

const App = () => {
  const date = new Date().getFullYear();
  const typedRef = useRef();

  useEffect(() => {
    const options = {
      strings: [
        "Connect with us :",
        "Connect with us :"
      ],
      typeSpeed: 75,
      backSpeed: 75,
      backDelay: 1000,
      loop: true,
    };

   
    const typed = new Typed(typedRef.current, options);

    
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
     
      <StarsCanvas />

      <header className="header">
        <h2 className="logo">
          <a href="https://srhu.edu.in/" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
            SmartAgro
          </a>
        </h2>
        <nav className="navbar">
          <a href="#home" className="ros1">Home &rarr;</a>
          <a href="../services/service.html" className="ros2">Our Services &rarr;</a>
          <a href="#" className="ros3">About Us &rarr;</a>
          <a href="../contactUs/contact.html" className="ros5">Contact Us &rarr;</a>
        </nav>
      </header>

      <div className="content">
        <div className="text-section">
          <h1>Contact us by filling out the fields below:</h1>
        </div>

        <div className="form-section" style={{ position: 'absolute', left: '0', top: '50px' }}>
          <form className="contact-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

      
        <div className="canvas-section" style={{ position: 'relative', zIndex: 1 }}>
          <Canvas flat camera={{ fov: 29 }} style={{ background: 'black' }}>
            <OrbitControls />
            <ambientLight />
            <Suspense fallback={null}>
              <StarBackground />
            </Suspense>
            <Cyl />
            <EffectComposer>
              <Bloom mipmapBlur intensity={1.0} luminanceThreshold={0} luminanceSmoothing={0} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>

      <footer className="footer-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="footer-left">
          <h2><a href="https://srhu.edu.in/" target="_blank">SmartAgro</a></h2>
          <p>© {date} SmartAgro | All Rights Reserved.</p>
        </div>

        <div className="footer-right">
          <h3 ref={typedRef}></h3> 
          <div className="social-links">
            <a id="tou" href="https://www.linkedin.com/school/s-r-h-u/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a id="tou" href="https://x.com/SRHUniversity?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a id="tou" href="https://www.instagram.com/srhusocial/?hl=en" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a id="tou" href="https://www.youtube.com/channel/UCLMUq8dVU0UTJ4ibcgH8wXw" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
