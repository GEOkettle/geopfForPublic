
import React, { useEffect, Suspense } from 'react';

//zustand
import useStore from '../store/store';

//axios
import axios from '../../plugins/axios'

//react-router-dom
import { Route, Routes } from 'react-router-dom';





//components
import Nav from './sub/Nav';
// import About from './contents/About';
import SubLoading from '../components/sub/SubLoading';
const About = React.lazy(() => import('./contents/About'));
const Projects = React.lazy(() => import('./contents/Projects'));
const Credit = React.lazy(() => import('./contents/Credit'));
const Contact = React.lazy(() => import('./contents/Contact'));


//css
import styled from 'styled-components';



const Frame = () => {

  // variable
  const { inApp, setVisited, setVisitedIn24} = useStore();

  //functions

  //hooks
  useEffect(() => {
    if (inApp) { 
      axios.get('/visitCheck')
      .then((res) => { 
        setVisited(res.data[0].visited)
        setVisitedIn24(res.data[0].visitedIn24)

      })
      .catch((err) => console.error(err))
    }
  }, [inApp])
  

  return (
    <>
      {inApp ? (
        <Container>
          <Nav />
          <Suspense fallback={<SubLoading />}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/credit" element={<Credit />} />
            </Routes>
          </Suspense>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default Frame;

const Container = styled.div`
  width: 95%;
  height: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.bgWithOpacitiy};
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  border-radius: 3%;
  box-shadow: ${(props) => props.theme.shadow};
`;

