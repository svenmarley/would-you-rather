import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import { Avatar } from '@material-ui/core';
// import Question from './Question';
import { withRouter } from 'react-router-dom';
import { getAuthedUsersQuestionChoice, GLOBALS } from '../actions/shared';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRow, MDBCol,  } from 'mdb-react-ui-kit';

class ListQuestion extends Component {
    sFunc = 'ListQuestion';

    showQuestion = ( e ) => {
        const sFunc = this.sFunc + '.showQuestion()-->';
        const debug = false;

        debug && console.log( sFunc + 'target', e.target );
        debug && console.log( sFunc + 'props', this.props );

        const id = e.target.id;
        debug && console.log( sFunc + 'id', id );

        const { questions, authedUser } = this.props;
        const question = questions[id];

        let authedUserChoice = getAuthedUsersQuestionChoice( question, authedUser );

        debug && console.log( sFunc + 'authedUserChoice', authedUserChoice );

        if ( authedUserChoice !== null ) {
            this.props.history.push( `/questionSummary/${id}` );
        }
        else {
            this.props.history.push( `/question/${id}` );
        }
    };

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        const { questions, users, id, questionType } = this.props;

        const thisQuestion = questions[id];
        const thisUser = users[thisQuestion.authorId];

        debug && console.log( sFunc + `id [${id}]`, 'thisQuestion', thisQuestion );
        debug && console.log( sFunc + 'thisUser', thisUser );

        let sButtonText;
        if ( questionType === GLOBALS.QUESTION_TYPES.UNANSWERED )
            sButtonText = 'Answer';
        else
            sButtonText = 'See Answers';

        let date = new Date( thisQuestion.timestamp ).toLocaleString()

        return (
            <MDBCard shadow='0' border='dark'  style={{ maxWidth: '50%', margin: 'auto' }}
            >
                <MDBRow className='g-0' >
                    <MDBCol md='3' style={{verticalAlign:'middle', margin:'auto'}}>
                        <MDBCardImage src={thisUser.avatarURL} alt='...' fluid style={{width: '600px'}}/>
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle>
                                {thisUser.name} asks:
                            </MDBCardTitle>
                            <MDBCardText>{date}</MDBCardText>
                            <MDBCardText >
                                {thisQuestion.optionOne.text.substr( 0, 20 )}... <strong>-or-</strong> ...
                            </MDBCardText>
                            <MDBBtn onClick={this.showQuestion}
                                    id={id}
                            >{sButtonText}</MDBBtn>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        );
    }
}

/*
 <span className="question-full">
 <div className="question-asking">
 <h3>&nbsp;&nbsp;{thisUser.name} asks:</h3>
 <span className="question-id">
 [id={thisQuestion.id}]
 </span>

 </div>
 <div className="question-block">
 <div className="question-avatar">
 <img
 src={thisUser.avatarURL}
 width="90"
 alt={'Image of ' + thisUser.name}
 />
 </div>
 <div className="question-details">
 &nbsp;&nbsp;... {thisQuestion.optionOne.text.substr( 0, 15 )} ...
 <div>
 <button
 style={{ margin : '2px 2px 2px 2px' }}
 onClick={this.showQuestion}
 id={id}
 >
 Answer Question
 </button>
 </div>
 </div>
 </div>
 </span>
 */

ListQuestion.propTypes = {
    id : PropTypes.string.isRequired,
};

function mapStateToProps( { questions, users, authedUser } ) {
    return {
        questions,
        users,
        authedUser,
    };
}

export default withRouter( connect( mapStateToProps )( ListQuestion ) );