import type IPosition from "./types/IPosition";
import random from "./random/random";

/** Shuffle an array using the Durstenfeld shuffle algorithm.
 * The array is shuffled in place.
 */
const shuffle = <T>(cells: T[]): void => {
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }
}

interface Sector {
    x_min: number
    x_max: number
    y_min: number
    y_max: number
}

const create_sectors = (width: number, height: number): Sector[] => {
    const left_quarter_width = Math.ceil(width * 0.25)
    const right_quarter_width = width - left_quarter_width
    const upper_quarter_height = Math.ceil(height * 0.25)
    const lower_quarter_height = height - upper_quarter_height
    const half_width = Math.floor(width * 0.5)
    const half_height = Math.floor(height * 0.5)
    const eights_width = Math.ceil(width * 0.125)
    const eights_height = Math.ceil(height * 0.125)

    return [  
        // NORTH_WEST
        {
            x_min: 1,
            x_max: left_quarter_width,
            y_min: 1,
            y_max: upper_quarter_height
        },
        // NORTH_EAST
        {
            x_min: right_quarter_width,
            x_max: width - 2,
            y_min: 1,
            y_max: upper_quarter_height
        },
        // SOUTH_EAST
        {
            x_min: right_quarter_width,
            x_max: width - 2,
            y_min: lower_quarter_height,
            y_max: height - 2
        },
        // SOUTH_WEST
        {
            x_min: 1,
            x_max: left_quarter_width,
            y_min: lower_quarter_height,
            y_max: height - 2
        },
        // CENTER
        {
            x_min: half_width - eights_width,
            x_max: half_width + eights_width,
            y_min: half_height - eights_height,
            y_max: half_height + eights_height
        }
    ]
}

const find_random_position_in_sector = (sector: Sector | undefined): IPosition | undefined => {
    if (sector === undefined) {
        return undefined
    }
    return {
        x: Math.floor(random(sector.x_min, sector.x_max)),
        y: Math.floor(random(sector.y_min, sector.y_max))
    }
}

const find_positions_from_sectors = (width: number, height: number): {
    start: IPosition,
    goal: IPosition
} => {
    const sectors = create_sectors(width, height)
    shuffle(sectors)
    return {
        start: find_random_position_in_sector(sectors.pop())
            ?? { x: 1, y: 1 },
        goal: find_random_position_in_sector(sectors.pop())
            ?? { x: width - 2, y: height - 2 }
    }
}

export {
    find_positions_from_sectors,
    shuffle
}