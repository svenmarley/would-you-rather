import { GLOBALS} from '../actions/shared';

export default function questions( state = {}, action ) {

    switch( action.type ) {

        case GLOBALS.QUESTIONS.RECEIVE :
            return {
                ...state,
                ...action.questions
            }


        case GLOBALS.QUESTIONS.OPTION_ONE:
            return {
            }

        case GLOBALS.QUESTIONS.OPTION_TWO:
            return {
            }

        default:
            return state
    }
}