import React, {Component} from 'react';
import StatefulCampusDetail from './StatefulCampusDetail';
import store, {selectCampus} from '../store';

export default class Home extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.displayDetail = this.displayDetail.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        store.dispatch(selectCampus(0));
        this.unsubscribe();
    }

    displayDetail(){
        store.dispatch(selectCampus(1));
    }

    render() {
        const {selectedCampusId} = this.state;
        return (
            <div className='row'>
                <div className='col-sm-8'>
                    <h1 onClick={this.displayDetail}>Home Page</h1>
                </div>
                {
                    selectedCampusId > 0 ? <StatefulCampusDetail/>: <div></div>
                }
            </div>
        )
    }
}
