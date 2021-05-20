import { GLOBALS } from '../actions/shared';

export default function targetPath( state = {}, action ) {
     const sFunc = `reducers/targetPath: ${action.type}-->`;
     const debug = false;

     if ( debug && ( action.type.includes( 'TARGET_PATH' ) ) )
         console.log( sFunc + 'state', state, 'action', action );

     switch ( action.type ) {

         case GLOBALS.NAV.REMOVE_TARGET_PATH:
             return null

         case GLOBALS.NAV.SAVE_TARGET_PATH:
             return action.targetPath;


        default:
            return state;
    }
}
