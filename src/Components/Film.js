import React, { Component } from 'react';
import loadgif from '../images/load.gif'


const dataTypes  = ["characters", "planets", "vehicles", "starships", "species"]

class Film extends Component {

  state = {
    flipped: false,
    characters: [],
    planets: [],
    species: [],
    vehicles: [],
    starships: [],
    loading: true,
    repeat: false,
    favourite: true
  }

  componentDidMount() {
    if(localStorage.getItem(`films ${this.props.film.id}`)){
      this.setState({favourite: true})
    } else {
      this.setState({favourite: false})
    }
  }

  flip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }


  getFilmData = () => {
    if(this.state.characters.length === 0 && this.state.loading && !this.state.repeat){
      this.setState({repeat: true})
      const { film } = this.props
      dataTypes.forEach(tab => {
        film[tab].forEach(atr => {
          let id = parseInt(atr.match(/\d+/)[0], 10)
          return fetch(atr)
          .then(res => res.json())
          .then(jso => {
            jso.id = id
            this.setState({
              [tab]: [...this.state[tab], jso],
            })

            if(film.characters.length === this.state.characters.length &&
               film.planets.length === this.state.planets.length &&
               film.species.length === this.state.species.length &&
               film.starships.length === this.state.starships.length &&
               film.vehicles.length === this.state.vehicles.length) {
                 this.setState({loading: false})
               }
            })
          })
        })
      }
    }


  render() {
    const { film } = this.props
    const { flipped, characters, species, planets, vehicles, starships, loading, favourite } = this.state
    return (
      <div  className="box" onMouseEnter={() => this.getFilmData()}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Film Content</h4>
              {loading ? <p><img className="r2d2" src={loadgif} alt="loading..." /> Loading Content... <img className="r2d2" src={loadgif} alt="loading..." /></p> : null}
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
              <div className="col-sm-2">
                {
                  favourite
                  ? <button className="activeFave" onClick={() => {this.props.favourite("films", this.props.film.id, false); this.setState({favourite: false})}}>♡</button>
                  : <button className="faveBtn" onClick={() => {this.props.favourite("films", this.props.film.id, true); this.setState({favourite: true})}}>♡</button>
                }
              </div>
            </div>
            <h5>{film.title}</h5>
            <b>Director</b> - {film.director}<br />
            <b>Producer</b> - {film.producer}<br />
            <b>Date</b> - {film.release_date}<br />
            <p className="openingCrawl">{film.opening_crawl}</p>
            <button onClick={() => { this.flip(); this.getFilmData()}} className="viewMoreBtn">View More Details...</button>
          </React.Fragment>
        }
      </div>
    )
  }

}

export default Film
