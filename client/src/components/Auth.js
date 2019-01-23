import React from "react";
import App from "../App";

const Auth = App => Login =>
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoggedIn: false
      };
    }
    render() {
      return <div>{this.state.isLoggedIn ? <App /> : <Login />}</div>;
    }
  };
export default Auth;
