
import { useEffect,useState } from 'react';


//immutable.js
import { List } from 'immutable';

//r3f
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';


//css
import styled  from 'styled-components';


const Quote = () => {

  //variable
  const [randomNum, setRandomNum] = useState(-1);
  const [quotes] = useState(List([
    'Choice. The problem is choice',
    'Choice is an illusion created between those with power and those without',
    'What do all men with power want? More power',
    'Choice is an illusion created between those with power and those without',
    'To deny our own impulses is to deny the very thing that makes us human',
    `What's really going to bake your noodle later on is, would you still have broken it if I hadn’t said anything?`,
    `I don't like the idea that I’m not in control of my life`,
    `What you know you can't explain, but you feel it. You've felt it your entire life`,
    `It's the question that drives us, Neo. It's the question that brought you here. You know the question, just as I did`,
    `I can only show you the door, you're the one that has to walk through it`,
    'There is no spoon'
  ]));

  //function
  const getRandomIndex = () => { 
    const length = quotes.size;
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex;  
  }
  
  //hooks
  useEffect(() => {
    const randomNum = getRandomIndex();
    setRandomNum(randomNum);
  }, [quotes]);

  return (
    <group>
      {randomNum !== -1 && (
        <mesh>
          <Text
            whiteSpace="pre-wrap"
            lineHeight={1.2}
            maxWidth={18}
            fontSize={1}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 8, 0, 0]} // 원하는 회전 설정
            color="#171720"
            opacity={0.2}
            outlineColor="rgb(10, 201, 74)"
            outlineWidth={0.02}
            scale={0.8}
          >
            {quotes.get(randomNum)}
          </Text>
          <Text
            whiteSpace="pre-wrap"
            lineHeight={1.2}
            maxWidth={18}
            fontSize={1}
            position={[0, -1, 0]}
            rotation={[-Math.PI / 8, 0, 0]} // 원하는 회전 설정
            color="rgb(10, 201, 74)"
            opacity={0.2}
            scale={0.8}
          >
            {quotes.get(randomNum)}
          </Text>
        </mesh>
      )}
    </group>
  );
}

const Loading = () => {

  //variable 

  return (
    <LoadingScene>
      <Canvas stats={'false'} linear flat>
        <OrbitControls />
        <Quote />
      </Canvas>
    </LoadingScene>
  );
};

export default Loading;

const LoadingScene = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #171720;
`;
