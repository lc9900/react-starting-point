import React from 'react';
import {NavLink} from 'react-router-dom';

const style={
    backgroundColor: '#DCDCDC',
    color: '#A52A2A'
}

export default function Navbar() {
    return (
        <div className='col-sm-12'>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" >
                <NavLink to='/home' activeStyle={style}>Home</NavLink>
              </li>
              <li role="presentation">
                <NavLink to='/students' activeStyle={style}>Students</NavLink>
              </li>
            </ul>
            <br/>
            <hr />
        </div>
    )
}
