import { PasswordChecker, PasswordErrors } from "../../app/password_checker/passwordChecker";

describe('Password checker test suite', () => {
    let sut: PasswordChecker;
    beforeEach(()=>{
        sut = new PasswordChecker();
    })

    it('Password with less than 8 charactors is invalid', () => {
        const actual = sut.checkPassword('1234567');

        expect(actual.valid).toBeFalsy();
        expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })

    it('Password with more than 8 charactors is valid', () => {
        const actual = sut.checkPassword('123456789');
        
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    })
    
    it('Password with no uppercase charactors is invalid', () => {
        const actual = sut.checkPassword('1234abcd');

        expect(actual.valid).toBeFalsy();
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE)
    })
    
    it('Password with atleast 1 uppercase charactors is valid', () => {
        const actual = sut.checkPassword('1234abcD');
        
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE)
    })
    
    
    it('Password with no lowercase charactors is invalid', () => {
        const actual = sut.checkPassword('1234ABCD');
        
        expect(actual.valid).toBeFalsy();
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE)
    })
    
    it('Password with atleast 1 lowercase charactors is valid', () => {
        const actual = sut.checkPassword('1234aBCD');
        
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWERCASE)
    })

    it('Complex passowrd is valid', () => {
        const actual = sut.checkPassword('1234asdBB');

        expect(actual.valid).toBe(true);
        expect(actual.reasons).toHaveLength(0);
    })

    it('Admin passowrd without a number is invalid' , () => {
        const actual= sut.checkAdminPassword('asdASD');
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER)
    })
    it('Admin passowrd with a number is valid' , () => {
        const actual= sut.checkAdminPassword('asdASD13');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER)
    })

    
})