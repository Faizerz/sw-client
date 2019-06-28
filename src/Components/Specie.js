import React, { Component } from 'react';

class Specie extends Component {

  render() {
    return (
      <div>{this.props.specie.name}</div>
    );
  }

}

export default Specie;
