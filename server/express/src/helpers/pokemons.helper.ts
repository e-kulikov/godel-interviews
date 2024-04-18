export const translateURLtoID = <T extends { url: string }>({ url, ...rest }: T) => ({
    ...rest,
    id: Number(url.match(/.+\/(\d+)\/?/)?.[1]),
})

export const capitalizeName = <T extends { name: string }>({ name, ...rest }: T) => ({
    ...rest,
    name: name.charAt(0).toUpperCase() + name.slice(1),
})
