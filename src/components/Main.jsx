import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './Menu';
import DishDetail from './DishDetail';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { DISHES } from '../shared/dishes';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import { addComment } from '../redux/ActionCreators';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	};
};
resetFeedbackForm: () => {
	dispatch(actions.reset('feedback'));
};
const mapDispatchToProps = (dispatch) => ({
	addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});
fetchDishes: () => {
	dispatch(fetchDishes());
};
class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes();
	}
	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			comments: COMMENTS,
			promotions: PROMOTIONS,
			leaders: LEADERS
		};
	}

	onDishSelect(dishId) {
		this.setState({ selectedDish: dishId });
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesErrMess={this.props.dishes.errMess}
					promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
					leader={this.props.leaders.filter((leader) => leader.featured)[0]}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			return (
				<DishDetail
					dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					comments={this.props.comments.filter(
						(comment) => comment.dishId === parseInt(match.params.dishId, 10)
					)}
					addComment={this.props.addComment}
				/>
			);
		};

		const AboutPage = () => {
			return <About leaders={this.state.leaders} />;
		};
		return (
			<div>
				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
					</div>
				</Navbar>
				<Header />
				<Switch>
					<Route
						exact
						path="/contactus"
						component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}
					/>
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />} />
					<Route path="/home" component={HomePage} />
					<Route path="/aboutus" component={AboutPage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
					<Redirect to="/home" />
				</Switch>

				<Footer />
			</div>
		);
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
