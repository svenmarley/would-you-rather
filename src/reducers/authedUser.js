import { GLOBALS } from '../actions/shared';

export default function authedUser( state = null, action ) {
    switch ( action.type ) {
        case GLOBALS.USERS.LOGIN:
            return action.authedUserId;

        default:
            return state;
    }
}