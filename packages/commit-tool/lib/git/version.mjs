import { execa } from 'execa'
import { warn } from '../logger.mjs'

export async function check() {
    try {
        await execa('git', ['--version'])
    } catch (e) {
        console.log()
        warn('Please install git.')
        process.exit(0)
    }
}
