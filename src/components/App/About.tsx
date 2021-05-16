import * as React from "react"
import {Box, IconButton, Modal} from "@material-ui/core";
import {Button} from "../Controls/Button";
import {CheckCircleRounded, CloseRounded, HelpOutlineRounded} from "@material-ui/icons";
import {ModalBaseStyles} from "../Message/ModalBaseStyles";

export default () => {
    const [isExplanationModalOpen, setExplanationModalOpen] = React.useState(false);
    return <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Button fullWidth={true} variant="text" size="small"
                endIcon={<HelpOutlineRounded/>}
                onClick={() => setExplanationModalOpen(true)}>
            About
        </Button>

        <Modal open={isExplanationModalOpen}>
            <Box className={ModalBaseStyles().root}>
                <Box display='flex' justifyContent={'space-between'} alignItems={'center'}>
                    <h1>Thirty-six</h1>
                    <IconButton edge='end' title="Close" onClick={() => setExplanationModalOpen(false)}>
                        <CloseRounded/>
                    </IconButton>
                </Box>
                <h3>How to play?</h3>
                <p>
                    This is sudoku variant with only 6 numbers and 6 2x3 blocks.
                    The rules are the same as in normal sudoku.
                    See <a href="https://en.wikipedia.org/wiki/Sudoku" target="_blank">Wikipedia on Sudoku</a>.
                </p>
                <h3>Difficulty levels</h3>
                <p>
                    Different kinds of cells are preferred while deleting at the 3 difficulty levels - in easy mode, the
                    cells that are
                    cleared tend to be the ones that are easier to fill. In hard mode, cells with greater numbers of
                    possible values are
                    preferred.
                </p>
                <Box onClick={() => setExplanationModalOpen(false)}>
                    <IconButton style={{margin: 'auto', display: 'block'}} title="Close">
                        <CheckCircleRounded color={'primary'}/>
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    </Box>
}