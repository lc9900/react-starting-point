import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StudentForm from './StudentForm';
import store, { showAddStudentForm, getStudents, fetchStudents,
                fetchCampuses, postStudent, deleteStudent, editStudent } from '../store';

export default class Students extends Component {
    constructor() {
        super();

        // This student state is confined to the student component only.
        this.state = Object.assign({}, store.getState(), { student: {}});

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
        postStudent(studentInfoObj)
    }

    onStudentDelete(studentId){
        deleteStudent(studentId);
    }

    onStudentEdit(studentInfoObj){
        editStudent(studentInfoObj);
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
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Campus</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            students.map(student => <tr key={student.id}>
                                                        <td><Link to={`/student/${student.id}`}>{student.name} </Link></td>
                                                        <td>
                                                        {
                                                            student.campus ? <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
                                                                            :<span></span>
                                                        }
                                                        </td>
                                                        <td>
                                                            <button onClick={() => this.showForm(student)} type='button' className='btn btn-primary btn-xs' style={{marginRight:'5px'}}>
                                                                <span className="glyphicon glyphicon-pencil"></span> Edit
                                                            </button>
                                                            <button onClick={() => this.onStudentDelete(student.id)} type='button' className='btn btn-danger btn-xs'>
                                                                <span className="glyphicon glyphicon-remove"></span> Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                        )
                        }
                        </tbody>
                    </table>
                </div>
                {
                    showAddStudentForm ? <StudentForm onStudentChange={this.onStudentChange} student={student}/>:<div></div>
                }
            </div>
        );
    }
}
