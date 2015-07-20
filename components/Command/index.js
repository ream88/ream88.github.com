import styles from './index.css'
import React, { PropTypes, Component } from 'react';
import Cursor from '../Cursor';


export default class Command extends Component {
  static propTypes = {
    command:  PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.string
    ])
  }


  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      command: ''
    }
  }


  randomTimeout() {
    return Math.round(Math.random() * (100 - 30));
  }


  componentDidMount() {
    setTimeout(this.tick.bind(this), this.randomTimeout() + 1000)
  }


  tick() {
    this.setState({ ...this.state, command: this.props.command.slice(0, this.state.command.length + 1) });

    if(this.props.command == this.state.command) {
      setTimeout(() => {
        this.setState({ ...this.state, complete: true });
        this.props.onComplete();
      }, this.randomTimeout() * 10 + 250);
    } else {
      setTimeout(this.tick.bind(this), this.randomTimeout());
    }
  }


  render() {
    return (
      <span className={styles.Command}>
        {this.state.command}
        {this.state.complete ? [<br key="br" />, this.props.children] : <Cursor />}
      </span>
    );
  }
}
