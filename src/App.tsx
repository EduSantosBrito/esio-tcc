import React, { useCallback, useEffect, useState } from 'react';
import Markdown from 'react-remarkable';
import useReactRouter from 'use-react-router';
import { IPage } from './database/model/Page';
import usePages from './frontend/hooks/usePages';
import Admin from './frontend/pages/admin';
import Loading from './frontend/components/Loading';
import Homepage from './frontend/pages/homepage';
import Blog from './frontend/pages/blog';
import usePosts from './frontend/hooks/usePosts';
import { IPost } from './database/model/Post';
import Post from './frontend/pages/post';

function App() {
    const { pages }: { pages: IPage[] | [] } = usePages();
    const { posts }: { posts: IPost[] | [] } = usePosts();
    const { location } = useReactRouter();
    const [page, setPage] = useState<IPage | null>(null);
    const [post, setPost] = useState<IPost | null>(null);

    const isAdminRoute = useCallback(() => /^\/esio\/admin/.test(location.pathname), [location]);
    const isHomepageRoute = useCallback(() => /^\/esio\/$/.test(location.pathname), [location]);
    useEffect(() => {
        if (!isAdminRoute() && !isHomepageRoute()) {
            const [matchedPage] = pages.filter((actualPage) => `/esio/${actualPage.uri}` === location.pathname);
            setPage(matchedPage);
        } else if (isHomepageRoute()) {
            const [matchedPage] = pages.filter((actualPage) => actualPage.isHomepage);
            setPage(matchedPage);
        }
    }, [location, pages]);

    useEffect(() => {
        console.log('DEBUG:: location', location.pathname);
    }, [location])

    useEffect(() => {
        const [matchedPost] = posts.filter((actualPost) => `/esio/${actualPost.uri}` === location.pathname);
        setPost(matchedPost);
    }, [location, posts]);

    if (isAdminRoute()) {
        return <Admin />;
    }

    if (post) {
        return (
            <Post post={post}>
                <Markdown
                    source={post.markdown}
                />
            </Post>
        );
    }

    if (!page) {
        return <Loading />;
    }

    if (page.isBlog) {
        return (
            <Blog page={page}>
                <Markdown
                    source={page.markdown}
                />
            </Blog>
        );
    }

    if (!page.isBlog) {
        return (
            <Homepage page={page}>
                <Markdown
                    source={page.markdown}
                />
            </Homepage>
        );
    }

    return <Loading />;
}

export default App;
