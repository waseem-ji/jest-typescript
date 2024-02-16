import { toUpperCase } from "../app/Utils";

describe('Utils test suite',()=> {
    test('should return Uppercase' , () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC')
    })
})