import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import update from 'immutability-helper';
import DatePicker from 'react-bootstrap-date-picker'



class ToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRemoved: this.props.todo.isRemoved
		};

		this.onClickRemove = this.onClickRemove.bind(this);
	}

	onClickRemove() {
		this.setState({isRemoved: 'true'});
		this.props.onChange(this.props.todo.id);
	}
	
	render() {
		const isRemoved = this.state.isRemoved;
		const date = this.props.todo.when;
		const d = date.substring(8,10)+'/'+date.substring(5,7)+'/'+date.substring(0,4);

		if (!isRemoved) {
			return (
						<div className="panel panel-primary">
							<div className="panel-heading">
								{d}<span className="badge" onClick={this.onClickRemove} style={{cursor:"pointer",float:'right'}}>
								<span className="glyphicon glyphicon-remove" /></span>
							</div>
							<div className="panel-body">
								{this.props.todo.text}
							</div>
					</div>
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

	handleChange(id) {
		this.props.onChange(id);
	}

	render() {
		const todos = this.props.todos;

		return (
		<ul className="list-group">
    	{todos.map((todo, index) => <ToDo todo={todo} key={todo.id} index={index} onChange={this.handleChange} />)}
	  </ul>
		)
	}
}



class ToDoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			whatvalue: '',
			when: '',
			whenvalue: '',
			isSubmitted: false,
			isChecked: false,
			isRemoved: false
		};
    this.handleWhatChange = this.handleWhatChange.bind(this);
    this.handleWhenChange = this.handleWhenChange.bind(this);
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

  handleWhatChange(event) {
  	this.setState({isSubmitted: false});
    this.setState({
    	whatvalue: event.target.value
    });
  }

  handleWhenChange(value) {
  	this.setState({isSubmitted: false});
    this.setState({
    	whenvalue: value
    });
  }

  handleSubmit(event) {
  	this.setState({
  		id: this.state.id + 1,
  		isSubmitted: true
  	});
  	this.props.onChange({
  		id: this.state.id,
  		text: this.state.whatvalue,
  		when: this.state.whenvalue,
  		isRemoved: false
  	});
  	event.preventDefault();
  }

	render() {
		const isChecked = this.state.isChecked;
		const showClearButton = false;

		return (
			<div>
			<form className="input-group" onSubmit={this.handleSubmit}>
     		<input type="text" className="form-control" placeholder="What" value={this.state.whatvalue} onChange={this.handleWhatChange}></input>
     		<DatePicker type="text" className="form-control" dateFormat="DD/MM/YYYY" showClearButton={showClearButton} placeholder="When" value={this.state.whenvalue} onChange={this.handleWhenChange} />
     		<span className="input-group-addon">
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
			todos: [],
			nb: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleChange(todo) {
		this.setState({
			todos: this.state.todos.concat(todo),
			nb: this.state.nb+1
		});
	}

	handleRemove(id) {
		const collection = this.state.todos;
		const todotoremove = this.state.todos[id];
		todotoremove.isRemoved = true;
		const newCollection = update(collection, {id: {$set: todotoremove}});
		this.setState({
			todos: newCollection,
			nb: this.state.nb-1
		})
	}

	render() {
		const todos = this.state.todos;
		const nb = this.state.nb;
		console.log(todos);

		return (
			<div style={{width:400,marginLeft:10}}>
			<h3>ToDos App <span className="badge" style={{float:'right'}}>{nb} remaining</span> </h3>
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
