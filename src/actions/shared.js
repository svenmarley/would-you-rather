import { API } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { receiveQuestionsObj } from './questionActions';
import { setAuthedUserObj } from './authedUserActions';

const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    QUESTIONS : {
        RECEIVE : 'QUESTIONS_RECEIVE',
        ADD : 'QUESTIONS_ADD',
        SAVE_ANSWER: 'QUESTIONS_SAVE_ANSWER',

        OPTION_ONE : 'optionOne',
        OPTION_TWO : 'optionTwo',
    },
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
        ADD_QUESTION_TO_USER : 'USER_ADD_QUESTION_TO_USER',
        SAVE_USER_ANSWER: 'USER_SAVE_USER_ANSWER',
    },
    TABS : {
        ANSWERED : 'TABS_ANSWERED',
        UNANSWERED : 'TABS_UNANSWERED',
    },

};

export function handleInitialData() {
    const sFunc1 = 'handleInitialData()-->';
    let debug = false;

    console.log( sFunc1 );

    return ( dispatch, getState ) => {
        const sFunc2 = sFunc1 + '.dispatch()-->';
        debug && console.log( sFunc2 + 'here' );

        dispatch( showLoading() );

        return API.getInitialData()
                  .then( ( { users, questions } ) => {
                      let sFunc = sFunc2 + 'getInitialData().then()-->';
                      debug = true;
                      debug && console.log( sFunc + 'users', users );
                      debug && console.log( sFunc + 'questions', questions );

                      dispatch( receiveQuestionsObj( questions ) );

                      dispatch( receiveUsersObj( users ) );

                      dispatch( setAuthedUserObj( AUTHED_ID ) );

                      dispatch( hideLoading() );
                  } )
                  .then( () => {
                      const sFunc = sFunc2 + '_getUsers().then().then()-->';
                      debug && console.log( sFunc + 'state', getState() );

                  } );
    };
}