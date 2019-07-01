import React, { Component } from 'react';

const dataTypes = ["films", "people"]

class Specie extends Component {

  state = {
    flipped: false,
    films: [],
    people: []
  }

  componentDidMount() {
    this.getSpecieData()
  }

  flip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  getSpecieData = () => {
    if(this.state.films.length === 0 && this.state.people.length === 0){
      dataTypes.forEach(tab => {
        this.props.specie[tab].forEach(atr => {
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
    const { flipped, people, films } = this.state
    const { specie } = this.props

    return (
      <div  className="box">
        {
        flipped
        ? <React.Fragment>
            <div className="col-sm-12 centered">
              <h4>Species Info</h4>
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
              <div className="col-sm-2"><button className="faveBtn">♡</button></div>
            </div>
            <b>Type</b> - {specie.classification}<br />
            <b>Designation</b> - {specie.designation}<br />
            <b>Language</b> - {specie.language}<br />
            <b>Avg Height</b> - {specie.average_height}<br />
            <b>Avg Lifespan</b> - {specie.average_lifespan}<br />
            <b>Skin Colours</b> - {specie.skin_colors}<br />
            <button onClick={this.flip} className="viewMoreBtn">View More Details...</button>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default Specie;
