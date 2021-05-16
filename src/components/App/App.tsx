import * as React from "react";
import {Game} from "./Game";
import {ThemeProvider} from "@material-ui/styles";
import {ksuduoThemeNormal} from "../Theme/NormalKsuduoTheme";
import {Filter9, GitHub} from "@material-ui/icons";
import {Box, Container, IconButton, Link, Typography} from "@material-ui/core";

export const App = () => {
    return <React.StrictMode>
        <ThemeProvider theme={ksuduoThemeNormal}>
            <Container style={{position: 'relative', paddingBottom: '3rem'}}>
                <Game/>
                <Box position="absolute" bottom={0}
                     left={ksuduoThemeNormal.spacing(3)} right={ksuduoThemeNormal.spacing(3)}
                     display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Link style={{display: 'flex', alignItems: 'center'}} href="https://github.com/strlns/thirty-six"
                          title="Source code" className={'link-inherit'}>
                        <IconButton>
                            <GitHub/>
                        </IconButton>
                        <Typography variant={"subtitle1"}
                                    style={{
                                        color: 'black', userSelect: 'none', pointerEvents: 'none'
                                    }}>
                            View on GitHub
                        </Typography>
                    </Link>
                    <Link style={{display: 'flex', alignItems: 'center'}}
                          href="https://strlns.github.io/ksuduo"
                          title="Play classic 9x9 Sudoku" className={'link-inherit'}>
                        <IconButton>
                            <Filter9/>
                        </IconButton>
                        <Typography variant={"subtitle1"}
                                    style={{
                                        color: 'black', userSelect: 'none', pointerEvents: 'none'
                                    }}>
                            Play classic 9x9 Sudoku
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    </React.StrictMode>
}