import { Request, Response } from 'express';
import { ConnectionMysql } from '../data-base/connection.mysql';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {MysqlQueries} from "../utils/mysql-queries";
import {TEACHER_TABLE} from "../constants/table-names";
import {MysqlError} from "mysql";
import {TeacherModel} from "../models/teacher.model";

const { getConnection }: ConnectionInterface = new ConnectionMysql();

export class TeacherController {

    getAllTeachers(req: Request, res: Response): void {
        const query: string = MysqlQueries.getAll(TEACHER_TABLE);
        getConnection().query(query, (err: MysqlError, result: []) => {
            if(err) res.status(500).json({
                message: "Error while get teachers"
            });
            else res.status(200).json({
                message: "",
                result
            })
        });
    }

    createTeacher(req: Request, res: Response) {
        const {firstName, lastName, imageUrl}: TeacherModel = req.body;
        const queryUrl: string = `INSERT INTO ${TEACHER_TABLE} 
                                   (first_name, last_name, image_url) 
                                   VALUES ('${firstName}', '${lastName}', '${imageUrl}')`;
        getConnection().query(queryUrl, (err) => {
            if(err) res.status(500).json({
                message: "Error, record did not inserted"
            });
            else res.status(200).json({
                message: "teacher created"
            })
        });
    }

    updateTeacher(req: Request, res: Response) {
        const {firstName, lastName, imageUrl}: TeacherModel = req.body;
        const teacherId: string = req.params.teacherId;
        const queryUrl: string = `UPDATE ${TEACHER_TABLE} 
                                  SET first_name='${firstName}', 
                                      last_name='${lastName}'
                                      ${imageUrl ? `, image_url='${imageUrl}'`: ''}
                                  WHERE id=${teacherId}`;
        getConnection().query(queryUrl, (err) => {
            if(err) res.status(500).json({
                message: "Error while update teacher"
            });
            else res.status(200).json({
                message: "teacher updated"
            })
        });
    }

    getTeacherById(req: Request, res: Response) {
        const teacherId: string = req.params.teacherId;
        const queryUrl: string = MysqlQueries.getById(TEACHER_TABLE, teacherId); //`select * from ${TEACHER_TABLE} where id=${teacherId}`;
        getConnection().query(queryUrl, (err: MysqlError, result: []) => {

            if(err) res.status(500).json({
                message: "error while search student by id"
            })
            else res.status(200).json({
                message: "",
                result: result?.length ? result.at(0) : null
            })
        });
    }
}