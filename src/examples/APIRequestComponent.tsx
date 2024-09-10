import React, { useState, useEffect } from 'react';
import APIRequest from '../core/APIRequest';

export const APIRequestComponent: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await APIRequest.get('/api/example-endpoint');
                setData(result);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>API Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
