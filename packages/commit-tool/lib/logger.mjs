import chalk from 'chalk'

const { log } = console

export function empty() {
    log()
}

export function error(str) {
    log(chalk.red(str))
    log()
}

export function hint(str) {
    log(chalk.green(str))
    log()
}

export function prompt(title, content, hasEmpty = true) {
    log(chalk.green.bold(`> ${title}`))
    content && log(content)
    hasEmpty && log()
}

export function warn(str) {
    log(chalk.yellow(str))
    log()
}
