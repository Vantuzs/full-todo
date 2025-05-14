import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import { getTasks,createTask,deleteTask } from '../api/taskApi';
import TodoForm from '../Components/TodoForm/TodoForm';

const TotoPage = () => {
    const [todos,setTodos] = useState([]);

    useEffect(()=>{
        getTasks()
        .then(result=>{
          setTodos(result.data)
        })
        .catch(err=>{
          console.log(err);
        })
    },[])
    
    const getNewTodo = (data)=>{
      createTask({
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

    const delTask = (id)=>{
      deleteTask(id)
      .then(({data: deletedTask})=>{
        setTodos(todos.filter(task=>task._id!==deletedTask._id)) //Check
      })
      .catch(error=>{
        console.error(error);
      })
    }

    return (
        <>
          <h1>TodoList</h1>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={todos} dellCallback={delTask}/>

 
        </>
    );
}

export default TotoPage;
