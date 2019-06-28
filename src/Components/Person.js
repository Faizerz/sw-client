import React, { Component } from 'react';

class Person extends Component {

  render() {
    return (
      <div className="card col-sm-3">
        {this.props.person.name}
        {this.props.person.eye_color}
      </div>
    );
  }

}

export default Person;
