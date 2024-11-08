import { Router } from "express";

import expressStudent = require('express');
import {TeacherController} from "../controllers/teacher.controller";

const router: Router = expressStudent.Router();

const { getAllTeachers, createTeacher } = new TeacherController();

router.get('', getAllTeachers);
router.post('', createTeacher);

export const teacherRouter: Router = router;
