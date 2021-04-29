import React, { Component } from 'react';
import PropTypes from 'prop-types';
import yourChoiceIcon from '../assets/Vote.png';

class QuestionSummaryDetails extends Component {
    render() {

        const { text, questionTotal, totalQuestions, winner } = this.props;

        const Percent1 = ( ( questionTotal / totalQuestions ) * 100 );
        const Percent2 = 100 - Percent1;

        const thisClassName = 'question-' + ( winner ? 'winner' : 'loser' );

        const thisColor = ( winner ? 'green' : 'black' );

        return (
            <div >
                {
                    ( ( winner )
                            ?
                            <img alt="Your Choice" src={yourChoiceIcon} className="question-yourChoice"/>
                            :
                            null
                    )
                }
                <div className={thisClassName}>
                    <div style={{ color : `${thisColor}` }}>
                        Would you rather {text}?
                    </div>
                    <div className="question-graph">
                        <span style={{ backgroundColor : 'green', width : `${Percent1}%` }}>&nbsp;</span>
                        <span style={{ backgroundColor : 'gray', width : `${Percent2}%` }}>&nbsp;</span>
                    </div>
                    <div style={{ color : 'black', fontWeight : 'bold', textAlign : 'center' }}>
                        {questionTotal} out of {totalQuestions} votes
                    </div>
                </div>
            </div>
        );
    }
}

QuestionSummaryDetails.propTypes = {
    text : PropTypes.string.isRequired,
    questionTotal : PropTypes.number.isRequired,
    totalQuestions : PropTypes.number.isRequired,
    winner : PropTypes.bool.isRequired,
};

export default QuestionSummaryDetails;