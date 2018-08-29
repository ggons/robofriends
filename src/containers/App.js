import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import Header from '../components/Header';
import { setSearchField, requestRobots } from '../actions';
import './App.css';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { 
      searchField, 
      robots,
      isPending,
      onSearchChange 
    } = this.props;
    const filteredRobots = robots.filter(robot => 
      robot.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="tc">
        <Header />
        <SearchBox onChange={onSearchChange} />
        <Scroll>
          { isPending ? 
            <h1>Loading...</h1> :
            <ErrorBoundry>
              <CardList robots={filteredRobots} /> 
            </ErrorBoundry>
          }
        </Scroll>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: e => dispatch(setSearchField(e.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);