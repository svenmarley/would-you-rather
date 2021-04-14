import { GLOBALS} from '../actions/shared';

export default function users( state = {}, action ) {
    switch( action.type ) {
        case GLOBALS.USERS.RECEIVE:
            return {
                ...state,
                ...action.users
            }


        default:
            return state;
    }

}