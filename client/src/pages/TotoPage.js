import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import TodoForm from '../Components/TodoForm/TodoForm';
import { getTasksRequest,createTaskRequest,deleteTaskRequest,logOutRequest } from '../actions/actionCreater';
import { connect } from 'react-redux';

const TodoPage = (props) => {

    useEffect(()=>{
       if(props.user){
        props.getTasksRequest();
       }
    },[props.user])
    
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

    const logOutHandler = ()=>{
      props.logOutRequest()
    }

    return (
        <>
        <button onClick={logOutHandler}>Log out</button>
          <h1>TodoList</h1>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={props.tasks} dellCallback={delTask}/>

 
        </>
    );
}

const mapStateToProps = (state) => state

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  logOutRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoPage);
