import {
    Button, Card, CardActions, CardContent, CardHeader, Divider, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { IPage } from '../../../database/model/Page';
import { IPost } from '../../../database/model/Post';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import usePages from '../../hooks/usePages';
import usePosts from '../../hooks/usePosts';

const useStyles = makeStyles({
    heroImage: {
        height: '60vh',
        backgroundImage: `url('http://gameshowbrasil.com.br:3000/static/capa_blog.jpg')`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    main: {
        padding: '25px 50px',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});
function Post({ children, post }: { children: any, post: IPost }) {
    const classes = useStyles();
    const { pages }: { pages: IPage[] | [] } = usePages();
    const [links, setLinks] = useState<{ label: string; to: string; }[]>([]);

    useEffect(() => {
        setLinks(
            (pages as Array<IPage>)
                .map((pageItem: IPage) => ({ label: pageItem.name, to: pageItem.uri })),
        );
    }, [pages]);

    useEffect(() => {
        const [title] = document.getElementsByTagName('title');
        title.innerHTML = post.title;
    }, [post]);

    return (
        <div>
            <Navbar links={links} />
            <header className={classes.heroImage}>
                <Typography variant="h2" component="h1">{post.title}</Typography>
            </header>
            <main className={classes.main}>
                {children}
            </main>
            <Footer links={links} />
        </div>
    );
}

export default Post;
