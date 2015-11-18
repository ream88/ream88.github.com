import styles from "./index.css";

import React, { PropTypes, Component, cloneElement } from "react";
import Cursor from "../Cursor";


export default class CommandLine extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    prompt:   PropTypes.string.isRequired
  }


  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      children: []
    };
  }


  componentDidMount() {
    this.next();
  }


  next() {
    if(this.props.children.length > 0) {
      this.setState({
        ...this.state,
        children: [...this.state.children, this.props.children.shift()]
      });
    } else {
      this.setState({
        ...this.state,
        complete: true
      });
    }
  }


  renderPrompt() {
    return (
      <span className={styles.Prompt} key="prompt">
        {this.props.prompt}&nbsp;
      </span>
    );
  }


  renderCommands() {
    return this.state.children.map((child) =>
      cloneElement(child, { key: child.props.command, onComplete: ::this.next })
    );
  }


  render() {
    const prompt = this.renderPrompt();
    const commands = this.renderCommands();

    // Convert given [command, command] to [prompt, command, br, prompt, command, br, ...]
    const children = commands
      .map((command, index) => [
        cloneElement(prompt, { key: `prompt-${index}` }),
        command,
        <br key={`br-${index}`} />
      ])
      .reduce((a, b) => a.concat(b), []);

    return (
      <div className={styles.CommandLine}>
        {children}
        {this.state.complete ? [prompt, <Cursor key="cursor" />] : null}
      </div>
    );
  }
}
