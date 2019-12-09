import * as React from 'react';
import { ICoordinates } from '../models';
import { screenDimension, isDermoOnPoint } from '../utils';

interface IProps {
    coordinates?: ICoordinates;
}

const horizontalPixels: number[] = [];
const verticalPixels: number[] = [];

for (let i = 1; i <= screenDimension.width; i++) {
    horizontalPixels.push(i);
}

for (let i = 1; i <= screenDimension.height; i++) {
    verticalPixels.push(i);
}

export const Dermo: React.FC<IProps> = ({coordinates}) => {
    return (
        <div className="position-absolute z-1">
            {verticalPixels.map((y, i) => (
                <div className="screen-row" key={i}>
                    {horizontalPixels.map((x, k) => (
                        <div key={k} className={`screen-dot dermo ${coordinates && isDermoOnPoint({x, y}, coordinates) && 'screen-dot__danger'}`}/>
                    ))}
                </div>
            ))}
        </div>
    )
}