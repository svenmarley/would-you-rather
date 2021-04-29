import React, { Component } from 'react';
import LoadingBarContainer from 'react-redux-loading';
import { connect } from 'react-redux';
import QuestionSummaryDetails from './QuestionSummaryDetails';

class QuestionSummary extends Component {

    render() {

        const { question, author, q1Total, q2Total } = this.props;

        const totalQuestions = q1Total + q2Total;

        return (
            <div className="question-bigBlock">
                <LoadingBarContainer/>
                <span className="question-full">
                    <div className="question-asking">
                        <h3>&nbsp;&nbsp;Asked by {author.name}</h3>
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
                                style={{marginTop: '50%'}}
                            />
                        </div>
                        <div className="question-details2">
                            <div style={{ fontWeight : 'bold', fontSize : 'larger' }}>
                                Results:
                            </div>
                            <div className="question-summaries">
                                <QuestionSummaryDetails
                                    text={question.optionOne.text}
                                    questionTotal={q1Total}
                                    totalQuestions={totalQuestions}
                                    winner={( q1Total > q2Total )}
                                />
                                <QuestionSummaryDetails
                                    text={question.optionTwo.text}
                                    questionTotal={q2Total}
                                    totalQuestions={totalQuestions}
                                    winner={( q2Total > q1Total )}
                                />
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        );
    }
}


function mapStateToProps( { questions = [], users = [], authedUser }, props ) {
    const sFunc = 'QuestionSummary.mapStateToProps()-->';
    const debug = false;

    const { id } = props.match.params;

    const question = questions[id];
    const author = users[question.authorId];

    const q1Total = question.optionOne.votes.length;
    const q2Total = question.optionTwo.votes.length;

    debug && console.log( sFunc + 'q1Total', q1Total, 'q2Total', q2Total );

    return {
        question,
        author,
        q1Total,
        q2Total,
    };
}

export default connect( mapStateToProps )( QuestionSummary );