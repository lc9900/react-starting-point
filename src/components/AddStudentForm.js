import React, { Component } from 'react';

export default class AddStudentForm extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div className='col-sm-4'>
                <h2>Add Student</h2>
                <form>
                    <div className="form-group">
                        <input className="form-control" placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <select className="form-control">
                            <option>Select A Campus</option>
                            <option>Campus A</option>
                            <option>Campus B</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
