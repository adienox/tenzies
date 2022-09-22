export default function ToggleSwitch(props) {
    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
            <span className="slider"></span>
        </label>
    );
}
