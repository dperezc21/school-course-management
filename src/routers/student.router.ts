import { StudentController } from '../controllers/student.controller';
import {Request, Response, Router} from "express";

import expressStudent = require('express');

const router = expressStudent.Router();

const studentController: StudentController = new StudentController();

router.get('', (req: Request, res: Response) => {
    res.status(200).json({"get all student": ""});
});

router.post('', studentController.createStudent);

export const studentRouter: Router = router;