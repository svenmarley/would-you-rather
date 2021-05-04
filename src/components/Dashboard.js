import React, { Component } from 'react';
import { GLOBALS } from '../actions/shared';
import DashboardTab from './DashboardTab';
import { connect } from 'react-redux';
import ListQuestion from './ListQuestion';
import { withRouter } from 'react-router-dom';
import { setCurrentTab } from '../actions/questionTabActions';

class Dashboard extends Component {
    sFunc = 'Dashboard';

    // componentDidMount() {
    //     const sFunc = 'Dashboard.componentDidMount()-->';
    //     const debug = true;
    //
    //     debug && console.log( sFunc + 'Dashboard.state', this.state );
    //     debug && console.log( sFunc + 'props', this.props );
    // }

    getOppositeTab = () => {
        if ( this.props.questionsTab === GLOBALS.TABS.UNANSWERED )
            return GLOBALS.TABS.ANSWERED;
        else
            return GLOBALS.TABS.UNANSWERED;
    };

    handleTabClick = ( e ) => {
        const sFunc = this.sFunc + '.handleTabClick()-->';
        const debug = false;

        const { id } = e.target;
        const { questionsTab } = this.props;

        debug && console.log( sFunc + 'id', id );

        if ( id === questionsTab ) {
            console.log( sFunc + '  Already selected tab' );
            return;
        }

        const newTab = this.getOppositeTab();

        this.props.dispatch( setCurrentTab( newTab ) );
    };

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        const { questionsTab } = this.props;

        debug && console.log( sFunc + 'Dashboard.state', this.state );
        return (
            <div>
                <div className="tabs">
                    <DashboardTab
                        currSelected={questionsTab}
                        thisTab={GLOBALS.TABS.UNANSWERED}
                        handler={this.handleTabClick}/>
                    <DashboardTab
                        currSelected={questionsTab}
                        thisTab={GLOBALS.TABS.ANSWERED}
                        handler={this.handleTabClick}/>
                </div>
                {questionsTab === GLOBALS.TABS.UNANSWERED ?
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

function mapStateToProps( { questions, users, authedUser, questionsTab } ) {
    const sFunc = 'Dashboard.mapStateToProps()-->';
    const debug = false;

    debug && console.log( sFunc + 'users', users )
    const user = users[authedUser];

    debug && console.log( sFunc + 'user', user );
    debug && console.log( sFunc + 'questionsTab', questionsTab );

    return {
        unansweredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof ( user.answers[qId] ) === 'undefined' )
            );
        } ).sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp )

        , answeredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof ( user.answers[qId] ) !== 'undefined' )
            );
        } ).sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp )

        , authedUser
        , questionsTab,

    };
}

export default withRouter( connect( mapStateToProps )( Dashboard ) );