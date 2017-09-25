import React, {Component} from 'react';
import StudentForm from './StudentForm';
import store, { showAddStudentForm, getStudents, fetchStudents, fetchCampuses, postStudent, deleteStudent } from '../store';

export default class Students extends Component {
    constructor() {
        super();
        this.state = store.getState();

        // This is a bit of a hack in order to reuse the student form
        this.state.student = {};

        this.showForm = this.showForm.bind(this);
        this.onStudentAdd = this.onStudentAdd.bind(this);
        this.onStudentDelete = this.onStudentDelete.bind(this);
        this.onStudentEdit = this.onStudentEdit.bind(this)
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

    showForm() {
        store.dispatch(showAddStudentForm(true));
    }

    onStudentAdd(studentInfoObj){
        // console.log(studentInfoObj);
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

    onStudentEdit(student){
        this.setState({student});
    }

    render() {
        const {showAddStudentForm, students} = this.state;
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1>Students Page <button className='btn btn-primary pull-right' onClick={this.showForm}>Add Student</button></h1>
                    <ul className='list-group'>
                        {
                            students.map(student => <li className='list-group-item' key={student.id}>
                                                        {student.name}
                                                        <button onClick={() => this.onStudentEdit(student)} type='button' className='btn btn-primary btn-xs pull-right'>
                                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                                        </button>
                                                        <button onClick={() => this.onStudentDelete(student.id)} type='button' className='btn btn-danger btn-xs pull-right'>
                                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                                        </button>
                                                    </li>
                                        )
                        }
                    </ul>
                </div>
                {
                    showAddStudentForm ? <StudentForm onStudentAdd={this.onStudentAdd}/>:<div></div>
                }
            </div>
        );
    }
}
