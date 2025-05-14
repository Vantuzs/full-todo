import CONSTANTS from '../constatns';
import history from '../BrowserHistory';
import { refershSession } from './userApi';

export const getTasks = async()=>{
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${CONSTANTS.API_BASE}/tasks`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if(response.status === 400){
        const error = await response.json();
        return Promise.reject(error);
    }

    if(response.status === 403){
        // const error = await response.json();
        // history.push('/');
        // return Promise.reject(error);
        await refershSession();
        return await getTasks();
    }

    return response.json()
}

export const createTask = async(data)=>{
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${CONSTANTS.API_BASE}/tasks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    
    if(response.status === 400){
        const error = await response.json();
        history.push('/');
        return Promise.reject(error);
    }

    if(response.status === 403){
        await refershSession();
        return await getTasks();
    }

    return response.json();
}

export const deleteTask = async(taskId)=>{
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${CONSTANTS.API_BASE}/tasks/${taskId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    
    if(response.status === 400){
        const error = await response.json();
        history.push('/');
        return Promise.reject(error);
    }

    if(response.status === 403){
        await refershSession();
        return await deleteTask();
    }

    return response.json();
}