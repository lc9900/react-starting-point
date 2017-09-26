import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Students from './Students';
import SingleCampus from './SingleCampus';

export default function Main () {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <main>
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/students' component={Students}/>
                    <Route path='/home/:campusId' component={SingleCampus}/>
                    <Redirect to='/home' />
                </Switch>
            </main>
        </div>
    )
}
