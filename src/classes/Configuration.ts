type AllowedValue = string | number

type ConfigurationData = {
    readonly key: string
    value: AllowedValue
    readonly type: "string" | "number"
    // if type is string this is the minimum length of the string
    // else if type is number this is the minimal allowed number
    readonly min?: number
    // if type is string this is the maximum length of the string
    // else if type is number this is the maximal allowed number
    readonly max?: number
}

type ConfigurationProperties = {
    [key: string]: ConfigurationData
}

class Configuration {

    private is_unlocked = true
    private properties: ConfigurationProperties = {}

    constructor(data: ConfigurationData[]) {
        data.forEach((set) => this.properties[set.key] = set)
    }

    get_property(id: string): ConfigurationData | {} {
        return { ...this.properties[id] }
    }

    get_property_value(id: string): AllowedValue | undefined {
        return this.properties[id]?.value
    }

    set_property(key: string, value: AllowedValue) {
        if (this.is_unlocked && Object.hasOwn(this.properties, key)) {
            this.properties[key].value = value
        }
    }

    lock() {
        this.is_unlocked = false
    }

    unlock() {
        this.is_unlocked = true
    }

}

export default Configuration
export {
    type ConfigurationData
}