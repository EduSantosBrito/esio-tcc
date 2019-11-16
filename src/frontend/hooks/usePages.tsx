import { useEffect, useCallback, useState } from 'react';
import { IPage } from '../../database/model/Page';

function usePages() {
    const [pages, setPages] = useState<IPage[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`http://gameshowbrasil.com.br:3000/pages`)
            .then((result) => result.json())
            .then((result) => {
                setLoading(false);
                setPages(result);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { pages, loading, fetchData };
}

export default usePages;
