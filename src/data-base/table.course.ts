import {TableInterface} from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";
import {COURSE_TABLE} from "../constants/table-names";


export class TableCourse implements TableInterface {
    tableName: string = COURSE_TABLE;

    createTable(connection: Connection): void {
        const createTable: string = `create table if not exists ${this.tableName}
                          (id bigint primary key auto_increment,
                          name varchar(50))`;
        connection.query(createTable, (err: MysqlError) => {
            if(err) throw err;
            else console.log(`table ${this.tableName} created`);
        })
    }

}