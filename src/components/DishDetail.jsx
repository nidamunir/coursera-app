import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Row,
	Col,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap';
import { Loading } from './Loading';
import { Link } from 'react-router-dom';
import { addComment } from '../redux/ActionCreators';

import { Control, LocalForm, Errors } from 'react-redux-form';

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.toggleModal = this.toggleModal.bind(this);

		this.state = {
			isModalOpen: false,
			author: '',

			comment: '',

			touched: {
				author: false,
				comment: false
			}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(values) {
		//event.preventDefault();
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	validate(author) {
		const errors = {
			author: '',
			comment: ''
		};

		if (this.state.touched.author && author.length < 3) errors.author = 'author should be >= 3 characters';
		else if (this.state.touched.author && author.length > 15) errors.author = 'author should be <= 15 characters';

		return errors;
	}
	handleBlur = (field) => (evt) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true }
		});
	};
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}
	render() {
		const errors = this.validate(this.state.author);
		const required = (val) => val && val.length;
		const maxLength = (len) => (val) => !val || val.length <= len;
		const minLength = (len) => (val) => val && val.length >= len;
		if (props.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		} else if (props.errMess) {
			return (
				<div className="container">
					<div className="row">
						<h4>{props.errMess}</h4>
					</div>
				</div>
			);
		} else if (props.dish != null)
			return (
				<React.Fragment>
					<Button outline onClick={this.toggleModal}>
						<span className="fa fa-sign-in fa-lg" /> Submit comment
					</Button>
					<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
						<ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
						<ModalBody>
							<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
								<Row className="form-group">
									<Label htmlFor="rating" md={2}>
										Rating
									</Label>
									<Col md={10}>
										<Control.select
											model=".rating"
											id="rating"
											name="rating"
											className="form-control"
										>
											{' '}
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">2</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</Control.select>
									</Col>
								</Row>{' '}
								<Row className="form-group">
									<Label htmlFor="author" md={2}>
										Name
									</Label>
									<Col md={10}>
										<Control.text
											model=".author"
											id="author"
											name="author"
											placeholder="Name"
											className="form-control"
											validators={{
												required,
												minLength: minLength(3),
												maxLength: maxLength(15)
											}}
										/>
										<Errors
											className="text-danger"
											model=".author"
											show="touched"
											messages={{
												required: 'Required',
												minLength: 'Must be greater than 3 characters',
												maxLength: 'Must be 15 characters or less'
											}}
										/>
									</Col>
								</Row>
								<Row className="form-group">
									<Label htmlFor="author" md={2}>
										Comment
									</Label>
									<Col md={10}>
										<Control.textarea
											model=".comment"
											id="comment"
											name="comment"
											placeholder="Name"
											className="form-control"
											validators={{
												required
											}}
										/>
										<Errors
											className="text-danger"
											model=".comment"
											show="touched"
											messages={{
												required: 'Required'
											}}
										/>
									</Col>
								</Row>
								<Button outline onClick={this.handleSubmit}>
									<span className="fa fa-sign-in fa-lg" /> Submit comment
								</Button>
							</LocalForm>
						</ModalBody>
					</Modal>{' '}
				</React.Fragment>
			);
	}
}

function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	} else {
		return <div />;
	}
}

function RenderComments({ comments, addComment, dishId }) {
	if (comments == null) {
		return <div />;
	}
	const list = comments.map((comment) => {
		return (
			<li>
				<p>{comment.comment}</p>
				<p>
					-- {comment.author}, {getDate(comment.date)}
				</p>
			</li>
		);
	});
	return list;
}

const DishDetail = (props) => {
	if (props.dish != null)
		return (
			<div className="container">
				{' '}
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments
							comments={props.comments}
							addComment={props.addComment}
							dishId={props.dish.id}
						/>
						<CommentForm dishId={props.dish.id} addComment={addComment} />
					</div>
				</div>
			</div>
		);
	else return <div />;
};
const getDate = (date) => {
	var d = new Date(date);
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return months[parseInt(d.getMonth(), 10)] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

export default DishDetail;
