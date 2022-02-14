import { execa } from 'execa'
import prompts from 'prompts'
import { empty, error, hint, prompt, warn } from '../logger.mjs'
import { getChanges } from './status.mjs'

const messageType = {
    feat: 'new feature',
    fix: 'fix bug',
    docs: 'change documentation',
    style: 'change code style',
    refactor: 'refactor code',
    test: 'change test case',
    chore: 'build and others',
}
const choices = Object.keys(messageType).map((key) => ({
    title: `${key} - ${messageType[key]}`,
    value: key,
}))

async function getValue(key, options, allowEmpty = false) {
    const result = await prompts(options)

    if (!allowEmpty && !result[key]) {
        console.log()
        process.exit(0)
    }

    return result[key]
}

export function generateMessage(type, message, issue) {
    if (!type || !message) {
        return ''
    }

    if (issue) {
        const issues = issue
            .split(',')
            .map((value) => `#${value.trim()}`)
            .join(', ')

        return `${type}: ${message.trim()} (${issues})`
    } else {
        return `${type}: ${message.trim()}`
    }
}

export async function commit(defaultMessage) {
    const changes = await getChanges()

    if (!changes) {
        warn('Nothing to commit.')
        process.exit(0)
    }

    prompt('Changes for commit', changes)

    prompt('Generate commit message', '', false)
    const type = await getValue('type', {
        type: 'select',
        name: 'type',
        message: 'Pick a commit type',
        choices,
    })
    const message = await getValue('message', {
        type: 'text',
        name: 'message',
        message: 'Enter the commit message',
        initial: defaultMessage,
        validate: (str) => !!str || "Commit message can't be empty.",
    })
    const issue = await getValue(
        'issue',
        {
            type: 'text',
            name: 'issue',
            message: 'Enter the issue number, example: 123, 124, 125',
            validate: (str) =>
                str
                    ? /^[0-9]+?([, ][0-9]+)*$/.test(str) ||
                      'Issue number is invalid.'
                    : true,
        },
        true
    )
    const commitMessage = generateMessage(type, message, issue)
    empty()
    prompt('Commit changes', '', false)

    try {
        await execa('git', ['add', '.'])
        await execa('git', ['commit', '-am', commitMessage], {
            stdio: 'inherit',
        })

        empty()
        hint('Commit success')
        process.exit(0)
    } catch (e) {
        error(e)
        process.exit(0)
    }
}
