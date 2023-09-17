import IPosition from "../pathfinder/types/IPosition"

type Result = {
    maze: number
    values: number[]
}

const results: Result[] = []

const store_positions = (start: IPosition, goal: IPosition): void => {

}

const store_generation_results = (generator_id: number, maze_type: number, seed: string): void => {

}

const store_solution_results = (path_length: number, expanded_cells: number, time_taken: number): void => {

}

const get_iteration_results = (index: number): number[] => results[index].values

export {
    store_generation_results,
    store_positions,
    store_solution_results
}