// Route here is /api/student
const router = require('express').Router();
const db = require('../db/models');
const {Campus, Student} = db;
module.exports = router;

// Retrieve all students info
router.get('/', (req, res) => {
    return db.retrieveAllStudents()
            .then(result => {
                res.json(result)
            })
            .catch(err => { throw err; });
});

router.get('/:studentId', (req, res) => {
    return Student.findOne({
        where: {
            id: req.params.studentId * 1
        },
        include: [Campus]
    }).then(student => {
        res.json(student);
    }).catch(err => { throw err; });
})
// Expected req.body to be {name: xxxxxx, campusId: xx}
// Add new student
// Tested
router.post('/', (req, res) => {
    const {name, campusId} = req.body;
    return Student.create({name, campusId})
        .then(student => {
        res.json(student);
    }).catch(err => { throw err; });
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

