import {DataBaseQueriesInterface} from "../interfaces/data-base-queries.interface";

export class MysqlQueries implements DataBaseQueriesInterface {
    getAll(tableName: string): string {
        return `SELECT * FROM ${tableName}`;
    }

    getById(tableName: string, id: string, columns: string = "*"): string {
        return `SELECT ${columns} FROM ${tableName} WHERE id='${id}'`;
    }
}