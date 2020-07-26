import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com';

export const getQuery = (query) => {
    if (!query) return '';

    let queries = '';
    for (let [key, value] of Object.entries(query)) {
        if (queries == '') {
            queries = queries + `?${key}=${value}`;
        } else {
            queries = queries + `&${key}=${value}`;
        }
    }

    return queries;
};

export const onRequestGet = async ({ url, query, headers }) => {
    try {
        const { status, data } = await onPromiseGet({ url, query, headers });
        return { status, data };
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return { status, data };
        }

        return {
            status: 500,
            data: 'Server Internal Error',
        };
    }
};

export const onPromiseGet = ({ url, query, headers }) => {
    return new Promise((resolve, reject) => {
        const QUERY = getQuery(query);
        const URL = API_URL + url + QUERY;

        const request = axios.get(URL, {
            headers,
        });

        request
            .then((response) => {
                const { status, data } = response;
                resolve({ status, data });
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const onRequestPost = async ({ url, query, params, headers }) => {
    try {
        const { status, data } = await onPromisePost({
            url,
            query,
            params,
            headers,
        });
        return { status, data };
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return { status, data };
        }

        return {
            status: 500,
            data: 'Server Internal Error',
        };
    }
};

export const onPromisePost = ({ url, query, params, headers }) => {
    return new Promise((resolve, reject) => {
        const QUERY = getQuery(query);
        const URL = API_URL + url + QUERY;

        const request = axios.post(URL, params, {
            headers,
        });

        request
            .then((response) => {
                const { status, data } = response;
                resolve({ status, data });
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
