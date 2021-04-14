import { GLOBALS } from './shared';

export function receiveQuestionsObj( questions ) {

    return {
        type: GLOBALS.QUESTIONS.RECEIVE,
        questions,
    }


}

