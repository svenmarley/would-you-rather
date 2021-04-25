import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import { Avatar } from '@material-ui/core';
// import Question from './Question';
import { withRouter } from 'react-router-dom';

class ListQuestion extends Component {
    sFunc = 'ListQuestion';

    showQuestion = ( e ) => {
        const sFunc = this.sFunc + '.showQuestion()-->';
        const debug = false;

        debug && console.log( sFunc + 'target', e.target );

        const id = e.target.id;
        debug && console.log( sFunc + 'id', id );

        this.props.history.push( `/question/${id}` );
    };

    render() {

        const { questions, users, id } = this.props;

        const thisQuestion = questions[id];
        const thisUser = users[thisQuestion.authorId];

        return (
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
                        <button
                            style={{ margin : '2px 2px 2px 2px' }}
                            onClick={this.showQuestion}
                            id={id}
                        >
                            View Question
                        </button>
                    </div>
                </div>
            </span>
        );
    }
}

ListQuestion.propTypes = {
    id : PropTypes.string.isRequired,
};

function mapStateToProps( { questions, users, authedUserId } ) {
    return {
        questions,
        users,
        authedUserId,
    };
}

export default withRouter( connect( mapStateToProps )( ListQuestion ) );