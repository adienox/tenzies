import React from 'react';

const Title = (props) => {
    return (
        <h1 className={`title ${props.mode}`}>
            {props.tenzies ? `${props.rolls} Rolls` : 'Tenzies'}
        </h1>
    );
};

export default Title;
