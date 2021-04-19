import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends Component {
    sFunc = 'Question'
    render() {
        const sFunc = this.sFunc + '.render()-->'

        console.log( sFunc + 'props', this.props );

        const { id, questions, users /*authedUserId*/ } = this.props;
        const thisQuestion = questions[id];
        const questionsUser = users[thisQuestion.authorId];

        return (
            <span className="question-full">
                <div className="question-asking">
                    <h3>&nbsp;&nbsp;{questionsUser.name} asks:</h3>
                </div>
                <div className="question-block">
                    <div className="question-avatar">
                        <img
                            src={questionsUser.avatarURL}
                            width="90"
                            alt={'Image of ' + questionsUser.name}
                        />
                    </div>
                    <div className="question-details">
                        <form>
                                <input
                                    type='radio'
                                    value="questionOne"
                                    name='questionChoice'
                                >
                                    thisQuestion.optionOne.text
                                </input>
                                <input
                                    type='radio'
                                    value="questionTwo"
                                    name='questionChoice'
                                >
                                    thisQuestion.optionTwo.text
                                </input>
                            <button>
                                Submit
                            </button>
                        </form>
                    </div>
    </div>
    </span>

    );
    }
}

Question.propTypes = {
    id : PropTypes.string.isRequired,
};

function mapStateToProps( { questions, users, authedUserId } ) {
    return {
        questions,
        users,
        authedUserId,
    };
}

export default connect( mapStateToProps )( Question );