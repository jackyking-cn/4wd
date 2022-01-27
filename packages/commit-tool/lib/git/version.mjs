import { execa } from 'execa'
import { warn } from '../logger.mjs'

export async function check() {
    try {
        await execa('git', ['--version'])
    } catch (error) {
        console.log()
        warn('Please install git.')
        process.exit(0)
    }
}
