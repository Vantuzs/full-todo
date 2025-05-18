import ACTION_TYPES from './actionTypes'

export const incrementAction = ()=>{
    return ({
        type: ACTION_TYPES.INCREMENT
    })
}

export const decrementAction = ()=>{
    return ({
        type: ACTION_TYPES.DECREMENT
    })
}

export const stepAction = (step)=>{
    return ({
        type: ACTION_TYPES.STEP,
        payload: {
            step
        }
    })
}


// Заросы на сервер

export const requestCounterFetching = (counter)=>{
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_FETCHING,
        payload: counter
    });
}

export const requestCounterSuccess = (data)=>{
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_SUCCESS,
        payload: data
    })
}

export const requestCounterError = (err)=>{
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_ERROR,
        payload: err
    })
}