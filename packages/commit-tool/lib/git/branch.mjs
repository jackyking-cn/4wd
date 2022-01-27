import dateformat from 'dateformat'
import { execa } from 'execa'
import prompts from 'prompts'
import { hint, warn } from '../logger.mjs'

export function generateName(str) {
    if (!str) {
        return ''
    }

    const date = dateformat(new Date(), 'yyyymmdd')
    const name = str.toLowerCase().split(' ').join('-')

    return `feature\/${name}-${date}`
}

export async function generate() {
    const nameReg = /^[a-zA-Z0-9]+([-_ ][a-zA-Z0-9]+)*$/

    try {
        const { name } = await prompts({
            type: 'text',
            name: 'name',
            message: 'Please input branch name',
            validate: (str) => nameReg.test(str) || 'Branch name is invalid.',
        })

        if (!name) {
            console.log()
            process.exit(0)
        }

        const branchName = generateName(name)
        const { stdout } = await execa('git', ['branch', '--list'])

        if (stdout.includes(branchName)) {
            warn('Branch name already exists.')
            process.exit(0)
        }

        await execa('git', ['branch', branchName])
        await execa('git', ['checkout', branchName]).p

        hint(`Switched to branch '${branchName}'`)
        process.exit(0)
    } catch (error) {
        warn(error)
        process.exit(0)
    }
}
