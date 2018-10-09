import React, { Component } from 'react'
import SystemPackage from './SystemPackage';
import LocalPackage from './LocalPackage';
import axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.addPackage = this.addPackage.bind(this);
    this.state = {
      dockerfile: {},
      rendered: ""
    }
  }
  onSubmit() {
    console.log("Submitting the packages to generate dockerfiles", JSON.stringify(this.state.dockerfile));
    
    fetch("http://0.0.0.0:8000/", {method: "POST", body: JSON.stringify(this.state.dockerfile), headers: {"content-type": "application/json"}})
      .then(res => res.json())
      .then(data => {
        // console.log("Data", data);
        const stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.rendered = data.data;
        this.setState(stateCopy);
      });
  }
  addPackage(key, value) {
    console.log("Adding a package to current state", key, value);
    const stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.dockerfile[key] = value;
    this.setState(stateCopy);
  }
  render() {
    return (
      <div>
        <h2>Add system packages</h2>
        <SystemPackage onAdd={this.addPackage}/>
        <h2>Add python packages</h2>
        <LocalPackage onAdd={this.addPackage}/>
        <button name="create" className="btn btn-primary m-2 p-2" onClick={this.onSubmit}>Create dockerfile</button>
        <div className="jumbotron"><pre>{this.state.rendered}</pre></div>
      </div>
    )
  }
}
