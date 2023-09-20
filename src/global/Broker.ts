const subscriptions: Record<string, Array<(value: string) => void>> = {}

export const publish = (id: string, value?: string): void => {
    if (id in subscriptions) {
        subscriptions[id].forEach((subscription) => {
            subscription(value ?? "")
        })
    }
}

export const subscribe = (id: string, callback: (value: string) => void): void => {
    if (id in subscriptions) {
	    subscriptions[id].push(callback);
  	} else {
    	Object.defineProperty(subscriptions, id, {
  			value: [callback]
		})
  	}
}