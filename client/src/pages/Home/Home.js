import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../Components/SignIn/SignIn';
import SignUp from '../../Components/SignUp/SignUp';
import styles from './Home.module.css'
import { connect } from 'react-redux';

const Home = (props) => {
    const [state,setState] = useState(false); // true -> SingUp : false -> SingIn

    return (
        <div className={styles.container}>
          <header>
            <button onClick={()=>setState(!state)}>{state? 'SingIn':'SingUp'}</button>  
          </header>

          <main className={styles['form-wrapper']}>
            {state? <SignUp/>:<SignIn/>}  
          {props.error&& <div className={styles['error-container']}>{props.error.message}</div>}
          </main> 
          
        </div>
    );
}

const mapStateToProps = ({error}) =>({error})

export default connect(mapStateToProps)(Home);
