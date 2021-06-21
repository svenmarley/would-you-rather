import React, { Component } from 'react';
import { GLOBALS } from '../actions/shared';
import DashboardTab from './DashboardTab';
import { connect } from 'react-redux';
import ListQuestion from './ListQuestion';
import { withRouter } from 'react-router-dom';
import { setCurrentTab } from '../actions/questionTabActions';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

class Dashboard extends Component {
    sFunc = 'Dashboard';

    componentDidMount() {
        const sFunc = 'Dashboard.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'Dashboard.state', this.state );
        debug && console.log( sFunc + 'props', this.props );


        if ( this.props.authedUser === null ) {
            console.log( sFunc + 'props', this.props );

            this.props.history.push( `/login` );
        }

    }

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

        console.log( sFunc + 'here' );

        const { questionsTab, authedUser } = this.props;

        debug && console.log( sFunc + 'props', this.props );

        if ( !authedUser ) {
            return null;
        }

        debug && console.log( sFunc + 'Dashboard.state', this.state );
        return (
            <div style={{ margin : '0' }}>
                <div >
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
                    <MDBListGroup>
                        {this.props.unansweredQuestionIds.map( ( id ) => (
                            <MDBListGroupItem key={id}
                            >
                                <ListQuestion id={id} questionType={GLOBALS.QUESTION_TYPES.UNANSWERED} />
                            </MDBListGroupItem>
                        ) )}
                    </MDBListGroup>
                    :
                    <MDBListGroup>
                        {this.props.answeredQuestionIds.map( ( id ) => (
                            <MDBListGroupItem key={id}
                            >
                                <ListQuestion id={id} questionType={GLOBALS.QUESTION_TYPES.ANSWERED} />
                            </MDBListGroupItem>
                        ) )}
                    </MDBListGroup>

                }

            </div>
        );
    }
}

function mapStateToProps( { questions, users, authedUser, questionsTab } ) {
    const sFunc = 'Dashboard.mapStateToProps()-->';
    const debug = false;

    const user = users[authedUser];

    if ( debug ) {
        console.log( sFunc + 'users', users );
        console.log( sFunc + 'user', user );
        console.log( sFunc + 'questionsTab', questionsTab );
        console.log( sFunc + 'authedUser', authedUser );
    }

    if ( authedUser === null ) {
        return {
            authedUser,
        };
    }

    return {
        unansweredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof ( user.answers[qId] ) === 'undefined' )
            );
        } )//.sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp )

        , answeredQuestionIds : Object.keys( questions ).filter( ( qId ) => {
            return (
                ( typeof ( user.answers[qId] ) !== 'undefined' )
            );
        } )//.sort( ( a, b ) => questions[a].timestamp - questions[b].timestamp )

        , authedUser
        , questionsTab,

    };
}

export default withRouter( connect( mapStateToProps )( Dashboard ) );