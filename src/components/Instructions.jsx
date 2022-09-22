import React from 'react';

const Instructions = (props) => {
    const time = (
        <span>
            Congrats on winning this game of tenzies! Your total time was
            <br />
            {('0' + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            {('0' + Math.floor((props.time / 1000) % 60)).slice(-2)}:
            {('0' + ((props.time / 10) % 100)).slice(-2)}
        </span>
    );
    const inst =
        'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.';
    return (
        <p className={`instructions ${props.mode}`}>
            {props.tenzies ? time : inst}
        </p>
    );
};

export default Instructions;
