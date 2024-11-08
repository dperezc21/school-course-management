import express = require('express');
import {Router} from "express";
import {CourseController} from "../controllers/course.controller";
import {CourseStudentController} from "../controllers/course-student.controller";
import {CourseStudentMiddleware} from "../middlewares/course-student.middleware";

const router: Router = express.Router();

const { getAllCourses, createCourse, updateCourse }: CourseController = new CourseController();
const { addStudentToCourse }: CourseStudentController = new CourseStudentController();

const { courseStudentNotExists } = new CourseStudentMiddleware();

router.get('', getAllCourses);
router.post('', createCourse);
router.put('/:id', updateCourse);
router.put('/:courseId/addStudent/:studentId', [courseStudentNotExists], addStudentToCourse);

export const courseRouter: Router = router;