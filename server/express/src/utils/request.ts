import { type Request as ExpressRequest } from 'express'

interface IncomingOptions extends Pick<ExpressRequest, 'method' | 'headers'> {}

export const mergeOptions = (incoming: IncomingOptions, override: RequestInit = {}, signal?: AbortSignal): RequestInit =>
    Object.assign(
        {},
        {
            method: incoming.method,
            referrer: incoming.headers.referer
        },
        override,
        {
            headers: new Headers(Object.assign({}, incoming.headers, override.headers)),
            duplex: 'half',
            signal
        }
    )