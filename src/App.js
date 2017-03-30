import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function Welcome(props) {
  return <h2>Welcome, {props.firstname +" "+ props.lastname}</h2>;
}


function UserInfo(props) {
  return <h2>hello {props.body.height}</h2>
}

function Button(props) {
  return <button>{props.name}</button>
}



class App2 extends Component {
  render() {
    return (
      <div className="App-header">
        <h2>Enter your input:</h2>
        <NameForm />
      </div>
    );
  }
}

export default App2;
