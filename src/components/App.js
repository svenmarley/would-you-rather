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
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
    sFunc = 'App';


    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        this.props.dispatch( handleInitialData() );
    }

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;


        debug && console.log( sFunc + 'here' );

        return (
            <Router>
                <Fragment>
                    <LoadingBarContainer/>
                    <div className="App">
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path={'/'} exact component={Dashboard} />
                                <Route path={'/add'} exact component={NewQuestion}/>
                                <Route path={'/question/:id'} exact component={Question}/>
                                <Route path={'/questionSummary/:id'} exact component={QuestionSummary}/>
                                <Route path={'/leaderboard'} exact component={LeaderBoard}/>
                                <Route path={'/login'} exact component={Login}/>
                                <Route path={'/logout'} exact component={Logout}/>
                            </div>
                        }
                    </div>

                </Fragment>

            </Router>
        );
    }
}

function mapStateToProps( { users } ) {
    // const sFunc = 'App.js.mapStateToProps()-->';
    // const debug = false;

    return {
        loading : users.length === 0,
    };
}

export default connect( mapStateToProps )( App );
