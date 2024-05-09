import { useState, useEffect } from 'react';


//zustand
import useStore from '../../store/store';

//axios
import axios from '../../../plugins/axios';

//notion
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

//css
import styled from 'styled-components';

const Contact = () => {
  
  //variable
  const [recordMap, setRecordMap] = useState(null);
  const { inApp,isDarkMode } = useStore();


  //functions

  //hooks
  useEffect(() => {
    if (inApp) { 
      axios
        .get('/notion/contact')
        .then((res) => {
          const record = res.data.recordMap;
          setRecordMap(record);
        })
        .catch((err) => console.error(err))
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

  return (
    <>
      <Contents>
        <Notion>
          {recordMap ? (
            <NotionRenderer disableHeader={true} darkMode={isDarkMode ? true : false} recordMap={recordMap} fullPage={true} />
          ) : (
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Loader />
            </div>
          )}
        </Notion>
      </Contents>
    </>
  );
};

export default Contact;

const Contents = styled.div`
  display: flex;
  height: 90%;
  color: white;
`;

const Notion = styled.div`
  width: 100%;
  padding: 2px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #171720;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(10, 201, 74, 0.7);
    border-radius: 5px;
    cursor: pointer;
  }
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