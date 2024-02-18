export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}
export type StringInfo = {
    lowerCase: string,
    uppercase: string,
    charactors: string[],
    length: number,
    extraInfo: {}
}

export function getStringInfo(arg: string) :StringInfo {
    return {
        lowerCase:arg.toLowerCase(),
        uppercase:arg.toUpperCase(),
        charactors: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    }
}

export class StringUtils {
    public toUpperCase(arg: string) {
        if(!arg){
            throw new Error("Invalid Argument");
        }
        return arg.toUpperCase();
    }
}