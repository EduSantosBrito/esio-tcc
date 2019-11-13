import {
    IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,
} from '@material-ui/core';
import {
    Add, Delete, Edit, RemoveRedEye,
} from '@material-ui/icons';
import React from 'react';
import useRouter from 'use-react-router';
import { IPage } from '../../../../database/model/Page';
import FlexContainer from '../../../components/FlexContainer';
import Loading from '../../../components/Loading';
import usePages from '../../../hooks/usePages';

function Pages() {
    const { pages, loading, fetchData } = usePages();
    const { history } = useRouter();

    if (loading) {
        return <Loading />;
    }

    function handlePageDelete(_id) {
        fetch(`localhost:3000/pages/${_id}`, { method: 'DELETE' }).then(() => fetchData());
    }

    return (
        <FlexContainer height="calc(100vh - 64px)">
            <Paper style={{ width: '80%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip title="Adicionar página" aria-label="add">
                                    <IconButton onClick={() => history.push('/esio/admin/pages/create')}><Add /></IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>URI</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (pages as Array<IPage>).map((page) => (
                                <TableRow key={`page-${page.name}`}>
                                    <TableCell>{page.name}</TableCell>
                                    <TableCell>{page.title}</TableCell>
                                    <TableCell>{page.uri}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Visualizar página" aria-label="view">
                                            <IconButton onClick={() => history.push(`/esio/admin/pages/view/${page._id}`)}><RemoveRedEye /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar página" aria-label="edit">
                                            <IconButton onClick={() => history.push(`/esio/admin/pages/edit/${page._id}`)}><Edit /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remover página" aria-label="remove">
                                            <IconButton onClick={() => handlePageDelete(page._id)}><Delete /></IconButton>
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

export default Pages;
