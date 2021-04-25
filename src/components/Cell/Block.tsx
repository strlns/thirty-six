import * as React from 'react';
import {SetStateAction, useEffect, useState} from 'react';
import Cell from "./Cell";
import {BlockData} from "../../model/BlockData";
import {CellData, CellValue} from '../../model/CellData';
import {CellIndex} from "../../model/Sudoku";
import {inputRefs} from "../Board/Board";
import arraysEqualSimple from "../../utility/arraysEqualSimple";

interface BlockProps {
    block: BlockData,

    cellValidityChecker(cell: CellData): boolean,

    setCellValue(x: CellIndex, y: CellIndex, v: CellValue): void,

    setFocusedCell: React.Dispatch<SetStateAction<CellData>>,
    highlightedCell: CellData | undefined
}

export const Block = (props: BlockProps) => {
    const [state, setState] = useState(props);
    useEffect(() => {
        setState(props)
    }, [props]);

    const isHighlightedCell = (cell: CellData): boolean => {
        return state.highlightedCell !== undefined && arraysEqualSimple(
            [cell.x, cell.y],
            [state.highlightedCell.x, state.highlightedCell.y]);
    };

    return <div className={"block"}>
        {state.block.getRows().map((row, blockRowIndex) => {
            return <div className={"row"} key={blockRowIndex}>
                {
                    row.map((cell, blockColIndex) => {
                        cell.isValid = state.cellValidityChecker(cell);
                        const key = `cell${blockColIndex}`;
                        if (!inputRefs[cell.x]) {
                            inputRefs[cell.x] = {};
                        }
                        inputRefs[cell.x][cell.y] = React.createRef();
                        return <Cell
                            ref={inputRefs[cell.x][cell.y]}
                            key={key}
                            cell={cell}
                            setCellValue={v => state.setCellValue(cell.x, cell.y, v)}
                            setFocusedCell={state.setFocusedCell}
                            isHighlightedCell={isHighlightedCell}
                        />
                    })
                }
            </div>
        })
        }
    </div>
};