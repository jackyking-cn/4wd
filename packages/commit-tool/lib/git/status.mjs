import { execa } from 'execa'
import { prompt, warn } from '../logger.mjs'

export async function check() {
    try {
        const { stdout } = await execa('git', ['status', '-s'])

        if (!stdout) {
            warn('Nothing to commit.')
            process.exit(0)
        } else {
            prompt('Changes for commit', stdout)
        }
    } catch (error) {
        warn(error)
        process.exit(0)
    }
}
