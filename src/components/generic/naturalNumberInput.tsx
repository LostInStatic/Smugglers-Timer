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
			"input-nat-number " +
			props.className
		}
	>
		{props.label}
		<input
			type="number"
			pattern="[0-9]*"
			inputMode="numeric"
			formNoValidate
			onFocus={e => { e.target.select() }}
			value={props.value || ' '}
			onChange={e => {
				props.callback(validate(props.value, e.target.value))
			}}
		/>
	</label>
};

export default NaturalNumberInput;

const validate = (currentValue: number, input: string) => {
	if (input === '') input = '0';//allows zeroing by deleting input
	const parsedInput = parseNaturalNumber(input);
	if (isNaN(parsedInput)) {
		return currentValue;
	} else return parsedInput;
};

const parseNaturalNumber = (value: string, radix: number = 10): number => {
	const int = parseInt(value, radix);

	if (int >= 0) {
		return int
	} else if (int < 0) {
		return 0
	} else return NaN

};