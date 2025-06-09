import { registerUser,loginUser,authUser,logOut } from "../api/axiosApi";
import { loginUserSuccess,loginUserError,registerUserSuccess,registerUserError,authUserSuccess,authUserError,authByQRCodeSuccess,authByQRCodeError } from "../actions/actionCreater";
import { authByQRCode } from "../api/authByQRCodeApi";
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

export function* authByQRCodeSaga(action) {
    try {
        // 1: делаем запрос на АПИ
        console.log(action.payload);
        const { data } = yield authByQRCode({
            refreshToken: action.payload
        });

        // 2: полученные токены записываем в localStorage пользователя

        const {tokens: {accessToken,refreshToken}} = data;
        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('refreshToken',refreshToken)

        // 3: перенаправляемся на компоненту каторая использует токены и отобразит таски пользователя

        yield put(authByQRCodeSuccess(data));
        history.push('/tasks');


    } catch (error) {
        yield put(authByQRCodeError(error))
    }
}