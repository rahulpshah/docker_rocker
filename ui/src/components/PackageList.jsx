import React, { Component } from 'react'

export default class PackageList extends Component {

  constructor(props) {
    super(props);
    this.state = {packageList: []}
    this.addPackage = this.addPackage.bind(this);
  }
  addPackage = (pkg) => {
    const currentPackages = this.state.packageList
    const data = {value: pkg, label: pkg}
    currentPackages.push(data)
    this.setState(currentPackages);
  }
  render() {
    return <ul className="list-group">{this.state.packageList.map(x => <li className="list-group-item" key={x.value}>{x.label}</li>)}</ul>
  }
}
