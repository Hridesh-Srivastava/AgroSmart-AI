import { Canvas } from '@react-three/fiber';
import './style.css';
import { OrbitControls } from '@react-three/drei';
import Cyl from './Cyl';
import { Bloom } from '@react-three/postprocessing';
import { EffectComposer } from '@react-three/postprocessing';

const App = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <header className="header">
        <h2 className="logo">
          <a href="https://srhu.edu.in/" style={{ color: 'white', textDecoration: 'none' }}>
            SmartAgro
          </a>
        </h2>
        <nav className="navbar">
          <a href="#home" className="ros1">
            Home &rarr;
          </a>
          <a href="../services/service.html" className="ros2">
            Our Services &rarr;
          </a>
          <a href="#" className="ros3">
            About Us &rarr;
          </a>
          <a href="../contactUs/contact.html" className="ros5">
            Contact Us &rarr;
          </a>
        </nav>
      </header>

      <div className="content">
        <div className="text-section">
          <h1>Welcome to SmartAgro</h1>
          <p>Explore our innovative solutions for modern agriculture.</p>
        </div>

        <div className="canvas-section">
          <Canvas flat camera={{ fov: 29 }} style={{background: 'black'}}>
            <OrbitControls />
            <ambientLight  />
            <Cyl />
            <EffectComposer>
              <Bloom mipmapBlur intensity={1.0} luminanceThreshold={0} luminanceSmoothing={0} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>

     
      <footer className="footer-container">
        <div className="footer-left">
          <h2><a href="https://srhu.edu.in/">SmartAgro</a></h2>
          <p>© {date} SmartAgro | All Rights Reserved.</p>
        </div>

        <div className="footer-right">
          <h3>Connect with us :</h3>
          <div className="social-links">
            <a id="tou" href="https://www.linkedin.com/school/s-r-h-u/?originalSubdomain=in">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a id="tou" href="https://x.com/SRHUniversity?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a id="tou" href="https://www.instagram.com/srhusocial/?hl=en">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a id="tou" href="https://www.youtube.com/channel/UCLMUq8dVU0UTJ4ibcgH8wXw">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
