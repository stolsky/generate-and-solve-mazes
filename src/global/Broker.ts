type Callback = (topic: string) => void
const subscriptions: Map<string, Callback[]> = new Map<string, Callback[]>()

export const get_all_subscriptions = (): string[] => [...subscriptions.keys()]

export const publish = (id: string, message?: string): void => {
    // @see https://stackoverflow.com/questions/70723319/object-is-possibly-undefined-using-es6-map-get-right-after-map-set
    // @ts-expect-error: Typescript doesn't keep track of the .set .get references
    subscriptions.get(id).forEach((callback) => { callback(message ?? "") })
}

export const reset = (): void => {
    for (const key of subscriptions.keys()) {
        subscriptions.delete(key)
    }
}

export const subscribe = (topic: string, callback: Callback): void => {
    if (subscriptions.has(topic)) {
        // @see https://stackoverflow.com/questions/70723319/object-is-possibly-undefined-using-es6-map-get-right-after-map-set
        // @ts-expect-error: Typescript doesn't keep track of the .set .get references
        subscriptions.get(topic).push(callback)
    } else {
        subscriptions.set(topic, [callback])
  	}
}