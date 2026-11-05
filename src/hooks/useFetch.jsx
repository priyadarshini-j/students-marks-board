import { useState, useEffect } from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        let isMounted = true;

        const fetchData = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Student data not found");
                }

                const result = await response.json();

                if (isMounted) {
                    setData(result);
                }

            } catch (err) {

                if (isMounted) {
                    setError(err.message);
                }

            } finally {

                if (isMounted) {
                    setLoading(false);
                }

            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };

    }, [url]);

    return { data, loading, error };
}

export default useFetch;