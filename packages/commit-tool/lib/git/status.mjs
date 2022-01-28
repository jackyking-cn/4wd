import { execa } from 'execa'
import { warn } from '../logger.mjs'

export async function getChanges() {
    try {
        const { stdout } = await execa('git', ['status', '-s'])

        return stdout
    } catch (error) {
        warn(error)
        process.exit(0)
    }
}
