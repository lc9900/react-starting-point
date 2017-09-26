import React, { Component } from 'react';
import store from '../store';

export default class CampusForm extends Component {
    constructor(props){
        super();
        this.state = store.getState();
        this.state = Object.assign({}, this.state, {
            campusName: this.state.selectedCampus.name || '',
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log("In componentWillReceiveProps")
        if(newProps.campus.id === this.state.selectedCampus.id) {
            // console.log("Not rendering");
            return;
        }
        let state = store.getState();
        console.log(state);
        state = Object.assign({}, state, {
            campusName: state.selectedCampus.name || '',
        });
        this.setState(state);
    }

    componentDidMount(){

        // this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        // console.log('CampusForm unmounted');
        // this.unsubscribe();
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
        let campusInfoObj = {}
        if(this.state.selectedCampus.id) campusInfoObj.id = this.state.selectedCampus.id;
        campusInfoObj.name = this.state.campusName;
        console.log("campusInfoObj is ", campusInfoObj);
        this.props.onCampusChange(campusInfoObj);
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
