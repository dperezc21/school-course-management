import { StudentController } from '../controllers/student.controller';
import { Router } from "express";

import expressStudent = require('express');

const router = expressStudent.Router();

const studentController: StudentController = new StudentController();

router.get('/:id', studentController.getStudentById)
router.get('', studentController.getAllStudents);
router.post('', studentController.createStudent);

export const studentRouter: Router = router;