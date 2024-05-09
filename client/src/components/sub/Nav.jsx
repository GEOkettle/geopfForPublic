import { useState, useEffect, useRef } from 'react';

//zustand
import useStore from '../../store/store';

//react-router-dom
import { useNavigate } from 'react-router-dom';

//onboarding
import Joyride from 'react-joyride';

//css
import styled from 'styled-components';
import { createTheme } from '@mui/material/styles'; //https://stackoverflow.com/questions/74542488/react-material-ui-createtheme-default-is-not-a-function
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Switch from '@mui/material/Switch';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';

const Nav = () => {
  //vaiable
  const { visited, isDarkMode, setMode, palette } = useStore();
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(800));
  const [scrollAt, setScrollAt] = useState(0);
  const navRef = useRef(null);
  const styles = {
    tooltip: {
      fontSize: '15px',
      width: '250px',
      top: '200px',
    },
    floater: {},
  };
  const [steps] = useState([
    {
      content: <h3>자기소개페이지입니다.</h3>,
      placement: 'top',
      target: '.about',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
    {
      content: <h3>제가 만든 프로젝트를 확인해보세요.</h3>,
      placement: 'top',
      target: '.projects',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
    {
      content: <h3>연락을 기다립니다.</h3>,
      placement: 'top',
      target: '.contact',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
    {
      content: <h3>이 앱을 만들때 사용한 라이브러리입니다.</h3>,
      placement: 'top',
      target: '.credit',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
    {
      content: <h3>한/영번역 버튼입니다.</h3>,
      placement: 'top',
      target: '.translation',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
    {
      content: <h3>다크/라이트모드 버튼입니다</h3>,
      placement: 'top',
      target: '.mode',
      disableBeacon: true,
      hideCloseButton: true,
      styles: styles,
    },
  ]);

  //function
  const moveToPage = (param) => {
    const pParam = `/${param}`;
    navigate(pParam);
  };
  const handleChange = (event, newValue) => {
    setScrollAt(newValue);
    scrollToItem(newValue);
  };

  const scrollToItem = (index) => {
    const item = navRef.current.querySelector(`#nav-${index}`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleJoyrideCallback = (data) => {
    const { type, step } = data;

    if (type === 'step:before') {
      const selector = step.target;
      if (selector == '.translation') { 
        const item = navRef.current.querySelector(`#nav-4`);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', inline: 'end' });
        }
      }
      if (selector == '.mode') { 
        const item = navRef.current.querySelector(`#nav-5`);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
      }
    }
  };


  //hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!start) {
        setStart(!start);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
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
  }, [isDarkMode]);
  return (
    <NavFrame>
      <LogoFrame>
        <LogoImg onClick={() => setMode(!isDarkMode)} src={isDarkMode ? 'images/LogoWhite.png' : 'images/Logo.png'} alt="" />
      </LogoFrame>
      <Navbar showLabels value={scrollAt} ref={navRef} onChange={handleChange} sx={{ minWidth: '50px' }}>
        <NavAction id="nav-0" className="about" onClick={() => moveToPage('about')} label="메인" icon={<HomeOutlinedIcon style={{ color: isDarkMode ? '#4caf50' : '#000' }} fontSize={isLargeScreen ? 'large' : 'small'} />} />
        <NavAction id="nav-1" className="projects" onClick={() => moveToPage('projects')} label="프로젝트" icon={<EventNoteTwoToneIcon style={{ color: isDarkMode ? '#4caf50' : '#000' }} fontSize={isLargeScreen ? 'large' : 'small'} />} />
        <NavAction id="nav-2" className="contact" onClick={() => moveToPage('contact')} label="연락처" icon={<ContactEmergencyOutlinedIcon style={{ color: isDarkMode ? '#4caf50' : '#000' }} fontSize={isLargeScreen ? 'large' : 'small'} />} />
        <NavAction id="nav-3" className="credit" onClick={() => moveToPage('credit')} label="크레딧" icon={<BuildOutlinedIcon style={{ color: isDarkMode ? '#4caf50' : '#000' }} fontSize={isLargeScreen ? 'large' : 'small'} />} />
        <NavAction id="nav-4" className="translation" sx={{ fontWeight: '900' }} label="한/영" icon={<GTranslateOutlinedIcon style={{ color: isDarkMode ? '#4caf50' : '#000' }} fontSize={isLargeScreen ? 'large' : 'small'} />} />
        <NavAction id="nav-5" className="mode" icon={<MaterialUISwitch checked={isDarkMode} onClick={() => setMode(!isDarkMode)} fontSize={isLargeScreen ? 'large' : 'small'} />} />
      </Navbar>
      {visited ? (
        <></>
      ) : (
        <Joyride
          styles={{
            options: {
              backgroundColor: '#171720',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              primaryColor: '#4caf50',
              textColor: '#4caf50',
            },
          }}
          scrollToSteps={true}
          scrollOffset={20}
          callback={handleJoyrideCallback}
          steps={steps}
          run={start}
        />
      )}
    </NavFrame>
  );
};
export default Nav;

//컴포넌트라도 디자인은 아래
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#000',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: theme.moonToggle,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.toggleBg,
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: theme.sunToggle,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const NavFrame = styled.div`
  overflow-x: scroll !important;
  &::-webkit-scrollbar {
    height: 1px;
    width: 0;
    background-color: ${(props) => props.theme.scrollBarColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 5px;
    cursor: pointer;
  }
  @media screen and (max-width: 820px) {
    overflow-x: scroll !important;
    &::-webkit-scrollbar {
      height: 1px;
      width: 0;
      background-color: ${(props) => props.theme.scrollBarColor};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.scrollColor};
      border-radius: 5px;
      cursor: pointer;
    }
  }
  height: 10%;
  box-shadow: ${(props) => props.theme.shadowBelow};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Navbar = styled(BottomNavigation)`
  background-color: transparent !important;
  width: 100%;
  height: 100%;
  justify-content: space-around !important;
`;

const NavAction = styled(BottomNavigationAction)`
  color: ${(props) => props.theme.color};
  font-family: 'Pretendard-Regular', sans-serif !important;
  font-weight: 900;
`;

const LogoFrame = styled.div`
  @media screen and (max-width: 820px) {
    display: none;
  }
  margin-left: 2rem;
  padding-top: 0.5rem;
  width: 4rem;
  height: 4rem;
  border: rgba(10, 201, 74, 0.9);
`;

const LogoImg = styled.img`
  @media screen and (max-width: 500px) {
    visibility: hidden;
  }
  width: 100%;
  height: 90%;
  cursor: pointer;
`;
