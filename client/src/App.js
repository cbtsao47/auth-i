import React, { Component } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Register from "./components/Register";
import View from "./components/View";
import Login from "./components/Login";
import axios from "axios";
import { Route } from "react-router";
axios.defaults.withCredentials = true;
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log("cdm failed"));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route
            path="/home"
            render={props => <View {...props} data={this.state.data} />}
          />
          <Route path="/register" render={props => <Register {...props} />} />
        </header>
      </div>
    );
  }
}

export default App;
