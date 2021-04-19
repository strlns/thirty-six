import * as React from 'react';
import Cell from "./Cell";
import {BlockData} from "../../model/BlockData";
import {CellData, CellValue} from '../../model/CellData';
import {BLOCK_WIDTH, CellIndex} from "../../model/Sudoku";
import {useEffect, useState} from "react";
import {inputRefs} from "../Board/Board";

interface BlockProps {
    block: BlockData,
    cellValidityChecker(cell: CellData): boolean,
    setCellValue(y: CellIndex, x: CellIndex, v: CellValue): void
}

export const Block = (props: BlockProps) => {
    const [state, setState] = useState(props);
    useEffect(() => {
        setState(props)
    }, [props]);
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
                                setCellValue={v => state.setCellValue(cell.y, cell.x, v)}
                            />
                        })
                    }
                </div>
            })
        }
    </div>
};