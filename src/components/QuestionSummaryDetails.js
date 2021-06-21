import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import yourChoiceIcon from '../assets/Vote.png';
import { MDBCard, MDBCardBody, MDBCardText, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';

class QuestionSummaryDetails extends Component {
    sFunc = 'QuestionSummaryDetails'

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = true;

        let { text, questionTotal, totalQuestions, authedUserChoice, winner } = this.props;

        const Percent1 = ( ( questionTotal / totalQuestions ) * 100 ).toFixed( 1 );
        const thisColor = ( winner ? 'success' : 'warning' );

        debug && console.log( sFunc + 'text', text, 'authedUserChoice', authedUserChoice );


        return (
            <Fragment>
                {
                    ( authedUserChoice ?
                            <span className="question-yourChoice">
                                Your
                                <br/>Choice
                            </span>
                        :
                        null
                    )
                }

                <MDBCard>
                    <MDBCardBody class={'bg-' + thisColor}>
                        <MDBCardText style={{ textAlign : 'left' }}>
                            Would you rather {text}?
                        </MDBCardText>
                        <MDBProgress height={20} style={{ backgroundColor : 'lightgray', border : '1px solid black' }}>
                            <MDBProgressBar width={Percent1} valuemin={0} valuemax={100}>
                                {Percent1}%
                            </MDBProgressBar>
                        </MDBProgress>
                        {questionTotal} out of {totalQuestions} votes
                    </MDBCardBody>
                </MDBCard>

            </Fragment>
        );
    }
}

// <div>
//     {
//         ( ( winner )
//                 ?
//                 <img alt="Your Choice" src={yourChoiceIcon} className="question-yourChoice"/>
//                 :
//                 null
//         )
//     }
//     <div className={thisClassName}>
//         <div style={{ color : `${thisColor}` }}>
//             Would you rather {text}?
//         </div>
//         <div className="question-graph">
//             <span style={{ backgroundColor : 'green', width : `${Percent1}%` }}>&nbsp;</span>
//             <span style={{ backgroundColor : 'gray', width : `${Percent2}%` }}>&nbsp;</span>
//         </div>
//         <div style={{ color : 'black', fontWeight : 'bold', textAlign : 'center' }}>
//             {questionTotal} out of {totalQuestions} votes
//         </div>
//     </div>
// </div>

QuestionSummaryDetails.propTypes = {
    text : PropTypes.string.isRequired,
    questionTotal : PropTypes.number.isRequired,
    totalQuestions : PropTypes.number.isRequired,
    winner : PropTypes.bool.isRequired,
};

export default QuestionSummaryDetails;