import classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchRoots } from '../../actions';
import sentenceCase from 'sentence-case';
import {	Nav, NavItem, NavLink } from 'reactstrap';
import React, { Component } from 'react';
import Planet from '../Planet'
import Film from '../Film'
import Person from '../Person'
import Specie from '../Specie'
import Starship from '../Starship'
import Vehicle from '../Vehicle'



const URL = "https://swapi.co/api"
const tabNames  = ["people", "planets", "films", "species", "vehicles", "starships"]

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: void 0, // TODO(0xdeafcafe): Make this select first tab when root data has loaded
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
			loading: true
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchRoots());

		//Total Count for each route retrieved from API
		tabNames.forEach(tabName => {
			this.fetchCounts(tabName)
		})
	}


	fetchCounts(tabName) {
		let fetchUrl = `${URL}/${tabName}/`
		let countName = tabName+'Count'

		return fetch(fetchUrl)
		.then(resp => resp.json())
		.then(jso =>
			this.setState({
				[countName]: jso.count,
				loading: false
			})
		)
	}

	fetchData(tabName, n) {
		let fetchUrl = `${URL}/${tabName}/${n}/`
		return fetch(fetchUrl)
		.then(resp => resp.json())
		.then(jso =>	{
			jso.id = n
			this.setState({
				[tabName]: [...this.state[tabName], jso]
			})
		})
	}

	//Had to iterate through the 'Count' of each route as the URL on the API only returns 10 results
	switchTab(tab) {
		this.setState({ tab });
		if(this.state[tab].length !== this.state[`${tab}Count`]){
			for(let n=1; n <= this.state[`${tab}Count`]; n++) {
				this.fetchData(tab, n)
			}
		}
	}


	renderRoots() {
		const { roots } = this.props;
		const { tab: activeTab, planets, films, species, vehicles, starships, people } = this.state;

		if (!roots.payload)
			return null;

		const keys = Object.keys(roots.payload);

		return (
			<div className={'mt-3'}>
				<Nav tabs>
					{keys.map(k => (
						<NavItem key={k}>
							<NavLink
								className={classnames({ active: activeTab === k })}
								onClick={() => this.switchTab(k)}
							>
								{sentenceCase(k)}
							</NavLink>
						</NavItem>
					))}
				</Nav>
				<div className="tabContainer">
					{this.state.loading && <code>Loading...</code>}
					{activeTab === 'planets' && planets.sort((a, b) => a.name - b.name).map(planet => <Planet key={planet.id} planet={planet} />)}
					{activeTab === 'films' && films.sort((a, b) => a.episode_id - b.episode_id).map(film => <Film key={film.id} film={film} />)}
					{activeTab === 'species' && species.sort((a, b) => a.name - b.name).map(specie => <Specie key={specie.id} specie={specie} />)}
					{activeTab === 'vehicles' && vehicles.sort((a, b) => a.name - b.name).map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} />)}
					{activeTab === 'starships' && starships.sort((a, b) => a.name - b.name).map(starship => <Starship key={starship.id} starship={starship} />)}
					{activeTab === 'people' && people.sort((a, b) => a.name - b.name).map(peep => <Person key={peep.id} person={peep} />)}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={'Home'}>
				<h1>{'My little Star Wars App 👾'}</h1>
				{this.renderRoots()}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	roots: state.roots,
});

export default connect(mapStateToProps)(Home);
