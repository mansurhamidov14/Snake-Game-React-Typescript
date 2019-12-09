import React from 'react';
import { ISnakeProps } from '../models';
import { screenDimension, isSnakeOnPoint } from '../utils';


const horizontalPixels: number[] = [];
const verticalPixels: number[] = [];

for (let i = 1; i <= screenDimension.width; i++) {
    horizontalPixels.push(i);
}

for (let i = 1; i <= screenDimension.height; i++) {
    verticalPixels.push(i);
}

export const Snake: React.FC<ISnakeProps> = ({
    position,
}: ISnakeProps) => {
    return (
        <div className="position-absolute z-2">
            {verticalPixels.map((y, i) => (
                <div className="screen-row" key={i}>
                    {horizontalPixels.map((x, k) => (
                        <div key={k} className={`screen-dot snake ${isSnakeOnPoint({x, y}, position) && 'screen-dot__active'}`}/>
                    ))}
                </div>
            ))}
        </div>
    )
}