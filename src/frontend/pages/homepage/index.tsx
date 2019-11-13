import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { IPage } from '../../../database/model/Page';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import usePages from '../../hooks/usePages';

const useStyles = makeStyles({
    heroImage: {
        backgroundImage: `url('http://localhost:3000/static/capa_principal.jpg')`,
        height: '80vh',
        width: '100%',
    },
    main: {
        padding: '25px 50px',
    },
});
function Homepage({ children, page }: { children: any, page: IPage }) {
    const classes = useStyles();
    const { pages }: { pages: IPage[] | [] } = usePages();
    const [links, setLinks] = useState<{ label: string; to: string; }[]>([]);

    useEffect(() => {
        setLinks(
            (pages as Array<IPage>)
                .map((pageItem: IPage) => ({ label: pageItem.name, to: pageItem.uri }))
        );
    }, [pages]);

    useEffect(() => {
        const [title] = document.getElementsByTagName('title');
        title.innerHTML = page.title;
        const [head] = document.getElementsByTagName('head');
        page.metas.forEach((meta) => {
            const metaTag = document.createElement('meta');
            if (meta.charset) {
                metaTag.setAttribute('charset', meta.charset);
            }
            if (meta.content) {
                metaTag.setAttribute('content', meta.content);
            }
            if (meta.httpEquiv) {
                metaTag.setAttribute('httpEquiv', meta.httpEquiv);
            }
            if (meta.name) {
                metaTag.setAttribute('name', meta.name);
            }
            if (!document.head.contains(metaTag)) {
                head.appendChild(metaTag);
            }
        });
    }, [page]);

    return (
        <div>
            <Navbar links={links} />
            <header className={classes.heroImage} />
            <main className={classes.main}>
                {children}
            </main>
            <Footer links={links} />
        </div>
    );
}

export default Homepage;
