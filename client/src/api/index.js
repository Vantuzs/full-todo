import CONSTANTS from '../constatns'

export const registerUser = async (data)=>{
    const response = await fetch(`${CONSTANTS.API_BASE}/users/sign-up`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if(response.status === 400){
        const res = await response.json();
        return Promise.reject(res.err);
    }

    return response.json()
}
