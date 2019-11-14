import { useEffect, useCallback, useState } from 'react';
import { IPage } from '../../database/model/Page';

function usePages() {
    const [pages, setPages] = useState<IPage[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://0.0.0.0:3000/pages`)
            .then((result) => result.json())
            .then((result) => {
                setPages(result);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { pages, loading, fetchData };
}

export default usePages;
