import {
    IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,
} from '@material-ui/core';
import {
    Add, Delete, Edit, RemoveRedEye,
} from '@material-ui/icons';
import React from 'react';
import useRouter from 'use-react-router';
import FlexContainer from '../../../components/FlexContainer';
import Loading from '../../../components/Loading';
import usePosts from '../../../hooks/usePosts';
import { IPost } from '../../../../database/model/Post';

function Posts() {
    const { posts, loading, fetchData } = usePosts();
    const { history } = useRouter();

    if (loading) {
        return <Loading />;
    }

    function handlePostDelete(_id) {
        fetch(`http://localhost:3000/posts/${_id}`, { method: 'DELETE' }).then(() => fetchData());
    }

    return (
        <FlexContainer height="calc(100vh - 64px)">
            <Paper style={{ width: '80%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip title="Adicionar postagem" aria-label="add">
                                    <IconButton onClick={() => history.push('/esio/admin/posts/create')}><Add /></IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>URI</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (posts as Array<IPost>).map((post) => (
                                <TableRow key={`post-${post.uri}`}>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.uri}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Visualizar postagem" aria-label="view">
                                            <IconButton onClick={() => history.push(`/esio/admin/posts/view/${post._id}`)}><RemoveRedEye /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar postagem" aria-label="edit">
                                            <IconButton onClick={() => history.push(`/esio/admin/posts/edit/${post._id}`)}><Edit /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remover postagem" aria-label="remove">
                                            <IconButton onClick={() => handlePostDelete(post._id)}><Delete /></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </FlexContainer>
    );
}

export default Posts;
