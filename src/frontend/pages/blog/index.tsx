import {
    Typography, Paper, Card, CardHeader, CardContent, CardActions, Button, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { IPage } from '../../../database/model/Page';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import usePages from '../../hooks/usePages';
import usePosts from '../../hooks/usePosts';
import { IPost } from '../../../database/model/Post';

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
function Blog({ children, page }: { children: any, page: IPage }) {
    const classes = useStyles();
    const { pages }: { pages: IPage[] | [] } = usePages();
    const { posts }: { posts: IPost[] | [] } = usePosts();
    const [links, setLinks] = useState<{ label: string; to: string; }[]>([]);

    useEffect(() => {
        setLinks(
            (pages as Array<IPage>)
                .map((pageItem: IPage) => ({ label: pageItem.name, to: pageItem.uri })),
        );
    }, [pages]);

    useEffect(() => {
        const [title] = document.getElementsByTagName('title');
        title.innerHTML = page.title;
    }, [page]);

    return (
        <div>
            <Navbar links={links} />
            <header className={classes.heroImage}>
                <Typography variant="h2" component="h1">Blog</Typography>
            </header>
            <main className={classes.main}>
                {children}
                {posts.length && (posts as Array<IPost>).map((post, index) => (
                    <Card
                        elevation={10}
                        key={index}
                    >
                        <CardHeader
                            title={post.title}
                        />
                        <CardContent>
                            <Typography component="p">
                                {post.description}
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions className={classes.footer}>
                            <Button
                                style={{ color: '#FA5252' }}
                                onClick={() => {
                                    window.location.href = post.uri;
                                }}
                            >
                                Saiba mais
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </main>
            <Footer links={links} />
        </div>
    );
}

export default Blog;
