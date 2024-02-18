import { StringUtils, getStringInfo, toUpperCase } from "../app/Utils";

describe('Utils test suite',()=> {

    describe('StringUtils test suite', () => {

        let sut: StringUtils;

        beforeEach(()=>{
            sut = new StringUtils();
            console.log('setup');
            
        })

        afterEach(()=>{
            console.log('after each - teardown');
            
        })


        it.only('should return correct uppercase for valid string' ,() => {

            const actual = sut.toUpperCase('abc');

            expect(actual).toBe('ABC');
            console.log('Actual test');
            
        })
    })









    it('should return Uppercase for a valid string' , () => {
        //arrange
        const sut = toUpperCase;
        const expected = "ABC";

        //act
        const actual = sut("abc");

        //assert
        expect(actual).toBe(expected);

    })

    it.each([
        {input:"abc" ,expected:"ABC"},
        {input:"my-String" ,expected:"MY-STRING"},
        {input:"xyz" ,expected:"XYZ"}
    ])('$input toUpperCase should return $expected', ({input,expected}) => {
        const sut = toUpperCase;

        const actual = sut(input);

        expect(actual).toBe(expected);
    })

    describe('getStringInfo fo arg My-string should ', () => {
        test('return right length', () => {
            const actual = getStringInfo('My-string');
            expect(actual.charactors).toHaveLength(9);
        })
        test('return uppercase elements' , ()=>{
            const actual = getStringInfo('My-string');
            expect(actual.uppercase).toBe('MY-STRING');
        })
        test('return right charactors' , ()=>{
            const actual = getStringInfo('My-string');
            expect(actual.charactors).toContain<string>('M');
            expect(actual.charactors).toEqual(['M','y','-','s','t','r','i','n','g']);
            expect(actual.charactors).toEqual(
                expect.arrayContaining(['y','-','s','M','t','r','i','n','g'])
            );
        })
        test('return defined extra info', ()=>{
            const actual = getStringInfo('My-string');
            expect(actual.extraInfo).not.toBe(undefined);
            expect(actual.extraInfo).not.toBeUndefined();
            expect(actual.extraInfo).toBeDefined();
            expect(actual.extraInfo).toBeTruthy();
            expect(actual.extraInfo).toEqual({});

        })
    })
})

