import Timer from './timer'
import { render } from 'react-dom'
import * as React from 'react'
import './style.scss'


render(
	<Timer
		audioStart={new Audio('start.mp3')}
		audioEnd={new Audio('end.mp3')}
	/>,
	document.getElementById('js-app-container')
);