import React, { Component } from 'react';
import store from '../store';

export default class StudentForm extends Component {
    constructor(props){
        super();
        let initialState = {};
        if (props.student.id){
            initialState = {
                nameInput: props.student.name,
                campusValue: props.student.campusId || 0 //In case this student actually doesn't have any campus
            };
        }
        else {
            initialState = {
                nameInput: '',
                campusValue: 0
            };
        }

        this.state = Object.assign({}, store.getState(), initialState);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.student.id === this.props.student.id) return;

        let newState = {};
        if (newProps.student.id){
            newState = {
                nameInput: newProps.student.name,
                campusValue: newProps.student.campusId || 0 //In case this student actually doesn't have any campus
            };
        }
        else {
            newState = {
                nameInput: '',
                campusValue: 0
            };
        }
        this.setState(newState);
    }

    //https://stackoverflow.com/questions/35345338/react-setstate-can-only-update-a-mounted-or-mounting-component
    // The following DidMount, and WillUnmount will generate this error
    //      Warning: setState(...): Can only update a mounted or mounting component.
    //      This usually means you called setState() on an unmounted component. This is a no-op
    // I am guessing, when showAddStudentForm is turned off, this component isn't unmounted yet.
    // It turned out, in Students.js' onStudentEdit method,
    // I didn't turn off showAddStudentForm until after I dispatched the fetchStudent() thunk.
    // That thunk will cause a change in state, which the subscriber here will get.
    // But by then, form is somehow unmounted, but the unsubscribe didn't really happen yet.
    // Sort of a race condition, where component is unmounted, but the unsubscribe didn't take place yet.
    // Thus causing the setState to take place on an unmounted component.
    // But it's still odd, since unsubscribe happens in componentWillUnmount. So if the component is already unmounted,
    // the unsubscribe should have already taken place. Guess there's some async operations here that's causing this.

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange(event) {
        const name = event.target.name,
                value = event.target.value;
        // console.log(name, value);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let studentInfoObj = {
            name: this.state.nameInput,
            campusId: this.state.campusValue
        };
        // If there's student passed in, then transfer the id to studentInfoObj
        if(this.props.student.id){
            studentInfoObj.id = this.props.student.id
        }
        this.props.onStudentChange(studentInfoObj);
        // this.setState({
        //     nameInput: '',
        //     campusValue: 0
        // });
    }

    render() {
        const { campuses, nameInput, campusValue } = this.state;
        return (
            <div className='col-sm-4'>
                <h2>Add Student</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input value={nameInput} onChange={this.handleChange} name='nameInput' className="form-control" placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <select value={campusValue} name='campusValue' onChange={this.handleChange} className="form-control">
                            <option value='0'>Select A Campus</option>
                            {
                                campuses.map(campus => {
                                    return (
                                            <option value={campus.id} key={campus.id}>
                                                {campus.name}
                                            </option>
                                    );
                                })
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
