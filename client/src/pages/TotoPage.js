import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import { useNavigate } from 'react-router-dom';
import { getTasks,createTask } from '../api/taskApi';
import TodoForm from '../Components/TodoForm/TodoForm';
import { authUser } from '../api/userApi';

const TotoPage = (props) => {
    const [todos,setTodos] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
      /* 
      1. Проверяем есть ли юзер в стейте реакта?
        1.1 Если юзер есть - все ок, работаем!
        1.2 Если юзера нет - залазим в localStorage и проверяем есть у юзера токен
          1.2.1 Если токен есть - берем токен и с его помощью авторизиуем запрос на получение таско
          Сервер проверяет валидный токен, или нет
            1.2.1.1 Если токен не валидный - на сервере возвращаем ошибку, на фронте перенаправляемся на страничку атенфикации
            1.2.1.2 Если токен валидный - сервер просто выполняет запрос и возвращает нам ответ
          1.2.2 Если токена нет - перенаправляемся на страничку атенфикации и заставляем пользователя проходить аутенфикацию снова
      */

      if(!props.user){
        const token = localStorage.getItem('token');
        if(token){
          // делаем запрос на получение юзера
          authUser(token)
          .then(userData=>{
            console.log(3);
            props.sendUser(userData.data)
          })
          .catch(err=>{
            return navigate('/');
          })
        }else{
          // перенаправляемся на аутенфикацию
          return navigate('/');
        }
      } else {
        getTasks(props.user._id)
        .then(result=>{
          setTodos(result.data)
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },[props.user])
    
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

    return (
        <>
          <h1>TodoList</h1>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={todos}/>

 
        </>
    );
}

export default TotoPage;
