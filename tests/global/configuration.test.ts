import {
    beforeEach,
    describe,
    expect,
    it
} from 'vitest'
import Configuration from '../../src/global/Configuration'

describe("test Configuration class", () => {

    const config_data = [
        {
            "key": "iterations",
            "value": 10,
            "type": "number"
        },
        {
            "key": "maze_type",
            "value": "PERFECT",
            "type": "string"
        },
        {
            "key": "tasks_amount",
            "value": 4,
            "type": "number"
        }
    ]

    let config: Configuration

    beforeEach(() => {
        config = new Configuration(config_data)
    })

    it("instantiation", () => {
        expect(config).to.be.instanceof(Configuration)
    })

    it("get_property of a existing value representing a number", () => {

        const tasks_amount = config.get_property("tasks_amount")
        // { key: 'tasks_amount', value: 4, type: 'number' }
    
        expect(tasks_amount).to.haveOwnProperty("key")
        expect(tasks_amount.key).toBeTypeOf("string")
        expect(tasks_amount.key).to.be.equal("tasks_amount")

        expect(tasks_amount).to.haveOwnProperty("type")
        expect(tasks_amount.type).toBeTypeOf("string")
        expect(tasks_amount.type).to.be.equal("number")

        expect(tasks_amount).to.haveOwnProperty("value")
        expect(tasks_amount.value).toBeTypeOf("number")
        expect(tasks_amount.value).to.be.equal(4)
    })

    it("get_property of a existing value representing a string", () => {

        const maze_type = config.get_property("maze_type")
        // { key: 'maze_type', value: 'PERFECT', type: 'string' }
    
        expect(maze_type).to.haveOwnProperty("key")
        expect(maze_type.key).toBeTypeOf("string")
        expect(maze_type.key).to.be.equal("maze_type")

        expect(maze_type).to.haveOwnProperty("type")
        expect(maze_type.type).toBeTypeOf("string")
        expect(maze_type.type).to.be.equal("string")

        expect(maze_type).to.haveOwnProperty("value")
        expect(maze_type.value).toBeTypeOf("string")
        expect(maze_type.value).to.be.equal("PERFECT")
    })

    it("get_property of unknown property", () => {
        expect(config.get_property("not_a_prop")).toEqual({})
    })

    it("get_property_value of number", () => {
        const value = config.get_property_value("tasks_amount")
        expect(value).toBeTypeOf("number")
        expect(value).to.be.equal(4)
    })

    it("get_property_value of string", () => {
        const value = config.get_property_value("maze_type")
        expect(value).toBeTypeOf("string")
        expect(value).to.be.equal("PERFECT")
    })

    it("get_property_value of unknown", () => {
        expect(config.get_property_value("not_a_prop")).to.be.equal(undefined)
    })

    it("set_property locked", () => {
        const property = "maze_type"
        const old_value = "PERFECT"
        const new_value = "IMPERFECT"

        config.lock()
        config.set_property(property, new_value)
        const maze_type = config.get_property_value(property)
        expect(maze_type).to.be.equal(old_value)
    })

    it("set_property unlocked", () => {
        const property = "maze_type"
        const new_value = "IMPERFECT"

        config.set_property(property, new_value)
        const maze_type = config.get_property_value(property)
        expect(maze_type).to.be.equal(new_value)
    })

    it("set_property after unlocking locked configuration", () => {
        const property = "maze_type"
        const old_value = "PERFECT"
        const new_value = "IMPERFECT"

        config.lock()
        config.set_property(property, new_value)
        const maze_type = config.get_property_value(property)
        expect(maze_type).to.be.equal(old_value)

        config.unlock()
        config.set_property(property, new_value)
        const maze_type2 = config.get_property_value(property)
        expect(maze_type2).to.be.equal(new_value)
    })

})