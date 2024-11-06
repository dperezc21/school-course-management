import {ConnectionInterface, TableInterface} from "../interfaces/connectionInterface";

import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import {TableStudent} from "./table.student";

export class ConnectionMysql implements ConnectionInterface {

    dataBaseName: string = "school_course";

    readonly tableStudent: TableInterface = new TableStudent();

    private static readonly connection: Connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ''
    });
    

    connect() {
        ConnectionMysql.connection.connect((err) => {
            if(err) console.log("error ocurrido ", err);
            else console.log("conectado a mysql!!");
            //this.createDataBase();
            this.useDataBase();
        })
    }

    createDataBase() {
        let queryDataBase: string = `CREATE DATABASE ${this.dataBaseName}`;
        ConnectionMysql.connection.query(queryDataBase, (err) => {
            if(err) console.log("error al crear database");
            console.log("Database Created Successfully !");
        })
    }

    useDataBase() {
        let useDatabase: string = `USE ${this.dataBaseName}`;
        ConnectionMysql.connection.query(useDatabase, (err) => {
            if(err) throw err;
            else console.log(`using database ${this.dataBaseName}`);
            ConnectionMysql.connection.query("DESCRIBE student", (err: MysqlError) =>{
                if(err) this.tableStudent.createTable(ConnectionMysql.connection);
            });
        });
    }

    getConnection(): Connection {
        return ConnectionMysql.connection;
    }
}

