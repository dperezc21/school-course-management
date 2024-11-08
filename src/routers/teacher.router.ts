import { Router } from "express";

import expressStudent = require('express');
import {TeacherController} from "../controllers/teacher.controller";

const router: Router = expressStudent.Router();

const { getAllTeachers } = new TeacherController();

router.get('', getAllTeachers);

export const teacherRouter: Router = router;
