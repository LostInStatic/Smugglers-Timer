import React = require("react");
import { element } from "prop-types";



export default class Timer extends React.Component {
	props: {
		audioStart: HTMLAudioElement;
		audioEnd: HTMLAudioElement;
	}
	state: {
		isRunning: boolean,
		baseTime: number,
		offset: number,
		msg: string
	};

	constructor(props) {
		super(props)
		this.state = {
			isRunning: false,
			baseTime: 5,
			offset: 5,
			msg: ''
		};

		audioFixSafari([
			this.props.audioStart,
			this.props.audioEnd
		]);
	};

	handleBaseTimeChange(event: React.FormEvent<HTMLInputElement>) {
		this.setState({
			baseTime: parseInt(event.currentTarget.value)
		});
	};

	handleOffsetChange(event: React.FormEvent<HTMLInputElement>) {
		this.setState({
			offset: parseInt(event.currentTarget.value)
		});
	}

	async mainTimer() {
		let timeMs = (this.state.baseTime + randPosOffset(this.state.offset)) * 1000;
		this.props.audioStart.play();
		this.setState({ msg: 'GO!' });
		console.log(timeMs);
		await sleep(timeMs);
		this.props.audioEnd.play();
		this.setState({ msg: 'STOP!' });
		await sleep(1000);
	};

	async preCountdown() {
		this.setState({ msg: '3' });
		await sleep(1000);
		this.setState({ msg: '2' });
		await sleep(1000);
		this.setState({ msg: '1' });
		await sleep(1000);
	}

	async runTimer() {
		if (this.state.isRunning) {
			return
		}
		this.setState({ isRunning: true });
		await this.preCountdown();
		await this.mainTimer();
		this.setState({ isRunning: false })

	}
	render() {
		return (
			<div>
				<div className="timer-settings">
					<BaseTimeSetting
						baseTime={this.state.baseTime}
						onChange={(event) => this.handleBaseTimeChange(event)}
					/>
					<OffsetSetting
						offset={this.state.offset}
						onChange={(event) => this.handleOffsetChange(event)}
					/>
				</div>
				<div className='timer-msgs'>{this.state.msg}</div>
				<TimerButton isRunning={this.state.isRunning} onClick={() => this.runTimer()}></TimerButton>
			</div>

		)
	}
}

export class TimerButton extends React.Component {
	props: {
		isRunning: boolean
		onClick: Function
	};
	render() {
		let className = 'timer-button';
		let innerText = 'Start'

		if (this.props.isRunning) {
			className += ' timer-running'
			innerText = '***'
		}

		return <button
			className={className}
			onClick={() => this.props.onClick()}
		>
			{innerText}
		</button>
	}
};

class BaseTimeSetting extends React.Component {
	props: {
		onChange: Function
		baseTime: number,
	};

	render() {
		return (
			<label> Base time:
				<input
					type="number"
					name="base time"
					min="1"
					required
					value={this.props.baseTime}
					onChange={(event) => this.props.onChange(event)}
				/>
			</label>
		)
	}
}

class OffsetSetting extends React.Component {
	props: {
		onChange: Function
		offset: number,
	};

	render() {
		return (
			<label> Maximal random offset:
				<input
					type="number"
					name="offset"
					min="0"
					required
					value={this.props.offset}
					onChange={(event) => this.props.onChange(event)}
				/>
			</label>
		)
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function randPosOffset(maxOffset: number) {
	return Math.floor(Math.random() * (maxOffset + 1));
}

function audioFixSafari(audioToFix: Array<HTMLAudioElement>) {
	document.addEventListener(
		'touchstart',
		() => {
			audioToFix.forEach(element => {
				element.muted = true;
				element.play();
				element.pause()
				element.currentTime = 0;
				element.muted = false;
			});
		}
	)
}