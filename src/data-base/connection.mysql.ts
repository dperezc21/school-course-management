import {ConnectionInterface, TableInterface} from "../interfaces/connectionInterface";

import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import {TableStudent} from "./table.student";
import {TableCourse} from "./table.course";

export class ConnectionMysql implements ConnectionInterface {

    dataBaseName: string = "school_course";

    readonly tableStudent: TableInterface = new TableStudent();
    readonly tableCourse: TableInterface = new TableCourse();

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
            this.tableCourse.createTable(connection);
            this.tableStudent.createTable(connection);
        });
    }

    getConnection(): Connection {
        return ConnectionMysql.connection;
    }
}

