import * as React from 'react';
import './App.scss';
import { Snake } from './components/Snake';
import { IGameState, EDirection, ICoordinates } from './models';
import { Dermo } from './components/Dermo';
import { hasSnakeEatenDermo, generateDermoForSnake, screenDimension, hasSnakeBiteItself } from './utils';

const initialSnakePosition: ICoordinates[] = [
  { x: 2, y: 9 },
  { x: 3, y: 9 },
  { x: 4, y: 9 },
  { x: 5, y: 9 },
  { x: 6, y: 9 },
  { x: 7, y: 9 },
  { x: 8, y: 9 },
  { x: 9, y: 9 },
  { x: 10, y: 9 },
];

class App extends React.Component<{}, IGameState> {
  protected moveInterval: any = null;
  public state: IGameState = {
    position: initialSnakePosition,
    dermoPosition: generateDermoForSnake(initialSnakePosition),
    currentDirection: null,
    lost: false
  }

  public componentDidMount () {
    document.onkeydown = this.handleSnakeMove;
  }

  private handleSnakeMove = (event: KeyboardEvent) => {
    if (this.state.lost) {
      this.setState({lost: false});
      return;
    }
    let currentDirection = this.state.currentDirection;
    if (Math.abs(event.keyCode - Number(currentDirection)) === 2) {
      return false;
    }
    this.setState((prevState) => {  
      let snakeHeadPosition: ICoordinates = prevState.position[prevState.position.length - 1];
      let snakeHeadNewPosition: ICoordinates = snakeHeadPosition;
      let updatedDirection = this.state.currentDirection;
      switch (event.keyCode) {
        case EDirection.UP:
          snakeHeadNewPosition = {
            x: snakeHeadPosition.x,
            y: snakeHeadPosition.y === 1 ? screenDimension.height : snakeHeadPosition.y - 1
          };
          updatedDirection = EDirection.UP;
          break;
        case EDirection.RIGHT:
          snakeHeadNewPosition = {
            x: snakeHeadPosition.x === screenDimension.width ? 1 : snakeHeadPosition.x + 1,
            y: snakeHeadPosition.y
          };
          updatedDirection = EDirection.RIGHT;
          break;
        case EDirection.DOWN:
          snakeHeadNewPosition = {
            x: snakeHeadPosition.x,
            y: snakeHeadPosition.y === screenDimension.height ? 1 : snakeHeadPosition.y + 1
          };
          updatedDirection = EDirection.DOWN;
          break;
        case EDirection.LEFT:
          snakeHeadNewPosition = {
            x: snakeHeadPosition.x === 1 ? screenDimension.width : snakeHeadPosition.x - 1,
            y: snakeHeadPosition.y
          } 
          updatedDirection = EDirection.LEFT;
          break;
        default: break;
      }

      const updatedPosition = !hasSnakeEatenDermo(prevState.dermoPosition, snakeHeadPosition) 
        ? prevState.position.filter((_, index) => index) 
        : prevState.position;
      const newSnakePosition = [...updatedPosition, snakeHeadNewPosition];
      const newDermoPosition = hasSnakeEatenDermo(prevState.dermoPosition, snakeHeadPosition) 
        ? generateDermoForSnake([...updatedPosition, snakeHeadNewPosition])
        : prevState.dermoPosition;
      return {
        currentDirection: updatedDirection,
        position: newSnakePosition,
        dermoPosition: newDermoPosition
      }
    })

    if (currentDirection !== event.keyCode) {
      this.moveInterval && clearInterval(this.moveInterval);
      this.moveInterval = null;
      this.moveInterval = setInterval(() => {
        this.handleSnakeMove(event)
      }, 70);

      
    }

    if (hasSnakeBiteItself(this.state.position)) {
      this.moveInterval && clearInterval(this.moveInterval);
      this.moveInterval = null;
      this.setState({
        position: initialSnakePosition,
        dermoPosition: generateDermoForSnake(initialSnakePosition),
        currentDirection: null,
        lost: true
      })
    }
    
  }

  public render () {
    return (
      <div className="screen">
        {!this.state.lost && <Snake
            position={this.state.position}
        />}
        <Dermo coordinates={!this.state.lost ? this.state.dermoPosition : undefined}/>
        <div style={{textAlign: 'center', position: 'absolute', top: (screenDimension.height * 16) + 'px', width: (screenDimension.width * 16) + 'px'}}>
          {this.state.lost ? 
            <h1 style={{color: 'red'}}>You lose. Press any key to continue</h1> : 
            <h1>Score: {(this.state.position.length - initialSnakePosition.length) * 5}</h1>
          }
        </div>
      </div>
    )
  }
}



export default App;
