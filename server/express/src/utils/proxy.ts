import { type Request as ExpressRequest } from 'express'

import { mergeOptions } from './request.ts'

export const proxy = (url: URL, req: ExpressRequest, options?: RequestInit) => {
    const abortController = new AbortController()
    
    req.once('aborted', () => {
        abortController.abort('aborted')
    })
    
    return fetch(new Request(url, mergeOptions(req, options, abortController.signal)))
}
