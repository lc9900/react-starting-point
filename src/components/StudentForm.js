import React, { Component } from 'react';
import store from '../store';

export default class StudentForm extends Component {
    constructor(){
        super();
        this.state = Object.assign({}, store.getState(), {
            nameInput: '',
            campusValue: 0
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        const studentInfoObj = {
            name: this.state.nameInput,
            campusId: this.state.campusValue
        };
        this.props.onStudentAdd(studentInfoObj);
        this.setState({
            nameInput: '',
            campusValue: 0
        });
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
                            <option>Select A Campus</option>
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
