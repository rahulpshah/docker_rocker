
import React, { Component } from 'react'
import CreatableSelect from 'react-select/lib/Creatable';


export default class LocalPackage extends Component {
  
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.options = [{value: "bs4", label: "bs4"},
      {value: "xgboost", label: "xgboost"},
      {value: "requests", label: "requests"}]
  }
  handleChange = (newValue) => {
    this.props.onAdd("local", newValue.map(x => x.value));
  }
  render() {
    
    return (
        <CreatableSelect
        isClearable
        isMulti
        onChange={this.handleChange}
        options={this.options}
        />
    )
  }
}
