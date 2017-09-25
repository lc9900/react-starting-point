'use strict';

// This is also probably a good place for you to set up your associations
const db = require('../');
const Sequelize = db.Sequelize;
const Student = require('./Student');
const Campus = require('./Campus');
const utils = require('../../utils');


Student.belongsTo(Campus);
Campus.hasMany(Student);

function syncAndSeed(){
    return db.sync({force: true})
            .then(() => {
                return Promise.all([
                    Campus.create({name: 'Campus 1'}),
                    Campus.create({name: 'Campus 2'}),
                    Campus.create({name: 'Campus 3'}),
                ]);
            }).then(() => {
                return Promise.all([
                    Student.create({name: 'Kobe Bryant', campusId: 1}),
                    Student.create({name: 'Michael Jordan', campusId: 1}),
                    Student.create({name: 'Kyrie Irving'}),
                    Student.create({name: 'Han Gu'}),
                    Student.create({name: 'Prof Da Man'})
                ]);
            }).then(() => {
                utils.inform("Database synced and seeded");
            })
            .catch(err => { throw err; })
}

function retrieveAllCampuses() {
    return Campus.findAll({
        include: [Student]
    }).then(result => result)
}

function retrieveAllStudents() {
    return Student.findAll({
        include: [Campus]
    });
}

module.exports = {
    syncAndSeed, Campus, Student, retrieveAllCampuses, retrieveAllStudents
}
