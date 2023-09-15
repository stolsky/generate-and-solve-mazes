import {
    get_solver_info_by_id,
    SolverInfo
} from './pathfinder/solvers/SolverFactory'
import { add as add_task } from './simulator/classes/TaskList'
import { get_task_cards } from './simulator/ui/components/content/Content'
import init_ui from './simulator/ui/UI'
import IterationsState from './pathfinder/states/IterationsState'
import PathfinderConfig from './pathfinder/config/Configuration'
import { push as push_state } from './simulator/classes/StateStack'
import SimulatorConfig from "./simulator/config/Configuration"
import Task from "./simulator/classes/Task"
import { TypeColor } from './pathfinder/classes/CellTypes'

// TODO add description/welcome overlay
// TODO add config page/overlay

SimulatorConfig.lock()
PathfinderConfig.lock()

const width = PathfinderConfig.get_property_value("grid_width") as number
const height = PathfinderConfig.get_property_value("grid_height") as number
const size = PathfinderConfig.get_property_value("grid_cell_size") as number
const tasks_amount = PathfinderConfig.get_property_value("tasks_amount") as number

const tasks = [
    get_solver_info_by_id(SolverInfo.BFS.id),
    get_solver_info_by_id(SolverInfo.DFS.id),
    get_solver_info_by_id(SolverInfo.Dijkstra.id),
    get_solver_info_by_id(SolverInfo.AStar.id)
]

const colors = [
    { color: TypeColor.floor.color, label: TypeColor.floor.label },
    { color: TypeColor.wall.color, label: TypeColor.wall.label },
    { color: TypeColor.start.color, label: TypeColor.start.label },
    { color: TypeColor.goal.color, label: TypeColor.goal.label },
    { color: TypeColor.search.color, label: TypeColor.search.label },
    { color: TypeColor.expanded.color, label: TypeColor.expanded.label },
    { color: TypeColor.path.color, label: TypeColor.path.label }
]

init_ui(
    {
        canvas_width: width * size,
        canvas_height: height * size,
        tasks_amount
    },
    {
        columns: [
            {
                id: 1,
                label: ""
            },
            {
                id: 2,
                label: "Path length",
            },
            {
                id: 3,
                label: "Expanded nodes",
            },
            {
                id: 4,
                label: "Time taken",
            }
        ],
        rows: [
            {
                id: SolverInfo.BFS.id,
                label: SolverInfo.BFS.short
            },
            {
                id: SolverInfo.DFS.id,
                label: SolverInfo.DFS.short
            },
            {
                id: SolverInfo.Dijkstra.id,
                label: SolverInfo.Dijkstra.short
            },
            {
                id: SolverInfo.AStar.id,
                label: SolverInfo.AStar.short
            }
        ]
    },
    {
        colors
    }
)

get_task_cards().forEach((card, index) => {
    const { id, full } = tasks[index]
    card.set_title(full)
    add_task(new Task(card.get_context(), id))
})

push_state(new IterationsState())