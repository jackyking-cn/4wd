import { expect } from "chai";
import { generateMessage } from "../lib/git/commit.mjs";

describe('commit message', () => {
    it('should return [type]: [message] (#issue)', () => {
        expect(generateMessage('feat', 'new feature', '1')).to.equal('feat: new feature (#1)');
        expect(generateMessage('fix', 'fix bug', '2, 3')).to.equal('fix: fix bug (#2, #3)');
        expect(generateMessage('chore', ' build ')).to.equal('chore: build');
    });
});
