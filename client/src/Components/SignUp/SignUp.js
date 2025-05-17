import React from 'react';
import {Formik,Form,Field,ErrorMessage}  from 'formik';
import {format} from 'date-fns';
// import { registerUser } from '../../api/userApi';
import { registerUser } from '../../api/axiosApi';


const SignUp = (props) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: format(new Date(),'yyyy-MM-dd')
    }

    const onSubmitFromik = (values,actions)=>{
        props.sendData({
            callback: registerUser,
            values
        })
        actions.resetForm()
    }

    return (
        <>
            <h2>SingUp</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmitFromik} > 
                {(formikProps)=>(
                    <Form>
                        <Field name='firstName' placeholder='Type your name'/>
                        <Field name='lastName' placeholder='Type your last name'/>
                        <Field name='email' placeholder='Type your email'/>
                        <Field name='password' placeholder='Type your password'/>
                        <Field name='birthday' type='date'/>
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
