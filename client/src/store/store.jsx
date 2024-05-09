import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => ({
  mainLogoDown: false,
  setMainLogo: (bool) => set({ mainLogoDown: bool }),
  inApp: false,
  setInApp: (bool) => set({ inApp: bool }),
  resetReq: false,
  setResetReq: (bool) => set({ resetReq: bool }),
  currentPost: '',
  setCurrentPost: (str) => set({ currentPost: str }),
  visited: false,
  setVisited: (bool) => set({ visited: bool }),
  visitedIn24: false,
  setVisitedIn24: (bool) => set({ visitedIn24: bool }),
  cookieCheck: false,
  setCookieCheck: (bool) => set({ cookieCheck: bool }),
  // isDarkMode: true,
  isDarkMode: true,
  setMode: (bool) => set({ isDarkMode: bool }),
  palette: {
    dark: {
      color: '#4caf50 !important',
      toggleBg: '#2e7d32',
      sunToggle: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      moonToggle: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      bgWithOpacity: 'rgba(23, 23, 32,0.5)',
      backgroundColor: '#171720 !important',
      shadow: '0px 0px 10px rgba(10, 201, 74, 0.7)',
      shadow2: '5px 0px 5px -5px rgba(10, 201, 74, 0.9)',
      shadowBelow: ' 0px 5px 5px -5px rgba(10, 201, 74, 0.7)' /* x-offset y-offset blur spread color */,
      border: '1px solid rgba(10, 201, 74, 0.9)',
      scrollColor: 'rgba(10, 201, 74, 0.7)',
      scrollBarColor: '#171720',
      batteryColor: 'rgba(10, 201, 74, 0.7)',
      hoverColor: 'rgba(10, 201, 74, 0.5)',
    },
    light: {
      color: 'black !important',
      toggleBg: '#000',
      sunToggle: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#F2F1E9')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      moonToggle: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#F2F1E9')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      bgWithOpacity: 'rgba(240, 240, 240,0.5)',
      backgroundColor: '#F2F1E9 !important',
      shadow: '0px 0px 10px rgba(0, 0, 0, 0.815)',
      shadow2: '5px 0px 5px -5px rgba(0, 0, 0, 0.9)',
      shadowBelow: ' 0px 5px 5px -5px rgba(0, 0, 0, 0.5)' /* x-offset y-offset blur spread color */,
      border: '1px solid rgb(0, 0, 0)',
      scrollColor: 'rgba(0, 0, 0, 0.7)',
      scrollBarColor: '#d1cfcf',
      batteryColor: 'rgba(0, 0, 0, 0.7)',
      hoverColor: 'white',
    },
  },

  isEnglishMode: false,
  setIsEnglishMode: (isEnglishMode) => set((state) => ({ ...state, isEnglishMode })),
  inEnglishMOde: { fontFamily: "'Orbitron', sans-serif" },
  inKoreanMode: { fontFamily: "'Noto Sans KR', sans-serif" },
});

const useStore = create(devtools(store));

export default useStore;
//Cyberpunk Game Kit by Quaternius via Poly Pizza