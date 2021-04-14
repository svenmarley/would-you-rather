import { GLOBALS } from './shared';

export function setAuthedUserObj( authedUserId ) {
    return {
        type: GLOBALS.USERS.LOGIN,
        authedUserId
    }
}

