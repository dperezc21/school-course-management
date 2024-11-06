import { Request, Response } from "express";
import { StudentModel } from "../models/student.model";
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
            else res.status(200).json({
                message: "",
                result: result?.length ? result.at(0) : null
            })
        });
    }

    createStudent(req: Request, res: Response) {

        const student: StudentModel = req.body;
        const queryUrl: string = `INSERT INTO student (first_name, last_name, career, image_url) VALUES ('${student.firstName}', '${student.lastName}', '${student.career}', '${student.imageUrl}')`;
        getConnection().query(queryUrl,
            (err) => {
                if(err) res.status(500).json({
                   message: "Error en base de datos, registro no insertado"
                });
                else res.status(200).json({
                    message: "student created"
                })
            });
    }

    getAllStudents(req: Request, res: Response) {
        getConnection().query("select * from student", (err: MysqlError, result: []) =>{
            if(err) res.status(500).json({
                message: "Error de base de datos"
            })
            else res.status(200).status(200).json({
                message: "",
                result
            })
        });
    }

    updateStudent(req: Request, res: Response){
        const {firstName, lastName, career, imageUrl}: StudentModel = req.body;
        const studentId: string = req.params.id;
        const queryUrl: string = `UPDATE student SET first_name='${firstName}', last_name='${lastName}', career='${career}' ${imageUrl ? `, image_url='${imageUrl}'` : ''} where id=${studentId}`;
        getConnection().query(queryUrl, (err: MysqlError) => {
           if(err) res.status(500).json({
               message: "Error al actualizar estudiante"
           });
           else res.status(200).json({
               message: "estudiante actualizado correctament"
           })
        });
    }

}