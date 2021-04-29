import { GLOBALS } from '../actions/shared';

export default function questionsTab( state = null, action ) {
    const sFunc = `reducers/questionsTab: ${action.type}-->`;
    const debug = true;

    if ( debug && ( action.type.includes( 'TAB' ) ) )
        debug && console.log( sFunc + 'state', state, 'action', action );

    switch ( action.type ) {
        case GLOBALS.TABS.SAVE_CURRENT :
            return action.questionsTab;

        default:
            return state;
    }
}