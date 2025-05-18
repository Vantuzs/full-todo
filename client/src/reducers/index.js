import {combineReducers} from 'redux';
import counterReduser from './counterReducer';
import themesReduser from './themesReducer';

const rootReducer = combineReducers({
    counter: counterReduser,
    themes: themesReduser
});

export default rootReducer;