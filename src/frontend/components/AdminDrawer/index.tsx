import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
} from '@material-ui/core';
import {
    ChevronLeft, ChevronRight, Dashboard, Menu, Pages, ViewModule,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import useReactRouter from 'use-react-router';
import { AdminDrawerContext } from '../../contexts/AdminDrawerContext';

interface AdminDrawerProps {
    children: any
}

function AdminDrawer({ children }: AdminDrawerProps) {
    const theme = useTheme();
    const state = useContext(AdminDrawerContext);
    const { history } = useReactRouter();

    function handleDrawer(status: boolean) {
        if (state.setOpen) {
            state.setOpen(status);
        }
    }

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleDrawer(true)}
                        edge="start"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Área Administrativa
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={state.open}
            >
                <div>
                    <IconButton onClick={() => handleDrawer(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        onClick={() => {
                            handleDrawer(false);
                            history.push('/esio/admin/dashboard');
                        }}
                    >
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            handleDrawer(false);
                            history.push('/esio/admin/pages');
                        }}
                    >
                        <ListItemIcon><Pages /></ListItemIcon>
                        <ListItemText
                            primary="Páginas"
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            handleDrawer(false);
                            history.push('/esio/admin/posts');
                        }}
                    >
                        <ListItemIcon><ViewModule /></ListItemIcon>
                        <ListItemText
                            primary="Postagens"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <main style={{ marginTop: '64px' }}>
                {children}
            </main>
        </>
    );
}

export default AdminDrawer;
