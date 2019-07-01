import React, { Component } from 'react';

const dataTypes  = ["characters", "planets", "vehicles", "starships", "species"]

class Film extends Component {

  state = {
    flipped: false,
    characters: [],
    planets: [],
    species: [],
    vehicles: [],
    starships: []
  }

  componentDidMount() {
    this.getFilmData()
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
          let id = parseInt(atr.match(/\d+/)[0], 10)
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
      <div  className="box">
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Film Content</h4>
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Characters</h5>
                  {characters.sort((a, b) => a.name < b.name ? -1 : 1).map(char => {
                    return <p className="attrList" key={"character "+char.id} onClick={() => this.props.redirect("people", char.id)}>{char.name}</p>
                  })}
              </div>
              <div className="col-sm-6 centered">
                <h5>Planets</h5>
                  {planets.sort((a, b) => a.name < b.name ? -1 : 1).map(planet => {
                    return <p className="attrList" key={"planet "+planet.id} onClick={() => this.props.redirect("planets", planet.id)}>{planet.name}</p>
                  })}
                <h5 className="marginTop">Vehicles</h5>
                  {vehicles.sort((a, b) => a.name < b.name ? -1 : 1).map(vehic => {
                    return <p className="attrList" key={"vehicle "+vehic.id} onClick={() => this.props.redirect("vehicles", vehic.id)}>{vehic.name}</p>
                  })}
                <h5 className="marginTop">Starships</h5>
                  {starships.sort((a, b) => a.name < b.name ? -1 : 1).map(ship => {
                    return <p className="attrList" key={"starship "+ship.id} onClick={() => this.props.redirect("starships", ship.id)}>{ship.name}</p>
                  })}
                <h5 className="marginTop">Species</h5>
                  {species.sort((a, b) => a.name < b.name ? -1 : 1).map(spec => {
                    return <p className="attrList" data-id={"spec "+spec.id} key={"species "+spec.id} onClick={() => this.props.redirect("species", spec.id)}>{spec.name}</p>
                  })}
              </div>
              <div className="col-sm-12 marginTop">
                <button onClick={this.flip} className="viewMoreBtn">View Less Details...</button>
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <div className="flex">
              <div className="col-sm-10"><h4>Episode {film.episode_id}</h4></div>
              <div className="col-sm-2"><button className="faveBtn">♡</button></div>
            </div>
            <h5>{film.title}</h5>
            <b>Director</b> - {film.director}<br />
            <b>Producer</b> - {film.producer}<br />
            <b>Date</b> - {film.release_date}<br />
            <p className="openingCrawl">{film.opening_crawl}</p>
            <button onClick={this.flip} className="viewMoreBtn">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Film;
