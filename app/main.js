import React from 'react'
import { render } from 'react-dom'
import Greeter from './Greeter'

// import "core-js/stable";
// import "regenerator-runtime/runtime";

import './main.css'
render(
  <Greeter />,
  document.getElementById('root')
)

/**
 * HMR的API
 */
if (module.hot) {
  // 当 Greeter.js 更新了
  module.hot.accept('./Greeter', function () {
    console.log(111)
  })
}
