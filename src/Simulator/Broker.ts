const subscriptions: { [key: string]: Function[] } = {}

const publish = (id: string, value: string) => {
    if (Object.hasOwn(subscriptions, id)) {
        subscriptions[id].forEach((subscription) => subscription(value))
    }
}

const subscribe = (id: string, callback: Function) => {
    if (Object.hasOwn(subscriptions, id)) {
	    subscriptions[id].push(callback);
  	} else {
    	Object.defineProperty(subscriptions, id, {
  			value: [callback]
		});
  	}
}

export {
    publish,
    subscribe
}