const subscriptions: Record<string, Array<(value: string) => void>> = {}

const publish = (id: string, value: string): void => {
    if (Object.hasOwn(subscriptions, id)) {
        subscriptions[id].forEach((subscription) => {
            subscription(value)
        })
    }
}

const subscribe = (id: string, callback: (value: string) => void): void => {
    if (Object.hasOwn(subscriptions, id)) {
	    subscriptions[id].push(callback);
  	} else {
    	Object.defineProperty(subscriptions, id, {
  			value: [callback]
		})
  	}
}

export {
    publish,
    subscribe
}