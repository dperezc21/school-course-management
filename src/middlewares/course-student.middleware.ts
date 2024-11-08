import { Request, Response } from 'express';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {ConnectionMysql} from "../data-base/connection.mysql";
import {MysqlError} from "mysql";

const { getConnection }: ConnectionInterface = new ConnectionMysql();

export class CourseStudentMiddleware {

    courseStudentNotExists(req: Request, res: Response, next: any) {
        const courseId: string = req.params.courseId;
        const studentId: string = req.params.studentId;
        const query: string = `SELECT id FROM coursestudent 
                               WHERE courseId=${courseId} AND studentId=${studentId}`;

        getConnection().query(query, (err: MysqlError, result: []) => {
            if(err) res.status(500).json({
               message: "err while search record in reference of student and course"
            });
            return result?.length ? res.status(406).json({
                message: "record already exists previously"
            }) : next();
        });
    }
}