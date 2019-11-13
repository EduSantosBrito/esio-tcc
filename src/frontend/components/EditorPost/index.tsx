/* eslint-disable global-require */
import { TextField, makeStyles } from '@material-ui/core';
import Markdown from 'react-remarkable';
import React, { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import FlexContainer from '../FlexContainer';
import { PostContext } from '../../contexts/PostContext';

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

type EditorPostProps = {
    isView?: boolean;
    markdownFromProps?: string;
};

function EditorPost({ isView, markdownFromProps }: EditorPostProps) {
    const state = useContext(PostContext);
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
                    value={isView && markdownFromProps ? markdownFromProps : state.post.markdown}
                    onChange={(event) => state.setMarkdown(event.target.value)}
                    margin="normal"
                    helperText="Escreva aqui o conteúdo da sua página em Markdown"
                    variant="outlined"
                />
            </div>
            <div className={classes.markdownPreview}>
                <Markdown
                    source={isView && markdownFromProps ? markdownFromProps : state.post.markdown}
                />
            </div>
        </FlexContainer>
    );
}

export default EditorPost;
