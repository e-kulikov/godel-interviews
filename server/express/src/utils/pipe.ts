type Callback = (...input: any[]) => any
type PickLastInTuple<T extends any[]> = T extends [...rest: any[], last: infer L] ? L : never
type PickFirstFnParameters<T extends Callback[]> = Parameters<T[0]>
type PickLastFnReturn<T extends Callback[]> = ReturnType<PickLastInTuple<T>>

export const pipe = <Fns extends Callback[]>(...fns: Fns) =>
    (input: PickFirstFnParameters<Fns>[0]): PickLastFnReturn<Fns> =>
        fns.reduce((value: any, cb: Callback) => cb(value), input)
