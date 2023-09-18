import {
    GENERATOR_TYPE,
    NoGenerator
} from "./GeneratorInformation"
import EmptyMaze from "./EmptyMaze"
import Generator from "./Generator"
import type Grid from "../classes/Grid"
import GrowingTree from "./GrowingTree"
import Worker from "../classes/Worker"

// TODO add more algorithms
// @see: https://en.wikipedia.org/wiki/Maze_generation_algorithm
// @see: https://weblog.jamisbuck.org/under-the-hood/

const create_generator = (id: number, grid: Grid): Generator => {
    if (id === GENERATOR_TYPE.EMPTY_MAZE) {
        return new EmptyMaze(id, grid)
    }
    if (id === GENERATOR_TYPE.GROWING_TREE) {
        return new GrowingTree(id, grid)
    }
    if (id === GENERATOR_TYPE.KRUSKALS_ALGORITHM) {
        // TODO replace with correct algorithm
        return new GrowingTree(id, grid, Worker.Index.FIRST)
    }
    if (id === GENERATOR_TYPE.PRIMS_ALGORITHM) {
        return new GrowingTree(id, grid, Worker.Index.RANDOM)
    }
    if (id === GENERATOR_TYPE.RECURSIVE_BACKTRACKING) {
        return new GrowingTree(id, grid, Worker.Index.LAST)
    }
    // return empty generator if nothing found
    return new Generator(NoGenerator.ID)
}

export default create_generator