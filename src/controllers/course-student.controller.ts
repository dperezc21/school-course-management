import {Request, Response} from "express";
import {MysqlError} from "mysql";
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {ConnectionMysql} from "../data-base/connection.mysql";
import {COURSE_STUDENT_TABLE, COURSE_TABLE, STUDENT_TABLE} from "../constants/table-names";

const {getConnection}: ConnectionInterface = new ConnectionMysql();

export class CourseStudentController {

    addStudentToCourse(req: Request, res: Response) {

        const studentId: string = req.params.studentId;
        const courseId: string = req.params.courseId;

        const insertCourseStudent: string = `INSERT INTO ${COURSE_STUDENT_TABLE} (studentId, courseId) 
                                VALUES ('${studentId}', '${courseId}')`;
        const searchCourseAndStudent: string = `SELECT s.id, c.id 
                                          FROM ${STUDENT_TABLE} as s, ${COURSE_TABLE} as c
                                          WHERE s.id=${studentId} AND c.id=${courseId}`;
        getConnection().query(searchCourseAndStudent, (err: MysqlError, result: []) => {
            if(err) throw err;
            else if(!result?.length) res.status(200).json({
                message: "is not possible create the record", result
            });
            else {
                getConnection().query(insertCourseStudent, (err: MysqlError) => {
                    if(err) res.status(500).json({
                        message: "err while add the student in the course"
                    });
                    else res.status(200).json({
                        message: "student added to course"
                    })
                })
            }
        })

    }
}