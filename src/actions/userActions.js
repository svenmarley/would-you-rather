import { GLOBALS } from './shared';

export function receiveUsersObj( users ) {

    return {
        type: GLOBALS.USERS.RECEIVE,
        users,
    }

}