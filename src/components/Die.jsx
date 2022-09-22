import React from 'react';

export default function Die(props) {
    const dieState = props.held ? 'dieHeld' : 'dieFree';
    return (
        <div
            className={`die ${dieState} ${props.mode}`}
            onClick={props.onClick}
        >
            <h4>{props.value}</h4>
        </div>
    );
}
