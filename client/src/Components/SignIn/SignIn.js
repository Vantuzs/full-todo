import React from 'react';
import {Formik,Form,Field} from 'formik';
import { loginUserRequest } from '../../actions/actionCreater';
import { connect } from 'react-redux';


const SignIn = (props) => {
    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmitFrom = (values,actions)=>{
        props.loginUserRequest(values)
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

const mapDispatchToProps = {
    loginUserRequest
}

export default connect(null,mapDispatchToProps)(SignIn);
