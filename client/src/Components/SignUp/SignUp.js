import React from 'react';
import {Formik,Form,Field,ErrorMessage}  from 'formik'


const SignUp = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        passwordHash: '',
        birthday: new Date()
    }

    const onSubmitFromik = (values,actions)=>{
        console.log(values, 'NIGGERS');
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
                        <Field name='passwordHash' placeholder='Type your password'/>
                        <Field name='birthday' type='date'/>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
