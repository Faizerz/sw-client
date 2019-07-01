import React, { Component } from 'react';

const dataTypes  = ["films", "residents"]

class Planet extends Component {

  state = {
    flipped: false,
    residents: [],
    films: []
  }

  componentDidMount() {
    this.getPlanetData()
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
    const { flipped, residents, films } = this.state
    const { planet } = this.props
    return (
      <div  className="box">
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Planet Info</h4>
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Residents</h5>
                  {
                    residents.length > 0
                    ? residents.map((char, index) => {
                        return <p className="attrList" key={index+" "+char.id} onClick={() => this.props.redirect("people", char.id)}>{char.name}</p>
                      })
                    : <p className="attrList">No Residents Here</p>
                  }
              </div>
              <div className="col-sm-6 centered">
                <h5>Films</h5>
                  {
                    films.length > 0
                    ? films.sort((a, b) => a.episode_id - b.episode_id).map((film, index) => {
                        return <p className="attrList" key={index+" "+film.episode_id} onClick={() => this.props.redirect("films", film.id)}>{film.title}</p>
                      })
                    : <p className="attrList">Doesn't Feature</p>
                  }
              </div>
              <div className="col-sm-12 marginTop">
                <button onClick={this.flip} className="viewMoreBtn">View Less Details...</button>
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <div className="flex">
              <div className="col-sm-10"><h4>{planet.name}</h4></div>
              <div className="col-sm-2"><button className="faveBtn">♡</button></div>
            </div>
            <b>Population</b> - {planet.population}<br />
            <b>Climate</b> - {planet.climate.charAt(0).toUpperCase() + planet.climate.slice(1)}<br />
            <b>Terrain</b> - {planet.terrain.charAt(0).toUpperCase() + planet.terrain.slice(1)}<br />
            <b>Diameter</b> - {planet.diameter}<br />
            <b>Orbital Period</b> - {planet.orbital_period}<br />
            <b>Gravity</b> - {planet.gravity}<br />
            <b>Surface Water</b> - {planet.surface_water}<br />
            <button onClick={this.flip} className="viewMoreBtn marginTop">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Planet;
