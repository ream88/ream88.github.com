import "./index.css";
import React from "react";
import CommandLine from "../CommandLine";
import Command from "../Command";

const App = () => (
  <CommandLine prompt="~#">
    <Command command="whoami">
      Mario Uher
    </Command>
    <Command command="uptime">
      up 30 years
    </Command>
    <Command command="cat more.txt">
      <a href="https://twitter.com/ream88" target="_blank">Twitter</a>
      <br />
      <a href="https://github.com/haihappen" target="_blank">GitHub</a>
      <br />
      <a href="mailto:uher.mario@gmail.com">Email</a>
    </Command>
  </CommandLine>
);

export default App;
