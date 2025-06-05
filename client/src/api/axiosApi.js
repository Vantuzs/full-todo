import axios from 'axios';
import CONSTANTS from '../constatns';
import history from '../BrowserHistory';
import store from '../store';
import io from 'socket.io-client';


// INSTANCE
const httpClient = axios.create({
    baseURL: `http://${CONSTANTS.API_BASE}` // gttp://localhost:5000/api
})

const socket = io('ws://localhost:5000', { transports: ['websocket']});

socket.on(CONSTANTS.SOCKET_EVENT_NOTIFICATION, (data)=>{
    store.dispatch({
        type: 'NOTIFICATION',
        payload: data
    })
})

// USERAPI
export const registerUser = async(userData)=>await httpClient.post('/users/sign-up',userData);

export const loginUser = async(userData)=>await httpClient.post('/users/sign-in',userData);

export const refreshUser = async()=>{
    const refreshToken = localStorage.getItem('refreshToken');
    const {data} = await httpClient.post('/users/refresh',{refreshToken});
    return data
}

export const authUser = async() => await httpClient.get('/users')

export const logOut = async() =>{
    localStorage.clear();
}

// TASK API

export const getTasks = async()=>await httpClient.get('/tasks');

export const createTask = async (taskData)=> {
    console.log(taskData)
    return await httpClient.post('/tasks',taskData)};

export const deleteTask = async(taskId)=> await httpClient.delete(`/tasks/${taskId}`);

// INTERSEPTORS
httpClient.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        }
    }

    return config
},(error)=>Promise.reject(error))

httpClient.interceptors.response.use((response)=>{
    // data: {data: foundUser,tokens: {accessToken,refreshToken}} = response
    if(response.data.tokens){
        const {data: {tokens}} = response;
        localStorage.setItem('accessToken',tokens.accessToken)
        localStorage.setItem('refreshToken',tokens.refreshToken)
    }

    return response;
},async (error)=>{
    if(error.response.status === 403 && localStorage.getItem('refreshToken')){
        await refreshUser();

        // Повторить запрос, когда случилась ошибка 403
        await httpClient(error.config);
    }
    else if(error.response.status === 401){
        logOut();
        history.push('/')
    } 
    return Promise.reject(error)

});