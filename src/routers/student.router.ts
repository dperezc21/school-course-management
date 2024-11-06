import { StudentController } from '../controllers/student.controller';
import { Router } from "express";

import expressStudent = require('express');

const router = expressStudent.Router();

const {getAllStudents, getStudentById, createStudent, updateStudent}: StudentController = new StudentController();

router.get('/:id', getStudentById)
router.get('', getAllStudents);
router.post('', createStudent);
router.put('/:id', updateStudent);

export const studentRouter: Router = router;