import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from '../styles/todo.module.scss';
import auth from "../auth";
import Confirm from '../component/confirm';
import Loading from "../component/loading";
import API_URLS from '../constants/apiUrls';

const Todo = (props) => {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prevState) => !prevState);
    axios.get(
      `${process.env.REACT_APP_API_BASE_URL}${API_URLS.todo}`,
      { headers: {'x-auth-token': auth.getAuthToken()} })
      .then((response) => {
        setLoading((prevState) => !prevState);
        setTodoList(response.data);
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
        console.log(err);
      })
  },[]);
  

  const handleTodo = (event) => {
    setTodoItem(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading((prevState) => !prevState);
    if(todoItem.length) {
      if(editId) {
        axios.put(
        `${process.env.REACT_APP_API_BASE_URL}${API_URLS.todo}/${editId}`,
        { todoItem: todoItem },
        { headers: {'x-auth-token': auth.getAuthToken()} })
        .then((response) => {
          setLoading((prevState) => !prevState);
          setEditId(null);
          setTodoItem('');
          setTodoList(response.data);
        })
        .catch((err) => {
          setLoading((prevState) => !prevState);
          console.log(err);
        })
      } else {
        axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${API_URLS.todo}`,
        { todoItem: todoItem },
        { headers: {'x-auth-token': auth.getAuthToken()} })
        .then((response) => {
          setLoading((prevState) => !prevState);
          setTodoItem('');
          setTodoList(response.data);
        })
        .catch((err) => {
          setLoading((prevState) => !prevState);
          console.log(err);
        })
      }
    }
  }

  const handleEdit = (data) => {
    setEditId(data._id);
    setTodoItem(data.todoItem);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
  }

  const handleDeleteConfirm = (confirmStatus) => {
    if(confirmStatus) {
      setLoading((prevState) => !prevState);
      axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}${API_URLS.todo}/${deleteId}`, { headers: {'x-auth-token': auth.getAuthToken()} })
      .then((response) => {
        setLoading((prevState) => !prevState);
        setDeleteId(null);
        setTodoList(response.data);
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
        console.log(err);
      })
    } else {
      setDeleteId(null);
    }

  }

    return (
      <div className={styles.todoContainer}>
        <form onSubmit={handleSubmit}>
          <input className="todo-input" placeholder="Todo item" type="text" value={todoItem} onChange={handleTodo}/>
          <button disabled={todoItem.length ? false : true} className="todo-btn" type="submit">{editId ? 'Update' : 'Add' }</button>
        </form>

        <div className={styles.todoListWrapper}>
        { todoList.length > 0 ? <ul>
          { todoList.map((data) => {
              return (<li key={data._id}>
                <p>{data.todoItem}</p>
                <div className={styles.actions}>
                  <button className={styles.edit} onClick={() => handleEdit(data)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(data._id)}>Delete</button>
                </div>
              </li>)
            }) 
          }
        </ul> : <div className={styles.emptyListMsg}>Add a todo item to the list</div>}
        </div>

        { deleteId && <Confirm 
          message={'Are you sure, you want to delete this record?'}
          onConfirm={handleDeleteConfirm}/>}
        <button className={styles.logoutBtn} onClick={
          () => {
            auth.logout(() => {
              props.history.push('/');
            })
          }
        }>LOGOUT</button>
        { loading && <Loading /> }
      </div>
    );
  }
  
  export default Todo;
  