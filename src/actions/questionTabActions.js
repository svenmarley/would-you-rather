import { GLOBALS } from './shared';

export function saveCurrentTab( questionsTab ) {

    return {
        type: GLOBALS.TABS.SAVE_CURRENT,
        questionsTab,
    }
}

export function setCurrentTab( questionsTab ) {

    return ( dispatch ) => {
        dispatch( saveCurrentTab( questionsTab ) );
    }
}