import { useState, useEffect } from 'react';

//immutable.js
import { List } from 'immutable';

//zustand
import useStore from '../../store/store';

//r3f
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

//css
import styled from 'styled-components';


const Quote = () => {
  //variable
  const [randomNum, setRandomNum] = useState(-1);
  const [quotes] = useState(List(['Choice. The problem is choice', 'Choice is an illusion created between those with power and those without', 'What do all men with power want? More power', 'Choice is an illusion created between those with power and those without', 'To deny our own impulses is to deny the very thing that makes us human', `What's really going to bake your noodle later on is, would you still have broken it if I hadn’t said anything?`, `I don't like the idea that I’m not in control of my life`, `What you know you can't explain, but you feel it. You've felt it your entire life`, `It's the question that drives us, Neo. It's the question that brought you here. You know the question, just as I did`, `I can only show you the door, you're the one that has to walk through it`, 'There is no spoon']));
  const [fontSize, setFontSize] = useState(1);
  const { isDarkMode } = useStore();

  //function
  const getRandomIndex = () => {
    const length = quotes.size;
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex;
  };

  const getRandomPosition = () => {
    // Set the range for x, y, z coordinates according to your scene
    const minX = -5;
    const maxX = 5;
    const minY = -5;
    const maxY = 5;
    const minZ = -5;
    const maxZ = 5;

    // Generate random coordinates within the specified range
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const z = Math.random() * (maxZ - minZ) + minZ;

    return [x, y, z];
  };


  //hooks
  useEffect(() => {
    const randomNum = getRandomIndex();
    setRandomNum(randomNum);
  }, [quotes]);
  // hooks
  useEffect(() => {
    const randomNum = getRandomIndex();
    setRandomNum(randomNum);
  }, [quotes]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newSize = Math.min(width, height) * 0.001; // 원하는 크기 비율로 조정

      setFontSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기에 한 번 호출하여 초기 폰트 크기 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <group>
      {randomNum !== -1 && (
        <mesh>
          <Text
            whiteSpace="overflowWrap"
            lineHeight={1.2}
            maxWidth={18}
            fontSize={fontSize}
            position={getRandomPosition()}
            rotation={[-Math.PI / 8, 20, 0]} // 원하는 회전 설정
            opacity={0.2}
            outlineColor="rgb(10, 201, 74)"
            color={isDarkMode ? '#171720' : '#F2F1E9'}
            outlineWidth={0.02}
            scale={0.8}
          >
            {quotes.get(randomNum)}
          </Text>
          <Text
            whiteSpace="pre-wrap"
            lineHeight={1.2}
            maxWidth={18}
            fontSize={fontSize}
            position={getRandomPosition()}
            rotation={[-Math.PI / 8, -20, 0]} // 원하는 회전 설정
            // color="rgb(10, 201, 74)"
            color={isDarkMode ? 'rgb(10, 201, 74)' : 'black'}
            opacity={0.2}
            scale={0.8}
          >
            {quotes.get(randomNum)}
          </Text>
        </mesh>
      )}
    </group>
  );
};

const SubLoading = () => {

  //variable

  //functions
  
  //hooks
  return (
    <LoadingScene>
      <Canvas  linear flat>
        <OrbitControls />
        <Quote />
      </Canvas>
    </LoadingScene>
  );
};

export default SubLoading;

const LoadingScene = styled.div`
  position: fixed;
  top: 10%;
  width: 100%;
  height: 90%;
  background-color: ${(props) => props.theme.backgroundColor};
`;
