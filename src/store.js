import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

// export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))



// INITIAL STATE
const initialState = {
    selectedCampus: {},
    showAddStudentForm: false,
    showAddCampusForm: false,
    campuses: [],
    selectedCampusStudents: [],
    students: [],
    singleCampus: {},
    singleStudent: {}
}


// ACTION TYPE
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SHOW_ADD_STUDENT_FORM = 'SHOW_ADD_STUDENT_FORM';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS_STUDENTS = 'GET_CAMPUS_STUDENTS';
const GET_STUDENTS = 'GET_STUDENTS';
// const ADD_STUDENT = 'ADD_STUDENT';
const SHOW_ADD_CAMPUS_FORM = 'SHOW_ADD_CAMPUS_FORM';
const SINGLE_CAMPUS = 'SINGLE_CAMPUS';
const SINGLE_STUDENT = 'SINGLE_STUDENT';


// ACTION CREATOR

export function singleStudent(student){
    return {
        type: SINGLE_STUDENT,
        student
    }
}

export function showAddCampusForm(value){
    return {
        type: SHOW_ADD_CAMPUS_FORM,
        showAddCampusForm: value
    }
}

export function singleCampus(campus){
    return {
        type: SINGLE_CAMPUS,
        campus // includes students as well
    }
}

export function getStudents(students) {
    return {
        type: GET_STUDENTS,
        students
    }
}

export function getCampusStudents(students) {
    return {
        type: GET_CAMPUS_STUDENTS,
        students
    };
}

export function getCampuses(campuses) {
    return {
        type: GET_CAMPUSES,
        campuses
    };
}

export function selectCampus(campus){
    return {
        type: SELECT_CAMPUS,
        selectedCampus: campus
    };
}

export function showAddStudentForm(value){
    return {
        type: SHOW_ADD_STUDENT_FORM,
        showAddStudentForm: value
    };
}


// THUNK

export function deleteCampus(campusId){
    return axios.delete(`/api/campus/${campusId}`)
                .then(() => {
                    store.dispatch(fetchCampuses());
                }).catch(err => { throw err; });
}

export function postCampus(campusInfoObj) {
    return axios.post('/api/campus', campusInfoObj)
                .then(() => {
                    store.dispatch(fetchCampuses());
                }).catch(err => { throw err; });

}

export function editCampus(campusInfoObj){
    return axios.put(`/api/campus/${campusInfoObj.id}`, {name: campusInfoObj.name})
                .then(() => {
                    store.dispatch(fetchCampuses());
                    store.dispatch(selectCampus({}));
                }).catch(err => { throw err; });
}

export function fetchSingleStudent(studentId){
    return function(dispatch){
        return axios.get(`/api/student/${studentId}`)
                .then(res => res.data)
                .then(student => {
                    dispatch(singleStudent(student));
                });
    }
}

export function fetchSingleCampus(campusId){
    return function(dispatch){
        return axios.get(`/api/campus/${campusId}`)
                .then(res => res.data)
                .then(campus => {
                    dispatch(singleCampus(campus));
                });
    }
}

export function fetchStudents(){
    return function(dispatch) {
        return axios.get('/api/student')
                .then(res => res.data)
                .then(students => {
                    dispatch(getStudents(students));
                })
                .catch(err => { throw err; });
    }
}

export function fetchCampusStudents(campusId) {
    return function(dispatch) {
        return axios.get(`/api/campus/${campusId}`)
                    .then(res => res.data)
                    .then(campus => {
                        console.log(campus.students);
                        dispatch(getCampusStudents(campus.students));
                    })
                    .catch(err => { throw err; });
    };
}

export function fetchCampuses(){
    return function(dispatch){
        return axios.get('/api/campus')
                .then(res => res.data)
                .then(campuses => {
                    dispatch(getCampuses(campuses));
                })
                .catch(err => { throw err; });
    };
}


// REDUCER
function reducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_CAMPUS:
            return Object.assign({}, state, {
                selectedCampus: action.selectedCampus
            });

        case SHOW_ADD_STUDENT_FORM:
            return Object.assign({}, state, {
                showAddStudentForm: action.showAddStudentForm
            });

        case GET_CAMPUSES:
            return Object.assign({}, state, {
                campuses: action.campuses
            });

        case GET_CAMPUS_STUDENTS:
            return Object.assign({}, state, {
                selectedCampusStudents: action.students
            });

        case GET_STUDENTS:
            return Object.assign({}, state, {
                students: action.students
            });

        case SINGLE_CAMPUS:
            return Object.assign({}, state, {
                singleCampus: action.campus
            });

        case SINGLE_STUDENT:
            console.log('SINGLE_STUDENT ', action.student)
            return Object.assign({}, state, {
                singleStudent: action.student
            });
        // case ADD_STUDENT:
        //     let students = state.students.concat(action.student);
        //     // console.log(students);
        //     return Object.assign({}, state, { students });

        case SHOW_ADD_CAMPUS_FORM:
            return Object.assign({}, state, {showAddCampusForm: action.showAddCampusForm});

        default:
            return state;
    }
}


// Side-effects that are NOT THUNKS





export function deleteStudent(studentId){
    return axios.delete(`/api/student/${studentId}`);
}

export function postStudent(studentInfoObj){
    return axios.post('/api/student', studentInfoObj);

}

export function editStudent(studentInfoObj){
    return axios.put(`/api/student/${studentInfoObj.id}`, {
        name: studentInfoObj.name,
        campusId: studentInfoObj.campusId
    });
}

// CREATE STORE

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
