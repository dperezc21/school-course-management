import {TableInterface} from "../interfaces/connectionInterface";
import {Connection, MysqlError} from "mysql";
import {COURSE_STUDENT_TABLE} from "../constants/table-names";


export class TableCourseStudent implements TableInterface {
    tableName: string = COURSE_STUDENT_TABLE;

    createTable(connection: Connection): void {
        const query: string = `CREATE TABLE IF NOT EXISTS ${this.tableName}
                               (id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                   studentId BIGINT NOT NULL,
                                   courseId BIGINT NOT NULL,
                                   FOREIGN KEY (studentId) REFERENCES student(id),
                                   FOREIGN KEY (courseId) REFERENCES course(id))`;
        connection.query(query, (err: MysqlError) => {
            if(err) throw err;
            else console.log("table to references of student and course created");
        })
    }

}