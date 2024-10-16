import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useState, useRef, Suspense, useEffect } from 'react';
import * as random from 'maath/random';
import Cyl from './Cyl';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './style.css';
import Typed from 'typed.js';
import axios from 'axios';  

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const options = {
      strings: ["Connect with us :"],
      typeSpeed: 78,
      backSpeed: 78,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend (DB connection)
      const response = await axios.post('http://localhost:3000/api/v1/users/contact', formData);
      console.log('Form submitted successfully:', response.data);
      setFormStatus('Thank you! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      console.error('Error submitting the form:', error.response?.data || error.message);
      setFormStatus('Failed to submit the form. Please try again.');
    }
    setTimeout(() => setFormStatus(''), 4000);  
  };

  return (
    <>
      <StarsCanvas />

      <header className="header">
        <h2 className="logo">
          <a href="https://srhu.edu.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
            SmartAgro
          </a>
        </h2>
        <nav className="navbar">
          <a href="/index.html" className="ros1">Home</a>
          <a href="/service.html" className="ros2">Our Services</a>
          <a href="/Backend/AgroAi/templates/index.html" className="ros2">Get Started</a>
          <a href="/about.html" className="ros3">About Us</a>
          <a href="#" className="ros5">Contact Us</a>
        </nav>
      </header>

      <div className="content">
        <div className="form-section">
          <h2>
            <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i>   
            Call us on : <span style={{ color: '#64ff55'  }}>1800-1210266</span>
          </h2>
          <h2><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>  Write us on : <span style={{ color: '#64ff55'  }}>src@hihtindia.org</span> </h2>
          <h2>Or</h2>
          <h2>Contact us by filling out the fields below.</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit it &rarr;</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </div>

        <div className="canvas-section">
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

      <footer className="footer-container">
        <div className="footer-left">
          <h2>
            <a href="https://srhu.edu.in/" target="_blank" rel="noopener noreferrer">SmartAgro</a>
          </h2>
          <p>© {date} SmartAgro | All Rights Reserved.</p>
        </div>

        <div className="footer-right">
          <h3><span ref={typedRef}></span></h3>
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


// import { useRef, useEffect } from 'react';
// import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import * as random from 'maath/random';
// import Cyl from './Cyl';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import './style.css';
// import Typed from 'typed.js';
// import Contact from './components/Contact';

// const StarBackground = (props) => {
//   const ref = useRef();
//   const [sphere] = useState(() => random.inSphere(new Float32Array(37000), { radius: 10 }));

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10;
//     ref.current.rotation.y -= delta / 15;
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
//         <PointMaterial transparent color="#fff" size={0.007} sizeAttenuation depthWrite={false} />
//       </Points>
//     </group>
//   );
// };

// const StarsCanvas = () => (
//   <div className="w-full h-auto fixed inset-0 z-[0]">
//     <Canvas camera={{ position: [0, 0, 1] }}>
//       <Suspense fallback={null}>
//         <StarBackground />
//       </Suspense>
//     </Canvas>
//   </div>
// );

// const App = () => {
//   const date = new Date().getFullYear();
//   const typedRef = useRef();

//   useEffect(() => {
//     const options = {
//       strings: ["Connect with us :"],
//       typeSpeed: 78,
//       backSpeed: 78,
//       backDelay: 1200,
//       loop: true,
//       showCursor: true,
//       cursorChar: '|',
//     };

//     const typed = new Typed(typedRef.current, options);

//     return () => {
//       typed.destroy();
//     };
//   }, []);

//   return (
//     <Router>
//       <StarsCanvas />

//       <header className="header">
//         <h2 className="logo">
//           <a href="https://srhu.edu.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
//             SmartAgro
//           </a>
//         </h2>
//         <nav className="navbar">
//           <Link to="/" className="ros1">Home &rarr;</Link>
//           <Link to="/services" className="ros2">Our Services &rarr;</Link>
//           <Link to="/about" className="ros3">About Us &rarr;</Link>
//           <Link to="/contact" className="ros5">Contact Us &rarr;</Link>
//         </nav>
//       </header>

//       <Routes>
//       <Route path="/" element={<div>Home Page Content</div>} />
//   <Route path="/services" element={<div>Services Page Content</div>} />
//   <Route path="/about" element={<div>About Page Content</div>} />
//   <Route path="/contact" element={<Contact />} />
//       </Routes>

//       <div className="canvas-section">
//         <Canvas flat camera={{ fov: 29 }} style={{ background: 'black' }}>
//           <OrbitControls />
//           <ambientLight />
//           <Suspense fallback={null}>
//             <StarBackground />
//           </Suspense>
//           <Cyl />
//           <EffectComposer>
//             <Bloom mipmapBlur intensity={1.0} luminanceThreshold={0} luminanceSmoothing={0} />
//           </EffectComposer>
//         </Canvas>
//       </div>

//       <footer className="footer-container">
//         <div className="footer-left">
//           <h2>
//             <a href="https://srhu.edu.in/" target="_blank" rel="noopener noreferrer">SmartAgro</a>
//           </h2>
//           <p>© {date} SmartAgro | All Rights Reserved.</p>
//         </div>

//         <div className="footer-right">
//           <h3><span ref={typedRef}></span></h3>
//           <div className="social-links">
//             <a id="tou" href="https://www.linkedin.com/school/s-r-h-u/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
//               <i className="fa-brands fa-linkedin"></i>
//             </a>
//             <a id="tou" href="https://x.com/SRHUniversity?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
//               <i className="fa-brands fa-x-twitter"></i>
//             </a>
//             <a id="tou" href="https://www.instagram.com/srhusocial/?hl=en" target="_blank" rel="noopener noreferrer">
//               <i className="fa-brands fa-instagram"></i>
//             </a>
//             <a id="tou" href="https://www.youtube.com/channel/UCLMUq8dVU0UTJ4ibcgH8wXw" target="_blank" rel="noopener noreferrer">
//               <i className="fa-brands fa-youtube"></i>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </Router>
//   );
// };

// export default App;