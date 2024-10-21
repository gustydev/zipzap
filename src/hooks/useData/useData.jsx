import { useState, useEffect } from "react";
import { apiRequest, API_URL } from "../../utils/api";

export function useData(path) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            setLoading(true)
            try {
                const data = await apiRequest(`${API_URL}/${path}`)
                setData(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }

        if (!ignore) fetchData();

        return () => {
            ignore = true
        }
    }, [path])

    return { data, setData, loading, error }
}