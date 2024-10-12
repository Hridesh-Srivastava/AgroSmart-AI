import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
const Cyl = () => {
    let tex =  useTexture("./logo3.png");
 console.log(tex);
 let cyl = useRef(null);
 useFrame((state,delta)=> {
    cyl.current.rotation.y += delta;
 });
 
  return (
    <group rotation={[0, 1.4, 0.5]}>
    <mesh ref={cyl}>
    <cylinderGeometry args={[1.2, 1.2, 1.5, 70, 70, true]} />   {/*or boxGeometry */}
    <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide}  />
  </mesh>
  </group>
  );
};

export default Cyl;
