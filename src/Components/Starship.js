import React, { Component } from 'react';

class Starship extends Component {

  render() {
    return (
      <div>{this.props.starship.name}</div>
    );
  }

}

export default Starship;
