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
        OPTION_ONE : 'optionOne',
        OPTION_TWO : 'optionTwo',
    },
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
        ADD_QUESTION_TO_USER : 'USER_ADD_QUESTION_TO_USER',
    },
    TABS : {
        ANSWERED : 'TABS_ANSWERED',
        UNANSWERED : 'TABS_UNANSWERED',
    },

};

export function handleInitialData() {
    const sFunc1 = 'handleInitialData()-->';
    const debug = false;

    return ( dispatch, getState ) => {
        const sFunc2 = sFunc1 + '.dispatch()-->';
        debug && console.log( sFunc2 + 'here' );

        dispatch( showLoading() );

        return API.getInitialData()
                  .then( ( { users, questions } ) => {
                      let sFunc = sFunc2 + 'getInitialData().then()-->';
                      debug && console.log( sFunc + 'users', users );
                      debug && console.log( sFunc + 'questions', questions );

                      dispatch( receiveUsersObj( users ) );

                      dispatch( setAuthedUserObj( AUTHED_ID ) );

                      dispatch( receiveQuestionsObj( questions ) );

                      dispatch( hideLoading() );
                  } )
                  .then( () => {
                      const sFunc = sFunc2 + '_getUsers().then().then()-->';
                      debug && console.log( sFunc + 'state', getState() );

                  } );
    };
}