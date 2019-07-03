import React, { Component } from 'react';
import loadgif from '../images/load.gif'


const dataTypes = ["films", "species", "starships", "vehicles"]

class Person extends Component {

  state = {
    flipped: false,
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    loading: true,
    repeat: false,
    favourite: true
  }

  componentDidMount() {
    if(localStorage.getItem(`people ${this.props.person.id}`)){
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

  getPersonData = () => {
    if(this.state.films.length === 0 && this.state.loading && !this.state.repeat){
      this.setState({repeat: true})
      const { person } = this.props
      dataTypes.forEach(tab => {
        this.props.person[tab].forEach(atr => {
          let id = parseInt(atr.match(/\d+/)[0], 10)
          return fetch(atr)
          .then(res => res.json())
          .then(jso => {
            if(!jso.detail){
              jso.id = id
              this.setState({
                [tab]: [...this.state[tab], jso]
              })
            }

            if(person.films.length === this.state.films.length &&
               person.species.length === this.state.species.length &&
               person.starships.length === this.state.starships.length &&
               person.vehicles.length === this.state.vehicles.length) {
                 this.setState({loading: false})
               }
          })
        })
      })
    }
  }

  render() {
    const { flipped, species, films, starships, vehicles, loading, favourite } = this.state
    const { person } = this.props

    return (
      <div  className="box" onMouseEnter={() => this.getPersonData()}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Character Info</h4>
              {loading ? <p><img className="r2d2" src={loadgif} alt="loading..." /> Loading Content... <img className="r2d2" src={loadgif} alt="loading..." /></p> : null}
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Films</h5>
                  {
                    films.length > 0
                    ? films.sort((a, b) => a.episode_id - b.episode_id).map((film, index) => {
                        return <p className="attrList" data-id={index+" "+film.id} key={index+" "+film.id} onClick={() => this.props.redirect("films", film.id)}>{film.title}</p>
                      })
                    : <p className="attrList">Doesn't Feature</p>
                  }
                <h5 className="marginTop">Starships</h5>
                  {
                    starships.length > 0
                    ?  starships.sort((a, b) => a.name < b.name ? -1 : 1).map((ship, index) => {
                        return <p className="attrList" data-id={index+" "+ship.id} key={"starship "+ship.id} onClick={() => this.props.redirect("starships", ship.id)}>{ship.name}</p>
                      })
                    : <p className="attrList">Doesn't own a Starship</p>
                  }
              </div>
              <div className="col-sm-6 centered">
                <h5>Vehicles</h5>
                  {
                    vehicles.length > 0
                    ? vehicles.sort((a, b) => a.name < b.name ? -1 : 1).map((vehic, index) => {
                        return <p className="attrList" data-id={index+" "+vehic.id} key={"vehicle "+vehic.id} onClick={() => this.props.redirect("vehicles", vehic.id)}>{vehic.name}</p>
                      })
                    : <p className="attrList">Doesn't own a Vehicle</p>
                  }
                <h5 className="marginTop">Species</h5>
                  {
                    species.length > 0
                    ? species.sort((a, b) => a.name < b.name ? -1 : 1).map((spec, index) => {
                        return <p className="attrList" data-id={index+" "+spec.id} key={"species "+spec.id} onClick={() => this.props.redirect("species", spec.id)}>{spec.name}</p>
                      })
                    : <p className="attrList">Isn't a known Species</p>
                  }
              </div>
              <div className="col-sm-12 marginTop">
                <button onClick={this.flip} className="viewMoreBtn">View Less Details...</button>
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <div className="flex">
              <div className="col-sm-10"><h4>{person.name}</h4></div>
              <div className="col-sm-2">
                {
                  favourite
                  ? <button className="activeFave" onClick={() => {this.props.favourite("people", this.props.person.id, false); this.setState({favourite: false})}}>♡</button>
                  : <button className="faveBtn" onClick={() => {this.props.favourite("people", this.props.person.id, true); this.setState({favourite: true})}}>♡</button>
                }
              </div>
            </div>
            <b>DOB</b> - {person.birth_year}<br />
            <b>Height</b> - {person.gender}<br />
            <b>Mass</b> - {person.mass}<br />
            <b>Eye Colour</b> - {person.eye_color}<br />
            <b>Hair Colour</b> - {person.hair_color}<br />
            <b>Skin Colour</b> - {person.skin_color}<br />
            <button onClick={() => {this.flip(); this.getPersonData()}} className="viewMoreBtn">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Person;
