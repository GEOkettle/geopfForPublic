
import { useEffect, useRef,useState } from 'react';

//zustand
import useStore from '../../store/store.jsx';

//onboarding
import Joyride from 'react-joyride';

//three.js
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import SceneInit from '../../lib/SceneInit.jsx';
import * as THREE from 'three';



//css
import styled from 'styled-components';

const OpeningLogo = () => {
  //variable
  const { setMainLogo, mainLogoDown, cookieCheck } = useStore();
  const canvasRef = useRef(null);
  const updatePosition = useRef(null);
  const [start, setStart] = useState(false);
  const [steps] = useState([
    {
      content: <h2>로고를 눌러주세요!</h2>,
      placement: 'right',
      target: '.modalTarget',
      disableBeacon: true,
      hideCloseButton: true,
      buttons: {
        primaryButton: {
          fontSize: '10px',
        },
      },
      styles: {
        floater: {
          width: '3vw',
          height: '3vh',
        },
        tooltip: {
          width: '300px',
          height: '200px',
          fontSize: '15px',
          
        },
      },
    },
  ]);

  //hooks
  useEffect(() => {
    const hideCanvas = (bool) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.hidden = bool;
      }
    };

    if (mainLogoDown) {
      hideCanvas(true);
    } else {
      hideCanvas(false);
      const appTitle = new SceneInit('myThreeJsCanvas');

      appTitle.initialize();
      appTitle.animate();

      // part 2 - true type font loader
      const fontLoader = new FontLoader();
      const ttfLoader = new TTFLoader();

      ttfLoader.load('fonts/jersey15.ttf', (json) => {
        const jersey15 = fontLoader.parse(json);

        const textGeometry = new TextGeometry(`Geo's`, {
          font: jersey15,
          size: 20,
          depth: 5,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 13,
          bevelSize: 1,
          bevelOffset: 1,
          bevelSegments: 3,
        });

        textGeometry.computeBoundingBox(); // 경계 상자 계산

        const textCenter = textGeometry.boundingBox.getCenter(new THREE.Vector3()); // 중심점 계산

        textGeometry.translate(-textCenter.x, -textCenter.y, -textCenter.z); // 중심을 원점으로 이동

        const textMaterial = [
          new THREE.MeshPhongMaterial({ color: '#0F0' }), //front
          new THREE.MeshPhongMaterial({ color: '#231f1f' }), // side
        ];

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        function pointerTracking(e, type) {
          // 마우스 위치를 정규화합니다.
          let mouse;
          if (type === 'hover') {
            mouse = {
              x: (e.clientX / window.innerWidth) * 2 - 1,
              y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
          }
          if (type === 'click') {
            mouse = new THREE.Vector2();
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
          }
          const raycaster = new THREE.Raycaster();

          // raycaster를 생성하고 마우스 위치로 설정합니다.
          raycaster.setFromCamera(mouse, appTitle.camera);

          // 객체와의 교차를 확인합니다.
          const intersects = raycaster.intersectObject(textMesh);
          return intersects.length;
        }
        // 마우스 이벤트 핸들러 등록
        const onClick = (event) => {
          const isClicked = pointerTracking(event, 'click');
          if (isClicked > 0) {
            appTitle.scene.remove(textMesh);
            appTitle.renderer.dispose();
            setMainLogo(true);
          }
        };

        // 마우스 이동 시 호출되는 함수
        function onMouseHover(event) {
          const isHover = pointerTracking(event, 'hover');
          if (isHover > 0) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'auto';
          }
        }

        document.addEventListener('click', onClick);
        document.addEventListener('mousemove', onMouseHover);
        appTitle.scene.add(textMesh);
        appTitle.renderer.setClearColor(0x000000, 0);

        const rotateObject = () => {
          textMesh.rotation.y += 0.01;
          textMesh.rotation.x += 0.01;
          requestAnimationFrame(rotateObject); // 다음 프레임 요청
        };
        rotateObject(); // 함수 호출
      });
    }
  }, [mainLogoDown]);// 나중에 로딩문제 생기면 isLoading 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!start) { 
          setStart(!start)
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div>
      <Target className="modalTarget" />
      <canvas id="myThreeJsCanvas" ref={canvasRef} style={{ position: 'fixed', top: 0 }}></canvas>
      {!mainLogoDown && !cookieCheck ? (
        <Joyride
          styles={{
            options: {
              backgroundColor: '#171720',
              overlayColor: 'none',
              primaryColor: '#4caf50',
              textColor: '#4caf50',
              
            },
          }}
          scrollToFirstStep={true}
          steps={steps}
          run={start}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OpeningLogo;


const Target = styled.div`
  @media screen and (max-width: 768px) {
    height: 150px;
    width: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  height: 30rem;
  width: 30rem;
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
`;