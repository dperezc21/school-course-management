import {NextFunction, Request, Response} from 'express';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {ConnectionMysql} from "../data-base/connection.mysql";
import {MysqlError} from "mysql";
import {COURSE_STUDENT_TABLE} from "../constants/table-names";

const { getConnection }: ConnectionInterface = new ConnectionMysql();

export class CourseStudentMiddleware {

    courseStudentNotExists(req: Request, res: Response, next: NextFunction) {
        const courseId: string = req.params.courseId;
        const studentId: string = req.params.studentId;
        const query: string = `SELECT id FROM ${COURSE_STUDENT_TABLE} 
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