import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import auth from "../auth";
import styles from '../styles/login.module.scss';
import Loading from "../component/loading";
import FormikCustomInput from "../component/formikCustomInput";
import API_URLS from '../constants/apiUrls';

const Registration = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(auth.isAuthenticated()) {
      auth.login(() => {
        props.history.push('/todo');
      })
    }
  },[]);

  const initialValues = {
    userName: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  })

  

  const onSubmit = (values) => {
    setLoading((prevState) => !prevState);
    axios.post(`${process.env.REACT_APP_API_BASE_URL}${API_URLS.registration}`,{
      name: values.userName,
      email: values.email,
      password: values.password
    })
    .then((response) => {
      setLoading((prevState) => !prevState);
      console.log(response)
      auth.login(() => {
        props.history.push('/todo');
      },response.data.authToken)
    })
    .catch((err) => {
      setLoading((prevState) => !prevState);
      console.log(err);
    })
  }

    return (
      <div className={styles.loginFormContainer}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <FormikCustomInput className="todo-input" type='userName' name='userName'  placeholder="Username"/>
              <FormikCustomInput className="todo-input" type='email' name='email'  placeholder="E-mail"/>
              <FormikCustomInput className="todo-input" type='password' name='password' placeholder="Password"/>
              <button className="todo-btn" type='submit'>REGISTER</button>
            </Form>
        </Formik>
        <p>You already have an account?<Link to="/"> Login In</Link></p>
        { loading ? <Loading /> : null }
      </div>
    );
  }
  
  export default Registration;
  