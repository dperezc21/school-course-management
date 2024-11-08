import { Request, Response } from 'express';
import { ConnectionMysql } from '../data-base/connection.mysql';
import {ConnectionInterface} from "../interfaces/connectionInterface";
import {QueriesMysql} from "../utils/queries.mysql";
import {TEACHER_TABLE} from "../constants/table-names";
import {MysqlError} from "mysql";

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
}