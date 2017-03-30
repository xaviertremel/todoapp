import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class ToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRemoved: this.props.todo.isRemoved
		};

		this.onClickRemove = this.onClickRemove.bind(this);
	}

	onClickRemove() {
		this.setState({isRemoved: true});
		this.props.onChange(this.props.index);
	}


	
	render() {
		const isRemoved = this.state.isRemoved;

		if (!isRemoved) {
			return (
				<li className="list-group-item">
				<span className="badge" onClick={this.onClickRemove} style={{cursor:"pointer"}}>
				<span className="glyphicon glyphicon-remove" /></span>
				{this.props.todo.text}</li>
			);
		} else { 
			return null;
		}
	}
}

class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {todos: this.props.todos};

    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(index) {
		this.props.onChange(index);
	}

	render() {
		const todos = this.state.todos;

	return (
		<ul className="list-group">
    	{todos.map((todo, index) => <ToDo todo={todo} key={index} index={index} onChange={this.handleChange} />)}
	  </ul>
		)
	}
}



class ToDoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isSubmitted: false,
			isChecked: false,
			isRemoved: false
		};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   	this.handleInputChange = this.handleInputChange.bind(this);

	}

	handleInputChange(event) {
		if (this.state.isChecked === true ) {
			this.setState({isChecked: false});
		} else {
			this.setState({isChecked: true});
		}
	}

  handleChange(event) {
  	this.setState({isSubmitted: false});
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	this.setState({isSubmitted: true});
  	this.props.onChange({
  		text: this.state.value,
  		isRemoved: false
  	});
  	event.preventDefault();
  }

	render() {
		const isChecked = this.state.isChecked;

		return (
			<div>
			<form className="input-group" onSubmit={this.handleSubmit}>
      	<span className="input-group-addon">
        	<input type="checkbox" checked={this.state.isChecked} onChange={this.handleInputChange}></input>
      	</span>
     		<input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}></input>
     		<span className="input-group-btn">
        	<button className="btn btn-default" type="submit" value="submit" disabled={isChecked}>Add</button>
      	</span>
    	</form>
    	<br/>
    	</div>
		);
	}
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleChange(todo) {
		this.state.todos.push(todo);
		this.setState({todos: this.state.todos});
	}

	handleRemove(index) {
		const todo = this.state.todos[index];
		todo.isRemoved = true;
	}

	render() {
		const todos = this.state.todos;
		console.log(todos);

		return (
			<div style={{width:400,marginLeft:10}}>
			<h3>ToDos for Xavier</h3>
				<ToDoInput
					onChange={this.handleChange} />
				<ToDoList 
					todos={todos}
					onChange={this.handleRemove} />
			</div>
		);
	}
}

//--------------------------


ReactDOM.render(
	<App />,
  document.getElementById('app')
);
