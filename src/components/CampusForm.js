import React, { Component } from 'react';
import store from '../store';

export default class CampusForm extends Component {
    constructor(){
        super();
        this.state = Object.assign({}, store.getState(), {
            campusName: ''
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
        const {campusName} = this.state;
        // console.log(campusName);
        this.props.onCampusAdd({name: campusName});
        this.setState({
            campusName: ''
        });
    }

    render() {
        const { campusName } = this.state;
        return (
            <div className='col-sm-4'>
                <h2>Add Campus</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input value={campusName} onChange={this.handleChange} name='campusName' className="form-control" placeholder="Name"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
