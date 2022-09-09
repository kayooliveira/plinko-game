import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'

import { Plinko } from './components/Plinko'

ReactDOM.render(
  <React.StrictMode>
    <Plinko />
  </React.StrictMode>,
  document.getElementById('root')
)
