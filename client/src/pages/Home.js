import React, {use, useState} from 'react';
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'

const Home = () => {
    const [state,setState] = useState(true) // true -> SingUp : false -> SingIn



    return (
        <>
          <header>
            <button onClick={()=>setState(!state)}>{state? 'SingIn':'SingUp'}</button>  
          </header>

          <main>
            {state? <SignUp/>:<SignIn/>}  
          </main> 
        </>
    );
}

export default Home;
