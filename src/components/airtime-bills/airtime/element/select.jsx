import React from 'react'

var CustomSelect = React.createClass({
    getInitialState=()=> {
      return {
        selectValue: this.props.defaultValue || "Select Me"
      }
    },
    _onChange=(event, item)=> {
      this.setState({
        selectValue: this.props.options[event.target.selectedIndex].label
      });
      this.props.onChange(event.target.value);
    },


    render=()=> {
      selectValue = this.state.selectValue;
      var options = this.props.options.map((item)=> {
        if (selectValue === item.value) {
          return <option selected value = {
            item.value
          } > {
            item.label
          } </option>;
        } else {
          return <option value = {
            item.value
          } > {
            item.label
          } </option>;
        }
  
      })
      return ( 
        <div className = "custom-select">
          <div className = "custom-select-value" > {selectValue} </div> 
          <select name={this.props.name || ''} id={this.props.id || (this.props.name || '')} onChange = {this._onChange}> 
            {options} 
          </select> 
        </div >
    );
  }
  });