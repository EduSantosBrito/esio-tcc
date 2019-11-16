import { useEffect, useCallback, useState } from 'react';
import { IPost } from '../../database/model/Post';

function usePosts() {
    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://gameshowbrasil.com.br:3000/posts`)
            .then((result) => result.json())
            .then((result) => {
                setLoading(false);
                setPosts(result);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { posts, loading, fetchData };
}

export default usePosts;
