import { Request, Response } from "express";
import { Student } from "../models/student";
import { ConnectionInterface } from "../interfaces/connectionInterface";

import { ConnectionMysql } from '../data-base/connection.mysql';

export class StudentController {
    #connection: ConnectionInterface = new ConnectionMysql();
    createStudent(req: Request, res: Response) {
        const student: Student = req.body;

        this.#connection.getConnection().query(`INSERT INTO student (id, first_name, last_name, career, image_url) VALUES (1, '${student.firstName}', '${student.lastName}', '${student.career}', '${student.image_url}')`,
            (err) => {
                if(err) throw err;
                console.log("registro insertado");
            });
        res.status(200).json({
            message: "student created",
            student
        })
    }

}