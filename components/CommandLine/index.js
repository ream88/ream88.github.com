import styles from './index.css';

import React, { PropTypes, Component } from 'react';
import { addons } from 'react/addons';
const { cloneWithProps } = addons;
import Cursor from '../Cursor';


export default class CommandLine extends Component {
  static propTypes = {
    prompt:   PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  }


  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      children: []
    }
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
      })
    }
  }


  componentDidMount() {
    this.next();
  }


  render() {
    const prompt = this.renderPrompt();
    const commands = this.renderCommands();

    // Convert given [commands, commands] to [prompt, command, br, prompt, command, br, ...]
    const children = commands
      .map((command, index) => [cloneWithProps(prompt, { key: `prompt-${index}` }), command, <br key={'br-' + index} />])
      .reduce((a, b) => a.concat(b), []);

    return (
      <div className={styles.CommandLine}>
        {children}
        {this.state.complete ? [prompt, <Cursor />] : null}
      </div>
    );
  }


  renderPrompt() {
    return (
      <span className={styles.Prompt}>
        {this.props.prompt}
        &nbsp;
      </span>
    );
  }


  renderCommands() {
    return this.state.children.map((child) =>
      cloneWithProps(child, { key: child.props.command, onComplete: this.next.bind(this) })
    );
  }
}
