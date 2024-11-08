import { Router } from "express";

import expressStudent = require('express');
import {TeacherController} from "../controllers/teacher.controller";

const router: Router = expressStudent.Router();

const { getAllTeachers, createTeacher, updateTeacher, getTeacherById } = new TeacherController();

router.get('', getAllTeachers);
router.post('', createTeacher);
router.put('/:teacherId', updateTeacher);
router.get('/:teacherId', getTeacherById);

export const teacherRouter: Router = router;
