
import { useEffect,useLayoutEffect, useState,useRef } from 'react';

//three.js
import * as THREE from 'three';
import {  OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

//notion
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css' // 코드 하이라이트 스타일용 (선택)
// import 'katex/dist/katex.min.css';// 공식등 수학적 기호 스타일용 (선택)
import { Code } from 'react-notion-x/build/third-party/code';//code
import { Collection } from 'react-notion-x/build/third-party/collection';//db table
import { Equation } from 'react-notion-x/build/third-party/equation';//math fomula
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

//immutable
import { List, Map} from 'immutable';

//zustand
import useStore from '../../store/store';

//axios
import axios from '../../../plugins/axios';

//css
import styled from 'styled-components';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

//internal function and components
function preventClick(event) {
  event.preventDefault(); 
}

function LinkWrapper(props) {
  return <div onClick={preventClick}>{props.children}</div>;
}

const Laptop = (props) => {

  // Variables
  const { scene, materials } = useGLTF('models/laptop.glb');
  const [Xrotation, setXRotation] = useState(0);
  const [ratio, setRatio] = useState(0.01)
  const { resetReq, setResetReq } = useStore(); 

  // // hooks
  useFrame(() => {
    setXRotation((prevRotation) => prevRotation + ratio);
  });
  
  useEffect(() => {
    if (props.lR) {
      if (props.lD) {
        setRatio(0.01);
      } else {
        setRatio(-0.01);
      }
    } else {
      setRatio(0);
    }
  }, [props.lR, props.lD]);

  useEffect(() => {
    if (resetReq === true) {
      setXRotation(0)
      setResetReq(!resetReq) // 하위에서 상태값변경 해줘야 함으로 store이용
    }
  }, [resetReq]);
  return <primitive object={scene} material={materials[''] ? { ...materials[''], side: THREE.DoubleSide } : undefined} position={[0, 0, 0.2]} rotation={[0.8, Xrotation, -0.1]} scale={10} />;
};

const useGLTF = (url) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);
  });

  return gltf;
};


