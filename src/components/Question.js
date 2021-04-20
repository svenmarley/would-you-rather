import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';

class Question extends Component {
    sFunc = 'Question';

    handleChange = () => {

    }

    render() {
        const sFunc = this.sFunc + '.render()-->';

        console.log( sFunc + 'props', this.props );

        const { question, author, authedUserChoice } = this.props;

        return (
            <span className="question-full">
                <div className="question-asking">
                    <h3>&nbsp;&nbsp;{author.name} asks:</h3>
                </div>
                <div className="question-block">
                    <div className="question-avatar">
                        <img
                            src={author.avatarURL}
                            width="90"
                            alt={'Image of ' + author.name}
                        />
                    </div>
                    <div className="question-details">
                        <form>
                            <label>
                                <input
                                    type="radio"
                                    name="questionChoice"
                                    value="optionOne"
                                    checked={authedUserChoice === 'optionOne'}
                                    onChange={this.handleChange}
                                />
                                {question.optionOne.text}
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="radio"
                                    name="questionChoice"
                                    value="optionTwo"
                                    checked={authedUserChoice === 'optionTwo'}
                                    onChange={this.handleChange}
                                />
                                {question.optionTwo.text}
                            </label>
                            <br/>
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
    id : PropTypes.string, //.isRequired,
};

function mapStateToProps( { questions, users, authedUser }, props ) {
    const sFunc = 'Question.mapStateToProps()-->';
    const debug = true;

    const { id } = props.match.params;

    if ( debug ) {
        console.log( sFunc + 'props', props );
        console.log( sFunc + 'questions', questions );
        console.log( sFunc + 'users', users );
        console.log( sFunc + 'authedUser', authedUser );
        console.log( sFunc + 'id', id );
    }

    const question = questions[id];
    const author = users[question.authorId];
    let authedUserChoice = 'none';
    let v = question.optionOne.votes.find( (v) => ( v === authedUser ) );
    if ( v ) {
        authedUserChoice = 'optionOne'
    }
    else if ( !authedUserChoice ) {
        v = question.optionTwo.votes.find( (v) => ( v === authedUser ) );
        if ( v ) authedUserChoice = 'optionTwo'
    }

    console.log( sFunc + 'authedUserChoice', authedUserChoice );

    return {
        question,
        author,
        authedUserChoice,
    };
}

export default connect( mapStateToProps )( Question );