import {TableInterface} from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";
import {TEACHER_TABLE} from "../constants/table-names";

export class TeacherTable implements TableInterface{
    tableName: string = TEACHER_TABLE;

    createTable(connection: Connection): void {
        const query: string = `CREATE TABLE IF NOT EXISTS ${TEACHER_TABLE} 
                               (id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                   first_name varchar(30) NOT NULL,
                                   last_name varchar(30) NOT NULL,
                                   image_url blob)`;
        connection.query(query, (err: MysqlError) => {
            if(err) throw err;
            else console.log("teacher table created");
        });
    }

}