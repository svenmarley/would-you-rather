// noinspection SpellCheckingInspection

import { API } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { receiveQuestionsObj } from './questionActions';
import { setAuthedUserObjLogOut } from './authedUserActions';
import { setCurrentTab } from './questionTabActions';

//const AUTHED_ID = 'sarahedo';

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
    QUESTION_TYPES : {
        UNANSWERED: 'QUESTION_TYPE_UNANSWERED',
        ANSWERED: 'QUESTION_TYPE_ANSWERED',
    },
    NAV: {
        SAVE_TARGET_PATH: 'NAV_SAVE_TARGET_PATH',
        REMOVE_TARGET_PATH: 'NAV_REMOVE_TARGET_PATH',
    }

};

export function handleInitialData() {
    const sFunc1 = 'handleInitialData()-->';
    let debug = false;

    console.log( sFunc1 );

    return ( dispatch, /*getState*/ ) => {
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

                      dispatch( setCurrentTab( GLOBALS.TABS.UNANSWERED ));

                      dispatch( setAuthedUserObjLogOut() )
                      //dispatch( setAuthedUserObj( 'johndoe' ) );

                      dispatch( hideLoading() );
                  } )
    };
}

/**
 *
 * @param question
 * @param authedUser
 * @return {null|string}
 */
export function getAuthedUsersQuestionChoice( question, authedUser ) {
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
