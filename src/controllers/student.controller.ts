import { Request, Response } from "express";
import { Student } from "../models/student";
import { ConnectionInterface } from "../interfaces/connectionInterface";

import { ConnectionMysql } from '../data-base/connection.mysql';
import {MysqlError} from "mysql";

const connection: ConnectionInterface = new ConnectionMysql();

export class StudentController {

    createStudent(req: Request, res: Response) {

        const student: Student = req.body;
        connection.getConnection().query(`INSERT INTO student (first_name, last_name, career, image_url) VALUES ('${student.firstName}', '${student.lastName}', '${student.career}', '${student.image_url}')`,
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
        connection.getConnection().query("select * from student", (err: MysqlError, result: Student[]) =>{
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