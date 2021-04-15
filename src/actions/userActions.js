import { GLOBALS } from './shared';

export function receiveUsersObj( users ) {

    return {
        type: GLOBALS.USERS.RECEIVE,
        users,
    }
}

export function addQuestionToUser( question ) {
    return {
        type: GLOBALS.USERS.ADD_QUESTION_TO_USER,
        question
    }
}