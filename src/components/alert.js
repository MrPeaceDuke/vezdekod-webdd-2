import React from "react";

class Alert extends React.Component {

	render() {
		return (
			<div class="alert alert-success animate__animated animate__fadeInDown" role="alert" style={{
				margin: "0",
				display: this.props.opened ? "flex" : "none",
				position: "absolute",
				bottom: "2vw",
				right: "5vw"
			}}>
				Обращение успешно отправлено
			</div>
		)
	}
}
export default Alert;
