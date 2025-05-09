import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import { useNavigate } from 'react-router-dom';
import { getTasks,createTask } from '../api/taskApi';
import TodoForm from '../Components/TodoForm/TodoForm';

const TotoPage = (props) => {
    const [todos,setTodos] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
      if(!props.user){
        return navigate('/')
      }
      getTasks(props.user._id)
      .then(result=>{
        setTodos(result.data)
      })
      .catch(err=>{
        console.error(err);
      })
    },[])
    
    const getNewTodo = (data)=>{
      createTask({
        authorId: props.user._id,
        status: 'new',
        createdAt: new Date(),
        ...data
      })
      .then(({data: createdTask})=>{
        console.log(createdTask);
        setTodos([...todos,createdTask])
      })
      .catch(err=>{
        console.log(err);
      })
    }

    return (
        <>
          <h1>TodoList</h1>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={todos}/>

 
        </>
    );
}

export default TotoPage;
