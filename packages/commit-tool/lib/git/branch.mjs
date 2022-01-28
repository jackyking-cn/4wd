import dateformat from 'dateformat'
import { execa } from 'execa'
import prompts from 'prompts'
import { empty, hint, prompt, warn } from '../logger.mjs'

const branchType = {
    feature: 'new feature',
    hotfix: 'fix bug',
}
const choices = Object.keys(branchType).map((key) => ({
    title: `${key} - ${branchType[key]}`,
    value: key,
}))
const nameReg = /^[a-zA-Z0-9]+([-_ ][a-zA-Z0-9]+)*$/

async function getValue(key, options, allowEmpty = false) {
    const result = await prompts(options)

    if (!allowEmpty && !result[key]) {
        console.log()
        process.exit(0)
    }

    return result[key]
}

export function generateName(type, name) {
    if (!type || !name) {
        return ''
    }

    const d = dateformat(new Date(), 'yyyymmdd')
    const n = name.toLowerCase().split(' ').join('-')

    return `${type}/${n}-${d}`
}

export async function generate(defaultName) {
    prompt('Generate branch', '', false)
    const type = await getValue('type', {
        type: 'select',
        name: 'type',
        message: 'Pick a branch type',
        choices,
    })
    const name = await getValue('name', {
        type: 'text',
        name: 'name',
        message: 'Enter the branch name',
        initial: defaultName,
        validate: (str) => nameReg.test(str) || 'Branch name is invalid.',
    })
    const branchName = generateName(type, name)
    empty()

    try {
        const { stdout } = await execa('git', ['branch', '--list'])

        if (stdout.includes(branchName)) {
            warn('Branch name already exists.')
            process.exit(0)
        }

        await execa('git', ['branch', branchName])
        await execa('git', ['checkout', branchName])

        hint(`Switched to branch '${branchName}'`)
        process.exit(0)
    } catch (error) {
        warn(error)
        process.exit(0)
    }
}
