// Route here is /api/campus/
const router = require('express').Router();
const db = require('../db/models');
const {Campus} = db;
module.exports = router;


// Tested
router.get('/', (req, res, next) => {
    return db.retrieveAllCampuses()
            .then(result => {
                res.json(result)
            })
            .catch(err => { throw err; });
});

// Tested
router.delete('/:campusId', (req, res) => {
    const campusId = req.params.campusId;
    return Campus.deleteCampus(campusId)
            .then(() => {
                res.json(`Campus ${campusId} was deleted`);
            })
            .catch(err => { throw err; });
});

// Adding student to campus
// Tested
router.post('/:campusId/:studentId', (req, res) => {
    const {campusId, studentId} = req.params;
    return Campus.addStudent(campusId*1, studentId*1)
                .then(() => {
                    res.json(`Student ${studentId} is added to Campus ${campusId}`)
                })
                .catch(err => { throw err; });
});

// Tested
router.post('/', (req, res) => {
    // console.log(req.body.name);
    // res.json(req.body.name);
    return Campus.create(req.body)
            .then((campus) => {
                res.json(`Campus ${req.body.name} is created`);
            })
            .catch(err => { throw err; });
})
///////////////////////////////////////////////////////////////
// Optional
// Removing student from campus
// Tested
router.delete('/:campusId/:studentId', (req, res) => {
    const {campusId, studentId} = req.params;
    return Campus.deleteStudent(campusId*1, studentId*1)
            .then(() => {
                res.json(`student ${studentId} deleted from campus ${campusId}`);
            })
            .catch(err => { throw err; });
});

// Optional
// Updating campus info
// Tested
router.put('/:campusId', (req, res) => {
    console.log(req.body);
    return Campus.updateInfo(req.params.campusId*1, req.body)
            .then(() => {
                res.json(`Campus ${req.params.campusId} updated`);
            })
            .catch(err => { throw err; });
});
