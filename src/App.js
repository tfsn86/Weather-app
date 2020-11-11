import React from 'react';

const API_key = 'cd7f0b57eaef7dd77db85c3ff318ae08';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: '',
			weatherData: {},
		};
		this.handleChange = this.handleChange.bind(this);
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

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		if (!this.state.weatherData.weather) {
			return <span>Loading...</span>;
		}

		const temp = parseInt(this.state.weatherData.main.temp);

		return (
			<div>
				<form
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: 150,
						marginBottom: 50,
					}}
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
					<h1 style={{ margin: 5 }}>{temp} °C</h1>
					<h3 style={{ margin: 10 }}>
						{this.state.weatherData.name}, {this.state.weatherData.sys.country}
					</h3>
				</div>
			</div>
		);
	}
}

export default App;
