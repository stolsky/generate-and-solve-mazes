type AllowedValue = string | number

interface ConfigurationData {
    readonly key: string
    value: AllowedValue
    readonly type: AllowedValue
    // if type is string this is the minimum length of the string
    // else if type is number this is the minimal allowed number
    readonly min?: number
    // if type is string this is the maximum length of the string
    // else if type is number this is the maximal allowed number
    readonly max?: number
}

type ConfigurationProperties = Record<string, ConfigurationData>;

class Configuration {

    private is_unlocked = true
    private properties: ConfigurationProperties = {}

    constructor(data: ConfigurationData[]) {
        data.forEach((set) => {
            this.properties[set.key] = {...set}
        })
    }

    get_property(id: string): ConfigurationData {
        return { ...this.properties[id] }
    }

    get_property_value(id: string): AllowedValue {
        return this.properties[id]?.value satisfies AllowedValue
    }

    set_property(key: string, value: AllowedValue): void {
        if (this.is_unlocked && key in this.properties) {
            this.properties[key].value = value
        }
    }

    lock(): void {
        this.is_unlocked = false
    }

    unlock(): void {
        this.is_unlocked = true
    }

}

export default Configuration
export {
    type ConfigurationData
}