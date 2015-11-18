import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import CommandLine from "../CommandLine";
import Command from "../Command";


const App = () => (
  <CommandLine prompt="~#">
    <Command command="whoami">
      Mario Uher
    </Command>
    <Command command="uptime">
      up 27 years
    </Command>
    <Command command="cat more.txt">
      up 27 years
    </Command>
  </CommandLine>
);


if (typeof document !== "undefined") {
  ReactDOM.render(<App />, document.querySelector("main"));
}


// Needed for react-to-html-webpack-plugin to work properly.
export default App;
