import {ConnectionInterface, TableInterface} from "../interfaces/connectionInterface";

import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import {StudentTable} from "./student-table";
import {CourseTable} from "./course-table";
import {CourseStudentTable} from "./courseStudent-table";
import {TeacherTable} from "./teacher-table";

export class ConnectionMysql implements ConnectionInterface {

    dataBaseName: string = "school_course";

    readonly tableStudent: TableInterface = new StudentTable();
    readonly tableCourse: TableInterface = new CourseTable();
    readonly tableCourseStudent: TableInterface = new CourseStudentTable();
    readonly tableTeacher: TableInterface = new TeacherTable();

    private static readonly connection: Connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ''
    });

    connect() {
        this.getConnection().connect((err: MysqlError) => {
            if(err) console.log("error: ", err);
            else console.log("connected to mysql!!");
            this.createDataBase();
            this.useDataBase();
        })
    }

    createDataBase() {
        let queryDataBase: string = `CREATE DATABASE if not exists ${this.dataBaseName}`;
        this.getConnection().query(queryDataBase, (err: MysqlError) => {
            if(err) console.log("error to create database");
            console.log("Database Created Successfully !");
        })
    }

    useDataBase() {
        let useDatabase: string = `USE ${this.dataBaseName}`;
        const connection: Connection = this.getConnection();
        connection.query(useDatabase, (err: MysqlError) => {
            if(err) throw err;
            else console.log(`using database ${this.dataBaseName}`);
            this.creatingTables();
        });
    }

    getConnection(): Connection {
        return ConnectionMysql.connection;
    }

    private creatingTables(): void {
        this.tableCourse.createTable(this.getConnection());
        this.tableStudent.createTable(this.getConnection());
        this.tableCourseStudent.createTable(this.getConnection());
        this.tableTeacher.createTable(this.getConnection());
    }
}

