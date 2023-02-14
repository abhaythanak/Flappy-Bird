import { useEffect, useState } from 'react';
import styled from "styled-components";
import './App.css';

 
const BirdSize = 20;
const GameWidth = 500;
const GameHeight = 500;
const Gravity = 6;
const JumpHeight = 50;
const obstacleWidth = 40;
const obstacleGap = 200;


function App() {
const [birdPosition, setBirdPosition] = useState(250)
const [gameHasStarted, setGameHasStarted] = useState(false);
const [obstacleLeft, setObstacleLeft] = useState(GameWidth-obstacleWidth)
const [obstacleHeight, setObstacleHeight] = useState(200);
const [score, setScore] = useState()

const bottomObstacleHeight = GameHeight-obstacleGap-obstacleHeight

 useEffect(() =>{
  let timeId;
  if (gameHasStarted && birdPosition < GameHeight - BirdSize ) {
    timeId = setInterval(() => {
      setBirdPosition(birdPosition => birdPosition + Gravity)
    },25)
  }
  return() =>{
    clearInterval(timeId)
  }
 },[birdPosition, gameHasStarted])

 useEffect(() =>{
  let obstacleId;
  if (gameHasStarted && obstacleLeft >= -obstacleWidth){
    obstacleId = setInterval(() => {
      setObstacleLeft ((obstacleLeft) => obstacleLeft - 10);
    }, 24);

    return () => {
      clearInterval(obstacleId)
    }
  }
  else {
    setObstacleLeft(GameWidth- obstacleWidth);
    setObstacleHeight(
      Math.floor(Math.random() * (GameHeight - obstacleGap))
    );
    setScore((score) => score + 1)
  }
 },[gameHasStarted, obstacleLeft]);

 useEffect(() =>{
  const collisionTopObsticle = 
  birdPosition>= 0 && birdPosition <obstacleHeight;
  const collisionBottomObsticle =
  birdPosition <= 500 && birdPosition >=500 - bottomObstacleHeight;

  if (
    obstacleLeft >= 0 && 
    obstacleLeft <= obstacleWidth && 
    (collisionTopObsticle || collisionBottomObsticle)
  ) {

    setGameHasStarted(false)
  }
 },[birdPosition,obstacleHeight,bottomObstacleHeight,obstacleLeft])

 const handleClick = () =>{
  let newBirdPosition = birdPosition - JumpHeight;
  if (!gameHasStarted) {
    setGameHasStarted(true);
    setScore(0)
    setBirdPosition(250);
  }
 else if (newBirdPosition < 0) {
    setBirdPosition(0);
  }else {
    setBirdPosition(newBirdPosition)
  }
  
 }


  return (
      <Div onClick={handleClick}>
        <GameBox height={GameHeight} width={GameWidth}>
          <Obstacle 
          top={0}
          width={obstacleWidth}
          height={obstacleHeight}
          left={obstacleLeft}
           />
          <Obstacle 
          top={GameHeight - (obstacleHeight + bottomObstacleHeight)} 
          height={bottomObstacleHeight} 
          width={obstacleWidth} 
          left={obstacleLeft}/>
        <Bird size={BirdSize} top={birdPosition}/>
        <span>{score}</span>
        </GameBox>
      </Div>
  );
}

export default App;

const Bird = styled.div`
position: absolute;
background-color: red;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top : ${(props) => props.top}px;
border-radius: 50%
`;

const Div = styled.div`
display: flex;
width: 100%;
justify-content: center;
& span{
  color:white;
  font-size: 24px;
  position:absolute
}
`

const GameBox = styled.div`
height: ${(props) => props.height}px;
width: ${(props) => props.width}px;
background-color: violet;
overflow: hidden;
`
const Obstacle = styled.div`
position: relative;
top: ${(props) => props.top}px;
background-color: green; 
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
left: ${(props) => props.left}px;
`