import * as React from "react"
import {ForwardedRef, SetStateAction} from "react"
import {CellData, cellIsEmpty, CellValue, CellValues} from "../../model/CellData";
import {Input, withStyles} from "@material-ui/core";

interface CellProps {
    cell: CellData,
    setCellValue(v: CellValue): void,
    setFocusedCell: React.Dispatch<SetStateAction<CellData>>,
    isHighlightedCell(c: CellData): boolean
}

const NumInput = withStyles({
    root: {
        fontSize: 'inherit',
        display: 'flex' //full width, default is inline-flex
    },
    input: {
        textAlign: 'center'
    }
})(Input);

const Cell = React.forwardRef((props: CellProps, ref: ForwardedRef<HTMLInputElement>) => {
    const isHighlighted = () => props.isHighlightedCell(props.cell);
    const className = `cell${props.cell.isInitial ? ' fixed' : ''}\
    ${props.cell.isValid ? '' : ' invalid'}\
    ${isHighlighted() ? 'hint' : ''}\
    `;

    const formattedValue = cellIsEmpty(props.cell) ? '' : props.cell.value;

    const onKeyPress: React.KeyboardEventHandler = event => {
        if (props.cell.isInitial) return;
        const val = Number(event.key) as CellValue;
        if (val in CellValues) {
            props.setCellValue(val);
        }
    };
    const onKeyUp: React.KeyboardEventHandler = (event: React.KeyboardEvent) => {
        if (["Backspace", "Delete"].includes(event.key)) {
            props.setCellValue(CellValue.EMPTY);
        }
    };
    const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        props.setFocusedCell(props.cell)
    }
    return <div className={className}>
        <NumInput inputRef={ref}
                  className="value"
                  type="number"
                  value={formattedValue}
                  onKeyPress={onKeyPress}
                  onKeyUp={onKeyUp}
                  onFocus={onFocus}
                  disableUnderline={true}
                  readOnly={props.cell.isInitial}
        />
        {/*<small className="details">x:{props.cell.x} y:{props.cell.y}</small>*/}
    </div>
});
export default Cell;