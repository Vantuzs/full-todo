import { exampleApi } from "../api/axiosApi";
import { put } from "redux-saga/effects";
import { requestCounterSuccess,requestCounterError } from "../actions/actionCreater";

export function* createServerSaga(action) { // worcker - саги которые будут запускаться когда прийдет определённый тип action
    try {
        const result = yield exampleApi(action.payload)
        // console.log(result);
        yield put(requestCounterSuccess(result))
    } catch (error) {
        yield put(requestCounterError(error)) 
    }
}