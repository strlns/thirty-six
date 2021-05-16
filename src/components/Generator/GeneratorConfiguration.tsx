import * as React from "react"
import {Box, FormControl, InputLabel, NativeSelect, ThemeProvider} from "@material-ui/core";
import {DIFFICULTY_LEVEL} from "../../generator/generator";
import {BOARD_SIZE, DEFAULT_CLUES, MINIMUM_CLUES} from "../../model/Board";
import intRange from "../../utility/numberRange";
import {DiscreteRangeSlider} from "../Controls/DiscreteRangeSlider";
import {ksuduoThemeNormal} from "../Theme/NormalKsuduoTheme";
import {makeStyles} from "@material-ui/core/styles";

interface GeneratorConfigurationProps {
    numberOfClues: number,
    setNumberOfClues: (event: React.ChangeEvent<{}>, value: number) => void,
    difficulty: DIFFICULTY_LEVEL,
    setDifficulty: React.ChangeEventHandler<HTMLSelectElement>,
    numberOfFilledCellsInCurrentPuzzle: number,
    difficultyOfCurrentPuzzle: DIFFICULTY_LEVEL
}

const infoCollapseStyle = makeStyles({
    root: {
        overflow: 'hidden',
        transition: 'max-height .75s ease-out'
    }
});

const MIN_CLUES = MINIMUM_CLUES;
const MAX_CLUES = BOARD_SIZE / 2;

export default (props: GeneratorConfigurationProps) => {

    const marks = intRange(MIN_CLUES, MAX_CLUES, Math.ceil((MAX_CLUES - MIN_CLUES) / 3), true).map(
        value => ({
            value,
            label: value
        })
    );

    return <Box p={1}>
        <ThemeProvider theme={ksuduoThemeNormal}>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="difficulty-select">Difficulty</InputLabel>
                <NativeSelect
                    value={props.difficulty}
                    onChange={props.setDifficulty}
                    inputProps={{
                        name: 'difficulty',
                        id: 'difficulty-select',
                    }}
                >
                    <option value={DIFFICULTY_LEVEL.EASY}>Easy</option>
                    <option value={DIFFICULTY_LEVEL.MEDIUM}>Medium</option>
                    <option value={DIFFICULTY_LEVEL.HARD}>Hard</option>
                </NativeSelect>
            </FormControl>
        </ThemeProvider>
        <InputLabel htmlFor="difficulty-select" style={{fontSize: '.75rem'}}>
            Number of hints (filled cells)
        </InputLabel>
        <DiscreteRangeSlider id={"difficulty-select"}
                             marks={marks}
                             defaultValue={DEFAULT_CLUES}
                             step={1}
                             valueLabelDisplay={"auto"}
                             min={MIN_CLUES}
                             max={MAX_CLUES}
                             aria-labelledby="num-clues"
                             onChange={props.setNumberOfClues}
        />
    </Box>
}