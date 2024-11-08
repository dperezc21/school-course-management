
import { Request, Response }  from 'express';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {ConnectionMysql} from "../data-base/connection.mysql";
import {QueriesMysql} from "../utils/queries.mysql";
import {MysqlError} from "mysql";
import {CourseModel} from "../models/course.model";

const {getConnection}: ConnectionInterface = new ConnectionMysql();

export class CourseController {

    getAllCourses(req: Request, res: Response) {
        getConnection().query(QueriesMysql.getAll("course"), (err: MysqlError, result: []) => {
           if(err) res.status(500).json({
               message: "Err while get all courses"
           });
           else res.status(200).json({
               message: "",
               result
           })
        });
    }

    createCourse(req: Request, res: Response) {
        const student: CourseModel = req.body;
        const queryUrl: string = `INSERT INTO course (name) VALUES ('${student.name}')`;
        getConnection().query(queryUrl,
            (err: MysqlError) => {
                if(err) res.status(500).json({
                    message: "Error en base de datos, registro no insertado"
                });
                else res.status(200).json({
                    message: "course created"
                })
            });
    }

    updateCourse(req: Request, res: Response) {
        const { name }: CourseModel = req.body;
        const courseId: string = req.params.id;
        const queryUrl: string = `UPDATE course SET name='${name}' where id=${courseId}`;
        getConnection().query(queryUrl, (err: MysqlError) => {
            if(err) res.status(500).json({
                message: "Err while update course"
            });
            else res.status(200).json({
                message: "student updated"
            })
        });
    }
}