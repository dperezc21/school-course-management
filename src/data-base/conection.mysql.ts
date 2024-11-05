import { ConectionInterface } from "../interfaces/conection.interface";

const mysql = require('mysql');

class ConectionMysql implements ConectionInterface {

    dataBaseName: string = "school_course";

    #conection = null;

    constructor() {
        if(!this.#conection) {
            this.#conection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: ''
            });
        }
    }
    

    conect() {
        this.#conection.connect((err) => {
            if(err) console.log("error ocurrido ", err);
            else console.log("conectado a mysql!!");
            this.createDataBase();
            this.useDataBase();
        })
    }

    createDataBase() {
        let queryDataBase = `CREATE DATABASE ${this.dataBaseName}`;
        this.#conection.query(queryDataBase, (err) => {
            if(err) console.log("error al crear database");
            console.log("Database Created Successfully !");
        })
    }

    useDataBase() {
        let useDatabase = `USE ${this.dataBaseName}`;
        this.#conection.query(useDatabase, (err) => {
            if(err) throw err;
            console.log(`using database ${this.dataBaseName}`);
        });
    }

    getConection() {
        return this.#conection;
    }
}

module.exports = new ConectionMysql();

