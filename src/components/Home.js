import React, {Component} from 'react';
// import StatefulCampusDetail from './StatefulCampusDetail';
import CampusDetail from './CampusDetail';
import AddCampusForm from './AddCampusForm';
import store, {selectCampus, fetchCampuses, fetchCampusStudents,
                getCampusStudents, showAddCampusForm, postCampus, deleteCampus} from '../store';

export default class Home extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.displayDetail = this.displayDetail.bind(this);
        this.showForm = this.showForm.bind(this);
        this.onCampusAdd = this.onCampusAdd.bind(this);
        this.onCampusDelete = this.onCampusDelete.bind(this);
    }

    componentDidMount() {
        const campusThunk = fetchCampuses();
        store.dispatch(campusThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        store.dispatch(selectCampus(0));
        store.dispatch(getCampusStudents([]));
        store.dispatch(showAddCampusForm(false));
        this.unsubscribe();
    }

    displayDetail(campusId){
        store.dispatch(selectCampus(campusId));
        store.dispatch(fetchCampusStudents(campusId));
        store.dispatch(showAddCampusForm(false));
    }

    showForm() {
        store.dispatch(selectCampus(0));
        store.dispatch(showAddCampusForm(true));
    }

    onCampusAdd(campusInfoObj){
        postCampus(campusInfoObj)
            .then(() => {
                store.dispatch(fetchCampuses());
            }).catch(err => { throw err; });

    }

    onCampusDelete(campusId, event){
        event.stopPropagation();
        store.dispatch(showAddCampusForm(false));
        store.dispatch(selectCampus(0));
        deleteCampus(campusId)
            .then(() => {
                store.dispatch(fetchCampuses());
            }).catch(err => { throw err; });
    }

    render() {
        const {selectedCampusId, campuses, selectedCampusStudents, showAddCampusForm} = this.state;
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1>Campuses <button onClick={this.showForm} className='btn btn-primary pull-right'>Add Campus</button></h1>
                    <ul className='list-group'>
                        {
                            campuses.map(campus => {
                                return (
                                    <li className='list-group-item' key={campus.id} onClick={()=>this.displayDetail(campus.id)}>
                                        <span>{campus.name}</span>

                                        <button onClick={(event) => this.onCampusDelete(campus.id, event)} type='button' className='btn btn-danger btn-xs pull-right'>
                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    showAddCampusForm ? <AddCampusForm onCampusAdd={this.onCampusAdd}/> : <div></div>
                }

                {
                    selectedCampusId > 0 ? <CampusDetail students={selectedCampusStudents}/>: <div></div>
                }
            </div>
        )
    }
}
