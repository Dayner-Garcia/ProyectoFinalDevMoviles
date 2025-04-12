import axios from 'axios';

const api = axios.create({
    baseURL: 'https://adamix.net/defensa_civil/def/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
