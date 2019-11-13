import React from 'react';
import { CircularProgress } from '@material-ui/core';
import FlexContainer from '../FlexContainer';

function Loading() {
    return (
        <FlexContainer>
            <CircularProgress />
        </FlexContainer>
    );
}

export default Loading;
