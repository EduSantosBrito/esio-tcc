import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import FlexContainer from '../FlexContainer';
import MetaTagsItem from '../MetaTagsItem';

type MetaTag = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

function MetaTagsBox({ isView, tagsFromProps }: { isView?: boolean, tagsFromProps?: MetaTag[] }) {
    const state = useContext(PageContext);
    const { tags } = state.page;
    const { createNewTag } = state;
    return (
        <>
            <FlexContainer>
                {!isView && <IconButton onClick={() => createNewTag()}><Add /></IconButton>}
                {
                    (isView && tagsFromProps ? tagsFromProps : tags).map((tag, index) => (
                        <MetaTagsItem
                            isView={isView}
                            key={`MetaTagsItem${index}`}
                            tag={tag}
                            index={index}
                        />
                    ))
                }
            </FlexContainer>
        </>
    );
}

export default MetaTagsBox;
