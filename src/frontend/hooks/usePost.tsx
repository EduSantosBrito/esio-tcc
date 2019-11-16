import { useEffect, useCallback, useState } from 'react';
import { IPost } from '../../database/model/Post';

function usePost({ _id }: { _id?: string }) {
    const [post, setPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://gameshowbrasil.com.br:3000/posts/${_id}`)
            .then((result) => result.json())
            .then((result) => {
                setLoading(false);
                setPost(result);
            });
    }, []);

    useEffect(() => {
        if (_id) {
            fetchData();
        }
    }, [fetchData, _id]);

    return { post, loading, fetchData };
}

export default usePost;
