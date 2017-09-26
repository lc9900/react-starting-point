import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import StatefulCampusDetail from './StatefulCampusDetail';
import CampusDetail from './CampusDetail';
import CampusForm from './CampusForm';
import store, { selectCampus, fetchCampuses, fetchCampusStudents,
                getCampusStudents, showAddCampusForm,
                postCampus, deleteCampus, editCampus } from '../store';

export default class Home extends Component {
    constructor() {
        super();
        this.state = store.getState();

        this.displayDetail = this.displayDetail.bind(this);
        this.showForm = this.showForm.bind(this);
        this.onCampusAdd = this.onCampusAdd.bind(this);
        this.onCampusDelete = this.onCampusDelete.bind(this);
        this.onCampusEdit = this.onCampusEdit.bind(this);
        this.onCampusChange = this.onCampusChange.bind(this);
    }

    componentDidMount() {
        const campusThunk = fetchCampuses();
        store.dispatch(campusThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        store.dispatch(selectCampus({}));
        store.dispatch(getCampusStudents([]));
        store.dispatch(showAddCampusForm(false));
        this.unsubscribe();
    }

    displayDetail(campus){
        store.dispatch(selectCampus(campus));
        store.dispatch(fetchCampusStudents(campus.id));
        store.dispatch(showAddCampusForm(false));
    }

    showForm(campus, event) {
        event.stopPropagation();
        // Setting it to false doesn't work
        // The component is NOT unmounted. I bet it's timing again, since
        // this is happening so fast, false, then true.
        // store.dispatch(showAddCampusForm(false));

        if(campus.id) store.dispatch(selectCampus(campus));
        else store.dispatch(selectCampus({}));
        store.dispatch(showAddCampusForm(true));
    }

    onCampusAdd(campusInfoObj){
        // store.dispatch(showAddCampusForm(false))
        postCampus(campusInfoObj)

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

    onCampusEdit(campusInfoObj){
        editCampus(campusInfoObj);
    }

    onCampusChange(campusInfoObj){
        store.dispatch(showAddCampusForm(false));

        if(this.state.selectedCampus.id > 0) this.onCampusEdit(campusInfoObj);
        else this.onCampusAdd(campusInfoObj);

    }

    render() {
        const {selectedCampus, campuses, selectedCampusStudents, showAddCampusForm} = this.state;
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1>Campuses <button onClick={this.showForm} className='btn btn-primary pull-right'>Add Campus</button></h1>
                    <ul className='list-group'>
                        {
                            campuses.map(campus => {
                                return (
                                    <li className='list-group-item' key={campus.id}>
                                        <Link to={`/campus/${campus.id}`}>{campus.name}</Link>

                                        <button onClick={(event) => this.onCampusDelete(campus.id, event)} type='button' className='btn btn-danger btn-xs pull-right'>
                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                        </button>

                                        <button onClick={(event) => this.showForm(campus, event)} type='button' className='btn btn-primary btn-xs pull-right' style={{marginRight:'5px'}}>
                                            <span className="glyphicon glyphicon-pencil"></span> Edit
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    showAddCampusForm ? <CampusForm onCampusChange={this.onCampusChange} campus={selectedCampus}/> : <div></div>
                }

                {
                    selectedCampus.id && !showAddCampusForm ? <CampusDetail students={selectedCampusStudents} campus={selectedCampus}/>: <div></div>
                }
            </div>
        )
    }
}
