import {v4 as uuidv4} from 'uuid'

export function isEmpty(str) {
    return (!str || str.length === 0 );
}

export function isUndefined(str){
    return typeof(str) === "undefined"
}

export function genID(){
    return uuidv4()
}

export function isEmptyOrUndefined(str){
    return (!str || str.length === 0 || typeof(str)=== "undefined")
}

export function strTruncate(str, numDigit){
    return str.length > numDigit ? str.substring(0, numDigit-3) + "...": str;
}