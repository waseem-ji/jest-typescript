
export enum PasswordErrors {
    SHORT = 'your password must be atleast 8 charactors long',
    NO_UPPERCASE = 'you must include atleast on uppercase charactor i your passowrd',
    NO_LOWERCASE = 'you must include atleast on lowercase charactor i your passowrd',
    NO_NUMBER = 'You must include atleast one number'
}


export interface CheckResult {
    valid : boolean,
    reasons : PasswordErrors[]
}

export class PasswordChecker {

    public checkPassword(password:string) :CheckResult {
        let reasons:PasswordErrors[] = [];
        this.checkForLength(password,reasons);
        this.checkForUppercase(password,reasons)
        this.checkForLowercase(password,reasons)
        return {
            valid : reasons.length > 0 ? false : true,
            reasons : reasons
        };
    }

    public checkAdminPassword(password:string) :CheckResult {
        const basicCheck = this.checkPassword(password);
        this.checkForNumber(password,basicCheck.reasons);

        return {
            valid : basicCheck.reasons.length > 0 ?false : true,
            reasons : basicCheck.reasons
        }
        

    }

    private checkForNumber(password : string , reasons: PasswordErrors[]) {
        const hasNumber = /\d/;
        if(!hasNumber.test(password)) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }

    }

    private checkForLength (password:string , reasons :PasswordErrors[]){
        if( password.length < 8 ) {
            reasons.push(PasswordErrors.SHORT)
        }
    }

    private checkForUppercase (password:string , reasons :PasswordErrors[]) {
        if ( password === password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPERCASE)
        }
    }

    private checkForLowercase (password:string , reasons :PasswordErrors[]) {
        if ( password === password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWERCASE)
        }
    }


}

