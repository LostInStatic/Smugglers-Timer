import React = require("react");

interface IProps {
	value: number
	label: string,
	callback: (value: number) => void
	className?: string
}

const NaturalNumberInput: React.FC<IProps> = (props) => {

	return <label
		className={
			props.className ? props.className : "input-nat-number"
		}
	>
		{props.label}
		<input
			type="number"
			onFocus={e => { e.target.select() }}
			value={props.value} //cleans up visually
			onChange={e => {
				props.callback(validate(props.value, e.target.value))
			}}
		/>
	</label>
};

export default NaturalNumberInput;

const validate = (currentValue: number, input: string) => {
	if (input === '') input = '0'; //allows zeroing by deleting input
	const parsedInput = parseNaturalNumber(input);
	if (isNaN(parsedInput)) {
		return currentValue;
	} else return parsedInput;
};

const parseNaturalNumber = (value: string): number => {
	const int = parseInt(value);

	if (int >= 0) {
		return int
	} else if (int < 0) {
		return 0
	} else return NaN

};