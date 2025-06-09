import {takeLatest} from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { authSaga, loginSaga,logOutSaga,registerSaga, authByQRCodeSaga } from './AuthSaga';
import { getTasksSaga,createTaskSaga,deleteTaskSaga } from './TasksSaga';

function* rootSaga(){
    // AUTH
    yield takeLatest(ACTION_TYPES.LOGIN_USER_REQUEST,loginSaga)
    yield takeLatest(ACTION_TYPES.REGISTER_USER_REQUEST,registerSaga)
    yield takeLatest(ACTION_TYPES.AUTH_USER_REQUEST,authSaga)
    yield takeLatest(ACTION_TYPES.LOG_OUT_REQUEST,logOutSaga)
    yield takeLatest(ACTION_TYPES.AUTH_QR_USER_REQUEST,authByQRCodeSaga)

    // TASKS
    yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST,getTasksSaga)
    yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST,createTaskSaga)
    yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST,deleteTaskSaga)
    yield takeLatest(ACTION_TYPES.REFRESH_TASK_LIST,getTasksSaga)
}

export default rootSaga;