import { Button, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import useRouter from 'use-react-router';
import EditorPost from '../../../../components/EditorPost';
import FlexContainer from '../../../../components/FlexContainer';
import Input from '../../../../components/Input';
import Loading from '../../../../components/Loading';
import MetaTagsBoxPost from '../../../../components/MetaTagsBoxPost';
import { PostContext } from '../../../../contexts/PostContext';
import usePost from '../../../../hooks/usePost';

function CreatePost({ isView, _id }: { isView?: boolean, _id?: string }) {
    const state = useContext(PostContext);
    const { post, loading } = usePost({ _id });
    const { history } = useRouter();
    const {
        uri,
        title,
        tags,
        markdown,
        description,
    } = state.post;
    const {
        setTitle,
        setUri,
        setPost,
        setDescription,
    } = state;

    useEffect(() => {
        if (post) {
            setPost(post);
        }
    }, [post]);

    function handleSubmit() {
        fetch(!post ? 'http://0.0.0.0:3000/posts' : `http://0.0.0.0:3000/posts/${post._id}`, {
            method: !post ? 'POST' : 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: {
                    uri, title, metas: tags, markdown, description,
                },
            }),
        }).then(() => history.push('/esio/admin/posts'));
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
                        {isView ? (post || {}).title : 'Novo post'}
                    </Typography>
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >
                    <Input
                        disabled={isView}
                        label="URI"
                        type="text"
                        variant="outlined"
                        autoComplete="name"
                        value={isView && post ? post.uri : uri}
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
                        value={isView && post ? post.title : title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(
                            event.target.value,
                        )}
                    />
                    <Input
                        disabled={isView}
                        label="Descrição"
                        type="text"
                        variant="outlined"
                        autoComplete="name"
                        value={isView && post ? post.description : description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(
                            event.target.value,
                        )}
                    />
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >
                    <MetaTagsBoxPost
                        isView={isView}
                        tagsFromProps={isView && post ? post.metas : undefined}
                    />
                </FlexContainer>
                <FlexContainer
                    justifyContent="space-evenly"
                >
                    <EditorPost isView={isView} markdownFromProps={post ? post.markdown : undefined} />
                </FlexContainer>
                <FlexContainer>
                    <Button onClick={() => history.goBack()}>Voltar</Button>
                    {!isView && (
                        <Button onClick={handleSubmit}>{post ? 'Editar' : 'Criar'}</Button>
                    )}
                </FlexContainer>
            </Paper>
        </FlexContainer>
    ) : <Loading />;
}

export default CreatePost;
