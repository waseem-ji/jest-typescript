import { toUpperCase } from "../app/Utils";

describe('Utils test suite',()=> {
    it('should return Uppercase for a valid string' , () => {
        //arrange
        const sut = toUpperCase;
        const expected = "ABC";

        //act
        const actual = sut("abc");

        //assert
        expect(actual).toBe(expected);

    })
})