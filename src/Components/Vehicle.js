import React, { Component } from 'react';

class Vehicle extends Component {

  render() {
    return (
      <div>{this.props.vehicle.name}</div>
    );
  }

}

export default Vehicle;
