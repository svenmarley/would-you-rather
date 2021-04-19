import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOBALS } from '../actions/shared';
import DashboardTab from './Dashboard-Tab';
import { connect } from 'react-redux';
import ListQuestion from './ListQuestion';

class Dashboard extends Component {
    sFunc = 'Dashboard';
    state = {
        currTabSelected : GLOBALS.TABS.UNANSWERED,
    };

    getOppositeTab = () => {
        if ( this.state.currTabSelected === GLOBALS.TABS.UNANSWERED )
            return GLOBALS.TABS.ANSWERED;
        else
            return GLOBALS.TABS.UNANSWERED;
    };

    handleTabClick = ( e ) => {
        const sFunc = this.sFunc + '.handleTabClick()-->';

        const { id } = e.target;

        console.log( sFunc + 'id', id );

        if ( id === this.state.currTabSelected ) {
            console.log( sFunc + '  Already selected tab' );
            return;
        }

        this.setState( ( state ) => ( {
            ...state,
            currTabSelected : this.getOppositeTab(),
        } ) );

    };

    render() {
        return (
            <div>
                <div className="tabs">
                    <DashboardTab
                        currSelected={this.state.currTabSelected}
                        thisOne={GLOBALS.TABS.UNANSWERED}
                        handler={this.handleTabClick}/>
                    <DashboardTab
                        currSelected={this.state.currTabSelected}
                        thisOne={GLOBALS.TABS.ANSWERED}
                        handler={this.handleTabClick}/>
                </div>
                {this.state.currTabSelected === GLOBALS.TABS.UNANSWERED ?
                    <div id="UnansweredQuestions"
                         className="answers"
                    >
                        <ul className="question-list">
                            {this.props.unansweredQuestionIds.map( ( id ) => (
                                <li key={id} className="questions-li">
                                    <ListQuestion id={id}/>
                                </li>
                            ) )}

                        </ul>
                    </div>
                    :
                    <div id="AnsweredQuestions"
                         className="answers"
                    >
                        <ul className={'question-list'}>
                            {this.props.answeredQuestionIds.map( ( id ) => (
                                <li key={id} className={'questions-li'}>
                                    <ListQuestion id={id}/>
                                </li>
                            ) )}
                        </ul>
                    </div>
                }

            </div>
        );
    }
}

Dashboard.propTypes = {};

function mapStateToProps( { questions, users, authedUser } ) {
    //const sFunc = 'Dashboard.mapStateToProps()-->'

    const user = users[authedUser];

    return {
        unansweredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof( user.answers[qId] ) === 'undefined' )
            )
        } ).sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp ),

        answeredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof( user.answers[qId] ) !== 'undefined' )
            )
        } ).sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp ),
        authedUser,

    };
}

export default connect( mapStateToProps )( Dashboard );