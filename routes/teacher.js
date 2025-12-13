var express = require('express');
const { getAllTeacher, createTeacher , deleteTeacherById , updateTeacherById} = require('../controllers/teacherController');
var router = express.Router();

/* GET home page. */
router.get('/get_all_teachers', getAllTeacher);
router.post('/create_teacher', createTeacher);
router.delete('/delete_teacher_by_id/:id', deleteTeacherById)
router.put('/update_teacher_by_id/:id', updateTeacherById);
module.exports = router;
