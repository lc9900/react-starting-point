import React, {Component} from 'react';
import AddStudentForm from './AddStudentForm';
import store, { showAddStudentForm } from '../store';

export default class Students extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.showForm = this.showForm.bind(this);
    }

    componentWillMount () {
         this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        store.dispatch(showAddStudentForm(false));
        this.unsubscribe();
    }

    showForm() {
        store.dispatch(showAddStudentForm(true));
    }

    render() {
        const {showAddStudentForm} = this.state;
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1 onClick={this.showForm}>Students Page</h1>
                </div>
                {
                    showAddStudentForm ? <AddStudentForm />:<div></div>
                }
            </div>
        );
    }
}
