import { TableInterface } from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";
import {STUDENT_TABLE} from "../constants/table-names";

export class StudentTable implements TableInterface {

    tableName: string = STUDENT_TABLE;

    createTable(connection: Connection) {
        let createTable: string = `create table if not exists ${this.tableName} 
                                    (id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                        first_name VARCHAR(50),
                                        last_name VARCHAR(50), 
                                        career VARCHAR(50), 
                                        image_url blob)`;
        connection.query(createTable, (err: MysqlError) => {
            if(err) throw err;
            console.log(`table ${this.tableName} created`);
        });
    }
}