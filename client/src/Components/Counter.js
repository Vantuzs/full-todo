import React, { useReducer, useState } from 'react';
import {connect} from 'react-redux';
import {incrementAction, decrementAction,stepAction,requestCounterFetching} from '../actions/actionCreater'

const Counter = (props) => {
    // const increment = ()=>{
    //     props.dispatch(createActionIncrement());
    // }
    // const decrement = ()=>{
    //     props.dispatch(createActionDecrement());
    // }

    const inputeHandler = (event)=>{
        // console.log(event);
        const {target: {value}} = event
        // console.log(value);
        props.stepChange(Number(value))
     }
    
    return (
        <>
            <h1>{props.counter}</h1>
            <input type='number' name='step' placeholder='123?' value={props.step}  onChange={inputeHandler}/>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button> 
            <h3>{props.serverResponse? props.serverResponse.ServerResponce:'0'}</h3>
            

            <button onClick={()=>{props.requestFetching(props.counter)}}>Send counter to backend</button>
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
    decrement: decrementAction,
    stepChange: stepAction,
    requestFetching: requestCounterFetching
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