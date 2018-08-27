import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

class App extends Component {
  state = {
    robots: [],
    searchfield: ''
  }

  componentDidMount() {console.log(this.props)
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => this.setState({ robots: users }));
  }

  handleSearchChange = e => {
    this.setState({
      searchfield: e.currentTarget.value
    });
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => 
      robot.name.toLowerCase().includes(searchfield.toLowerCase()));

    if (robots.length === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox onChange={this.handleSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} /> 
          </ErrorBoundry>
        </Scroll>
      </div>
    )
  }
}

export default App;