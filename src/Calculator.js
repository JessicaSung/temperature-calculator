import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
}

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
	const input = parseFloat(value);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class TemperatureInput extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render() {
		const value = this.props.value;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input 
					value={value}
					onChange={this.handleChange} />
			</fieldset>
		);
	}

}

export default class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '', scale: 'c' };
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}

	handleCelsiusChange(value) {
		this.setState({	scale: 'c',	value });
	}

	handleFahrenheitChange(value) {
		this.setState({	scale: 'f',	value });
	}

	render() {
		const scale = this.state.scale;
		const value = this.state.value;
		const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
		const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

		return (
			<div>
				<TemperatureInput 
					scale="c"
					value={celsius}
					onChange={this.handleCelsiusChange} />
				<TemperatureInput 
					scale="f"
					value={fahrenheit}
					onChange={this.handleFahrenheitChange} />
				<BoilingVerdict
					celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

ReactDOM.render(<Calculator />, document.getElementById('app'));