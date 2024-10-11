import { useState, useEffect } from "react";
import { apiRequest, API_URL } from "../../utils/api";

export function useData(path) {
    const [data, setData] = useState(null)

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const data = await apiRequest(`${API_URL}/${path}`)
                setData(data)
            } catch (error) {
                console.error(error)
            }
        }

        if (!ignore) fetchData();

        return () => {
            ignore = true
        }
    }, [path])

    return { data, setData }
}