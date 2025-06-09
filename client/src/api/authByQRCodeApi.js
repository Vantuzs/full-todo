import axios from 'axios';
import CONSTANTS from '../constatns';

const httpClient = axios.create({
    baseURL: `http://${CONSTANTS.API_BASE}` // gttp://192.168.1.109:5000/api
});

export const authByQRCode = async (refreshToken)=> await httpClient.post('/users/authByQRCode',refreshToken);

export default httpClient;