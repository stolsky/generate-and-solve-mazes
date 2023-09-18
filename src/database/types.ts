import type IPosition from "../global/Position"

interface GenerationResults {
    generator_id: number,
    seed: string,
    maze_width: number,
    maze_height: number,
    maze_type: number,
    floor_tiles: number
}

interface Setup {
    generator_id?: number
    seed?: string
    maze_width?: number
    maze_height?: number
    maze_type?: number
    floor_tiles?: number
    start_position?: IPosition
    goal_position?: IPosition
}

interface Solution {
    solver_id: number
    path_length: number
    expanded_nodes: number
    time_taken_ms: number
}

interface Iteration {
    id: number
    setup: Setup
    solutions: Solution[]
}

interface SolutionResults {
    solver_id: number
    path_length: number
    expanded_nodes: number
    time_taken_ms: number
}


export {
    type GenerationResults,
    type Iteration,
    type Setup,
    type Solution,
    type SolutionResults
}