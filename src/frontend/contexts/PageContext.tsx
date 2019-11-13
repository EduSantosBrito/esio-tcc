import React, {
    createContext, useState, Dispatch, SetStateAction,
} from 'react';
import { IPage } from '../../database/model/Page';


type MetaTag = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

type Page = {
    name: string;
    uri: string;
    title: string;
    isBlog: boolean;
    isHomepage: boolean;
    tags: MetaTag[];
    markdown: string;
};

type InitialState = {
    page: Page;
    setName: Dispatch<SetStateAction<string>>;
    setUri: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setIsBlog: Dispatch<SetStateAction<boolean>>;
    setIsHomepage: Dispatch<SetStateAction<boolean>>;
    setMarkdown: Dispatch<SetStateAction<string>>;
    createNewTag: any;
    removeTag: any;
    updateTag: any;
    setPage: any;
};

const initialState: InitialState = {
    page: {
        name: '',
        uri: '',
        title: '',
        isBlog: false,
        isHomepage: false,
        tags: [],
        markdown: '',
    },
    setName: () => { },
    setUri: () => { },
    setTitle: () => { },
    setIsHomepage: () => { },
    setIsBlog: () => { },
    setMarkdown: () => { },
    createNewTag: () => { },
    removeTag: () => { },
    updateTag: () => { },
    setPage: () => { },
};

export const PageContext = createContext(initialState);

interface AdminDrawerProps {
    children: any
}

export default function PageProvider({ children }: AdminDrawerProps) {
    const [name, setName] = useState<string>('');
    const [uri, setUri] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [isBlog, setIsBlog] = useState<boolean>(false);
    const [isHomepage, setIsHomepage] = useState<boolean>(false);
    const [tags, setTags] = useState<MetaTag[]>([]);
    const [markdown, setMarkdown] = useState<string>('');

    function setPage(page: IPage) {
        setName(page.name);
        setUri(page.uri);
        setTitle(page.title);
        setIsBlog(page.isBlog);
        setIsHomepage(page.isHomepage);
        setTags(page.metas);
        setMarkdown(page.markdown);
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
        <PageContext.Provider value={{
            page: {
                name, uri, title, isBlog, tags, markdown, isHomepage
            },
            setIsHomepage,
            setName,
            setUri,
            setTitle,
            setIsBlog,
            setMarkdown,
            createNewTag,
            removeTag,
            updateTag,
            setPage,
        }}
        >
            {children}
        </PageContext.Provider>
    );
}
