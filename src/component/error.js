import React from 'react';
import styles from '../styles/error.module.scss';

const Error = (props) => {
    return <div className={styles.error}>{props.children}</div>
  }
  
  export default Error;
  