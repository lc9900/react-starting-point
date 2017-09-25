// can create a campus
// can edit a campus's info, including adding/removing a student to/from that campus
// can delete a campus

const db = require('../');
const Sequelize = db.Sequelize;
const utils = require('../../utils');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Tested
// Student's campusId set to null.
Campus.deleteStudent = function(campusId, studentId){
    return Campus.findById(campusId)
            .then(campus => {
                return campus.removeStudent(studentId);
            }).then(() => {
                utils.inform(`Student ${studentId} removed from Campus ${campusId}`);
            });
};

// Tested
Campus.updateInfo = function(campusId, infoObj) {
    console.log("infoObj is ", infoObj);
    return Campus.update(infoObj, {
        where: {id: campusId}
    }).then(() => {
        utils.inform(`Campus ${campusId} updated`);
    });
}

// Tested
// Student's campusId set to null.
Campus.deleteCampus = function(campusId) {
    return Campus.destroy({
        where: { id: campusId}
    }).then(() => { utils.inform(`Campus ${campusId} removed`)});
}

// Tested
// This also works on students that already have a campus assigned.
Campus.addStudent = function(campusId, studentId) {
    return Campus.findById(campusId)
                .then(campus => {
                    return campus.addStudent(studentId);
                }).then(() => {
                    utils.inform(`Added student ${studentId} to Campus ${campusId}`);
                });
};

module.exports = Campus;
