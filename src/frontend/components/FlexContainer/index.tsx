import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
});

type TFlexContainerProps = {
    children: any;
    flexDirection?: 'column' | 'row';
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    flexWrap?: 'inherit' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'nowrap' | 'wrap' | 'wrap-reverse' | undefined;
    width?: string;
    height?: string;
};

function FlexContainer({
    children,
    flexDirection = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    width = '100%',
    height = 'auto',
    flexWrap = 'wrap',
}: TFlexContainerProps) {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            style={{
                flexDirection,
                justifyContent,
                alignItems,
                width,
                height,
                flexWrap,
            }}
        >
            {children}
        </div>
    );
}

export default FlexContainer;
