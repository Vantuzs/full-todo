import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/userApi';
import TodoPage from '../../pages/TotoPage'

const Dashboard = (props) => {
    const [isUser,setIsUser] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!props.user){
            const token = localStorage.getItem('token');
            if(token){
                authUser(token)
                .then(userData=>{
                    console.log(3);
                    props.sendUser(userData.data)
                })
                .catch(err=>{
                    return navigate('/');
                })
                
            }else{
                return navigate('/')
            }
        } else{
            setIsUser(true)
        }
    },[props.user])
    return (
        <>
         {isUser ? <TodoPage />: null}   
        </>
    );
}

export default Dashboard;
