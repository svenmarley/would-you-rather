import API from '../utils/API';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { receiveQuestionsObj } from './questionActions';
import { setAuthedUserObj } from './authedUserActions';

const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    QUESTIONS : {
        OPTION_ONE : 'optionOne',
        OPTION_TWO : 'optionTwo',
        RECEIVE : 'QUESTIONS_RECEIVE',
    },
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
    },
};

export function handleInitialData() {
    const sFunc1 = 'handleInitialData()-->';

    return ( dispatch, getState ) => {
        const sFunc2 = sFunc1 + '.dispatch()-->';
        console.log( sFunc2 + 'here' );

        dispatch( showLoading() );

        return API.getInitialData()
                  .then( ( { users, questions } ) => {
                      let sFunc = sFunc2 + 'getInitialData().then()-->';
                      console.log( sFunc + 'users', users );
                      console.log( sFunc + 'questions', questions );

                      dispatch( receiveUsersObj( users ) );

                      dispatch( setAuthedUserObj( AUTHED_ID ) );

                      dispatch( receiveQuestionsObj( questions ) );

                      dispatch( hideLoading() );
                  } )
                  .then( () => {
                      const sFunc = sFunc2 + '_getUsers().then().then()-->';
                      console.log( sFunc + 'state', getState() );

                  } );
    };
}