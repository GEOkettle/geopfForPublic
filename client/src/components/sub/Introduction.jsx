
import { useEffect, useState } from 'react';

//react-router-dom
import { Link } from 'react-router-dom';

//zustand
import useStore from '../../store/store';
//immutable.js
import { List } from 'immutable';
//css
import styled from 'styled-components';

const Introduction = () => {
  //variable
  const [lines, setLines] = useState(List());
  const [buttons, setButtons] = useState(false);
  const { mainLogoDown, setMainLogo, inApp, setInApp, cookieCheck } = useStore();
  
  //function

  function promiseDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getPartialLines(lines, charCount) {
    let copiedLines = List();
    let remainingChars = charCount;
    lines.forEach((line) => {
      if (remainingChars <= line.length) {
        copiedLines = copiedLines.push(line.slice(0, remainingChars));
        remainingChars = 0;
      } else {
        copiedLines = copiedLines.push(line);
        remainingChars -= line.length;
      }
    });
    return copiedLines;
  }

  const enterApp = () => {
    setButtons(false);
    setInApp(true);
  };

  const leaveApp = () => {
    setButtons(false);
    setMainLogo(false);
  };

  //useEffect
  useEffect(() => {
    const words = ['Wake up, Neo...', 'The Matrix has you...', 'Follow the white rabbit.', 'Knock, knock, Neo', '안녕하세요 개발자 Geo입니다.', '제 포트폴리오를 구경하고 싶으시면', '아래의 Enter버튼을 눌러주세요.'];
    if (!cookieCheck) {
      const cookieReq = [`(본 사이트는 사용자 편의성을 개선하고`, `방문자 통계를 수집하기위한 목적으로만 쿠키를`, ` 사용합니다. 쿠키 수집에 동의하시겠습니까?)`];
      words.push(...cookieReq); // Using spread syntax to merge arrays
    } else {
      setButtons(false);
      setInApp(true);
    }
    const wordList = List(words);
    const totalChars = wordList.reduce((chars, line) => chars + line.length, 0); // 총 문자 수 계산

    async function doTyping() {
      let typedChars = 0;
      while (typedChars <= totalChars) {
        await promiseDelay(20);
        setLines(getPartialLines(wordList, typedChars));
        typedChars++;
      }
      setButtons(true);
    }
    if (mainLogoDown) {
      doTyping();
    }
  }, [mainLogoDown]);

  return (
    <>
      {mainLogoDown && !inApp ? (
        <Intro>
          <>
            {lines.map((line, index) => (
              <p key={index} style={{  fontSize: '18px' }}>
                {line}
              </p>
            ))}
          </>
          {buttons ? (
            <PillCase>
              <div>
                <RedPill onClick={enterApp}>Enter</RedPill>
              </div>
              <div>
                <BluePill onClick={leaveApp}>Leave</BluePill>
              </div>
            </PillCase>
          ) : (
            <></>
          )}
        </Intro>
      ) : (
        <></>
      )}
    </>
  );
};

export default Introduction;

const Intro = styled.div`
  @media screen and (max-width: 768px) {
    position: fixed;
    width: 300px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(23, 23, 32, 0.7);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* 그림자 설정 */
    border-radius: 5%;
    padding: 1%;
    color: #0f0;
    /* overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: ${(props) => props.theme.scorllBarColor};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.scrollColor};
      border-radius: 5px;
      cursor: pointer;
    } */
  }
  position: fixed;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(23, 23, 32, 0.7);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* 그림자 설정 */
  border-radius: 5%;
  padding: 1%;
  color: #0f0;
`;

const PillCase = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 10%;
  display: flex;
  justify-content: space-around;
`;
const RedPill = styled(Link)`
  background: #f05e5e;
  border-radius: 999px;
  box-shadow: #f05e5e 0 10px 20px -10px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Inter, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
`;
const BluePill = styled.div`
  background: #5e5df0;
  border-radius: 999px;
  box-shadow: #5e5df0 0 10px 20px -10px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Inter, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
`;
