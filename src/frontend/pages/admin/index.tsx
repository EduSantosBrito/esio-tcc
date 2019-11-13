import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import Pages from './Pages';
import Dashboard from './Dashboard';
import AdminDrawerProvider from '../../contexts/AdminDrawerContext';
import AdminDrawer from '../../components/AdminDrawer';
import CreatePage from './Pages/Create';
import PageProvider from '../../contexts/PageContext';
import Posts from './Posts';
import CreatePost from './Posts/Create';
import PostProvider from '../../contexts/PostContext';

function Admin() {
    const { location } = useReactRouter();

    function isLocation(pathname: RegExp) {
        return pathname.test(location.pathname);
    }

    return (
        <AdminDrawerProvider>
            <AdminDrawer>
                {
                    isLocation(/\/esio\/admin\/dashboard/) && <Dashboard />
                }
                {
                    isLocation(/^\/esio\/admin\/pages$/) && <Pages />
                }
                {
                    isLocation(/^\/esio\/admin\/pages\/create/) && <PageProvider><CreatePage /></PageProvider>
                }
                {
                    isLocation(/\/esio\/admin\/pages\/view/) && <PageProvider><CreatePage isView _id={location.pathname.split('/view/')[1]} /></PageProvider>
                }
                {
                    isLocation(/\/esio\/admin\/pages\/edit/) && <PageProvider><CreatePage _id={location.pathname.split('/edit/')[1]} /></PageProvider>
                }
                {
                    isLocation(/^\/esio\/admin\/posts$/) && <Posts />
                }
                {
                    isLocation(/^\/esio\/admin\/posts\/create/) && <PostProvider><CreatePost /></PostProvider>
                }
                {
                    isLocation(/\/esio\/admin\/posts\/view/) && <PostProvider><CreatePost isView _id={location.pathname.split('/view/')[1]} /></PostProvider>
                }
                {
                    isLocation(/\/esio\/admin\/posts\/edit/) && <PostProvider><CreatePost _id={location.pathname.split('/edit/')[1]} /></PostProvider>
                }
            </AdminDrawer>
        </AdminDrawerProvider>
    );
}

export default Admin;
