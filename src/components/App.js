import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import '../assets/App.css';
import NewQuestion from './NewQuestion';
import Dashboard from './Dashboard';
import Question from './Question';

class App extends Component {

    componentDidMount() {
        this.props.dispatch( handleInitialData() );
    }

    render() {
        return (
            <div className="App">
                <Dashboard />
            </div>
        );
    }
}

export default connect()( App );
