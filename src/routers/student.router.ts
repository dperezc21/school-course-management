import { StudentController } from '../controllers/student.controller';
import {Request, Response, Router} from "express";

import expressStudent = require('express');

const router: Router = expressStudent.Router();

const studentController = new StudentController();

router.get('', (req: Request, res: Response) => {
    res.json({"get all student": ""});
});

router.post('', studentController.createStudent);

export const studentRouter: Router = router;