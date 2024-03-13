import { calculateComplexity } from "../../app/doubles/otherUtils"
describe("Other Utils test suite" , () => {
    it('should return complexity of 10 for the test stub' , ()=>{
        const stubInfo = {
            length : 5,
            extraInfo : {
                field1 : 'info1',
                field2 : 'info2'
            }
        }

        const actual = calculateComplexity(stubInfo as any);
        expect(actual).toBe(10);
    })
})