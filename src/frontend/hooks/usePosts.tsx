import { useEffect, useCallback, useState } from 'react';
import { IPost } from '../../database/model/Post';

function usePosts() {
    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://0.0.0.0:3000/posts`)
            .then((result) => result.json())
            .then((result) => {
                setPosts(result);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { posts, loading, fetchData };
}

export default usePosts;
