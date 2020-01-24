import React = require("react");
import NaturalNumberInput from "../generic/naturalNumberInput";
import TimerButton from "./button";




export default class Timer extends React.Component {
	props: {
		audioStart: HTMLAudioElement;
		audioEnd: HTMLAudioElement;
	}
	state: {
		isRunning: boolean,
		baseTime: number,
		maxOffset: number,
		msg: string
	};

	constructor(props) {
		super(props)
		this.state = {
			isRunning: false,
			baseTime: 5,
			maxOffset: 5,
			msg: ''
		};

		safariAudioFix([
			this.props.audioStart,
			this.props.audioEnd
		]);
	};

	handleBaseTimeChange(baseTime: number) {
		this.setState({
			baseTime
		});
	};

	handleOffsetChange(maxOffset: number) {
		this.setState({
			maxOffset
		});
	}

	async mainTimer() {
		let timeMs = (this.state.baseTime + randPosOffset(this.state.maxOffset)) * 1000;
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
					<NaturalNumberInput
						label="Base time:"
						value={this.state.baseTime}
						callback={val => this.handleBaseTimeChange(val)}
					/>
					<NaturalNumberInput
						label="Maximal random offset:"
						value={this.state.maxOffset}
						callback={val => this.handleOffsetChange(val)}
					/>
				</div>
				<div className='timer-msgs'>{this.state.msg}</div>
				<TimerButton isRunning={this.state.isRunning} callback={() => this.runTimer()}></TimerButton>
			</div>

		)
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function randPosOffset(maxOffset: number) {
	return Math.floor(Math.random() * (maxOffset + 1));
}

function safariAudioFix(audioToFix: Array<HTMLAudioElement>) {
	document.addEventListener(
		'touchstart',
		() => {
			audioToFix.forEach(audioElement => {
				audioElement.muted = true;
				audioElement.play();
				audioElement.pause()
				audioElement.currentTime = 0;
				audioElement.muted = false;
			});
		}
	)
}