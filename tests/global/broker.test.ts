import {
    beforeEach,
    describe,
    expect,
    it
} from 'vitest'
import {
    get_all_subscriptions,
    publish,
    reset as reset_broker,
    subscribe
} from '../../src/global/Broker'

describe("test Broker features", () => {

    beforeEach(() => {
        reset_broker()
    })

    it("subscribe", () => {
        const topics = ["TEST_TOPIC_1", "TEST_TOPIC_2", "TEST_TOPIC_3"]

        const add_subscription = (topic: string): void => { subscribe(topic, (): void => { /* void */ }) }
        topics.forEach((topic) => { add_subscription(topic) })

        expect(get_all_subscriptions()).toEqual(topics)

        subscribe("NEW_TOPC", (): void => { /* void */ })
        expect(get_all_subscriptions()).not.toEqual(topics)
    })

    it("published message will be forwarded to all subscribers", () => {
        const topic = "test_topic"

        let result1: string = ""
        const update1 = (message: string): void => { result1 = message }
        console.log("subscribe from test")
        subscribe(topic, update1)

        let result2: string = ""
        const update2 = (message: string): void => { result2 = message }
        console.log("subscribe from test")
        subscribe(topic, update2)

        expect(get_all_subscriptions()).toEqual([topic])

        const message = "test_message"
        publish(topic, message)

        expect(result1).to.be.equal(message)
        expect(result2).to.be.equal(message)
    })

    it("publish without message", () => {
        const topic = "test_topic"

        let result1: string = "init"
        const update1 = (message: string): void => { result1 = message }
        console.log("subscribe from test")
        subscribe(topic, update1)

        let result2: string = "init"
        const update2 = (message: string): void => { result2 = message }
        console.log("subscribe from test")
        subscribe(topic, update2)

        expect(get_all_subscriptions()).toEqual([topic])

        publish(topic)

        expect(result1).to.be.equal("")
        expect(result2).to.be.equal("")
    })

})