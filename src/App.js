import React from 'react';
import API_key from './API_key';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: '',
			weatherData: {},
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	componentDidMount() {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=Copenhagen&units=metric&APPID=${API_key}`
		).then((response) => {
			response.json().then((data) => {
				this.setState({
					weatherData: data,
				});
			});
		});
	}

	handleSubmit(event) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=metric&APPID=${API_key}`
		).then((response) => {
			response.json().then((data) => {
				this.setState({
					weatherData: data,
				});
			});
		});
		event.preventDefault();
	}

	render() {
		if (!this.state.weatherData.weather) {
			return <span>Loading...</span>;
		}

		const temp = parseInt(this.state.weatherData.main.temp);
		const windSpeed = parseInt(this.state.weatherData.wind.speed);

		return (
			<div>
				<form
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: 150,
						marginBottom: 50,
					}}
					onSubmit={this.handleSubmit}
				>
					<label>
						Location:
						<input
							style={{ marginLeft: 10 }}
							type="text"
							value={this.state.location}
							name="location"
							onChange={this.handleChange}
						/>
					</label>
					<button style={{ marginLeft: 10 }}>Submit</button>
				</form>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h2 style={{ margin: 10 }}>
						{this.state.weatherData.name}, {this.state.weatherData.sys.country}
					</h2>
					<h4 style={{ margin: 5 }}>
						{this.state.weatherData.weather[0].main}
					</h4>
					<h4 style={{ margin: 3 }}>{windSpeed} m/s</h4>
					<h1 style={{ margin: 5 }}>{temp} °C</h1>
				</div>
			</div>
		);
	}
}

export default App;
