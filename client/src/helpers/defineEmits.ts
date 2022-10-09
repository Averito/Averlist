export const defineEmits = <EventNames extends string>(events: Record<EventNames, Function>) => {
	return (eventName: EventNames, ...args: any) => {
		for (const key of Object.keys(events)) {
			if (key === eventName) {
				// @ts-ignore
				events[key](...args)
			}
		}
	}
}
