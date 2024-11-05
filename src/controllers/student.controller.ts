import { Request, Response } from "express";
import { Student } from "../models/student";
import { ConectionInterface } from "../interfaces/conection.interface";

const conection: ConectionInterface = require('../data-base/conection.mysql');

export class StudentController {

    createStudent(req: Request, res: Response) {
        const student: Student = req.body;
        
        conection.getConection().query(`INSERT INTO student (id, first_name, last_name, career, image_url) VALUES (1, '${student.firstName}', '${student.lastName}', '${student.career}', '${student.image_url}')`,
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