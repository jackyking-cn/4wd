import { execa } from 'execa'
import { error } from '../logger.mjs'

export async function getChanges() {
    try {
        const { stdout } = await execa('git', ['status', '-s'])

        return stdout
    } catch (e) {
        error(e)
        process.exit(0)
    }
}
