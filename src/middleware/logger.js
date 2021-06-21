const logger = ( store ) => ( next ) => ( action ) => {
    const debug = true;

    const subStrings = [ 'QUESTION', 'USER', 'TAB', 'LOG' ];
    const returnValue = next( action );
    if ( ( debug ) && ( new RegExp( subStrings.join( '|' ) ).test( action.type ) ) ) {
        console.group( '(logger) action: ' + action.type );
        console.log( 'new state: ', store.getState() );
        console.groupEnd();
    }
    return returnValue;
};

export default logger;