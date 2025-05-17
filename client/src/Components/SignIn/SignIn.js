import React from 'react';
import {Formik,Form,Field} from 'formik';
// import { loginUser } from '../../api/userApi';
import { loginUser } from '../../api/axiosApi';


const SignIn = (props) => {
    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmitFrom = (values,actions)=>{
        props.sendData({
            callback: loginUser,
            values
        })
        actions.resetForm();
    }

    return (
        <>
         <h2>Sign In</h2>
         <Formik initialValues={initialValues} onSubmit={onSubmitFrom}>
            {(formikProps)=>(
                <Form>
                    <Field name='email' placeholder='email@gmail.com'/>
                    <Field name='password' placeholder='qwerty123'/>
                    <button type='submit'>Sign in</button>
                </Form>
            )}
         </Formik>
        </>
    );
}

export default SignIn;
