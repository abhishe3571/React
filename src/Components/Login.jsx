import { event } from "jquery";
import { Component } from "react";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", message: "" };
  }
  render() {
    return (
      <div>
        {/* Email start */}
        <h4 className="m-1 p-2 border-bottom">Login</h4>
        <div className="form-group form-row">
          <label className="col-lg-4">Email</label>
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </div>
        {/* Email end */}

        {/* Password start */}
        <div className="form-group form-row">
          <label className="col-lg-4">Password</label>
          <input
            type="text"
            className="form-control"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>
        {/* Password end */}
        <div className="text-right">
          {this.state.message}
          <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
  //   render ends here

  //Execute when user click on login
  onLoginClick = async () => {
    console.log(this.state);

    let response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );
    let body = await response.json();

    if (body.length > 0) {
      //success

      //update the message property of state of current component
      this.setState({
        message: <span className="text-success">Successfully logged-in</span>,
      });
      //call the App Component's updateIsLoggedInStatus method
      this.props.updateIsLoggedInStatus(true);
    } else {
      this.setState({
        message: (
          <span className="text-danger">Invalid login, Please try again</span>
        ),
      });
    }
  };
}
