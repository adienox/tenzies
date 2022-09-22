import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/Die';
import Title from './components/Title';
import ToggleSwitch from './components/ToggleSwitch';
import RollButton from './components/RollButton';
import Instructions from './components/Instructions';

export default function App() {
    // **Modal

    const [dice, setDice] = useState(allNewDice());
    const [timerOn, setTimerOn] = useState(false);
    const [gameState, setGameState] = useState({
        tenzies: false,
        rolls: 0,
        darkMode: true,
        time: 0,
    });
    const mode = gameState.darkMode ? 'dark' : 'light';

    const diceElements = dice.map((die) => {
        return (
            <Die
                key={die.id}
                value={die.value}
                held={die.isHeld}
                onClick={() => heldChange(die.id)}
                mode={mode}
            />
        );
    });

    function allNewDice() {
        const diceList = [];
        for (let i = 0; i < 10; i++) {
            diceList.push(generateNewDice());
        }
        return diceList;
    }

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }
    // **Controller

    function setGameStateHelper(key, value) {
        setGameState((prevState) => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    }

    function rollDice() {
        if (!gameState.tenzies) {
            setGameStateHelper('rolls', gameState.rolls + 1);
            setDice((prevDice) =>
                prevDice.map((die) => {
                    return die.isHeld ? die : generateNewDice();
                })
            );
            if (gameState.rolls === 0) {
                setTimerOn(true);
            }
        } else {
            setDice(allNewDice());
            setGameStateHelper('rolls', 0);
            setGameStateHelper('tenzies', false);
        }
    }

    function heldChange(id) {
        if (!gameState.tenzies && gameState.rolls === 0) {
            setTimerOn(true);
        }
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    function darkModeToggle(event) {
        const checked = event.target.checked;
        setGameStateHelper('darkMode', checked);
    }

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSame = dice.every((die) => die.value === firstValue);

        if (allHeld && allSame) {
            setGameStateHelper('tenzies', true);
            setTimerOn(false);
        }
    }, [dice]);

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setGameState((prevState) => {
                    return {
                        ...prevState,
                        time: prevState.time + 10,
                    };
                });
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);
    // **Visual

    return (
        <main className={mode}>
            {gameState.tenzies && <Confetti />}
            <ToggleSwitch
                checked={gameState.darkMode}
                onChange={darkModeToggle}
            />
            <Title
                tenzies={gameState.tenzies}
                rolls={gameState.rolls}
                mode={mode}
            />
            <Instructions
                tenzies={gameState.tenzies}
                time={gameState.time}
                mode={mode}
            />
            
            <div className="dieContainer">{diceElements}</div>
            <RollButton
                tenzies={gameState.tenzies}
                onClick={rollDice}
                mode={mode}
            />
        </main>
    );
}
