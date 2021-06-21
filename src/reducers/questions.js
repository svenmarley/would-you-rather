import { GLOBALS } from '../actions/shared';

export default function questions( state = {}, action ) {
    const sFunc = `reducers/questions: ${action.type}-->`;
    const debug = true;

    if ( debug && ( action.type.includes( 'QUESTION' ) ) )
        console.log( sFunc + 'state', state, 'action', action );

    switch ( action.type ) {

        case GLOBALS.QUESTIONS.SAVE_ANSWER:
            // {
            //     type : GLOBALS.QUESTIONS.SAVE_ANSWER,
            //         authedUser,
            //         qid,
            //         answerChoice,
            // }
            const sFunc2 = sFunc + GLOBALS.QUESTIONS.SAVE_ANSWER + '-->';
            debug && console.log( sFunc2 + 'state', state );

            const nonAnswerChoice = action.answerChoice === GLOBALS.QUESTIONS.OPTION_ONE
                ? GLOBALS.QUESTIONS.OPTION_TWO : GLOBALS.QUESTIONS.OPTION_ONE;

            let v1 = state[action.qid][action.answerChoice].votes.filter( ( aID ) => {
                debug && console.log( 'aID', aID );
                return ( aID !== action.authedUser );       // remove all of this authedUser id's
            } );

            v1.push( action.authedUser );             // add it once to the list


            debug && console.log( sFunc2 + 'votes nonAnswer', state[action.qid][nonAnswerChoice].votes )

            const v2 = state[action.qid][nonAnswerChoice].votes.filter( ( aID ) => {
                debug && console.log( '2-aID', aID, action.authedUser );
                return ( aID !== action.authedUser );
            } );
            debug && console.log( sFunc2 + 'AFTER votes nonAnswer', state[action.qid][nonAnswerChoice].votes )

            debug && console.log( sFunc2 + 'v1', v1, action.answerChoice );
            debug && console.log( sFunc2 + 'v2', v2, nonAnswerChoice );

            return {
                ...state,
                [action.qid] : {
                    ...state[action.qid],
                    [action.answerChoice] : {
                        ...state[action.qid][action.answerChoice],
                        votes : v1,
                    },
                    [nonAnswerChoice] : {
                        ...state[action.qid][nonAnswerChoice],
                        votes : v2,
                    },
                },
            };

        case GLOBALS.QUESTIONS.RECEIVE :

            return orderQuestions( action.questions );

        case GLOBALS.QUESTIONS.ADD:
            const { question } = action;

            debug && console.log( sFunc + 'question', question );
            debug && console.log( sFunc + 'state', state );

            state[question.id] = question;

            return orderQuestions( state )

        default:
            return state;
    }
}

function orderQuestions( questions ) {
    const sFunc = 'orderQuestions()-->';
    const debug = false;

    debug && console.log( sFunc + 'inQuestions', questions )


    let aQ = []
    Object.keys( questions ).forEach( (k) => {

        const a = questions[k].timestamp;
        let b = {
            id: k,
            timestamp: a
        }

        aQ.push( b )
    });

    aQ.sort( (a, b ) => {
        debug && console.log( sFunc + 'sort-->a', a, 'b', b, 'returning', ( b.timestamp - a.timestamp ) );
        return ( b.timestamp - a.timestamp )
    })

    debug && console.log( sFunc + 'aQ', aQ );

    let ret = {}
    aQ.forEach( (a) => {

        ret[a.id] = questions[a.id]
    } )
    debug && console.log( sFunc + 'returning ret', ret )

    return ret;
}