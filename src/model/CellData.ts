import {CellIndex} from "./Board";

export enum CellValue {
    EMPTY = 0,
    ONE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
}

/**
 * never again will I be so stupid to check
 * `if (excludeColumn)` expecting an index or false.
 * I am converted (ha ha). Never use type coercion in if statements
 * (except when checking for object/array existence)
 */
export const EXCLUDE_NOTHING = false;

const CellValueEnumAsArray = Object.values(CellValue);

export const NUM_POSSIBLE_VALUES = CellValueEnumAsArray.length / 2;

export const CellValues: CellValue[] = Object.entries(CellValue).slice(NUM_POSSIBLE_VALUES).map(entry => entry[1]) as CellValue[];

export const NonEmptyCellValues: CellValue[] = CellValues.filter(val => val !== CellValue.EMPTY);

export const cellIsEmpty = (cell: CellData): boolean => cell.value === CellValue.EMPTY;

export type CellData = {
    value: CellValue,
    x: CellIndex,
    y: CellIndex,
    isInitial: boolean,
    isValid: boolean,
    blockIndex: number
}
export type CellDataWithPossibilites = CellData & {
    possibleValues: CellValue[]
}

export const countFilledCells = (cells: CellData[]): number =>
    cells.reduce((prev, curr) => prev + (cellIsEmpty(curr) ? 1 : 0), 0);
