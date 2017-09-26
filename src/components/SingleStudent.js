import React, {Component} from 'react';
import store, { fetchSingleStudent } from '../store';
import {Link} from 'react-router-dom';

export default class SingleStudent extends Component {
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        const studentId = this.props.match.params.studentId;
        console.log("studentId is ", studentId)
        store.dispatch(fetchSingleStudent(studentId));

        this.unsubscribe = store.subscribe(() => this.setState(store.getState));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const {singleStudent} = this.state;
        const campus = singleStudent.campus;
        console.log("In render ", singleStudent)
        console.log('In render, ', campus)
        return (
            <div className='col-sm-6'>
                <div className="panel panel-default">
                  <div className="panel-body">
                  <p className='lead'>{singleStudent.name}</p>
                    <ul className='list-group'>
                        {
                            singleStudent.id  && campus ? <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
                                        : <div className='lead'>No campus for {singleStudent.name}</div>
                        }
                    </ul>
                  </div>
                </div>
            </div>
        )

    }
}

