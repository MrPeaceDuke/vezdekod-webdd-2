import React from "react";
import $ from "jquery";
import axios from "axios";
import Alert from "./components/alert";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			phone: "",
			textarea: "",
			requests: [],
			alert: false
		}
	}
	sendRequest() {
		let body = {
			name: this.state.name,
			phone: this.state.phone,
			requestText: this.state.textarea
		};
		axios.post("http://83.220.175.94:3000/api/request", body, {
			headers: { 'Access-Control-Allow-Origin': '*' }
		}).then(response => {
			if (response.data) {
				this.setState({
					alert: true
				}, () => {
					
					this.setState({
						name: "",
						phone: "",
						textarea: ""
					})
					$("#name").val("");
					$("#textarea").val("");
					setTimeout(() => {
						this.setState({
							alert: false
						})
					}, 4000);
				})
			}
		});

	}
	phoneInput(e) {
		// console.log(e);
		if (Number.isInteger(parseInt(e.nativeEvent.data))) {
			if (this.state.phone.length === 0) this.state.phone = "+";
			this.setState({
				phone: this.state.phone + e.nativeEvent.data
			});
		} else if (e.nativeEvent.inputType === "deleteContentBackward") {
			if (this.state.phone.length === 1) {
				this.setState({
					phone: ""
				})
			} else {
				this.setState({
					phone: this.state.phone.substring(0, this.state.phone.length - 1)
				})
			}
		}
	}
	render() {
		return (
			<div className="App h-100 w-100" style={{
				position: "absolute"
			}}>
				<Alert opened={this.state.alert} />
				<div className="d-flex flex-row h-100 justify-content-center align-items-center">
					<div className="d-flex flex-column" style={{
						width: "40vw"
					}}>
						<div className="d-flex flex-row">
							<div className="d-flex flex-column w-100">
								<label for="name" className="form-label" style={{
									textAlign: "left"
								}}>Фамилия Имя Отчество:</label>
								<input type="text" className="form-control" id="name" defaultValue={this.state.name} onInput={(e) => {
									this.setState({
										name: $("#name").val()
									})
								}} placeholder="Иванов Иван Иванович" />
							</div>
						</div>
						<div className="d-flex flex-row">
							<div className="d-flex flex-column w-100">
								<label for="phone" className="form-label" style={{
									textAlign: "left"
								}}>Номер телефона:</label>
								<input type="text" className="form-control" id="phone" value={this.state.phone} placeholder="+78009997777" onInput={(e) => this.phoneInput(e)} />
							</div>
						</div>
						<div className="d-flex flex-row">
							<div className="d-flex flex-column w-100">
								<label for="textarea" className="form-label" style={{
									textAlign: "left"
								}}>Обращение:</label>
								<textarea class="form-control" id="textarea" aria-label="textarea" rows="7" defaultValue={this.state.textarea} onInput={(e) => {
									this.setState({
										textarea: $("#textarea").val()
									})
								}} ></textarea>
							</div>
						</div>
						<div className="d-flex flex-row mt-3">
							<button type="submit" class="btn btn-primary" onClick={() => { this.sendRequest(); }}>Отправить обращение</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
