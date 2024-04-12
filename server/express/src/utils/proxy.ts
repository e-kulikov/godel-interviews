import { Readable, type Transform } from "node:stream"
import { type Request as ExpressRequest, type Response as ExpressResponse } from "express"

import { mergeOptions } from "./request.ts"

export const proxy = async (url: URL, req: ExpressRequest, res: ExpressResponse, options?: RequestInit, tranformer?: Transform) => {
    const { signal, abort } = new AbortController()
    
    req.once('aborted', () => {
        abort('aborted');
        res.end(null)
    })

    try {
        const response = await fetch(new Request(url, mergeOptions(req, options, signal)))

        if (!response.body) return res.end(response.status)

        let stream = Readable.fromWeb(response.body)
        if (tranformer) {
            stream = stream.pipe(tranformer)
        }
        stream.pipe(res)
    } catch (err) {
        console.error(err);
        res.status(500).end({ error: 'Something wrong happened' })
    }
}