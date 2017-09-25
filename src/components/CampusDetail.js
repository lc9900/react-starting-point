import React from 'react';

export default function CampusDetail (props) {
    const {students} = props;
    return (
        <div className='col-sm-4'>
            <div className="panel panel-default">
              <div className="panel-body">
              <p className='lead'>Campus Students</p>
                <ul className='list-group'>
                    {
                        students.length > 0 ?students.map(student => <li key={student.id} className='list-group-item'>{student.name}</li>):
                                                <div className='lead'>No students for this campus</div>
                    }
                </ul>
              </div>
            </div>
        </div>
    )
}
