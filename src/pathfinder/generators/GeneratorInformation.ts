// TODO add pros and cons to every algorithm seperated by comma (",")
const GeneratorInformation = {
    EmptyMaze: {
        ID: 1,
        FULL: "",
        SHORT: "Empty"
    },
    GrowingTree: {
        ID: 2,
        FULL: "",
        SHORT: "GrowingTree"
        
    },
    KruskalsAlgorithm: {
        ID: 3,
        FULL: "",
        SHORT: "Kruskal"
    },
    PrimsAlgorithm: {
        ID: 4,
        FULL: "",
        SHORT: "Prim"
    },
    RecursiveBacktracking: {
        ID: 5,
        FULL: "",
        SHORT: "RecursiveBacktracking"
    },
    NoGenerator: {
        ID: -1,
        FULL: "Requested generator information not found",
        SHORT: "Error"
    }
} as const

export default GeneratorInformation