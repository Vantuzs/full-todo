import React, { useReducer, useState } from 'react';
import {connect} from 'react-redux'



const Counter = (props) => {
    
    const increment = ()=>{
        const action = {
            type: 'COUNTER_PLUS'
        }
        props.dispatch(action);
    }
    const decrement = ()=>{
        const action = {
            type: 'COUNTER_MINUS'
        }
        props.dispatch(action);
    }
    
    
    console.log(props)
    return (
        <>
            <h1>{props.counter}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}

const mapStateToProps = (state) => {
    return state
}

const WrappedCounter = connect(mapStateToProps)(Counter);

export default WrappedCounter;

/* 

connect - функция, которя принимает 2 опциональне аргументы и подписывает компоненту на обновление стейта

- mapStateToProps
Функция, которая принимает ВЕСЬ стейт и возвращает только ту часть стейта, которая нужжна именно этой компоненте

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