import { API } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { receiveQuestionsObj } from './questionActions';
import { setAuthedUserObj } from './authedUserActions';
import { setCurrentTab } from './questionTabActions';

const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    QUESTIONS : {
        RECEIVE : 'QUESTIONS_RECEIVE',
        ADD : 'QUESTIONS_ADD',
        SAVE_ANSWER : 'QUESTIONS_SAVE_ANSWER',

        OPTION_ONE : 'optionOne',
        OPTION_TWO : 'optionTwo',
    },
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
        ADD_QUESTION_TO_USER : 'USER_ADD_QUESTION_TO_USER',
        SAVE_USER_ANSWER : 'USER_SAVE_USER_ANSWER',
    },
    TABS : {
        ANSWERED : 'TABS_ANSWERED',
        UNANSWERED : 'TABS_UNANSWERED',
        SAVE_CURRENT : 'TABS_SAVE_CURRENT',
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
                      debug && console.log( sFunc + 'users', users );
                      debug && console.log( sFunc + 'questions', questions );

                      dispatch( receiveQuestionsObj( questions ) );

                      dispatch( receiveUsersObj( users ) );

                      dispatch( setAuthedUserObj( AUTHED_ID ) );

                      dispatch( setCurrentTab( GLOBALS.TABS.UNANSWERED ));

                      dispatch( hideLoading() );
                  } )
                  .then( () => {
                      const sFunc = sFunc2 + '_getUsers().then().then()-->';
                      debug && console.log( sFunc + 'state', getState() );

                  } );
    };
}

export function getAuthedUsersChoice( question, authedUser ) {
    const sFunc = 'getAuthedUsersChoice()-->';
    const debug = true;

    debug && console.log( sFunc + 'question', question );
    debug && console.log( sFunc + 'authedUser', authedUser );

    let choice = null;
    let v = question.optionOne.votes.find( ( v ) => ( v === authedUser ) );
    if ( v ) {
        choice = GLOBALS.QUESTIONS.OPTION_ONE;
    }
    else {
        v = question.optionTwo.votes.find( ( v ) => ( v === authedUser ) );
        if ( v ) choice = GLOBALS.QUESTIONS.OPTION_TWO;
    }

    return choice;
}
