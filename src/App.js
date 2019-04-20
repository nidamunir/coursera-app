import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import { DISHES } from './shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		dishes: DISHES
	// 	};
	// }

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Main />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
