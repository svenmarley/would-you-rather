import { GLOBALS} from '../actions/shared';

export default function users( state = {}, action ) {
    const sFunc = `reducers/users: ${action.type}-->`
    const debug = false;

    if ( debug && ( action.type.includes( 'USER' ) ) )
        console.log( sFunc + 'state', state, 'action', action )

    switch( action.type ) {
        case GLOBALS.USERS.RECEIVE:
            return {
                ...state,
                ...action.users
            }

        case GLOBALS.USERS.ADD_QUESTION_TO_USER:
            const {question} = action

            console.log( sFunc + `adding question [${question.id}] to user [${question.authorId}]` )
            debug && console.log( sFunc + 'question', question )
            debug && console.log( sFunc + 'state', state )

            let b = {
                ...state,
                [question.authorId]: {
                    ...state[question.authorId],
                    questions: state[question.authorId].questions.concat( [question.id])
                }
            }

            debug && console.log( sFunc + 'b', b )

            return b

        default:
            return state;
    }

}