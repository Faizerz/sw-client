import React, { Component } from 'react';

const dataTypes  = ["characters", "planets", "species", "vehicles", "starships"]

class Film extends Component {

  state = {
    flipped: false,
    characters: [],
    planets: [],
    species: [],
    vehicles: [],
    starships: []
  }

  flip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  getFilmData = () => {
    if(this.state.characters.length === 0){
      dataTypes.forEach(tab => {
        this.props.film[tab].forEach(atr => {
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
    const { film } = this.props
    const { flipped, characters, species, planets, vehicles, starships } = this.state
    return (
      <div  className="box" onClick={this.flip} onMouseEnter={this.getFilmData}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Film Content</h4>
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Characters</h5>
                  {characters.sort((a, b) => a.name - b.name).map(char => {
                    return <p className="attrList" data-id={"character "+char.id} key={"character "+char.id}>{char.name}</p>
                  })}
              </div>
              <div className="col-sm-6 centered">
                <h5>Planets</h5>
                  {planets.sort((a, b) => a.name - b.name).map(planet => {
                    return <p className="attrList" data-id={"planet "+planet.id} key={"planet "+planet.id}>{planet.name}</p>
                  })}
                <h5 className="marginTop">Vehicles</h5>
                  {vehicles.sort((a, b) => a.name - b.name).map(vehic => {
                    return <p className="attrList" data-id={"vehicle "+vehic.id} key={"vehicle "+vehic.id}>{vehic.name}</p>
                  })}
                <h5 className="marginTop">Starships</h5>
                  {starships.sort((a, b) => a.name - b.name).map(ship => {
                    return <p className="attrList" data-id={"ship "+ship.id} key={"starship "+ship.id}>{ship.name}</p>
                  })}
                <h5 className="marginTop">Species</h5>
                  {species.sort((a, b) => a.name - b.name).map(spec => {
                    return <p className="attrList" data-id={"spec "+spec.id} key={"species "+spec.id}>{spec.name}</p>
                  })}
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <h4>Episode {film.episode_id}</h4>
            <h5>{film.title}</h5>
            <b>Director</b> - {film.director}<br />
            <b>Producer</b> - {film.producer}<br />
            <b>Date</b> - {film.release_date}<br />
            <p className="openingCrawl">{film.opening_crawl}</p>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Film;
