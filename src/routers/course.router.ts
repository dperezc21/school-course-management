import express = require('express');
import {Router} from "express";
import {CourseController} from "../controllers/course.controller";

const router: Router = express.Router();

const { getAllCourses, createCourse, updateCourse }: CourseController = new CourseController();

router.get('', getAllCourses);
router.post('', createCourse);
router.put('/:id', updateCourse);


export const courseRouter: Router = router;