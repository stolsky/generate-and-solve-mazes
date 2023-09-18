import {
    type GenerationResults,
    type Iteration,
    type Solution,
    type SolutionResults
} from "./types"
import type Position from "../global/Position"

let current_iteration: Iteration

const results: Iteration[] = []

const finalize_iteration = (): void => {
    // add copy(!) of current iteration to results
    results.push({ ...current_iteration })
}

export const setup_iteration = (id: number): void => {
    if (current_iteration !== undefined) {
        finalize_iteration()
    }
    current_iteration = {
        id,
        setup: {},
        solutions: []
    }
}

export const store_generation = (results: GenerationResults): void => {
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

export const store_positions = (start: Position, goal: Position): void => {
    const { setup } = current_iteration
    if (setup !== undefined) {
        setup.start_position = start
        setup.goal_position = goal
    }
}

export const store_solution = (results: SolutionResults): void => {
    if ("solutions" in current_iteration) {
        const { solver_id, path_length, expanded_nodes, time_taken_ms } = results
        
        // TODO evaluate solution
        const points = 0

        current_iteration.solutions.push({
            solver_id,
            path_length,
            expanded_nodes,
            time_taken_ms,
            points
        })
    }
}

export const get_all_iteration_results = (index: number): Solution[] => results[index].solutions

export const get_results_of_solver = (solver_id: number): Solution | undefined =>
    current_iteration.solutions.find((solution) => solution.solver_id === solver_id)