import {
    
    type GenerationResults,
    type Iteration,
    type Solution,
    type SolutionResults
} from "./types"
import type IPosition from "../global/Position"

let current_iteration: Iteration

const results: Iteration[] = []

const setup_iteration = (id: number): void => {
    current_iteration = {
        id,
        setup: {},
        solutions: []
    }
}

const store_generation = (results: GenerationResults): void => {
    const { setup } = current_iteration
    if (setup !== undefined) {
        const { generator_id, seed, maze_width, maze_height, maze_type, floor_tiles } = results
        setup.generator_id = generator_id
        setup.seed = seed
        setup.maze_width = maze_width
        setup.maze_height = maze_height
        setup.maze_type = maze_type
        setup.floor_tiles = floor_tiles
    }
}

const store_positions = (start: IPosition, goal: IPosition): void => {
    const { setup } = current_iteration
    if (setup !== undefined) {
        setup.start_position = start
        setup.goal_position = goal
    }
}

const store_solution = (results: SolutionResults): void => {
    if ("solutions" in current_iteration) {
        const { solver_id, path_length, expanded_nodes, time_taken_ms } = results
        current_iteration.solutions.push({
            solver_id,
            path_length,
            expanded_nodes,
            time_taken_ms
        })
    }
}

const get_all_iteration_results = (index: number): Solution[] => results[index].solutions

const finalize_iteration = (): void => {
    // add copy(!) of current iteration to results
    results.push({ ...current_iteration })
}

export {
    finalize_iteration,
    get_all_iteration_results,
    setup_iteration,
    store_generation,
    store_positions,
    store_solution,
}