import React, {Component} from 'react';
import StudentForm from './StudentForm';
import store, { showAddStudentForm, getStudents, fetchStudents,
                fetchCampuses, postStudent, deleteStudent, editStudent } from '../store';

export default class Students extends Component {
    constructor() {
        super();
        this.state = Object.assign({}, store.getState(), { student: {}});

        // This is a bit of a hack in order to reuse the student form
        // this.state.student = {};

        this.showForm = this.showForm.bind(this);
        this.onStudentAdd = this.onStudentAdd.bind(this);
        this.onStudentDelete = this.onStudentDelete.bind(this);
        this.onStudentEdit = this.onStudentEdit.bind(this);
        this.onStudentChange = this.onStudentChange.bind(this);
    }

    componentDidMount () {
        store.dispatch(fetchStudents());
        store.dispatch(fetchCampuses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        store.dispatch(showAddStudentForm(false));
        // store.dispatch(getStudents([]));
        this.unsubscribe();
    }

    showForm(student) {
        if (student.id){
            // console.log("showForm with student", student);
            this.setState({ student });
        }
        else {
            this.setState({student: {}}); // Resetting student when we adding students
        }
        store.dispatch(showAddStudentForm(true));
    }

    onStudentAdd(studentInfoObj){
        store.dispatch(showAddStudentForm(false));
        postStudent(studentInfoObj)
            .then(() => {
                store.dispatch(fetchStudents());
            }).catch(err => { throw err; });
    }

    onStudentDelete(studentId){
        store.dispatch(showAddStudentForm(false));
        deleteStudent(studentId)
            .then(() => {
                store.dispatch(fetchStudents());
            })
            .catch(err => { throw err; });
    }

    onStudentEdit(studentInfoObj){
        store.dispatch(showAddStudentForm(false));
        editStudent(studentInfoObj)
            .then(() => {
                store.dispatch(fetchStudents());
            })
            .catch(err => {throw err; });
    }

    onStudentChange(studentInfoObj){
        if (studentInfoObj.id) return this.onStudentEdit(studentInfoObj);

        return this.onStudentAdd(studentInfoObj);
    }

    render() {
        const {showAddStudentForm, students, student} = this.state;
        // console.log("Students state ", this.state);
        // console.log('Students render student ', student);
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1>Students Page <button className='btn btn-primary pull-right' onClick={this.showForm}>Add Student</button></h1>
                    <ul className='list-group'>
                        {
                            students.map(student => <li className='list-group-item' key={student.id}>
                                                        {student.name}
                                                        <button onClick={() => this.onStudentDelete(student.id)} type='button' className='btn btn-danger btn-xs pull-right'>
                                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                                        </button>
                                                        <button onClick={() => this.showForm(student)} type='button' className='btn btn-primary btn-xs pull-right'>
                                                            <span className="glyphicon glyphicon-pencil"></span> Edit
                                                        </button>
                                                    </li>
                                        )
                        }
                    </ul>
                </div>
                {
                    showAddStudentForm ? <StudentForm onStudentChange={this.onStudentChange} student={student}/>:<div></div>
                }
            </div>
        );
    }
}
