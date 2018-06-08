import styles from './index.css'
import React, { PropTypes, Component } from 'react'
import Cursor from '../Cursor'

class Command extends Component {
  constructor (props) {
    super(props)

    this.state = {
      complete: false,
      command: ''
    }
  }

  componentDidMount () {
    setTimeout(this.tick.bind(this), this.randomTimeout() + 1000)
  }

  randomTimeout () {
    return Math.round(Math.random() * (100 - 30))
  }

  tick () {
    this.setState({ ...this.state, command: this.props.command.slice(0, this.state.command.length + 1) })

    if (this.props.command === this.state.command) {
      setTimeout(() => {
        this.setState({ ...this.state, complete: true })
        this.props.onComplete()
      }, this.randomTimeout() * 10 + 250)
    } else {
      setTimeout(this.tick.bind(this), this.randomTimeout())
    }
  }

  render () {
    return (
      <span className={styles.Command}>
        {this.state.command}
        {this.state.complete ? [<br key='br' />, this.props.children] : <Cursor />}
      </span>
    )
  }
}

Command.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ]),
  command: PropTypes.string.isRequired,
  onComplete: PropTypes.func
}

export default Command
