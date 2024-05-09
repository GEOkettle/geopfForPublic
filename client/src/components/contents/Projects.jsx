import { useState, useEffect, useRef } from 'react';

//zustand
import useStore from '../../store/store';

//axios
import axios from '../../../plugins/axios';

//notion
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // 코드 하이라이트 스타일용 (선택)
// import 'katex/dist/katex.min.css';// 공식등 수학적 기호 스타일용 (선택)
import { Code } from 'react-notion-x/build/third-party/code'; //code
import { Collection } from 'react-notion-x/build/third-party/collection'; //db table
import { Equation } from 'react-notion-x/build/third-party/equation'; //math fomula
import { Modal as NotionModal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

//css
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';

//internal components & functions
const LinkWrapper = (props) => {
  //variable
  const { setCurrentPost } = useStore();
  const [postId, setPostId] = useState(null);

  //functions
  function getPageId(event) {
    event.preventDefault();
    const rawHref = event.target?.parentNode?.parentNode?.getAttribute('href');
    const href = rawHref?.replace(/^\//, '');
    if (href) {
      setPostId(href);
    } else {
      // pageNotfound처리
    }
  }

  //hooks
  useEffect(() => {
    if (postId) {
      setCurrentPost(postId);
    }
  }, [postId]);

  return (
    <div style={{ height: '100%', width: '100%' }} onClick={getPageId}>
      {props.children}
    </div>
  );
};

const Projects = () => {
  //variable
  const [recordMap, setRecordMap] = useState(null);
  const [modalRecord, setModalRecord] = useState(null);
  const [open, setOpen] = useState(false);
  const { inApp, currentPost, setCurrentPost,isDarkMode } = useStore();
  const notionRef = useRef(null);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(500));

  //functions
  const handleClose = () => {
    setOpen(false);
    setCurrentPost('');
    setModalRecord(null);
  };

  //hooks
  useEffect(() => {
    if (inApp) {
      axios
        .get('/notion/pjList')
        .then((res) => {
          const record = res.data.recordMap;
          setRecordMap(record);
        })
        .catch((err) => console.error(err));
    }
  }, [inApp]);

  useEffect(() => {
    if (notionRef && recordMap) {
      const template = notionRef.current.children[0].children[0].children[1].children[0].children[0];
      template.style.width = '100%';
      template.style.height = '100%';
      template.style.padding = '1% 5%';
      template.style.marginTop = '0!important';
    }
  }, [recordMap, notionRef]);

  useEffect(() => {
    if (currentPost) {
      if (currentPost !== '') {
        setOpen(true);
        const postInfo = {
          postId: currentPost,
        };
        axios.post('/notion/getPost', postInfo).then((res) => {
          setModalRecord(res.data.recordMap);
        });
      } else {
        setOpen(false);
      }
    }
  }, [currentPost]);

  useEffect(() => {
    setTimeout(() => {
      const notionPage = document.getElementsByClassName('notion-page');
      const notionPageScroller = document.getElementsByClassName('notion-page-scroller');
      const notionCards = document.getElementsByClassName('notion-collection-card');
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
      if (notionCards) { 
        let i;
        for (i = 0; i < notionCards.length; i++) { 
          if (isDarkMode) {
            notionCards[i].style.background = '#2f3437';
          } else { 
            notionCards[i].style.border = '1px solid black';
            notionCards[i].style.background = '#F2F1E9';
            notionCards[i].style.boxShadow = '0px 0px 10px #5a5050';
          }
        }
      }
    }, 500);
  });
  return (
    <>
      <Contents>
        <Notion ref={notionRef}>
          <LinkWrapper>
            {recordMap ? (
              <NotionRenderer
                components={{
                  Code,
                  Collection,
                  Equation,
                  NotionModal,
                  Pdf,
                }}
                disableHeader={true}
                darkMode={isDarkMode ? true : false}
                recordMap={recordMap}
                fullPage={true}
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Loader />
              </div>
            )}
          </LinkWrapper>
        </Notion>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <ModalBox>
            <ModalHeader>
              <div onClick={handleClose} style={{ padding: '4px 6px 0 0', cursor: 'pointer' }}>
                <CancelIcon color="error" fontSize={isLargeScreen ? 'large' : 'medium'} />
              </div>
            </ModalHeader>
            <ModalContent>
              {modalRecord ? (
                <NotionRenderer
                  components={{
                    Code,
                    Collection,
                    Equation,
                    NotionModal,
                    Pdf,
                  }}
                  disableHeader={true}
                  darkMode={isDarkMode ? true : false}
                  recordMap={modalRecord}
                  fullPage={true}
                />
              ) : (
                <></>
              )}
            </ModalContent>
          </ModalBox>
        </Modal>
      </Contents>
    </>
  );
};

export default Projects;

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
    background-color: ${(props) => props.theme.scrollBarColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
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

const ModalBox = styled(Box)`
  box-shadow: 0px 0px 10px rgba(10, 201, 74, 0.7); /* 그림자 설정 */
  border-radius: 20px;
  position: fixed;
  width: 80%;
  height: 90%;
  color: white;
  display: flex;
  flex-direction: column;
  transform: translate(10%, 5%);
  background: ${(props) =>  props.theme.backgroundColor};
  
`;

const ModalHeader = styled.div`
  height: 5%;
  display: flex;
  justify-content: right;
  border-bottom: 1px solid rgba(10, 201, 74, 0);
  background: #2e7d32;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

`;
const ModalContent = styled.div`
  height: 95%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${(props) => props.theme.scrollBarColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 5px;
    cursor: pointer;
  }
`;
