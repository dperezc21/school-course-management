import { Router } from "express";

import expressStudent = require('express');
import {TeacherController} from "../controllers/TeacherController";

const router: Router = expressStudent.Router();

const { getAllTeachers } = new TeacherController();

router.get('', getAllTeachers);

export const teacherRouter: Router = router;
