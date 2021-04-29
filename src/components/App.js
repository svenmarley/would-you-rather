import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import '../assets/App.css';
import NewQuestion from './NewQuestion';
import Dashboard from './Dashboard';
import Question from './Question';
import Nav from './Nav';
import LoadingBarContainer from 'react-redux-loading';
import QuestionSummary from './QuestionSummary';

class App extends Component {

    componentDidMount() {
        this.props.dispatch( handleInitialData() );
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBarContainer/>
                    <div className="App">
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path={'/'} exact component={Dashboard}/>
                                <Route path={'/new'} exact component={NewQuestion}/>
                                <Route path={'/question/:id'} exact component={Question}/>
                                <Route path={'/questionSummary/:id'} exact component={QuestionSummary}/>
                            </div>
                        }
                    </div>

                </Fragment>

            </Router>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        loading : authedUser === null,
    };
}

export default connect( mapStateToProps )( App );
