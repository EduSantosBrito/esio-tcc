import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import FlexContainer from '../FlexContainer';
import MetaTagsItemPost from '../MetaTagsItemPost';

type MetaTag = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

type MetaTagsBoxPostProps = {
    isView?: boolean;
    tagsFromProps?: MetaTag[];
};

function MetaTagsBoxPost({ isView, tagsFromProps }: MetaTagsBoxPostProps) {
    const state = useContext(PostContext);
    const { tags } = state.post;

    const { createNewTag } = state;
    return (
        <>
            <FlexContainer>
                {!isView && <IconButton onClick={() => createNewTag()}><Add /></IconButton>}
                {
                    (isView && tagsFromProps ? tagsFromProps : tags).map((tag, index) => (
                        <MetaTagsItemPost
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

export default MetaTagsBoxPost;
