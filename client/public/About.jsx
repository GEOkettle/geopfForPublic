import { Stats, OrbitControls, Circle } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
const About = () => {
  // DRACOLoader 초기화
  const dracoLoader = new DRACOLoader();

  // GLTFLoader와 함께 DRACOLoader 설정
  const model = 'models/macbook.gltf'
  const gltf = useLoader(GLTFLoader, model, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });
  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
      <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
      <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow />
      <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Circle>
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  );
}

export default About