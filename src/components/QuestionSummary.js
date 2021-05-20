import React, { Component, Fragment } from 'react';
import LoadingBarContainer from 'react-redux-loading';
import { connect } from 'react-redux';
import QuestionSummaryDetails from './QuestionSummaryDetails';
import { MDBCard, MDBCardImage, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { handleSaveTargetPath } from '../actions/targetPathActions';

class QuestionSummary extends Component {
    sFunc = 'QuestionSummary';

    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = true;

        debug && console.log( sFunc + 'state', this.state );
        debug && console.log( sFunc + 'props', this.props );

        const { history, dispatch, location } = this.props;

        if ( this.props.authedUser === null ) {
            debug && console.log( sFunc + 'props', this.props );

            dispatch( handleSaveTargetPath( location.pathname ) );

            history.push( `/login` );
        }
    }

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = true;

        debug && console.log( sFunc + 'props', this.props );
        const { question, author, q1Total, q2Total, authedUser } = this.props;
        if ( question === null )
            return null;

        const totalQuestions = q1Total + q2Total;

        debug && console.log( sFunc + 'authedUser', authedUser, 'question', question );

        return (
            <Fragment>
                <LoadingBarContainer/>

                <MDBCard shadow="0" border="dark" style={{ display : 'inline-block', margin : 'auto' }}
                >
                    <MDBCardTitle class={'bg-info'} style={{ textAlign : 'left', padding : '5px' }}>
                        Asked by {author.name}:
                    </MDBCardTitle>
                    <MDBRow style={{ whiteSpace : 'nowrap', margin : '0px 0px 10px 0px' }}>
                        <MDBCol xmd="2" style={{ verticalAlign : 'middle', margin : 'auto' }}>
                            <MDBCardImage src={author.avatarURL} alt="..." fluid
                                          style={{ width : '200px', border : '2px solid black' }}/>
                        </MDBCol>
                        <MDBCol xmd="6">
                            <MDBCardTitle style={{ textAlign : 'left' }}>
                                Results:
                            </MDBCardTitle>
                            <MDBRow>
                                <QuestionSummaryDetails
                                    text={question.optionOne.text}
                                    questionTotal={q1Total}
                                    totalQuestions={totalQuestions}
                                    winner={( q1Total > q2Total )}
                                    authedUserChoice={question.optionOne.votes.indexOf( authedUser ) !== -1}
                                />
                            </MDBRow>
                            <MDBRow className={'g-0'}>
                                <QuestionSummaryDetails
                                    text={question.optionTwo.text}
                                    questionTotal={q2Total}
                                    totalQuestions={totalQuestions}
                                    winner={( q2Total > q1Total )}
                                    authedUserChoice={question.optionTwo.votes.indexOf( authedUser ) !== -1}
                                />
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>


            </Fragment>
        );
    }
}


function mapStateToProps( { questions = [], users = [], authedUser }, props ) {
    const sFunc = 'QuestionSummary.mapStateToProps()-->';
    const debug = true;

    debug && console.log( sFunc + 'inside' );
    const { id } = props.match.params;

    let question = null;
    let author = null;
    let q1Total = null;
    let q2Total = null;

    if ( typeof ( questions[id] ) !== 'undefined' ) {
        question = questions[id];
        author = users[question.authorId];
        q1Total = question.optionOne.votes.length;
        q2Total = question.optionTwo.votes.length;

        debug && console.log( sFunc + 'q1Total', q1Total, 'q2Total', q2Total );
    }

    return {
        question,
        author,
        q1Total,
        q2Total,
        authedUser,
    };
}

export default connect( mapStateToProps )( QuestionSummary );