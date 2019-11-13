/* eslint-disable global-require */
import { TextField, makeStyles } from '@material-ui/core';
import Markdown from 'react-remarkable';
import React, { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import FlexContainer from '../FlexContainer';

const useStyles = makeStyles({
    markdownEditor: {
        maxWidth: '50vw',
        width: '50%',
        maxHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
    },
    markdownPreview: {
        maxWidth: '50vw',
        width: '50%',
        maxHeight: '50vh',
        overflow: 'auto',
    },
});

function Editor({ isView, markdownFromProps }: { isView?: boolean, markdownFromProps?: string }) {
    const state = useContext(PageContext);
    const classes = useStyles();

    return (
        <FlexContainer
            width="100vw"
            height="50vh"
        >
            <div className={classes.markdownEditor}>
                <TextField
                    label="Conteúdo"
                    disabled={isView}
                    multiline
                    value={isView && markdownFromProps ? markdownFromProps : state.page.markdown}
                    onChange={(event) => state.setMarkdown(event.target.value)}
                    margin="normal"
                    helperText="Escreva aqui o conteúdo da sua página em Markdown"
                    variant="outlined"
                />
            </div>
            <div className={classes.markdownPreview}>
                <Markdown
                    source={isView && markdownFromProps ? markdownFromProps : state.page.markdown}
                />
            </div>
        </FlexContainer>
    );
}

export default Editor;
