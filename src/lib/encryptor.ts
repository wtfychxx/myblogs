import crypto from 'crypto'

export const sha256Generator = (value: string) => {
    return crypto.createHash('sha256').update(value).digest('hex')
}