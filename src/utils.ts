import { ICoordinates } from "./models";

export const screenDimension = {
    width: 40,
    height: 24
}

export function generateRandomNumber (min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isSnakeOnPoint ({x, y}: ICoordinates, snakeCoordinates: ICoordinates[]): boolean {
    return snakeCoordinates.some((coordinate) => coordinate.x === x && coordinate.y === y)
}

export function isDermoOnPoint(pointCoordinates: ICoordinates, dermoCoordinates: ICoordinates): boolean {
    return pointCoordinates.x === dermoCoordinates.x && pointCoordinates.y === dermoCoordinates.y;
}

export function hasSnakeEatenDermo (dermoCoordinates: ICoordinates, snakeHeadCoordinates: ICoordinates): boolean {
    return snakeHeadCoordinates.x === dermoCoordinates.x && snakeHeadCoordinates.y === dermoCoordinates.y; 
}

export function generateDermoForSnake (snakeCoordinates: ICoordinates[]): ICoordinates {
    let x = generateRandomNumber(1, screenDimension.width);
    let y = generateRandomNumber(1, screenDimension.height);
    let dermoCoordinates: ICoordinates = { x, y }

    while (isSnakeOnPoint(dermoCoordinates, snakeCoordinates)) {
        dermoCoordinates = generateDermoForSnake(snakeCoordinates);
    }

    return dermoCoordinates;
}

export function hasSnakeBiteItself (snakeCoordinates: ICoordinates[]): boolean {
    const snakeHeadCoordinates = snakeCoordinates[snakeCoordinates.length - 1];

    return snakeCoordinates.filter(coordinate => {
        return coordinate.x === snakeHeadCoordinates.x && coordinate.y === snakeHeadCoordinates.y
    }).length > 1
}
