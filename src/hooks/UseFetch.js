import {useCallback, useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url) => {
    const [fetchedData, setFetchedData] = useState({
        data: null,
        isLoading: true,
        error: false
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            const resultData = data?.result || data;

            setFetchedData({
                data: resultData,
                isLoading: false,
                error: false
            });

            return resultData;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }

            setFetchedData({
                data: null,
                isLoading: false,
                error: true
            });

            throw error;
        }
    }, [url])

    useEffect(() => {
        if (!data) {
            fetchData();
        }

    }, [url, fetchData]);

    const {data, isLoading, error} = fetchedData;

    return ({data, isLoading, error}
    );
};

export default useFetch;
