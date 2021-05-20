import { GLOBALS } from './shared';


export function handleSaveTargetPath( targetPath ) {
    return {
        type: GLOBALS.NAV.SAVE_TARGET_PATH,
        targetPath
    }
}

export function handleRemoveTargetPath() {
    return {
        type: GLOBALS.NAV.REMOVE_TARGET_PATH
    }
}
