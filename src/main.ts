import {
    get_information_by_id as get_solver_information,
    SOLVER_TYPE
} from './pathfinder/solvers/SolverInformation'
import { add as add_task } from './simulator/tasks/TaskList'
import { get_task_cards } from './simulator/ui/components/content/Content'
import { init as init_loop } from './loop/Loop'
import init_ui from './simulator/ui/UI'
import IterationsState from './pathfinder/states/IterationState'
import PathfinderConfig from './pathfinder/config/Configuration'
import { push as push_state } from './loop/StateStack'
import SimulatorConfig from "./simulator/config/Configuration"
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
    get_solver_information(SOLVER_TYPE.BFS),
    get_solver_information(SOLVER_TYPE.DFS),
    get_solver_information(SOLVER_TYPE.DIJKSTRA),
    get_solver_information(SOLVER_TYPE.A_STAR)
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
                label: "path length",
            },
            {
                id: 3,
                label: "expanded nodes",
            },
            {
                id: 4,
                label: "time taken",
            }
        ],
        rows: [
            {
                id: SOLVER_TYPE.BFS,
                label: get_solver_information(SOLVER_TYPE.BFS).SHORT
            },
            {
                id: SOLVER_TYPE.DFS,
                label: get_solver_information(SOLVER_TYPE.DFS).SHORT
            },
            {
                id: SOLVER_TYPE.DIJKSTRA,
                label: get_solver_information(SOLVER_TYPE.DIJKSTRA).SHORT
            },
            {
                id: SOLVER_TYPE.A_STAR,
                label: get_solver_information(SOLVER_TYPE.A_STAR).SHORT
            }
        ]
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