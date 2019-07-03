import React, { Component } from 'react';
import loadgif from '../images/load.gif'


const dataTypes = ["films", "people"]

class Specie extends Component {

  state = {
    flipped: false,
    films: [],
    people: [],
    loading: true,
    repeat: false,
    favourite: true
  }

  componentDidMount() {
    if(localStorage.getItem(`species ${this.props.specie.id}`)){
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

  getSpecieData = () => {
    if(this.state.films.length === 0 && this.state.loading && !this.staterepeat){
      this.setState({repeat: true})
      const { specie } = this.props
      dataTypes.forEach(tab => {
        specie[tab].forEach(atr => {
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

            if(specie.films.length === this.state.films.length && specie.people.length === this.state.people.length) {
              this.setState({loading: false})
            }
          })
        })
      })
    }
  }



  render() {
    const { flipped, people, films, loading, favourite } = this.state
    const { specie } = this.props

    return (
      <div  className="box" onMouseEnter={() => this.getSpecieData()}>
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Species Info</h4>
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
                <h5>Characters</h5>
                  {
                    people.length > 0
                    ?  people.sort((a, b) => a.name < b.name ? -1 : 1).map((person, index) => {
                        return <p className="attrList" key={"starship "+person.id} onClick={() => this.props.redirect("people", person.id)}>{person.name}</p>
                      })
                    : <p className="attrList">No known characters</p>
                  }
              </div>
              <div className="col-sm-12 marginTop">
                <button onClick={this.flip} className="viewMoreBtn">View Less Details...</button>
              </div>
            </div>
          </React.Fragment>
        : <React.Fragment>
            <div className="flex">
              <div className="col-sm-10"><h4>{specie.name}</h4></div>
              <div className="col-sm-2">
                {
                  favourite
                  ? <button className="activeFave" onClick={() => {this.props.favourite("species", this.props.specie.id, false); this.setState({favourite: false})}}>♡</button>
                  : <button className="faveBtn" onClick={() => {this.props.favourite("species", this.props.specie.id, true); this.setState({favourite: true})}}>♡</button>
                }
              </div>
            </div>
            <b>Type</b> - {specie.classification}<br />
            <b>Designation</b> - {specie.designation}<br />
            <b>Language</b> - {specie.language}<br />
            <b>Avg Height</b> - {specie.average_height}<br />
            <b>Avg Lifespan</b> - {specie.average_lifespan}<br />
            <b>Skin Colours</b> - {specie.skin_colors}<br />
            <button onClick={() => {this.flip(); this.getSpecieData()}} className="viewMoreBtn">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Specie;
