import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import auth from "../auth";
import Loading from "../component/loading";
import FormikCustomInput from "../component/formikCustomInput";
import styles from '../styles/login.module.scss';
import API_URLS from '../constants/apiUrls';

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(auth.isAuthenticated()) {
      auth.login(() => {
        props.history.push('/todo');
      })
    }
  },[]);

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    setLoading((prevState) => !prevState);
    axios.post(`${process.env.REACT_APP_API_BASE_URL}${API_URLS.signIn}`,{      //here prob
      email: values.email,
      password: values.password
    })
    .then((response) => {
      setLoading((prevState) => !prevState);
      auth.login(() => {
        props.history.push('/todo');             //here prob
      },response.data)
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
              <FormikCustomInput className="todo-input" type='email' name='email'  placeholder="E-mail"/>
              <FormikCustomInput className="todo-input" type='password' name='password' placeholder="Password"/>
              <button className="todo-btn" type='submit'>LOGIN</button>
            </Form>
          </Formik>
          <p>Don't have an account?<Link to="/registration"> Sign up</Link></p>
          { loading && <Loading /> }
        </div>
    );
  }
  
  export default Login;
  