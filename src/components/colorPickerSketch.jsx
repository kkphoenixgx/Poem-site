import React from 'react'
import { SketchPicker } from 'react-color'
 
export class ColorPicker extends React.Component {
 
  state ={
    color: this.props.color
  }

  changeColor = ()=>{
    this.props.setColor(this.state.color);
  }
  handleChange = (color)=>{
    this.setState({color: color.hex}) 
  }

  render() {
    return <SketchPicker 
      color={this.state.color}
      onChange={ this.handleChange } 
      onChangeComplete={ this.changeColor }
    
    />
  }
}