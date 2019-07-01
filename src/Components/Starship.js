import React, { Component } from 'react';

const dataTypes = ["films", "pilots"]

class Starship extends Component {

  state = {
    flipped: false,
    films: [],
    pilots: []
  }

  componentDidMount() {
    this.getStarshipData()
  }

  flip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  getStarshipData = () => {
    if(this.state.films.length === 0 && this.state.pilots.length === 0){
      dataTypes.forEach(tab => {
        this.props.starship[tab].forEach(atr => {
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
          })
        })
      })
    }
  }

  render() {
    const { flipped, pilots, films } = this.state
    const { starship } = this.props

    return (
      <div  className="box">
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Starship Info</h4>
            </div>
            <div className="row">
              <div className="col-sm-6 centered">
                <h5>Films</h5>
                  {
                    films.length > 0
                    ? films.sort((a, b) => a.episode_id - b.episode_id).map((film, index) => {
                        return <p className="attrList" key={index+" "+film.id} onClick={() => this.props.redirect("films", film.id)}>{film.title}</p>
                      })
                    : <p className="attrList">Doesn't Feature</p>
                  }
              </div>
              <div className="col-sm-6 centered">
                <h5>Pilots</h5>
                  {
                    pilots.length > 0
                    ?  pilots.sort((a, b) => a.name < b.name ? -1 : 1).map((person, index) => {
                        return <p className="attrList" key={"starship "+person.id} onClick={() => this.props.redirect("people", person.id)}>{person.name}</p>
                      })
                    : <p className="attrList">No known pilots</p>
                  }
              </div>
              <div className="col-sm-12 marginTop">
                <button onClick={this.flip} className="viewMoreBtn">View Less Details...</button>
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <div className="flex">
              <div className="col-sm-10"><h4>{starship.name}</h4></div>
              <div className="col-sm-2"><button className="faveBtn">♡</button></div>
            </div>
            <b>Crew</b> - {starship.crew}<br />
            <b>Max Speed</b> - {starship.max_atmosphering_speed}<br />
            <b>Cargo Size</b> - {starship.cargo_capacity}<br />
            <b>Passengers</b> - {starship.passengers}<br />
            <b>Class</b> - {starship.starship_class}<br />
            <b>Cost</b> - {starship.cost_in_credits} credits<br />
            <button onClick={this.flip} className="viewMoreBtn marginTop">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Starship;
