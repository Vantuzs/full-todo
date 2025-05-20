import { registerUser,loginUser,authUser,logOut } from "../api/axiosApi";
import { loginUserSuccess,loginUserError,registerUserSuccess,registerUserError,authUserSuccess,authUserError } from "../actions/actionCreater";
import { put } from "redux-saga/effects";
import history from "../BrowserHistory";

export function* loginSaga(action) {
    try {
        const { data: { data } } = yield loginUser(action.payload);
        
        yield put(loginUserSuccess(data));
        history.push('/tasks')
    } catch (error) {
        yield put(loginUserError(error))
    }
}

export function* registerSaga(action) {
    try {
        const {data: {data}} = yield registerUser(action);

        yield put(registerUserSuccess(data))
        history.push('/tasks')
    } catch (error) {
        yield put(registerUserError(error))
    }
}

export function* authSaga() {
    try {
        const {data: {data}} = yield authUser();

        yield put(authUserSuccess(data))
    } catch (error) {
        yield put(authUserError(error))
    }
}

export function* logOutSaga() {
    yield logOut();
    history.push('/');
}