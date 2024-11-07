import { TableInterface } from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";

export interface AlterTable {
    alter(connection: Connection): void;
}

export class TableStudent implements TableInterface, AlterTable {

    tableName: string = "student";

    createTable(connection: Connection) {
        let createTable: string = `create table if not exists ${this.tableName} (id BIGINT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), career VARCHAR(50), image_url blob)`;
        connection.query(createTable, (err: MysqlError) => {
            if(err) throw err;
            console.log(`table ${this.tableName} created`);
        });
        this.alter(connection);
    }

    alter(connection: Connection): void {
        const query: string = `ALTER TABLE ${this.tableName} add column courseId varchar(20)`;
        connection.query(query, (err: MysqlError) => {
            if(!err) throw err;
            else console.log(`columns add to ${this.tableName}`);
        })
    }
}