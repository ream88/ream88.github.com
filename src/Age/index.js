import React from 'react'
import moment from 'moment'

export default () => (
  <span>{moment().diff(moment('1988-03-05'), 'years')}</span>
)
