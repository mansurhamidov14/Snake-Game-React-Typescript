export interface ICoordinates {
    x: number;
    y: number;
}

export enum EDirection {
    LEFT = 37,
    UP,
    RIGHT,
    DOWN
}

export interface ISnakeProps {
    color?: string;
    position: ICoordinates[];
    onMove?: (direction: EDirection) => void
}

export interface IGameState {
    position: ICoordinates[];
    dermoPosition: ICoordinates;
    currentDirection: EDirection | null;
    lost: boolean;
}