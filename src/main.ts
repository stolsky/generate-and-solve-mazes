import { add as add_task } from './simulator/classes/TaskList'
import { get_solver_info_by_id } from './pathfinder/solvers/SolverFactory'
import { get_task_cards } from './simulator/ui/components/content/Content'
import init_ui from './simulator/ui/UI'
import IterationsState from './pathfinder/states/IterationState'
import PathfinderConfig from './pathfinder/config/Configuration'
import { push as push_state } from './simulator/classes/StateStack'
import SimulatorConfig from "./simulator/config/Configuration"
import SolverInformation from "./pathfinder/solvers/SolverInformation"
import Task from "./simulator/classes/Task"
import { TypeColor } from './pathfinder/types/CellTypes'

// TODO add description/welcome overlay
// TODO add config page/overlay

SimulatorConfig.lock()
PathfinderConfig.lock()

const width = PathfinderConfig.get_property_value("grid_width") as number
const height = PathfinderConfig.get_property_value("grid_height") as number
const size = PathfinderConfig.get_property_value("grid_cell_size") as number
const tasks_amount = PathfinderConfig.get_property_value("tasks_amount") as number

const tasks = [
    get_solver_info_by_id(SolverInformation.BFS.id),
    get_solver_info_by_id(SolverInformation.DFS.id),
    get_solver_info_by_id(SolverInformation.Dijkstra.id),
    get_solver_info_by_id(SolverInformation.AStar.id)
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
                id: SolverInformation.BFS.id,
                label: SolverInformation.BFS.short
            },
            {
                id: SolverInformation.DFS.id,
                label: SolverInformation.DFS.short
            },
            {
                id: SolverInformation.Dijkstra.id,
                label: SolverInformation.Dijkstra.short
            },
            {
                id: SolverInformation.AStar.id,
                label: SolverInformation.AStar.short
            }
        ],
        criteria: {
            id: 3
        }
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