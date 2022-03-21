export function dateformat(value) {
    const d = value ? new Date(value) : new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()

    return `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`
}
