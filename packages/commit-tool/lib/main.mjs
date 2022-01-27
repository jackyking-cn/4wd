import { generate } from './git/branch.mjs'
import { commit } from './git/commit.mjs'
import { check } from './git/version.mjs'

export async function init() {
    const args = process.argv;

    await check()

    if (args.includes('-b')) {
        generate()
    } else {
        commit()
    }
}
