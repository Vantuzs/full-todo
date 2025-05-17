import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../Components/SignIn/SignIn';
import SignUp from '../../Components/SignUp/SignUp';
import styles from './Home.module.css'

const Home = (props) => {
    const [state,setState] = useState(false); // true -> SingUp : false -> SingIn
    // const [data,setData] = useState();
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(data){
    //     registerUser(data)
    //     .then((result)=>{
    //         props.sendUser(result)
    //         navigate('/tasks')
    //     })
    //     .catch((err)=>{
    //         setError(err);
    //     })
    //     .finally(()=>{
    //         setIsLoading(false)
    //     })}
    // },[data])
    const getData = ({callback,values}) =>{
        // setData(userData)
        callback(values)
        .then(({data: {data}})=>{
            props.sendUser(data)
            navigate('/tasks')
        })
        .catch((err)=>{
          console.log(err);
            setError(err);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    return (
        <div className={styles.container}>
          <header>
            <button onClick={()=>setState(!state)}>{state? 'SingIn':'SingUp'}</button>  
          </header>

          <main className={styles['form-wrapper']}>
            {state? <SignUp sendData={getData}/>:<SignIn sendData={getData}/>}  
          {error&& <div className={styles['error-container']}>{error.err}</div>}
          </main> 
          
        </div>
    );
}

export default Home;
