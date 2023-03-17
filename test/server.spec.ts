
import chai from 'chai';
const assert=chai.assert;
const expect=chai.expect;
const should=chai.should();

describe("server",()=>{
    it("arr",()=>{
        var arr1=[1,2,0,2,1,0]
        var arr2=arr1;
        var arr3=[1,2,0,2,1,0]
        if (arr1!==arr3){
            assert.equal(arr3[0],arr2[0])
        }
        // assert.equal(arr2[0],1)
        // arr2[0]=5
        // arr1[0]=1

        assert.equal(arr3[0],arr2[0])
        // assert.equal(arr1[0],5,"not equal")
    })
})