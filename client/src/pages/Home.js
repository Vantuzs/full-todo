import React, {useEffect, useState} from 'react';
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const [state,setState] = useState(true); // true -> SingUp : false -> SingIn
    const [data,setData] = useState();
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        if(data){
        registerUser(data)
        .then((result)=>{
            props.sendUser(result)
            navigate('/tasks')
        })
        .catch((err)=>{
            setError(err);
        })
        .finally(()=>{
            setIsLoading(false)
        })}
    },[data])
    const getData = (userData) =>{
        setData(userData)
    }

    return (
        <>
          <header>
            <button onClick={()=>setState(!state)}>{state? 'SingIn':'SingUp'}</button>  
          </header>

          <main>
            {state? <SignUp sendData={getData}/>:<SignIn sendData={getData}/>}  
          </main> 
          
          {error&& <div>{error}</div>}
        </>
    );
}

export default Home;
