import {Request, Response} from "express";
import {MysqlError} from "mysql";
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {ConnectionMysql} from "../data-base/connection.mysql";

const {getConnection}: ConnectionInterface = new ConnectionMysql();

export class CourseStudentController {

    addStudentToCourse(req: Request, res: Response) {

        const studentId: string = req.params.studentId;
        const courseId: string = req.params.courseId;

        const query: string = `INSERT INTO coursestudent (studentId, courseId) VALUES ('${studentId}', '${courseId}')`;
        const queryStudentById: string = `SELECT s.id, c.id FROM student as s, course as c
                                          WHERE s.id=${studentId} AND c.id=${courseId}`;
        getConnection().query(queryStudentById, (err: MysqlError, results: []) => {
            if(err) throw err;
            else if(!results?.length) res.status(200).json({
                message: "is not possible create the recourse", results
            });
            else {
                getConnection().query(query, (err: MysqlError) => {
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