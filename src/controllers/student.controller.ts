import { Request, Response } from "express";
import { Student } from "../models/student";
import { ConnectionInterface } from "../interfaces/connectionInterface";

import { ConnectionMysql } from '../data-base/connection.mysql';
import {MysqlError} from "mysql";

const {getConnection}: ConnectionInterface = new ConnectionMysql();

export class StudentController {
    getStudentById(req: Request, res: Response) {
        const studentId: string = req.params.id;
        const queryUrl: string = `select * from student where id=${studentId}`;
        getConnection().query(queryUrl, (err: MysqlError, result: []) => {

            if(err) res.status(500).json({
                message: "error en db"
            })
            res.status(200).json({
                message: "",
                result: result?.length ? result.at(0) : null
            })
        });
    }

    createStudent(req: Request, res: Response) {

        const student: Student = req.body;
        const queryUrl: string = `INSERT INTO student (first_name, last_name, career, image_url) VALUES ('${student.firstName}', '${student.lastName}', '${student.career}', '${student.image_url}')`;
        getConnection().query(queryUrl,
            (err) => {
                if(err) res.status(500).json({
                   message: "Error en base de datos, registro no insertado"
                });
            });
        res.status(200).json({
            message: "student created",
            student
        })
    }

    getAllStudents(req: Request, res: Response) {
        getConnection().query("select * from student", (err: MysqlError, result: Student[]) =>{
            if(err) res.status(500).json({
                message: "Error de base de datos"
            })
            res.status(200).status(200).json({
                message: "",
                result
            })
        });
    }

}