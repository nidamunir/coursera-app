import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import { DISHES } from './shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		dishes: DISHES
	// 	};
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Main />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
