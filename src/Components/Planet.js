import React, { Component } from 'react';
import loadgif from '../images/load.gif'
import like from '../images/like2.png'
import unlike from '../images/like1.png'


const dataTypes  = ["films", "residents"]

class Planet extends Component {

  state = {
    flipped: false,
    residents: [],
    films: [],
    loading: true,
    repeat: false,
    favourite: true
  }

  componentDidMount() {
    if(localStorage.getItem(`planets ${this.props.planet.id}`)){
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

  getPlanetData = () => {
    if(this.state.loading && this.state.films.length === 0 && !this.state.repeat){
      this.setState({repeat: true})
      const { planet } = this.props
      dataTypes.forEach(tab => {
        planet[tab].forEach(atr => {
          let id = parseInt(atr.match(/\d+/)[0], 10)
          return fetch(atr)
          .then(res => res.json())
          .then(jso => {
            jso.id = id
            this.setState({
              [tab]: [...this.state[tab], jso]
            })

            if(planet.films.length === this.state.films.length && planet.residents.length === this.state.residents.length) {
              this.setState({loading: false})
            }
          })
        })
      })
    }
  }

  render() {
    const { flipped, residents, films, loading, favourite } = this.state
    const { planet } = this.props
    return (
      <div  className="box" onMouseEnter={() => this.getPlanetData()}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Planet Info</h4>
              {!loading ? <p><img className="r2d2" src={loadgif} alt="loading..." /> Loading Content... <img className="r2d2" src={loadgif} alt="loading..." /></p> : null}
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
              <div className="col-sm-2">
                {
                  favourite
                  ? <img src={like} className="likeBtn" alt="like btn" onClick={() => {this.props.favourite("planets", this.props.planet.id, false); this.setState({favourite: false})}}/>
                  : <img src={unlike} className="unlikeBtn" alt="unlike btn" onClick={() => {this.props.favourite("planets", this.props.planet.id, true); this.setState({favourite: true})}} />
                }
              </div>
            </div>
            <b>Population</b> - {planet.population}<br />
            <b>Climate</b> - {planet.climate.charAt(0).toUpperCase() + planet.climate.slice(1)}<br />
            <b>Terrain</b> - {planet.terrain.charAt(0).toUpperCase() + planet.terrain.slice(1)}<br />
            <b>Diameter</b> - {planet.diameter}<br />
            <b>Orbital Period</b> - {planet.orbital_period}<br />
            <b>Gravity</b> - {planet.gravity}<br />
            <b>Surface Water</b> - {planet.surface_water}<br />
            <div className="centered">
              <button onClick={() => {this.flip(); this.getPlanetData()}} className="viewMoreBtn marginTop">View More Details...</button>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Planet;
