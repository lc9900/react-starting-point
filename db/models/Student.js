// can create a student
// can edit a student's info, including the campus that student is assigned to
// can delete a student

const db = require('../');
const Sequelize = db.Sequelize;
const utils = require('../../utils');

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Tested
Student.updateStudent = function (studentId, infoObj) {
    return Student.update(infoObj, {
        where: {id: studentId}
    }).then(() => {
        utils.inform(`Student ${studentId} udpated`);
    })
};

// Tested
Student.deleteStudent = function(studentId) {
    return Student.destroy({
        where: {
            id: studentId
        }
    }).then(() => {
        utils.inform(`Student ${studentId} removed`);
    })
}

module.exports = Student;
