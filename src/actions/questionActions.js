import { GLOBALS } from './shared';
import { hideLoading, showLoading } from 'react-redux-loading';
import { API } from '../utils/_DATA';
import { addQuestionToUser} from './userActions';

export function receiveQuestionsObj( questions ) {

    return {
        type : GLOBALS.QUESTIONS.RECEIVE,
        questions,
    };

}

function addQuestion( question ) {
    return {
        type : GLOBALS.QUESTIONS.ADD,
        question,
    };

}

export function handleAddQuestion( question1, question2 ) {

    return ( dispatch, getState ) => {
        const sFunc = 'handleAddQuestion()-->';
        const { authedUser } = getState();

        dispatch( showLoading );
        console.log( sFunc + 'old State', getState() );

        return API._saveQuestion( {
                                      optionOneText : question1,
                                      optionTwoText : question2,
                                      authorId : authedUser,
                                  } )
                  .then( ( question ) => {
                      dispatch( addQuestion( question ) );
                      dispatch( addQuestionToUser( question ) );
                  } )
                  .then( () => {
                      dispatch( hideLoading() );
                  } )

    };
}