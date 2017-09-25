import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

// export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))



// INITIAL STATE
const initialState = {
    selectedCampusId: 0,
    showAddStudentForm: false
}


// ACTION TYPE
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SHOW_ADD_STUDENT_FORM = 'SHOW_ADD_STUDENT_FORM';


// ACTION CREATOR
export function selectCampus(campusId){
    return {
        type: SELECT_CAMPUS,
        selectedCampusId: campusId
    }
}

export function showAddStudentForm(value){
    return {
        type: SHOW_ADD_STUDENT_FORM,
        showAddStudentForm: value
    }
}


// THUNK




// REDUCER
function reducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_CAMPUS:
            return Object.assign({}, state, {
                selectedCampusId: action.selectedCampusId
            });

        case SHOW_ADD_STUDENT_FORM:
            return Object.assign({}, state, {
                showAddStudentForm: action.showAddStudentForm
            });

        default:
            return state;
    }
}


// CREATE STORE

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
