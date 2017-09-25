// Route here is /api/student
const router = require('express').Router();
const db = require('../db/models');
const {Student} = db;
module.exports = router;


router.get('/', (req, res, next) => {
    return db.retrieveAllStudents()
            .then(result => {
                res.json(result)
            })
            .catch(err => { throw err; });
});

// Update student info
// Tested
router.put('/:studentId', (req, res) => {
    return Student.updateStudent(req.params.studentId*1, req.body)
            .then(() => {
                res.json(`Student ${req.params.studentId} updated`);
            })
            .catch(err => { throw err; });
});

// Deleting Student
// Tested
router.delete('/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    return Student.deleteStudent(studentId)
            .then(() => {
                res.json(`Student ${studentId} was deleted`);
            })
            .catch(err => { throw err; });
});

