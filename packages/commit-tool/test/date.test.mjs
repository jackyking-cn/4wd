import { expect } from 'chai'
import { dateformat } from '../lib/common/dateformat.mjs'

describe('format date', () => {
    it('should return [yyyymmdd]', () => {
        expect(dateformat(new Date('2022-3-21'))).to.equal('20220321')
        expect(dateformat(new Date('2023-12-2'))).to.equal('20231202')
        expect(dateformat(new Date('2024-5-4'))).to.equal('20240504')
        expect(dateformat(new Date('2025-12-31'))).to.equal('20251231')
    })
})
