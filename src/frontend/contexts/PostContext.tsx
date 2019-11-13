import React, {
    createContext, useState, Dispatch, SetStateAction,
} from 'react';
import { IPost } from '../../database/model/Post';


type MetaTag = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

type Post = {
    uri: string;
    title: string;
    tags: MetaTag[];
    markdown: string;
    description: string;
};

type InitialState = {
    post: Post;
    setUri: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setMarkdown: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    createNewTag: any;
    removeTag: any;
    updateTag: any;
    setPost: any;
};

const initialState: InitialState = {
    post: {
        uri: '',
        title: '',
        tags: [],
        markdown: '',
        description: '',
    },
    setUri: () => { },
    setTitle: () => { },
    setMarkdown: () => { },
    setDescription: () => { },
    createNewTag: () => { },
    removeTag: () => { },
    updateTag: () => { },
    setPost: () => { },
};

export const PostContext = createContext(initialState);

interface AdminDrawerProps {
    children: any
}

export default function PostProvider({ children }: AdminDrawerProps) {
    const [uri, setUri] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<MetaTag[]>([]);
    const [markdown, setMarkdown] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    function setPost(post: IPost) {
        setUri(post.uri);
        setTitle(post.title);
        setTags(post.metas);
        setMarkdown(post.markdown);
        setDescription(post.description);
    }

    function createNewTag() {
        setTags([...tags, {}]);
    }

    function removeTag(index: number) {
        setTags(tags.filter((tag, _index) => _index !== index));
    }

    function updateTag(tag: MetaTag, index: number) {
        setTags(tags.reduce((_array: MetaTag[], _tag: MetaTag, _index: number) => {
            if (_index === index) {
                return [..._array, tag];
            }
            return [..._array, _tag];
        }, []));
    }

    return (
        <PostContext.Provider value={{
            post: {
                uri, title, tags, markdown, description,
            },
            setUri,
            setTitle,
            setMarkdown,
            setDescription,
            createNewTag,
            removeTag,
            updateTag,
            setPost,
        }}
        >
            {children}
        </PostContext.Provider>
    );
}
