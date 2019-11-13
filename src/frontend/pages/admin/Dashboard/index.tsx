import React from 'react';
import usePages from '../../../hooks/usePages';
import FlexContainer from '../../../components/FlexContainer';
import Loading from '../../../components/Loading';
import usePosts from '../../../hooks/usePosts';

function Dashboard() {
    const { pages } = usePages();
    const { posts } = usePosts();

    return pages ? (
        <FlexContainer flexDirection="column">
            <>
                <h1>Seja bem vindo!</h1>
                <p>Número de páginas criadas:</p>
                {pages.length}
                <p>Número de posts criados:</p>
                {posts.length}
            </>
        </FlexContainer>
    ) : <Loading />;
}

export default Dashboard;
