import { StudentController } from './../controllers/student.controller';
import { Request, Response } from "express";

const expressStudent = require('express');

const router = expressStudent.Router();

const studentContoller = new StudentController();

router.get('', (req: Request, res: Response) => {
    res.json({"get all student": ""});
});

router.post('', studentContoller.createStudent);

module.exports = router;