import React, {useState} from 'react';
import {createStage} from '../gameHelpers';

//Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatedPlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);
    const moveDirections = {
        LEFT: {key: 37, value: -1},
        RIGHT: {key: 39, value: 1},
        DOWN: {key: 40}
    }

    const movePlayer = dir => {
        updatedPlayerPos({x: dir, y: 0});
    }

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatedPlayerPos({x: 0, y: 1, collided: false});
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === moveDirections.LEFT.key){
                movePlayer(moveDirections.LEFT.value);
            }
            else if(keyCode === moveDirections.RIGHT.key){
                movePlayer(moveDirections.RIGHT.value);
            }
            else if(keyCode === moveDirections.DOWN.key){
                dropPlayer();
            }
            
        }
    }

  return (
    <StyledTetrisWrapper
        role='button'
        tabIndex='0'
        onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
            {
                gameOver ? (
                    <Display gameOver={gameOver} text="Game over"/>
                ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                )
            }
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;