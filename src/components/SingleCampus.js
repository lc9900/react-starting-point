import React, {Component} from 'react';
import store, { fetchSingleCampus } from '../store';
import {Link} from 'react-router-dom';

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
        store.dispatch(fetchSingleCampus(campusId));

        this.unsubscribe = store.subscribe(() => this.setState(store.getState));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const {singleCampus} = this.state;
        const students = singleCampus.students;
        console.log(singleCampus);
        return (
            <div className='col-sm-6'>
                <div className="panel panel-default">
                  <div className="panel-body">
                  <p className='lead'>{singleCampus.name}</p>
                    <ul className='list-group'>
                        {
                            singleCampus.id && students.length > 0 ? students.map(student => <li key={student.id} className='list-group-item'>
                                        <Link to={`/student/${student.id}`}>{student.name}</Link>
                                    </li>)
                                        : <div className='lead'>No students for {singleCampus.name}</div>
                        }
                    </ul>
                  </div>
                </div>
            </div>
        )

    }
}

