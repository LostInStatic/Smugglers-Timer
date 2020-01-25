import React = require('react');

interface IProps {
	isRunning: boolean,
	callback: () => void
}

const TimerButton = (props: IProps) => {
	{
		let className = 'timer-button';
		let innerText = 'Start';

		if (props.isRunning) {
			className += ' timer-running';
			innerText = '***';
		}

		return <button
			className={className}
			onClick={() => props.callback()}
		>
			{innerText}
		</button>;
	}
};


export default TimerButton;