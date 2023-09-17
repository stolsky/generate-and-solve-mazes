import { InformationCollection } from "../types/Information";

const GeneratorInformation: InformationCollection = {
    EmptyMaze: {
        id: 1,
        full: "",
        short: "Empty"
    },
    GrowingTree: {
        id: 2,
        full: "",
        short: "GrowingTree"
        // TODO add pros
        // TODO add cons
    },
    NoGenerator: {
        id: -1,
        full: "Requested generator information not found",
        short: "Error"
    }
} as const

export default GeneratorInformation