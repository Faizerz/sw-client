import { connect } from 'react-redux';
import { fetchRoots } from '../../actions';
import sentenceCase from 'sentence-case';
import React, { Component } from 'react';
import Planet from '../Planet'
import Film from '../Film'
import Person from '../Person'
import Specie from '../Specie'
import Starship from '../Starship'
import Vehicle from '../Vehicle'
import loadgif from '../../images/load.gif'


const URL = "https://swapi.co/api"
const tabNames  = ["people", "planets", "species", "vehicles", "starships"]

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: void 0,
			people: [],
			peopleCount: 0,
			planets: [],
			planetsCount: 0,
			films: [],
			filmsCount: 0,
			species: [],
			speciesCount: 0,
			vehicles: [],
			vehiclesCount: 0,
			starships: [],
			starshipsCount: 0,
			redirect: false,
			redirectData: {},
			loading: true
		};
	}


	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchRoots());

		this.fetchCounts("films", true)

		tabNames.forEach(tabName => {
			this.fetchCounts(tabName, false)
		})
	}

/*
	The API doesn't return all the resources like it says it should. It only returns some so the method used:
	- Fetch total count within a resource
	- Iterate through the count and retrieve each individual resource when tabs switched
*/


	fetchCounts(tabName, x) {
		let fetchUrl = `${URL}/${tabName}/`
		let countName = tabName+'Count'

		return fetch(fetchUrl)
		.then(resp => resp.json())
		.then(jso => {
			this.setState({
				[countName]: jso.count
			})
			if (x === true){this.switchTab("films")}
		})
	}


	switchTab(tab) {
		this.setState({ tab, redirect: false })
		if(this.state[tab].length === 0){
			for(let n=1; n <= this.state[`${tab}Count`]; n++) {
				this.fetchData(tab, n)
			}
		}
	}

	fetchData(tabName, n) {
		let fetchUrl = `${URL}/${tabName}/${n}/`
		this.setState({loading: true})
		return fetch(fetchUrl)
		.then(resp => resp.json())
		.then(jso =>	{
			jso.id = n
			if(jso.detail !== "Not found") {
				this.setState({
					[tabName]: [...this.state[tabName], jso]
				})
			}
			if(this.state[tabName].length === this.state[`${tabName}Count`]) {
				this.setState({loading: false})
			}
		})
	}

	redirect = (tab, id) => {
		let fetchUrl = `${URL}/${tab}/${id}/`
		return fetch(fetchUrl)
		.then(resp => resp.json())
		.then(jso =>	{
			jso.id = id
			if(jso.detail !== "Not found") {
				this.setState({
					tab: "",
					redirectData: jso,
					redirect: true,
					redirectTab: tab
				})
			}
		})
	}

	favourite = (tab, id, activate) => {
		let fetchUrl = `${URL}/${tab}/${id}/`
		if(activate === true){
			localStorage.setItem(`${tab} ${id}`, "favourited")
		} else {
			localStorage.removeItem(`${tab} ${id}`)
		}
	}

	renderRoots() {
		const { roots } = this.props
		const { tab: activeTab, planets, films, species, vehicles, starships, people, redirect, redirectData, redirectTab, loading } = this.state

		if (!roots.payload)
			return null;

		const keys = Object.keys(roots.payload);

		return (
			<div className={'mt-3'}>
				<div className="tabItems white">
					{keys.map(k => (
						activeTab === k
						?	<div className="tab white activeTab" key={k} onClick={() => this.switchTab(k)}>
								{sentenceCase(k)}
							</div>
						: <div className="tab white" key={k} onClick={() => this.switchTab(k)}>
								{sentenceCase(k)}
							</div>
					))}
				</div>

				{loading ? <h5 className="homeLoad"><img className="r2d2" src={loadgif} alt="loading..." /> Loading Content... <img className="r2d2" src={loadgif} alt="loading..." /><br /></h5> : null}
				<div className="tabContainer">
					{
						redirect
						?	<React.Fragment>
								{redirectTab === 'planets' && <Planet planet={redirectData} redirect={this.redirect} favourite={this.favourite} />}
								{redirectTab === 'films' && <Film film={redirectData} redirect={this.redirect} favourite={this.favourite} />}
								{redirectTab === 'species' && <Specie specie={redirectData} redirect={this.redirect} favourite={this.favourite}  />}
								{redirectTab === 'vehicles' && <Vehicle vehicle={redirectData} redirect={this.redirect} favourite={this.favourite}  />}
								{redirectTab === 'starships' && <Starship starship={redirectData} redirect={this.redirect} favourite={this.favourite}  />}
								{redirectTab === 'people' && <Person person={redirectData} redirect={this.redirect} favourite={this.favourite}  />}
							</React.Fragment>
						:	<React.Fragment>
								{activeTab === 'planets' && planets.sort((a, b) => a.name < b.name ? -1 : 1).map((planet, index) => <Planet key={"planet " + index} planet={planet} redirect={this.redirect} favourite={this.favourite} />)}
								{activeTab === 'films' && films.sort((a, b) => a.episode_id - b.episode_id).map((film, index) => <Film key={"film " + film.id} film={film} redirect={this.redirect} favourite={this.favourite} />)}
								{activeTab === 'species' && species.sort((a, b) => a.name < b.name ? -1 : 1).map((specie, index) => <Specie key={specie.id} specie={specie} redirect={this.redirect} favourite={this.favourite} />)}
								{activeTab === 'vehicles' && vehicles.sort((a, b) => a.name < b.name ? -1 : 1).map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} redirect={this.redirect} favourite={this.favourite} />)}
								{activeTab === 'starships' && starships.sort((a, b) => a.name < b.name ? -1 : 1).map(starship => <Starship key={starship.id} starship={starship} redirect={this.redirect} favourite={this.favourite} />)}
								{activeTab === 'people' && people.sort((a, b) => a.name < b.name ? -1 : 1).map(peep => <Person key={peep.id} person={peep} redirect={this.redirect} favourite={this.favourite} />)}
							</React.Fragment>
					}
				</div>
			</div>
		)
	}

	render() {

		return (
			<div className={'Home'}>
				<a href="/"><h1 className="appTitle white">Star Wars App</h1></a>
				<h5 className="appSubTitle white">Cuvva Test - Faiz Abbas</h5>
				{this.renderRoots()}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	roots: state.roots,
});

export default connect(mapStateToProps)(Home);
