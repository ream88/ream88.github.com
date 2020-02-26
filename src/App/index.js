import './index.css'
import React from 'react'
import CommandLine from '../CommandLine'
import Command from '../Command'

const App = () => (
  <CommandLine prompt='>'>
    <Command command='whoami'>
      Mario Uher
    </Command>
    <Command command='uptime'>
      up 31 years
    </Command>
    <Command command='cat more.txt'>
      <a href='https://twitter.com/ream88' target='_blank' rel='noopener noreferrer'>Twitter</a>
      <br />
      <a href='https://www.facebook.com/ream88' target='_blank' rel='noopener noreferrer'>Facebook</a>
      <br />
      <a href='https://github.com/ream88' target='_blank' rel='noopener noreferrer'>GitHub</a>
      <br />
      <a href='https://www.linkedin.com/in/ream88/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
    </Command>
  </CommandLine>
)

export default App
