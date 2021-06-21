import { GLOBALS } from '../actions/shared';

export default function users( state = {}, action ) {
    const sFunc = `reducers/users: ${action.type}-->`;
    let debug = false;

    if ( debug && ( action.type.includes( 'USER' ) ) )
        console.log( sFunc + 'state', state, 'action', action );

    switch ( action.type ) {
        case GLOBALS.USERS.RECEIVE:
            return {
                ...state,
                ...action.users,
            };

        case GLOBALS.USERS.ADD_QUESTION_TO_USER:
            const { question } = action;

            console.log( sFunc + `adding question [${question.id}] to user [${question.authorId}]` );
            debug && console.log( sFunc + 'question', question );
            debug && console.log( sFunc + 'state', state );

            let b = {
                ...state,
                [question.authorId] : {
                    ...state[question.authorId],
                    questions : state[question.authorId].questions.concat( [ question.id ] ),
                },
            };

            debug && console.log( sFunc + 'b', b );

            return b;

        case GLOBALS.USERS.SAVE_USER_ANSWER:
            // {
            //     type: GLOBALS.USERS.SAVE_USER_ANSWER,
            //     authedUser,
            //     qid,
            //     currChoice
            // }
            debug = false;

            const a1 = {
                ...state[action.authedUser],
                answers : {
                    ...state[action.authedUser].answers,
                    [action.qid] : action.currChoice,
                },
            };

            debug && console.log( sFunc + 'a1', a1 );

            return {
                ...state,
                [action.authedUser] : a1,
            };

        default:
            return state;
    }

}