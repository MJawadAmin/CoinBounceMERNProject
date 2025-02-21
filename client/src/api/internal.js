// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_INTERNAL_API, // Use Vite-compatible env variable
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export const login = async (data) => {
//     let response;
//     try {
//         response = await api.post('/login', data);
//     } catch (error) {
//         return error; // Return error directly
//     }
//     return response;
// };

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_INTERNAL_API, // Use Vite-compatible env variable
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (data) => {
    try {
        const response = await api.post('/login', data);
        return response;
    } catch (error) {
        return error.response ? error.response : error; // Return structured response
    }
};
