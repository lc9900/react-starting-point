import React, {Component} from 'react';
import store, { fetchCampusStudents } from '../store';

export default class SingleCampus extends Component {
    constructor(){
        super();
        this.state = Object.assign(
            {
                campusId: 0,
                campus: {}
            },
            store.getState()
        );

    }

    componentDidMount(){
        const campusId = this.props.match.params.campusId;
        this.setState({campusId});
        store.dispatch(fetchCampusStudents(campusId));

        this.unsubscribe = store.subscribe(() => this.setState(store.getState));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        return (
            <h1>Single Campus for {this.state.campusId}</h1>
        );
    }
}

