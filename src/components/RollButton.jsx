export default function RollButton(props) {
    return (
        <button className={`rollDice ${props.mode}`} onClick={props.onClick}>
            {props.tenzies ? 'New Game' : 'Roll'}
        </button>
    );
}
