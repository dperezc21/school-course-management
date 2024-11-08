import {TableInterface} from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";


export class TableCourse implements TableInterface {
    tableName: string = "course";

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