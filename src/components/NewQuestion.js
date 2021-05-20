import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questionActions';
import { connect } from 'react-redux';
import { handleSaveTargetPath } from '../actions/targetPathActions';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBRow } from 'mdb-react-ui-kit';

class NewQuestion extends Component {
    sFunc = 'NewQuestion';
    state = {
        question1 : '',
        question2 : '',
        questionSubmitted: false,
    };

    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        if ( this.props.authedUser === null ) {
            debug && console.log( sFunc + 'props', this.props );

            const { dispatch } = this.props;
            dispatch( handleSaveTargetPath( this.props.location.pathname ) );

            this.props.history.push( `/login` );
        }

    }

    handleChange = ( e ) => {
        const sFunc = this.sFunc + '.handleChange()-->';
        const debug = false;

        let questionNumber = 'question1';
        if ( e.target.id === 'Question2' )
            questionNumber = 'question2';

        let value = e.target.value;

        this.setState( ( state ) => ( {
            ...state,
            [questionNumber] : value,
        } ) );

        debug && console.log( sFunc + 'state', this.state );
    };

    handleSubmit = ( e ) => {
        const sFunc = this.sFunc + '.handleSubmit()-->';
        const debug = false;

        e.preventDefault();

        const { question1, question2 } = this.state;
        const { dispatch } = this.props;
        debug && console.log( sFunc + 'question1', question1, 'question2', question2 );

        dispatch( handleAddQuestion( question1, question2 ) );

        this.setState( () => {
            return {
                question1 : '',
                question2 : '',
                questionSubmitted: 'Question has been submitted',
            };
        } );

    };

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;


        debug && console.log( sFunc + 'here' );

        // const { authedUser } = this.props;
        // if ( authedUser === null )
        //     return null;

        let sQuestionSubmitted = this.state.questionSubmitted;


        return (
            <MDBCard>
                <MDBCardBody shadow='0' border='blue' className='bg-white' style={{maxWidth: '50%', margin: 'auto', border: '1px solid black' }} >
                    <MDBCardTitle className='bg-light border m-lg-auto' style={{padding: '2px'}}>
                        <h2>Create New Question</h2>
                    </MDBCardTitle>
                    <MDBRow>
                        <MDBCardText>
                            Complete the question:
                            <h4>Would you rather ...</h4>
                            <form
                                onSubmit={this.handleSubmit}
                            >
                                <input
                                    id="Question1"
                                    type="text"
                                    placeholder="Enter Question One"
                                    value={this.state.question1}
                                    onChange={this.handleChange}
                                />
                                <br/>
                                ------------------- or -------------------
                                <br/>
                                <input
                                    id="Question2"
                                    type="text"
                                    placeholder="Enter Question Two"
                                    value={this.state.question2}
                                    onChange={this.handleChange}
                                />
                                <br/>
                                <button>
                                    Submit
                                </button>
                            </form>

                        </MDBCardText>
                    </MDBRow>
                </MDBCardBody>
                <MDBCardText className='text-danger'>
                    {sQuestionSubmitted}
                </MDBCardText>
            </MDBCard>
        );
    }
}

// <div>
//     <div className="new-question-box">
//         <div className="light-box">
//             <h2>Create New Question</h2>
//         </div>
//         <div className="question-entry">
//             Complete the question:
//             <h4>Would you rather ...</h4>
//             <form
//                 onSubmit={this.handleSubmit}
//             >
//                 <input
//                     id="Question1"
//                     type="text"
//                     placeholder="Enter Question One"
//                     value={this.state.question1}
//                     onChange={this.handleChange}
//                 />
//                 <br/>
//                 ------------------- or -------------------
//                 <br/>
//                 <input
//                     id="Question2"
//                     type="text"
//                     placeholder="Enter Question Two"
//                     value={this.state.question2}
//                     onChange={this.handleChange}
//                 />
//                 <br/>
//                 <button>
//                     Submit
//                 </button>
//             </form>
//         </div>
//     </div>
// </div>


function mapStateToProps( { authedUser } ) {
    return { authedUser };
}

export default connect( mapStateToProps )( NewQuestion );