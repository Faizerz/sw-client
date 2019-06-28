import React, { Component } from 'react';

const dataTypes  = ["films", "residents"]

class Planet extends Component {

  state = {
    flipped: false,
    residents: [],
    films: [],
  }

  flip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  getPlanetData = () => {
    if(this.state.residents.length === 0 && this.state.films.length === 0){
      dataTypes.forEach(tab => {
        this.props.planet[tab].forEach(atr => {
          let id = parseInt(atr.match(/\d+/)[0])
          return fetch(atr)
          .then(res => res.json())
          .then(jso => {
            jso.id = id
            this.setState({
              [tab]: [...this.state[tab], jso]
            })
          })
        })
      })
    }
  }

  render() {
    const { flipped, residents, films } = this.state
    const { planet } = this.props
    return (
      <div  className="box" onClick={this.flip} onMouseEnter={this.getPlanetData}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Film Content</h4>
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Residents</h5>
                  {residents.map(char => {
                    return <p className="attrList" data-id={"character "+char.id} key={"character "+char.id}>{char.name}</p>
                  })}
              </div>
              <div className="col-sm-6 centered">
                <h5>Films</h5>
                  {films.sort((a, b) => a.episode_id - b.episode_id).map(film => {
                    return <p className="attrList" data-id={"episode "+film.episode_id} key={"episode "+film.episode_id}>{film.title}</p>
                  })}
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
          <h2>{planet.name}</h2>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Planet;
