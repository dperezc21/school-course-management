import { TableInterface } from "../interfaces/connectionInterface";
import {Connection} from "mysql";

export class TableStudent implements TableInterface {

    tableName: string = "student";

    createTable(connection: Connection) {
        let createTable: string = `create table ${this.tableName} (id VARCHAR(225), first_name VARCHAR(50), last_name VARCHAR(50), career VARCHAR(50), image_url blob)`;
        connection.query(createTable, (err: any) => {
            if(err) throw err;
            console.log(`tabla ${this.tableName} creada`);
        })
    }

}

module.exports = new TableStudent;