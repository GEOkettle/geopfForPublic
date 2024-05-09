
import React,{ useEffect, Suspense } from 'react';

//react-router-dom

//components
import Background from './components/sub/Background';
import OpeningLogo from './components/sub/OpeningLogo';
import Introduction from './components/sub/Introduction';
const Frame = React.lazy(() => import('./components/Frame'));
import Loading from './components/sub/Loading';
//zustand
import useStore from './store/store';

//axios
import axios from '../plugins/axios';

//css
import styled, { ThemeProvider } from 'styled-components';
import './App.css';

function App() {

  //variable
  const { isDarkMode, palette, setCookieCheck } = useStore();
  
  // useEffect
  useEffect(() => {
    axios
      .get('/cookieCheck')
      .then((res) => {
        const result = res.data[0].visited
        setCookieCheck(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  
  return (
    <ThemeProvider theme={isDarkMode ? palette.dark : palette.light}>
      <Theme style={{ height: '100%', width: '100%' }}>
        { isDarkMode? <Background/> : <></>}
        <OpeningLogo />
        <Introduction/>
        <Suspense fallback={<Loading />}>
          <Frame/>
        </Suspense>
      </Theme>
    </ThemeProvider>
  );
}

export default App;

const Theme = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props)=>props.theme.color}
  /* background-color: #f0f0f0; */
  /* bright theme
    bg rgb(171 223 168 / 84%)  #F0F0F0
    bs 0px 0px 10px rgb(0 0 0 / 70%)  #0AC94A
  */
`;


