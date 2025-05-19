import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import TodoForm from '../Components/TodoForm/TodoForm';
import { getTasksRequest,createTaskRequest,deleteTaskRequest } from '../actions/actionCreater';
import { connect } from 'react-redux';

const TodoPage = (props) => {
    const [todos,setTodos] = useState([]);

    useEffect(()=>{
       props.getTasksRequest();
    },[])
    
    const getNewTodo = (data)=>{
      props.createTaskRequest({
        status: 'new',
        createdAt: new Date(),
        ...data
      })
    }

    const delTask = (id)=>{
      props.deleteTaskRequest(id)
    }

    return (
        <>
          <h1>TodoList</h1>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={props.tasks} dellCallback={delTask}/>

 
        </>
    );
}

const mapStateToProps = ({tasks}) =>({tasks})

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoPage);
