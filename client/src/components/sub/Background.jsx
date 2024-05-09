
import { useEffect, useRef } from 'react'
import useStore from '../../store/store';
//css
import styled from 'styled-components';

const Background = () => {

  //variable
  const canvasRef = useRef(null);
  const { isDarkMode } = useStore();
  //function

  //useEffect
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = lowercase + uppercase + nums;

    const fontSize = 8;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    setInterval(draw, 60);
  }, [isDarkMode]);
  return (
        <StyledCanvas ref={canvasRef}></StyledCanvas>
  )
}

export default Background


const StyledCanvas = styled.canvas`
  @media screen and (max-height: 280px) {
    height: 300%;
  }
  @media screen and (min-height: 281px) and (max-height: 750px) {
    height: 230%;
  }
  @media screen and (min-height: 750px) and (max-height: 815px) {
    height: 150%;
  }
  @media screen and (min-height: 816px) and (max-height: 820px) {
    height: 110%;
  }
  /* @media screen and (min-height: 821px) and (max-height: 920px) {
    height:140%;
    } */

  width: 100%;
  height: 99.6%;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;