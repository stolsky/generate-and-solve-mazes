import EmptyMaze from "./EmptyMaze"
import Generator from "./Generator"
import GeneratorInformation from "./GeneratorInformation"
import type Grid from "../classes/Grid"
import GrowingTree from "./GrowingTree"
import type Information from "../types/Information"
import Worker from "../classes/Worker"

// TODO add more algorithms
// @see: https://en.wikipedia.org/wiki/Maze_generation_algorithm
// @see: https://weblog.jamisbuck.org/under-the-hood/

const create_generator = (id: number, grid: Grid): Generator => {
    if (id === GeneratorInformation.EmptyMaze.ID) {
        return new EmptyMaze(id, grid)
    }
    if (id === GeneratorInformation.GrowingTree.ID) {
        return new GrowingTree(id, grid)
    }
    if (id === GeneratorInformation.KruskalsAlgorithm.ID) {
        // TODO replace with correct algorithm
        return new GrowingTree(id, grid, Worker.Index.FIRST)
    }
    if (id === GeneratorInformation.PrimsAlgorithm.ID) {
        return new GrowingTree(id, grid, Worker.Index.RANDOM)
    }
    if (id === GeneratorInformation.RecursiveBacktracking.ID) {
        return new GrowingTree(id, grid, Worker.Index.LAST)
    }
    // return empty generator if nothing found
    return new Generator(GeneratorInformation.NoGenerator.ID)
}

export const get_generator_info_by_id = (id: number): Information =>
    Object.values(GeneratorInformation).find((generator) => generator.ID === id) ?? GeneratorInformation.NoGenerator

export default create_generator