import init_ui from './simulator/ui/UI'

import { push as push_state } from './simulator/classes/StateStack'
import IterationsState from './pathfinder/states/IterationsState'

import SimulatorConfig from "./simulator/config/Configuration"
import PathfinderConfig from './pathfinder/config/Configuration'

import Task from "./simulator/classes/Task"
import { add as add_task } from './simulator/classes/TaskList'

import { Solvers } from './pathfinder/solvers/SolverFactory'
import { get_task_cards } from './simulator/ui/components/content/Content'

// TODO add description/welcome overlay
// TODO add config page/overlay

SimulatorConfig.lock()
PathfinderConfig.lock()

const width = PathfinderConfig.get_property_value("grid_width") as number
const height = PathfinderConfig.get_property_value("grid_height") as number
const size = PathfinderConfig.get_property_value("grid_cell_size") as number
const tasks_amount = PathfinderConfig.get_property_value("tasks_amount") as number

const tasks = [
    { solver: Solvers.BFS, name: "BFS (Breadth-first search)" },
    { solver: Solvers.DFS, name: "DFS (Depth-first search)" },
    { solver: Solvers.Dijkstra, name: "Dijkstra" },
    { solver: Solvers.AStar, name: "A* search" }
]

init_ui({
    canvas_width: width * size,
    canvas_height: height * size,
    tasks_amount
})

get_task_cards().forEach((card, index) => {
    const { name, solver } = tasks[index]
    card.set_title(name)
    add_task(new Task(card.get_context(), solver))
})

push_state(new IterationsState())