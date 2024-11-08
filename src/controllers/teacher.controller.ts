import { Request, Response } from 'express';
import { ConnectionMysql } from '../data-base/connection.mysql';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {QueriesMysql} from "../utils/queries.mysql";
import {TEACHER_TABLE} from "../constants/table-names";
import {MysqlError} from "mysql";
import {TeacherModel} from "../models/teacher.model";

const { getConnection }: ConnectionInterface = new ConnectionMysql();

export class TeacherController {

    getAllTeachers(req: Request, res: Response): void {
        const query: string = QueriesMysql.getAll(TEACHER_TABLE);
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
}