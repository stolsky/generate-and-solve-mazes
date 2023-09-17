import EmptyMaze from "./EmptyMaze"
import Generator from "./Generator"
import GeneratorInformation from "./GeneratorInformation"
import type Grid from "../classes/Grid"
import GrowingTree from "./GrowingTree"
import { type Information } from "../types/Information"

// TODO add Prim's Algorithm
// @see: https://en.wikipedia.org/wiki/Prim%27s_algorithm 
// @see: https://en.wikipedia.org/wiki/Maze_generation_algorithm
// @see: https://weblog.jamisbuck.org/under-the-hood/

const create_generator = (id: number, grid: Grid): Generator => {
    if (id === GeneratorInformation.EmptyMaze.ID) {
        return new EmptyMaze(grid)
    }
    if (id === GeneratorInformation.GrowingTree.ID) {
        return new GrowingTree(grid)
    }
    // return empty generator if nothing found
    return new Generator()
}

const get_generator_info_by_id = (id: number): Information =>
    Object.values(GeneratorInformation).find((generator) => generator.ID === id) ?? GeneratorInformation.NoGenerator

export default create_generator
export {
    get_generator_info_by_id,
    GeneratorInformation
}