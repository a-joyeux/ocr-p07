import * as React from "react";
import logo from "../img/icon-above-font.svg";
import "./styles/logo.scss";

class Logo extends React.Component {
  render() {
    return <img class="logo" src={logo}></img>;
  }
}

export default Logo;
