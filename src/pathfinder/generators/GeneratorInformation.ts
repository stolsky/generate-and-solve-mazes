import { InformationCollection } from "../types/Information";

const GeneratorInformation: InformationCollection = {
    EmptyMaze: {
        ID: 1,
        FULL: "",
        SHORT: "Empty"
    },
    GrowingTree: {
        ID: 2,
        FULL: "",
        SHORT: "GrowingTree"
        // TODO add pros
        // TODO add cons
    },
    NoGenerator: {
        ID: -1,
        FULL: "Requested generator information not found",
        SHORT: "Error"
    }
} as const

export default GeneratorInformation