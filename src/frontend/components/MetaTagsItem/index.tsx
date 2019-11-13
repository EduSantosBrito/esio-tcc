import { IconButton } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import React, { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import FlexContainer from '../FlexContainer';
import Input from '../Input';

type MetaTag = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

type MetaTagsItemProps = {
    tag: MetaTag;
    index: number;
    isView?: boolean;
};

function MetaTagsItem({
    tag,
    index,
    isView,
}: MetaTagsItemProps) {
    const state = useContext(PageContext);
    const { updateTag, removeTag } = state;
    return (
        <FlexContainer
            flexDirection="column"
            height="50%"
            key={`FlexContainer-${index}`}
        >
            <FlexContainer>
                <Input
                    value={tag.charset}
                    disabled={isView}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => updateTag(
                            { ...tag, charset: event.target.value }, index,
                        )
                    }
                    label="Charset"
                    type="text"
                    variant="outlined"
                    key={`Input-charset-${index}`}
                />
                <Input
                    value={tag.content}
                    disabled={isView}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => updateTag(
                            { ...tag, content: event.target.value }, index,
                        )
                    }
                    label="Content"
                    type="text"
                    variant="outlined"
                    key={`Input-content-${index}`}
                />
                <Input
                    value={tag.httpEquiv}
                    disabled={isView}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => updateTag(
                            { ...tag, httpEquiv: event.target.value }, index,
                        )
                    }
                    label="HttpEquiv"
                    type="text"
                    variant="outlined"
                    key={`Input-httpequiv-${index}`}
                />
                <Input
                    value={tag.name}
                    disabled={isView}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => updateTag(
                            { ...tag, name: event.target.value }, index,
                        )
                    }
                    label="Name"
                    type="text"
                    variant="outlined"
                    key={`Input-name-${index}`}
                />
                {!isView && (
                    <IconButton
                        onClick={() => removeTag(index)}
                    >
                        <Remove />
                    </IconButton>
                )}
            </FlexContainer>
        </FlexContainer>
    );
}

export default MetaTagsItem;
