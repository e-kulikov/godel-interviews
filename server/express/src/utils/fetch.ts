import createHttpError from 'http-errors'

type FetchArguments = Parameters<typeof global.fetch>

export const fetchJSON = async <Data>(...args: FetchArguments) => {
    const response = await global.fetch(...args)

    if (!response.ok) throw createHttpError(response.status)

    return response.json() as Promise<Data>
}
