import React, { Component } from 'react'

import Header from './Header';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Header/>
          <Form/>
      </React.Fragment>
    )
  }
}