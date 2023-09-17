import { add as add_task } from './simulator/tasks/TaskList'
import { get_solver_info_by_id } from './pathfinder/solvers/SolverFactory'
import { get_task_cards } from './simulator/ui/components/content/Content'
import { init as init_loop } from './loop/Loop'
import init_ui from './simulator/ui/UI'
import IterationsState from './pathfinder/states/IterationState'
import PathfinderConfig from './pathfinder/config/Configuration'
import { push as push_state } from './loop/StateStack'
import SimulatorConfig from "./simulator/config/Configuration"
import SolverInformation from "./pathfinder/solvers/SolverInformation"
import Task from "./simulator/tasks/Task"
import { TypeColors } from './pathfinder/types/TypeColors'
import Value from './global/Value'

// TODO add description/welcome overlay
// TODO add config page/overlay

SimulatorConfig.lock()
PathfinderConfig.lock()

const width = PathfinderConfig.get_property_value("grid_width") as number
const height = PathfinderConfig.get_property_value("grid_height") as number
const size = PathfinderConfig.get_property_value("grid_cell_size") as number
const tasks_amount = PathfinderConfig.get_property_value("tasks_amount") as number

const tasks = [
    get_solver_info_by_id(SolverInformation.BFS.ID),
    get_solver_info_by_id(SolverInformation.DFS.ID),
    get_solver_info_by_id(SolverInformation.Dijkstra.ID),
    get_solver_info_by_id(SolverInformation.AStar.ID)
]

const colors = [
    { color: TypeColors.floor.color, label: TypeColors.floor.label },
    { color: TypeColors.wall.color, label: TypeColors.wall.label },
    { color: TypeColors.start.color, label: TypeColors.start.label },
    { color: TypeColors.goal.color, label: TypeColors.goal.label },
    { color: TypeColors.search.color, label: TypeColors.search.label },
    { color: TypeColors.expanded.color, label: TypeColors.expanded.label },
    { color: TypeColors.path.color, label: TypeColors.path.label }
]

init_loop(
    new Value(
        SimulatorConfig.get_property_value("speed_multiplier_max") as number,
        SimulatorConfig.get_property_value("speed_multiplier_min") as number,
        SimulatorConfig.get_property_value("speed_multiplier_default") as number
    )
)

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
                id: SolverInformation.BFS.ID,
                label: SolverInformation.BFS.SHORT
            },
            {
                id: SolverInformation.DFS.ID,
                label: SolverInformation.DFS.SHORT
            },
            {
                id: SolverInformation.Dijkstra.ID,
                label: SolverInformation.Dijkstra.SHORT
            },
            {
                id: SolverInformation.AStar.ID,
                label: SolverInformation.AStar.SHORT
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
    const { ID: id, FULL: full } = tasks[index]
    card.set_title(full)
    add_task(new Task(card.get_context(), id))
})

push_state(new IterationsState())