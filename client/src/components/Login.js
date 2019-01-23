import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const credentials = { ...this.state };
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button>Submit</button>
      </form>
    );
  }
}
export default Login;
