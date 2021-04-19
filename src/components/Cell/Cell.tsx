import * as React from "react"
import {CellData, CellValue, CellValues} from "../../model/CellData";
import {Input, withStyles} from "@material-ui/core";
import {ForwardedRef} from "react";

interface CellProps {
    cell: CellData,
    setCellValue(v: CellValue): void
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

    let className = `cell${props.cell.isInitial ? ' fixed' : ''}${props.cell.isValid ? '' : ' invalid'}`;

    let formattedValue = props.cell.value === CellValue.EMPTY ? '' : props.cell.value;

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
    return <div className={className}>
        <NumInput inputRef={ref}
                  className="value"
                  value={formattedValue}
                  onKeyPress={onKeyPress}
                  onKeyUp={onKeyUp}
                  disableUnderline={true}
                  readOnly={props.cell.isInitial}
        />
        {/*<small className="details">x:{props.cell.x} y:{props.cell.y}</small>*/}
    </div>
});
export default Cell;