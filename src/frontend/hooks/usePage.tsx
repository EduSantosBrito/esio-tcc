import { useEffect, useCallback, useState } from 'react';
import { IPage } from '../../database/model/Page';

function usePage({ _id }: { _id?: string }) {
    const [page, setPage] = useState<IPage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://0.0.0.0:3000/pages/${_id}`)
            .then((result) => result.json())
            .then((result) => {
                setPage(result);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (_id) {
            fetchData();
        }
    }, [fetchData, _id]);

    return { page, loading, fetchData };
}

export default usePage;
