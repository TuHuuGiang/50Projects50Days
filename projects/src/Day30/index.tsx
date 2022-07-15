import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: darksalmon;
  min-height: 100vh;

  .speed {
    padding: 20px;
    position: absolute;
    bottom: 20px;
    background-color: rgba(0, 0, 0, 0.1);

    label {
      font-size: 20px;
    }

    input {
      width: 50px;
      font-size: 18px;
      text-align: center;
      padding: 4px;
      border: none;
      outline: none;
      background-color: darksalmon;
    }
  }
`;

export default function AutoTextEffect() {
  const [textShow, setTextShow] = useState<string>("We Love Programing!");
  const [speed, setSpeed] = useState<any>(1);
  let index = 1;

  useEffect(() => {
    let changeSpeed = Number(300 / speed);
    console.log(changeSpeed);
    let setTime = setInterval(() => {
      autoShowText();
    }, changeSpeed);

    return () => {
      clearInterval(setTime);
    };
  }, [speed]);

  const autoShowText = () => {
    if (index > textShow.length) {
      index = 1;
    }
    let newText = textShow.slice(0, index);
    index++;
    console.log(index, newText);
    setTextShow(newText);
  };

  return (
    <>
      <Container>
        <div className="show-text">
          <h1>{textShow}</h1>
        </div>
        <div className="speed">
          <label htmlFor="speed">Speed: </label>
          <input
            type="number"
            value={speed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSpeed(e.target.value)
            }
          />
        </div>
      </Container>
    </>
  );
}
