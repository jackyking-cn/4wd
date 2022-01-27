import { generate } from './git/branch.mjs'
import { commit } from './git/commit.mjs'
import { check } from './git/version.mjs'

export async function init() {
    const args = process.argv
    const others = args.slice(2)

    await check()

    if (others.includes('-b')) {
        generate(others.filter((value) => value != '-b').join(' '))
    } else {
        commit(others.join(' '))
    }
}
