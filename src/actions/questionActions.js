import { GLOBALS } from './shared';
import { hideLoading, showLoading } from 'react-redux-loading';
import { API } from '../utils/_DATA';
import { addQuestionToUser } from './userActions';
import { saveUserAnswer} from './userActions';

export function receiveQuestionsObj( questions ) {
    const sFunc = 'receiveQuestionsObj()-->'
    const debug = true;

    debug && console.log( sFunc + 'questions', questions );

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
        const debug = false;

        const { authedUser } = getState();

        dispatch( showLoading );
        debug && console.log( sFunc + 'old State', getState() );

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
                  } );

    };
}

function saveQuestionAnswer( authedUser, qid, answerChoice ) {

    return {
        type : GLOBALS.QUESTIONS.SAVE_ANSWER,
        authedUser,
        qid,
        answerChoice,
    };
}

export function handleQuestionChoice( question, currChoice ) {
    const sFunc = 'handleQuestionChoice()';
    return ( dispatch, getState ) => {

        const sFunc2 = sFunc + '.return()';
        const debug = false;

        debug && console.log( sFunc2 + 'here' );
        const { authedUser } = getState();

        return API._saveQuestionAnswer( {
                                            authedUser,
                                            qid : question.id,
                                            answer : currChoice,
                                        } )
                  .then( ( response ) => {
                      const sFunc2 = sFunc + '._saveQuestionAnswer().then()-->';

                      console.log( sFunc2 + 'response', response );

                      dispatch( saveQuestionAnswer( authedUser, question.id, currChoice ) );
                      dispatch( saveUserAnswer( authedUser, question.id, currChoice ) );

                  } );

    };

}