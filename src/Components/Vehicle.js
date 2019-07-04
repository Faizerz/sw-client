import React, { Component } from 'react';
import loadgif from '../images/load.gif'
import like from '../images/like2.png'
import unlike from '../images/like1.png'


const dataTypes = ["films", "pilots"]

class Vehicle extends Component {

  state = {
    flipped: false,
    films: [],
    pilots: [],
    loading: true,
    repeat: false,
    favourite: true
  }

  componentDidMount() {
    if(localStorage.getItem(`vehicles ${this.props.vehicle.id}`)){
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

  getVehicleData = () => {
    if(this.state.films.length === 0 && this.state.pilots.length === 0 && !this.state.repeat){
      this.setState({repeat:true})
      const { vehicle } = this.props
      dataTypes.forEach(tab => {
        vehicle[tab].forEach(atr => {
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

            if(vehicle.films.length === this.state.films.length && vehicle.pilots.length === this.state.pilots.length) {
              this.setState({loading: false})
            }
          })
        })
      })
    }
  }

  render() {
    const { flipped, pilots, films, loading, favourite } = this.state
    const { vehicle } = this.props

    return (
      <div  className="box">
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Vehicle Info</h4>
              {loading ? <p><img className="r2d2" src={loadgif} alt="loading..." /> Loading Content... <img className="r2d2" src={loadgif} alt="loading..." /></p> : null}
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
              <div className="col-sm-10"><h4>{vehicle.name}</h4></div>
              <div className="col-sm-2">
                {
                  favourite
                  ? <img src={like} className="likeBtn" alt="like btn" onClick={() => {this.props.favourite("vehicles", this.props.vehicle.id, false); this.setState({favourite: false})}} />
                  : <img src={unlike} className="unlikeBtn" alt="unlike btn" onClick={() => {this.props.favourite("vehicles", this.props.vehicle.id, true); this.setState({favourite: true})}} />
                }
              </div>
            </div>
            <b>Crew</b> - {vehicle.crew}<br />
            <b>Max Speed</b> - {vehicle.max_atmosphering_speed}<br />
            <b>Cargo Size</b> - {vehicle.cargo_capacity}<br />
            <b>Passengers</b> - {vehicle.passengers}<br />
            <b>Class</b> - {vehicle.vehicle_class}<br />
            <b>Cost</b> - {vehicle.cost_in_credits}<br />
            <div className="centered">
              <button onClick={() => {this.flip(); this.getVehicleData()}} className="viewMoreBtn marginTop">View More Details...</button>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Vehicle;
