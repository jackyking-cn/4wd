import { expect } from 'chai'
import dateformat from 'dateformat'
import { generateName } from '../lib/git/branch.mjs'

describe('branch name', () => {
    it('should return [type]/[name]-[yyyymmdd]', () => {
        const date = dateformat(new Date(), 'yyyymmdd')

        expect(generateName('feature', 'test')).to.equal(`feature/test-${date}`)
        expect(generateName('feature', 'test1_test1')).to.equal(`feature/test1_test1-${date}`)
        expect(generateName('feature', 'test2-test2')).to.equal(`feature/test2-test2-${date}`)
        expect(generateName('hotfix', 'test3 test3 test3')).to.equal(`hotfix/test3-test3-test3-${date}`)
        expect(generateName('hotfix', 'Test4 teSt4')).to.equal(`hotfix/test4-test4-${date}`)
    })
})
