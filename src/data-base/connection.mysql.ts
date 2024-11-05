import { ConnectionInterface } from "../interfaces/connectionInterface";

import mysql = require('mysql');
import {Connection} from "mysql";

export class ConnectionMysql implements ConnectionInterface {

    dataBaseName: string = "school_course";

    readonly #connection: Connection = null;

    constructor() {
        if(!this.#connection) {
            this.#connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: ''
            });
        }
    }
    

    connect() {
        this.#connection.connect((err) => {
            if(err) console.log("error ocurrido ", err);
            else console.log("conectado a mysql!!");
            this.createDataBase();
            this.useDataBase();
        })
    }

    createDataBase() {
        let queryDataBase: string = `CREATE DATABASE ${this.dataBaseName}`;
        this.#connection.query(queryDataBase, (err) => {
            if(err) console.log("error al crear database");
            console.log("Database Created Successfully !");
        })
    }

    useDataBase() {
        let useDatabase: string = `USE ${this.dataBaseName}`;
        this.#connection.query(useDatabase, (err) => {
            if(err) throw err;
            console.log(`using database ${this.dataBaseName}`);
        });
    }

    getConnection(): Connection {
        return this.#connection;
    }
}

