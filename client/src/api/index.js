import {API_BASE} from '../constatns'

export const registerUser = (data)=>{
    return fetch(`${API_BASE}/users/registration`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}
