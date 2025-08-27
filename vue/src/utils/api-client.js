import axios from 'axios';

const endpoint = import.meta.env.VITE_API_BASE;

const token = import.meta.env.VITE_API_TOKEN;

export default function client() {
    return axios.create({
        baseURL: endpoint,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}
