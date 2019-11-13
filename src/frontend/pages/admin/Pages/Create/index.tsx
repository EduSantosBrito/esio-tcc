import {
    Button, FormControlLabel, Paper, Switch, Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import useRouter from 'use-react-router';
import FlexContainer from '../../../../components/FlexContainer';
import Input from '../../../../components/Input';
import MetaTagsBox from '../../../../components/MetaTagsBox';
import { PageContext } from '../../../../contexts/PageContext';
import Editor from '../../../../components/Editor';
import usePage from '../../../../hooks/usePage';
import Loading from '../../../../components/Loading';

function CreatePage({ isView, _id }: { isView?: boolean, _id?: string }) {
    const state = useContext(PageContext);
    const { page, loading } = usePage({ _id });
    const { history } = useRouter();
    const {
        name,
        uri,
        title,
        isBlog,
        isHomepage,
        tags,
        markdown,
    } = state.page;
    const {
        setIsBlog,
        setName,
        setTitle,
        setIsHomepage,
        setUri,
        setPage,
    } = state;

    useEffect(() => {
        if (page) {
            setPage(page);
        }
    }, [page]);

    function handleSubmit() {
        fetch(!page ? 'http://localhost:3000/pages' : `http://localhost:3000/pages/${page._id}`, {
            method: !page ? 'POST' : 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: {
                    name, uri, title, isBlog, isHomepage, metas: tags, markdown,
                },
            }),
        }).then(() => history.push('/esio/admin/pages'));
    }

    return !loading ? (
        <FlexContainer flexDirection="column" height="calc(100vh - 64px)">
            <Paper style={{ width: '80%' }}>
                <FlexContainer>
                    <Typography
                        variant="h5"
                        component="h3"
                        style={{ margin: '20px' }}
                    >
                        {isView ? (page || {}).title : 'Nova página'}
                    </Typography>
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >
                    <Input
                        disabled={isView}
                        label="Nome"
                        type="text"
                        variant="outlined"
                        autoComplete="name"
                        value={isView && page ? page.name : name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(
                            event.target.value,
                        )}
                    />
                    <Input
                        disabled={isView}
                        label="URI"
                        type="text"
                        variant="outlined"
                        autoComplete="name"
                        value={isView && page ? page.uri : uri}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUri(
                            event.target.value,
                        )}
                    />
                    <Input
                        disabled={isView}
                        label="Título"
                        type="text"
                        variant="outlined"
                        autoComplete="name"
                        value={isView && page ? page.title : title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(
                            event.target.value,
                        )}
                    />
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >

                    <FormControlLabel
                        control={(
                            <Switch
                                disabled={isView}
                                checked={isBlog}
                                onChange={() => setIsBlog(!isBlog)}
                                value="isBlog"
                                color="primary"
                                inputProps={{ 'aria-label': 'Página do tipo blog' }}
                            />
                        )}
                        label="Página do tipo Blog"
                    />
                    <FormControlLabel
                        control={(
                            <Switch
                                disabled={isView}
                                checked={isHomepage}
                                onChange={() => setIsHomepage(!isHomepage)}
                                value="isBlog"
                                color="primary"
                                inputProps={{ 'aria-label': 'Homepage' }}
                            />
                        )}
                        label="Homepage"
                    />
                </FlexContainer>
                <FlexContainer>
                    {!isBlog && <MetaTagsBox isView={isView} tagsFromProps={page ? page.metas : undefined} />}
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >
                    <Editor isView={isView} markdownFromProps={isView && page ? page.markdown : undefined} />
                </FlexContainer>
                <FlexContainer>
                    <Button onClick={() => history.goBack()}>Voltar</Button>
                    {!isView && (
                        <Button onClick={handleSubmit}>{page ? 'Editar' : 'Criar'}</Button>
                    )}
                </FlexContainer>
            </Paper>
        </FlexContainer>
    ) : <Loading />;
}

export default CreatePage;
