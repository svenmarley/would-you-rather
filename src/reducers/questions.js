import { GLOBALS } from '../actions/shared';

export default function questions( state = {}, action ) {
    const sFunc = `reducers/questions: ${action.type}-->`;
    const debug = false;

    if ( debug && ( action.type.includes( 'QUESTION' ) ) )
        console.log( sFunc + 'state', state, 'action', action );

    switch ( action.type ) {

        case GLOBALS.QUESTIONS.RECEIVE :
            return {
                ...state,
                ...action.questions,
            };

        case GLOBALS.QUESTIONS.ADD:
            const { question } = action;

            debug && console.log( sFunc + 'question', question );
            debug && console.log( sFunc + 'state', state );

            let b = {
                ...state,
                [question.id] : question,
            };

            debug && console.log( sFunc + 'b', b );

            return b;

        default:
            return state;
    }
}