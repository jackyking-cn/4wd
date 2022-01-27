import { expect } from 'chai'
import dateformat from 'dateformat'
import { generateName } from '../lib/git/branch.mjs'

describe('branch name', () => {
    it('should return feature/[name]-[yyyymmdd]', () => {
        const date = dateformat(new Date(), 'yyyymmdd')

        expect(generateName('test')).to.equal(`feature/test-${date}`)
        expect(generateName('test1_test1')).to.equal(`feature/test1_test1-${date}`)
        expect(generateName('test2-test2')).to.equal(`feature/test2-test2-${date}`)
        expect(generateName('test3 test3 test3')).to.equal(`feature/test3-test3-test3-${date}`)
        expect(generateName('Test4 teSt4')).to.equal(`feature/test4-test4-${date}`)
    })
})
