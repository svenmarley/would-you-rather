import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleQuestionChoice } from '../actions/questionActions';
import { GLOBALS, getAuthedUsersQuestionChoice } from '../actions/shared';
import LoadingBarContainer from 'react-redux-loading';
//import { BrowserRouter as Router } from 'react-router-dom';
//import { withRouter } from  'react-router-dom';

class Question extends Component {
    sFunc = 'Question';
    state = {
        currChoice : null,
        origChoice : null,
    };

    handleSubmit = ( e ) => {
        const sFunc = this.sFunc + '.handleSubmit()-->';
        const debug = false;
        e.preventDefault();

        debug && console.log( sFunc + 'props', this.props );
        const { dispatch, question } = this.props;

        dispatch( handleQuestionChoice(
            question,
            this.state.currChoice,
        ) );

        const id = question.id;
        debug && console.log( sFunc + 'id', id );

        this.props.history.push( `/questionSummary/${id}` );

    };

    handleChange = ( e ) => {
        const sFunc = this.sFunc + '.handleChange()-->';
        const debug = false;

        debug && console.log( sFunc + 'e.target', e.target );

        this.setState( () => ( { currChoice : e.target.value } ) );
    };

    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        this.setState( () => ( {
            currChoice : this.props.authedUserChoice,
            origChoice : this.props.authedUserChoice,
        } ) );
    }

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        const { question, author } = this.props;

        return (
            <div className="question-bigBlock">
                <LoadingBarContainer/>
                <span className="question-full">
                    <div className="question-asking">
                        <h3>&nbsp;&nbsp;{author.name} asks:</h3>
                        <span className="question-id">
                            [id={question.id}]
                        </span>
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
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input
                                        type="radio"
                                        name="questionChoice"
                                        value={GLOBALS.QUESTIONS.OPTION_ONE}
                                        checked={this.state.currChoice === GLOBALS.QUESTIONS.OPTION_ONE}
                                        onChange={this.handleChange}
                                    />
                                    {question.optionOne.text}
                                </label>
                                <br/>
                                <label>
                                    <input
                                        type="radio"
                                        name="questionChoice"
                                        value={GLOBALS.QUESTIONS.OPTION_TWO}
                                        checked={this.state.currChoice === GLOBALS.QUESTIONS.OPTION_TWO}
                                        onChange={this.handleChange}
                                    />
                                    {question.optionTwo.text}
                                </label>
                                <br/>
                                <button
                                    disabled={this.state.currChoice === this.state.origChoice}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </span>
            </div>

        );
    }
}

Question.propTypes = {
    id : PropTypes.string, //.isRequired,
};

function mapStateToProps( { questions = [], users = [], authedUser }, props ) {
    const sFunc = 'Question.mapStateToProps()-->';
    const debug = false;

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
    let authedUserChoice = getAuthedUsersQuestionChoice( question, authedUser );

    debug && console.log( sFunc + 'authedUserChoice', authedUserChoice );

    return {
        question,
        author,
        authedUserChoice,
    };
}

export default connect( mapStateToProps )( Question );