//main component
const About = () => {
  //variable
  const [recordMap, setRecordMap] = useState(null);
  const [laptopRotation, setLaptopRotation] = useState(true)
  const [laptopDirection, setLaptopDirection] = useState(true)
  const [visitCount, setVisitCount] = useState(
    List([
      Map({ today: 0 }),
      Map({ total: 0 }),
    ]))
  const { inApp, setResetReq, isDarkMode, palette } = useStore();
  const notionRef = useRef(null)

  //function
  const controlLaptop = (ord) => {
    if (ord === 'sas') { setLaptopRotation(!laptopRotation); }
    if (ord === 'reverse') { setLaptopDirection(!laptopDirection); }
    if (ord === 'reset') { setResetReq(true); }
  }

  //useEffect
  useEffect(() => {
    if (inApp) {
      axios
        .get('/notion/mainArticle')
        .then((res) => {
          const record = res.data.result.recordMap;
          const today = res.data.result.VISITOR
          const total = res.data.result.TOTAL_VISITOR
          setVisitCount(List([
            Map({ today }),
            Map({ total })
          ]))
          setRecordMap(record);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [inApp]);
  useEffect(() => {
    setTimeout(() => {
      const notionPage = document.getElementsByClassName('notion-page');
      const notionPageScroller = document.getElementsByClassName('notion-page-scroller');
      if (notionPage && notionPageScroller) {
        let i;
        let j;
        for (i = 0; i < notionPage.length; i++) {
          if (isDarkMode) {
            notionPage[i].style.background = ' rgba(23, 23, 32,0.4)';
          } else {
            notionPage[i].style.background = 'none';
          }
        }
        for (j = 0; j < notionPageScroller.length; j++) {
          if (isDarkMode) {
            notionPageScroller[j].style.background = 'rgba(23, 23, 32,0.4)';
          } else {
            notionPageScroller[j].style.background = 'none';
          }
        }
      }
    }, 500);
  });
  // useEffect(() => {
  //   if (recordMap && notionRef) {
  //     const images = notionRef.current?.children[0]?.children[0]?.children[1]?.children[0];
  //     if (images) {
  //       const cover = images?.children[0]?.children[0];
  //       const icon = images?.children[1]?.children[0]?.children[0];
  //       if (images && cover && icon) {
  //         // 나중에 혹시 커버추가할까봐
  //         cover.loading = 'eager';
  //         icon.loading = 'eager';
  //         const handleImageLoad = () => {
  //           const coverLoaded = cover.complete;
  //           const iconLoaded = icon.complete;
  //           setLoadingStatus((prevStatus) => {
  //             return prevStatus.withMutations((status) => {
  //               status.setIn([0, 'icon'], iconLoaded);
  //               status.setIn([1, 'bg'], coverLoaded);
  //             });
  //           });
  //         };
  //         // 이미지 로딩이 완료될 때마다 상태를 업데이트합니다.
  //         cover.addEventListener('load', handleImageLoad);
  //         icon.addEventListener('load', handleImageLoad);

  //         // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
  //         return () => {
  //           cover.removeEventListener('load', handleImageLoad);
  //           icon.removeEventListener('load', handleImageLoad);
  //         };
  //       } else {
  //         setLoadingStatus((prevStatus) => {
  //           return prevStatus.withMutations((status) => {
  //             status.setIn([0, 'icon'], true);
  //             status.setIn([1, 'bg'], true);
  //           });
  //         });
  //       }
  //     }
  //   }
  // }, [recordMap, notionRef,loadingStatus]);
  
  // useEffect(() => {
  //   if (loadingStatus.get(0).get('icon') && loadingStatus.get(1).get('bg')) {
  //     if (notionRef.current && skltRef.current) {
  //       skltRef.current.style.display = 'none';
  //       notionRef.current.style.visibility = 'visible';
  //       notionRef.current.style.width = '50%';
  //     }
  //   }
  // }, [loadingStatus]);
  
  return (
    <>
      <Contents>
        <Easel>
          <VisitorCounter>
            <CounterBox style={{ borderRight: isDarkMode ? palette.dark.border : palette.light.border }}>
              오늘방문자: &nbsp; <span style={{ color: isDarkMode ? 'red' : 'blue' }}>{visitCount.getIn([0, 'today'])}</span>
            </CounterBox>
            <CounterBox>
              전체방문자: &nbsp; <span style={{ color: isDarkMode ? 'red' : 'blue' }}>{visitCount.getIn([1, 'total'])}</span>
            </CounterBox>
          </VisitorCounter>
          <Canvas stats={'false'} style={{ height: '80%' }}>
            <ambientLight />
            <OrbitControls target={[0, 2, -2]} />
            <directionalLight position={[10, 4, 6]} intensity={5} color="rgb(236, 236, 236)" />
            <pointLight position={[5, 6, 3]} intensity={5} color="rgb(255, 255, 255)" distance={5} decay={2} />
            <Laptop lR={laptopRotation} lD={laptopDirection} />
          </Canvas>
          <RemoteController>
            <Rc onClick={() => controlLaptop('sas')} style={{ borderBottomLeftRadius: '30%' }}>
              <TimerOutlined />
              정지/시작
            </Rc>
            <Rc onClick={() => controlLaptop('reverse')} style={{ borderLeft: isDarkMode ? palette.dark.border : palette.light.border, borderRight: isDarkMode ? palette.dark.border : palette.light.border }}>
              <FlipCameraAndroidOutlinedIcon />
              반대로
            </Rc>
            <Rc onClick={() => controlLaptop('reset')}>
              <RestartAltOutlinedIcon />
              원위치
            </Rc>
          </RemoteController>
        </Easel>
        {recordMap ? (
          <Notion className="notionTracer" ref={notionRef}>
            <LinkWrapper>
              <NotionRenderer
                components={{
                  Code,
                  Collection,
                  Equation,
                  Modal,
                  Pdf,
                }}
                disableHeader={true}
                darkMode={isDarkMode ? true : false}
                recordMap={recordMap}
                fullPage={true}
              />
            </LinkWrapper>
          </Notion>
        ) : (
          <NotionSkeleton>
            <Loader />
          </NotionSkeleton>
        )}
      </Contents>
    </>
  );
}

export default About

const Contents = styled.div`
  display: flex;
  height: 90%;
`;

const Notion = styled.div`
  padding: 2px;
  border-bottom-right-radius: 5%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${(props) => props.theme.scorllBarColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 5px;
    cursor: pointer;
  }
`;
const NotionSkeleton = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 80px;
  height: 40px;
  color: ${(props) => props.theme.batteryColor};
  border: 2px solid currentColor;
  border-right-color: transparent;
  padding: 3px;
  background: repeating-linear-gradient(90deg, currentColor 0 10px, #0000 0 15px) 0/0% no-repeat content-box content-box;
  position: relative;
  box-sizing: border-box;
  animation: l5 2s infinite steps(6);
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: 100%;
    width: 10px;
    background: linear-gradient(#0000 calc(50% - 7px), currentColor 0 calc(50% - 5px), #0000 0 calc(50% + 5px), currentColor 0 calc(50% + 7px), #0000 0) left / 100% 100%, linear-gradient(currentColor calc(50% - 5px), #0000 0 calc(50% + 5px), currentColor 0) left / 2px 100%, linear-gradient(#0000 calc(50% - 5px), currentColor 0 calc(50% + 5px), #0000 0) right/2px 100%;
    background-repeat: no-repeat;
  }
  @keyframes l5 {
    100% {
      background-size: 120%;
    }
  }
`;

const Easel = styled.div`
  @media screen and (max-width: 768px) {
    visibility: hidden;
    width: 0%;
  }
  width: 50%;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.shadow2};
`;
Easel.shouldForwardProp = (prop) => !['isDarkMode', 'palette'].includes(prop);

const RemoteController = styled.div`
  height:10%;
  display: flex;
  `
const Rc = styled.div`
  width: 33%;
  color: ${(props) => props.theme.color};
  text-align: center;
  border-top: ${(props) => props.theme.border};
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
    cursor: pointer;
    color: white;
  }
`;
const VisitorCounter = styled.div`
  height: 10%;
  display: flex;
  border-bottom: ${(props)=> props.theme.border}
`;
const CounterBox = styled.div`
  color: ${(props)=> props.theme.color};
  padding:3%;
  width: 50%;
  font-size: 1.5em;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
  white-space: nowrap;
`;



