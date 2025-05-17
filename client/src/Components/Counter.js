import React, { useReducer, useState } from 'react';
import {connect} from 'react-redux';
import {incrementAction, decrementAction} from '../actions/actionCreater'

const Counter = (props) => {
    
    // const increment = ()=>{
    //     props.dispatch(createActionIncrement());
    // }
    // const decrement = ()=>{
    //     props.dispatch(createActionDecrement());
    // }
    
    
    console.log(props)
    return (
        <>
            <h1>{props.counter}</h1>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button> 
        </>
    );
}

const mapStateToProps = (state) => {
    return state
}

// const mapDispatchToProps = (dispatch)=>{
//     return {
//         increment: ()=> dispatch(incrementAction()),
//         decrement: ()=> dispatch(decrementAction())
//     }
// }

const mapDispatchToProps = {
    increment: incrementAction,
    decrement: decrementAction
}

const WrappedCounter = connect(mapStateToProps,mapDispatchToProps)(Counter);

export default WrappedCounter;

/* 

connect - функция, которя принимает 2 опциональне аргументы и подписывает компоненту на обновление стейта

- mapStateToProps
Функция, которая принимает ВЕСЬ стейт и возвращает только ту часть стейта, которая нужжна именно этой компоненте

- mapDispatchToProps
Функцияб которая возвращает объект, в котором наши actionCreator`s обворачиваются disoatchem

Кариювання фукнций - трансфо
f(a,b,c) -> f(a)(b)(c)


function add(x) {
    return function(y) {
        return x+y
    }
}
add(2)(3)
result = 5

*/