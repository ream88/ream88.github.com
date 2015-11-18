import "./index.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommandLine from "../CommandLine";
import Command from "../Command";


export default class Terminal extends Component {
  render() {
    return (
      <main>
        <CommandLine prompt="~#">
          <Command command="whoami">
            Mario Uher
          </Command>
          <Command command="uptime">
            up 27 years
          </Command>
          <Command command="cat more.txt">
            <a href="https://twitter.com/ream88" target="_blank">Twitter</a>
            <br />
            <a href="https://github.com/haihappen" target="_blank">GitHub</a>
            <br />
            <a href="mailto:uher.mario@gmail.com">Email</a>
          </Command>
        </CommandLine>
      </main>
    );
  }
}


if (typeof document !== "undefined") {
  ReactDOM.render(<Terminal />, document.body);
}
