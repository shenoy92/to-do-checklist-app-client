import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from '../styles/formikCustomInput.module.scss';
import Error from "../component/error";

const FormikCustomInput = (props) => {
    return (
        <div className={styles.formControl}>
            <Field {...props}/>
            <ErrorMessage name={props.name} component={Error}/>
        </div>
      )
  }
  
  export default FormikCustomInput;
  