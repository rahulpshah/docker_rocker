
import React, { Component } from 'react'
import CreatableSelect from 'react-select/lib/Creatable';


export default class SystemPackage extends Component {
  options = [{value: "vim", label: "vim"},
    {value: "procps", label: "procps"},
    {value: "curl", label: "curl"},
    {value: "wget", label: "wget"}]
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (newValue: any, actionMeta: any) => {
    this.props.onAdd("system", newValue.map(x => x.value));
    
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
